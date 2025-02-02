import React from "react";
import "./ViewTranslation.css";
import BlueHeader from "./Blue_Header";
// import { FaPlay } from "react-icons/fa";

const ViewTranslation = () => {
  return (
    <div>
      <BlueHeader />
      <div className="translation-view">
        {/* Header Section */}
        <header className="view-header">
          <span className="back-arrow">←</span> [uploaded video] Name
        </header>

        <h2 className="title">Translation View</h2>

        {/* Translation Container */}
        <div className="translation-container">
          {/* Original Text Column */}
          <div className="column original-text">
            <h3>Original Text</h3>
            <p>
              Financial literacy is the ability to understand and effectively
              use various financial skills, including personal financial
              management, budgeting, and investing.
            </p>
            <p>
              A budget helps you track your expenses and save for future
              financial goals.
            </p>
            <p>
              Investing early allows your money to grow through the power of
              compound interest.
            </p>
            <p>Always diversify your investments to reduce financial risks.</p>
            <p>
              Saving a portion of your income consistently builds long-term
              financial security.
            </p>
          </div>

          {/* Translated Text Column */}
          <div className="column translated-text">
            <h3>Translated Text</h3>
            <p>
              مالی خواندگی مختلف مالی مہارتوں کو سمجھنے، اور مؤثر طریقے سے
              استعمال کرنے کی صلاحیت ہے، جس میں ذاتی مالی انتظام، بچت سازی،
              اور سرمایہ کاری شامل ہیں۔
            </p>
            <p>"جلد سرمایہ کاری کرنے سے آپ کا پیسہ مرکب سود کے ذریعے بڑھتا ہے۔"</p>
            <p>
              "بجٹ آپ کو اپنے اخراجات کا جائزہ لینے اور مستقبل کے مالی اہداف
              کے لیے بچت کرنے میں مدد دیتا ہے۔"
            </p>
            <p>
              "ہمیشہ اپنے سرمایہ کاریوں کو متنوع بنائیں تاکہ مالی خطرات کو کم
              کیا جا سکے۔"
            </p>
            <p>"اپنی آمدنی کا ایک حصہ مسلسل بچانا طویل مدتی مالی تحفظ پیدا کرتا ہے۔"</p>
          </div>

          {/* Lip Sync Column */}
          <div className="column lip-sync">
            <h3>Lip Sync</h3>
            <div className="video-player">
              {/* <FaPlay className="play-icon" /> */}
              <span className="video-timestamp">00:00 / 00:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTranslation;
