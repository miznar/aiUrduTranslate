import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate, useLocation } from "react-router-dom";
import BlueHeader from "./Blue_Header";
import "./LectureTranslation.css";

const LectureViewTranslation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transcripts, setTranscripts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyStates, setReplyStates] = useState({});
  
  const videoName = location.state?.videoName || "Default Video Name";
  const transcriptFile = "transcript02.xlsx";
  const videoSrc = location.state?.videoSrc || "";
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('access_token') || localStorage.getItem('token'); 
  const videoId= location.state?.videoId;


  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
  });

  // Fetch the video transcript when the component is mounted
useEffect(() => {
  if (!videoId) return;

  fetch(`http://127.0.0.1:8000/translations/${videoId}/`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const formatted = data.map((item) => ({
          english: item.sourceText,
          predicted_translation: item.translatedText,
        }));
        setTranscripts(formatted);
      } else {
        console.error("Unexpected response:", data);
      }
    })
    .catch((err) => console.error("Error fetching translations:", err));
}, [videoId]);

  // Fetch existing discussions when the component is mounted
    useEffect(() => {
      if (!videoId) return;

      fetch(`http://127.0.0.1:8000/get-discussions/?video_id=${videoId}`)
        .then((res) => res.json())
        .then((data) => {
          const formattedData = Array.isArray(data) ? data : [];
          setComments(formattedData);
        })
        .catch((err) => console.error("Error fetching discussions:", err));
    }, [videoId]);

  // Handle posting a new comment, including user email
  const handlePostComment = () => {
    if (!newComment.trim()) return;

    // Constructing the request payload
    const requestBody = {
      email: email,
      body: newComment,
      video_id: videoId, 
    };
    console.log("Sending:", requestBody);
    const headers = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;

        }
    fetch("http://127.0.0.1:8000/create-discussion/", {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    })
        .then(() => {
      setNewComment(""); // Clear input after success

      // Now fetch updated comments (no auth required for GET)
      fetch(`http://127.0.0.1:8000/get-discussions/?video_id=${videoId}`)
        .then((res) => res.json())
        .then((updatedComments) => setComments(updatedComments))
        .catch((err) => console.error("Error fetching updated comments:", err));
    })
    .catch((err) => console.error("Error posting comment:", err));
};

  // Handle reply change and state management for replies
  const handleReplyChange = (id, value) => {
    setReplyStates((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle posting a reply to a comment, including user email
  const handlePostReply = (commentId) => {
    const replyText = replyStates[commentId];
    if (!replyText || !replyText.trim()) return;

    const userEmail = localStorage.getItem("user_email"); // Retrieve user's email from localStorage or state

    fetch(`http://127.0.0.1:8000/reply-discussion/${commentId}/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ text: replyText, email: userEmail }), // Include email in the reply payload
    })
      .then((res) => res.json())
      .then((reply) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...(comment.replies || []), reply] }
              : comment
          )
        );
        setReplyStates((prev) => ({ ...prev, [commentId]: "" }));
      })
      .catch((err) => console.error("Error posting reply:", err));
  };

  // Handle liking a comment
  const handleLikeComment = (commentId) => {
    fetch(`http://127.0.0.1:8000/like-discussion/${commentId}/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, likes: data.likes } : comment
          )
        );
      })
      .catch((err) => console.error("Error liking comment:", err));
  };

  return (
    <div>
      <BlueHeader />
      <div className="translation-view">
        <div className="navigation-bar">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
          <span className="uploaded-video-name">{videoName}</span>
        </div>

        <div className="translation-video-container">
          <video className="translation-video-player" controls>
             <source src={`http://localhost:8000${videoSrc}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-title">{videoName}</p>
        </div>

        <h2 className="title">Translation View</h2>

        <div className="new-box-container">
          <div className="box">Original Text</div>
          <div className="box">Translated Text</div>
        </div>

        <div className="translation-container">
          <div className="column original-text">
            {transcripts?.map((entry, index) => {
              const englishSentences = entry.english?.split('.').filter(s => s.trim() !== '') || [];
              return englishSentences.map((sentence, i) => (
                <React.Fragment key={`eng-${index}-${i}`}>
                  <p>{sentence.trim()}.</p>
                  <div className="separator-line"></div>
                </React.Fragment>
              ));
            })}
          </div>

          <div className="column translated-text">
            {transcripts?.map((entry, index) => {
              const urduSentences =entry.predicted_translation?.split('۔').filter(s => s.trim() !== '') || [];
              return urduSentences.map((sentence, i) => (
                <React.Fragment key={`urdu-${index}-${i}`}>
                  <p>{sentence.trim()}.</p>
                  <div className="separator-line"></div>
                </React.Fragment>
              ));
            })}
          </div>
        </div>



        {/* Discussion Section */}
        <div class="discussion-wrapper">
        <div className="discussion-section">

          <h2 className="title">Discussion</h2>

          <div className="discussion-input">
            <textarea
              className="discussion-textarea"
              placeholder="Write a comment..."
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="post-button" onClick={handlePostComment}>
              Post
            </button>
          </div>

          <div className="discussion-list">
            {(comments || []).map((comment) => (
              <div key={comment.id} className="discussion-comment">
                <p className="comment-author">
                  {comment.author} • <span className="comment-time">{comment.time}</span>
                </p>
                <p className="comment-body">{comment.body}</p>

                <div className="like-button-section">
                  <button
                    className="post-button"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                     Like ({comment.likes})
                  </button>
                </div>

                {(comment.replies || []).map((reply) => (
                  <div key={reply.id} className="reply-box">
                    <p className="comment-author">
                      {reply.author} • <span className="comment-time">{reply.time}</span>
                    </p>
                    <p className="comment-body">{reply.text}</p>
                  </div>
                ))}

                <div className="reply-input-section">
                  <textarea
                    className="discussion-textarea reply-textarea"
                    placeholder="Write a reply..."
                    rows="2"
                    value={replyStates[comment.id] || ""}
                    onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                  ></textarea>
                  <button className="post-button" onClick={() => handlePostReply(comment.id)}>
                    Reply
                  </button>
                </div>
              </div>
            ))}
  </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureViewTranslation;
