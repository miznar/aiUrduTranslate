import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectsPage.css";
import BlueHeader from "./Blue_Header";
import Footer from "./Footer";

const Subjects = () => {
  const [activeSubject, setActiveSubject] = useState("Banking");
  const navigate = useNavigate();

  const videos = [
    {
      title: "Banking Awareness Lecture - Module 1",
      src: "/videos/lecture02.mp4",
      category: "Finance",
      transcriptFile: "transcript02.xlsx",
    },
    {
      title: "Financial System and Banks | Banking Awareness ",
      src: "/videos/lecture03.mp4",
      category: "Finance",
      transcriptFile: "transcript03.xlsx",
    },
  ];

  const handleVideoClick = (video) => {
    navigate("/view-translation", { state: { videoName: video.title, transcriptFile: video.transcriptFile, videoSrc: video.src  } });
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
          {["Banking", "Law", "Agriculture"].map((subject) => (
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
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="video-caption">"{video.title}"</p>
              <p className="video-category">{video.category}</p>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Subjects;
