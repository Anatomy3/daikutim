import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, FileText, FileSpreadsheet, File, Trash2, Download, Info } from 'lucide-react';
import styles from '../styles/form.module.css';

const Form = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/form');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Gagal mengambil dokumen. ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("File dipilih:", file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Mengirim file ke server...");
      const response = await fetch('/api/form', {
        method: 'POST',
        body: formData,
      });

      console.log("Status respons server:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detail kesalahan server:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, pesan: ${errorData.message}`);
      }

      const data = await response.json();
      console.log("Unggah berhasil:", data);
      setUploadStatus(`Dokumen ${data.document.name} berhasil diunggah`);
      fetchDocuments();
    } catch (error) {
      console.error('Error mengunggah dokumen:', error);
      setUploadStatus('Gagal mengunggah dokumen. ' + error.message);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      const response = await fetch(`/api/form?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUploadStatus('Dokumen berhasil dihapus');
      fetchDocuments();
    } catch (error) {
      console.error('Error menghapus dokumen:', error);
      setUploadStatus('Gagal menghapus dokumen. ' + error.message);
    }
  };

  const handleDownload = async (id, name) => {
    try {
      console.log(`Attempting to download document: ${name} (ID: ${id})`);
      const response = await fetch(`/api/form?id=${id}`);
      console.log(`Download response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Gagal mengambil dokumen: ${errorData.message || response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      console.log(`Content-Type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('Error in response:', errorData);
        throw new Error(`Server mengembalikan error: ${errorData.message}`);
      }
      
      const blob = await response.blob();
      console.log(`Blob size: ${blob.size} bytes`);
      
      if (blob.size === 0) {
        throw new Error('File kosong atau tidak ditemukan di server');
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log('Download completed');
    } catch (error) {
      console.error('Error mengunduh dokumen:', error);
      setUploadStatus(`Gagal mengunduh dokumen ${name}. ${error.message}`);
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'word':
        return <FileText size={24} color="#4285F4" />;
      case 'excel':
        return <FileSpreadsheet size={24} color="#0F9D58" />;
      default:
        return <File size={24} />;
    }
  };

  const handleDocumentClick = (doc) => {
    if (doc.name === 'BO 1.6.2 Nilai KP-Magang.xlsx') {
      window.open('https://docs.google.com/spreadsheets/d/15JFhUjYqJ8nv4aYltIQu9MtCYUJ0zF97/edit?usp=drive_link&ouid=117898654357318944711&rtpof=true&sd=true', '_blank');
    } else {
      handleDownload(doc.id, doc.name);
    }
  };

  return (
    <main className={styles.mainContent}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.infoBox}>
          <Info className={styles.infoIcon} />
          <div className={styles.infoContent}>
            <h2 className={styles.infoTitle}>Info</h2>
            <ul className={styles.infoList}>
              <li>Klik tanda + untuk mengunggah dokumen</li>
              <li>Pastikan dokumen yang diunggah sesuai dengan format yang ditentukan</li>
              <li>Dokumen yang diunggah akan tersimpan dan dapat diakses kembali nanti</li>
            </ul>
          </div>
        </div>
        <div className={styles.uploadSection}>
          <label className={styles.uploadButton}>
            <Plus size={24} />
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
          <span>Unggah Dokumen</span>
        </div>
        {isLoading ? (
          <div className={styles.loading}>Memuat dokumen...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : documents.length > 0 ? (
          <div className={styles.documentList}>
            {documents.map((doc) => (
              <div key={doc.id} className={styles.documentItem}>
                <div className={styles.documentInfo} onClick={() => handleDocumentClick(doc)}>
                  <div className={styles.documentIcon}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <span className={styles.documentName}>{doc.name}</span>
                  <span className={styles.documentType}>{doc.type}</span>
                </div>
                <div className={styles.documentActions}>
                  <button 
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(doc.id, doc.name);
                    }}
                  >
                    <Download size={18} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(doc.id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noDocuments}>Tidak ada dokumen yang diunggah</div>
        )}
        {uploadStatus && (
          <div className={`${styles.notification} ${styles.uploadNotification}`}>
            {uploadStatus}
          </div>
        )}
      </div>
      <div className={styles.copyright}>
        <a href="https://daikuinterior.com" target="_blank" rel="noopener noreferrer">
          daikuinterior.com © {new Date().getFullYear()}
        </a>
      </div>
    </main>
  );
};

export default Form;
