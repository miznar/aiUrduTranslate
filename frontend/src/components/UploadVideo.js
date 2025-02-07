import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './creamHeader';
import Footer2 from './Footer2';
import './UploadVideo.css';
import axios from './axios';

const UploadVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state for better user experience

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProgress(0);
    }
  };

  const handleDragEvents = (event, isDragActive) => {
    event.preventDefault();
    setIsDragging(isDragActive);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);  // Show loading indicator
      const response = await axios.post('/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      setTranscript(response.data.transcript || 'No transcript available.');
      alert(response.data.message || 'File uploaded and processed successfully!');
    } catch (error) {
      console.error(error);
      alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <Header />
      <div className="upload-page">
        <aside className="sidebar">
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
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
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
          {transcript && (
            <div className="transcript-container">
              <h2>Generated Transcript:</h2>
              <p>{transcript}</p>
            </div>
          )}
        </main>
      </div>
      <Footer2 />
    </div>
  );
};

export default UploadVideo;
