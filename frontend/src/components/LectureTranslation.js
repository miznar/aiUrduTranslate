import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate, useLocation } from "react-router-dom";
import BlueHeader from "./Blue_Header";
import "./LectureTranslation.css";
const LectureViewTranslation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transcripts, setTranscripts] = useState([]);

  // Get the passed video title and transcript file name
  const videoName = location.state?.videoName || "iDefault Video Name";
  const transcriptFile = location.state?.transcriptFile || "default.xlsx"; // Default file if not provided
  const videoSrc = location.state?.videoSrc || ""; 
  useEffect(() => {
    fetch(`/${transcriptFile}`)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setTranscripts(jsonData);
      })
      .catch((err) => console.error("Error reading Excel file:", err));
  }, [transcriptFile]); // Refetch if transcriptFile changes

  return (
    <div>
      <BlueHeader />
      <div className="translation-view">
        {/* Back Navigation */}
        <div className="navigation-bar">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
          <span className="uploaded-video-name">{videoName}</span>
        </div>
        <div className="translation-video-container">
          <video className="translation-video-player" controls>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-title">{videoName}</p>
        </div>

        <h2 className="title">Translation View</h2>

        {/* Columns Headers */}
        <div className="new-box-container">
          <div className="box">Original Text</div>
          <div className="box">Translated Text</div>
        </div>

        {/* Display Translations */}
        <div className="translation-container">
          <div className="column original-text">
            {transcripts.map((entry, index) => (
              <React.Fragment key={index}>
                <p>{entry.english}</p>
                <div className="separator-line"></div>
              </React.Fragment>
            ))}
          </div>
          <div className="column translated-text">
            {transcripts.map((entry, index) => (
              <React.Fragment key={index}>
                <p>{entry.predicted_translation}</p>
                <div className="separator-line"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureViewTranslation;
