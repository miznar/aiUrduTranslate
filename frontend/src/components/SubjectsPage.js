import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SubjectsPage.css";
import BlueHeader from "./Blue_Header";
import Footer from "./Footer";
import LastContainer from './lastContainer';

const Subjects = () => {
  const [activeSubject, setActiveSubject] = useState("Banking");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch videos based on selected subject
    axios.get(`http://127.0.0.1:8000/videos/${activeSubject}/`)
      .then(res => setVideos(res.data))
      .catch(err => console.error("Error fetching videos:", err));
  }, [activeSubject]);

  const handleVideoClick = (video) => {
    navigate("/view-translation", { 
      state: { 
        videoName: video.title, 
        transcriptFile: video.transcriptFile, 
        videoSrc: video.src 
      } 
    });
  };

  return (
    <div style={{ backgroundColor: "#061F2F", minHeight: "100vh" }}>
      <BlueHeader />
      <div className="video-courses">
        <h1 className="title">
          ‘Applying automated machine translation to educational video courses’
        </h1>

        {/* Subject Buttons */}
        <div className="subject-buttons">
          {["Banking", "Law", "Agriculture", "General"].map((subject) => (
            <button
              key={subject}
              className={`subject-button ${activeSubject === subject ? "active" : ""}`}
              onClick={() => setActiveSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Videos */}
        <div className="video-container">
          {videos.map((video, index) => (
            <div key={index} onClick={() => handleVideoClick(video)}>
              <video className="video-player" width="320" height="180" controls>
              <source src={`http://localhost:8000${video.src}`} type="video/mp4" />

                Your browser does not support the video tag.
              </video>

              <p className="video-caption">"{video.title}"</p>
              <p className="video-category">{video.category}</p>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      </div>
      <LastContainer />
      <Footer />
    </div>
  );
};

export default Subjects;
