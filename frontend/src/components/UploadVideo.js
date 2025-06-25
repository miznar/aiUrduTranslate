import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './creamHeader';
import Footer2 from './Footer2';
import './UploadVideo.css';
import axios from './axios';
import ProcessingPopup from './ProcessingPopup';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProgress(0);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a video file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    formData.append('email', email); 
    try {
      setLoading(true);
      const response = await axios.post('/generate-transcript/', formData, {
        headers: { 'Authorization': `Token ${token}` },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });
      localStorage.setItem('transcriptData', JSON.stringify(response.data));
      navigate('/view-translation');
      setTranscript(response.data.transcript || 'No transcript available.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  // useEffect for handling drag and drop events
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        setProgress(0);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount/unmount

  return (
    <div>
      <Header />
      <div className="upload-page">
        <aside className="upload-sidebar">
          <ul>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </aside>
        <main className="upload-content">
          <h1>Upload Video for Translation</h1>
          <p>Drag and Drop your file here, or click to upload</p>
          <input
            type="file"
            accept="video/mp4"
            style={{ display: 'none' }}
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="upload-button">
            {selectedFile ? selectedFile.name : 'Upload Video'}
          </label>
          <p><small>Supported formats: MP4 | Max size: 10 MB.</small></p>
          <div
            className={`upload-box ${isDragging ? 'dragging' : ''}`}
          >
            <p>{selectedFile ? selectedFile.name : 'Drag or Drop your video here'}</p>
          </div>
          {progress > 0 && (
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button className="translate-button" onClick={handleUpload} disabled={loading}>
            {loading ? 'Processing...' : 'Translate Now'}
          </button>
        </main>
      </div>

      {/* 🟡 Show popup while loading */}
      {loading && <ProcessingPopup />}

      <Footer2 />
    </div>
  );
};

export default UploadVideo;
