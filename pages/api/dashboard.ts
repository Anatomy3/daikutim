import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      if (!userId || Array.isArray(userId)) {
        return res.status(400).json({ error: 'ID pengguna yang valid diperlukan' });
      }

      // Ambil laporan terbaru
      const laporanTerbaru = await prisma.laporanHarian.findMany({
        take: 5,
        orderBy: {
          tanggalLaporan: 'desc'
        }
      });

      // Hitung jumlah karyawan (pengguna dengan role 'karyawan')
      const jumlahKaryawan = await prisma.employee.count({
        where: {
          role: 'karyawan'
        }
      });

      // Hitung total pengguna aktif (semua pengguna)
      const totalPenggunaAktif = await prisma.employee.count();

      // Hitung jumlah laporan hari ini
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const laporanHariIni = await prisma.laporanHarian.count({
        where: {
          tanggalLaporan: {
            gte: today
          }
        }
      });

      // Hitung jumlah laporan berdasarkan status
      const hitungStatusLaporan = await prisma.laporanHarian.groupBy({
        by: ['statusHarian'],
        _count: {
          statusHarian: true
        }
      });

      // Ambil aktivitas terbaru untuk pengguna tertentu
      const aktivitasTerbaru = await prisma.userActivity.findMany({
        where: {
          employeeId: parseInt(userId)
        },
        take: 5,
        orderBy: {
          timestamp: 'desc'
        },
        include: {
          employee: {
            select: {
              fullName: true
            }
          }
        }
      });

      res.status(200).json({
        laporanTerbaru,
        jumlahKaryawan,
        totalPenggunaAktif,
        laporanHariIni,
        hitungStatusLaporan,
        aktivitasTerbaru
      });
    } catch (error) {
      console.error('Error saat mengambil data dashboard:', error);
      res.status(500).json({ error: 'Kesalahan Server Internal' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metode ${req.method} Tidak Diizinkan`);
  }
}
