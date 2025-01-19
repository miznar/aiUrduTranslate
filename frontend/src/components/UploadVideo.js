import React, { useState } from 'react';
import Header from './creamHeader';
import Footer2 from './Footer2';
import './UploadVideo.css';

const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [transcript, setTranscript] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProgress(0);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
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
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('http://127.0.0.1:8000/upload/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Response data:", data);  // Log the response data
                    if (data.transcript) {
                        setTranscript(data.transcript);
                        alert('File uploaded and transcript generated successfully!');
                    } else {
                        alert('No transcript found. Please check the video file.');
                    }
                } else {
                    alert('Failed to upload file. Please try again.');
                }
            } catch (error) {
                console.error('Error during upload:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('Please select a file first!');
        }
    };

    return (
        <div>
            <Header />
            <div className="upload-page">
                <aside className="sidebar">
                    <ul>
                        <li><a href="faq">FAQs</a></li>
                        <li><a href="about">About Us</a></li>
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
                        className="upload-box"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <p>{selectedFile ? selectedFile.name : 'Drag or Drop your video here'}</p>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <button
                        className="translate-button"
                        onClick={handleUpload}
                    >
                        Translate Now
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
