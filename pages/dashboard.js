import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [peran, setPeran] = useState('');
  const [idPengguna, setIdPengguna] = useState('');
  const [laporan, setLaporan] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [aktivitas, setAktivitas] = useState([]);
  const [jumlahKaryawan, setJumlahKaryawan] = useState(0);
  const [totalPenggunaAktif, setTotalPenggunaAktif] = useState(0);
  const [hitungStatusLaporan, setHitungStatusLaporan] = useState({});
  const [laporanHariIni, setLaporanHariIni] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const peranTersimpan = localStorage.getItem('userRole');
    const idPenggunaTersimpan = localStorage.getItem('userId');
    if (peranTersimpan && idPenggunaTersimpan) {
      setPeran(peranTersimpan);
      setIdPengguna(idPenggunaTersimpan);
    }
  }, []);

  useEffect(() => {
    const ambilData = async () => {
      if (!idPengguna) return;
      
      setSedangMemuat(true);
      setError(null);
      try {
        const [responLaporan, responDashboard] = await Promise.all([
          fetch('/api/laporan_karyawan'),
          fetch(`/api/dashboard?userId=${idPengguna}`)
        ]);
        
        if (!responLaporan.ok || !responDashboard.ok) {
          throw new Error('Gagal mengambil data');
        }
        
        const dataLaporan = await responLaporan.json();
        const dataDashboard = await responDashboard.json();
        
        setLaporan(dataLaporan);
        setAktivitas(dataDashboard.aktivitasTerbaru);
        setJumlahKaryawan(dataDashboard.jumlahKaryawan);
        setTotalPenggunaAktif(dataDashboard.totalPenggunaAktif);
        setLaporanHariIni(dataDashboard.laporanHariIni);
        setHitungStatusLaporan(dataDashboard.hitungStatusLaporan);

      } catch (error) {
        console.error('Error saat mengambil data:', error);
        setError('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
      } finally {
        setSedangMemuat(false);
      }
    };

    ambilData();
  }, [idPengguna]);

  const renderDashboardAdmin = () => (
    <div className={styles.kontenDashboard}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.barisUtama}>
        <div className={styles.kartuLaporan}>
          <h3>Laporan Karyawan</h3>
          {sedangMemuat ? (
            <p>Memuat laporan...</p>
          ) : laporan.length > 0 ? (
            <div className={styles.pembungkusTabel}>
              <table className={styles.tabel}>
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>Tanggal Laporan</th>
                    <th>Jam Kerja</th>
                    <th>Progres Harian</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {laporan.map((itemLaporan) => (
                    <tr key={itemLaporan.id}>
                      <td>{itemLaporan.namaLengkap}</td>
                      <td>{new Date(itemLaporan.tanggalLaporan).toLocaleDateString()}</td>
                      <td>{`${itemLaporan.dariJam} - ${itemLaporan.hinggaJam}`}</td>
                      <td>{itemLaporan.progressHarian}</td>
                      <td>{itemLaporan.statusHarian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Tidak ada laporan yang ditemukan.</p>
          )}
        </div>
        <div className={styles.barisKartu}>
          <div className={styles.kartu}>
            <h3>Status Laporan Harian</h3>
            {sedangMemuat ? (
              <p>Memuat status...</p>
            ) : (
              <div className={styles.statusLaporan}>
                <span className={styles.jumlahLaporan}>{laporanHariIni}/{jumlahKaryawan}</span>
                <span className={styles.deskripsiLaporan}>karyawan telah melaporkan</span>
              </div>
            )}
          </div>
          <div className={styles.kartu}>
            <h3>Total Pengguna Aktif</h3>
            {sedangMemuat ? (
              <p>Memuat data...</p>
            ) : (
              <div className={styles.jumlahPengguna}>{totalPenggunaAktif}</div>
            )}
          </div>
          <div className={styles.kartu}>
            <h3>Riwayat Aktivitas</h3>
            {sedangMemuat ? (
              <p>Memuat aktivitas...</p>
            ) : aktivitas.length > 0 ? (
              <ul className={styles.daftarAktivitas}>
                {aktivitas.map((aktivitas, indeks) => (
                  <li key={indeks} className={styles.itemAktivitas}>
                    <div className={styles.barAktivitas}></div>
                    <div className={styles.kontenAktivitas}>
                      <div className={styles.judulAktivitas}>{aktivitas.description}</div>
                      <div className={styles.waktuAktivitas}>
                        {new Date(aktivitas.timestamp).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Belum ada aktivitas terbaru.</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <a href="https://daikuinterior.com" target="_blank" rel="noopener noreferrer">
          daikuinterior.com © {new Date().getFullYear()}
        </a>
      </div>
    </div>
  );

  return (
    <main className={styles.kontenUtama}>
      <Navbar />
      {renderDashboardAdmin()}
    </main>
  );
}
