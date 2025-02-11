import React, { useState } from "react";
import "./Subjects.css";
import BlueHeader from "./Blue_Header";
// import { FaPlay } from "react-icons/fa";

const Subjects = () => {
  const [activeSubject, setActiveSubject] = useState("Subject 01");

  const videos = [
    {
      title: "How Large Language Models Are Revolutionizing Machine Translation",
      category: "Finance",
      videoUrl: "https://www.example.com/video1", // Replace with actual video URL
    },
    {
      title: "How Large Language Models Are Revolutionizing Machine Translation",
      category: "Finance",
      videoUrl: "https://www.example.com/video2", // Replace with actual video URL
    },
    {
      title: "How Large Language Models Are Revolutionizing Machine Translation",
      category: "Finance",
      videoUrl: "https://www.example.com/video3", // Replace with actual video URL
    },
  ];

  return (
    <div>
        <BlueHeader />
    <div className="video-courses">
      {/* Page Title */}
      <h1 className="title">
        ‘Applying automated machine translation to educational video courses’
      </h1>

      {/* Subject Buttons */}
      <div className="subject-buttons">
        {["Subject 01", "Subject 02", "Subject 03"].map((subject) => (
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
          <div key={index}>
            <div
              className="video-player"
              onClick={() => window.open(video.videoUrl, "_blank")}
            >
              {/* <FaPlay className="play-icon" /> */}
            </div>
            <p
              className="video-caption"
              onClick={() => window.open(video.videoUrl, "_blank")}
            >
              "{video.title}"
            </p>
            <p className="video-category">{video.category}</p>
            <div className="divider"></div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Subjects;
