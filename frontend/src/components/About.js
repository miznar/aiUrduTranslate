import './About.css';
import Header from './Header';
import Footer from './Footer';
import LastContainer from './lastContainer';

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-us">
        <h1 className="main-heading">About Us</h1>
        <p className="tagline">
          "Connecting Knowledge, Cultures, and Communities Through Language."
        </p>

        {/* image boxes */}
        <div className="image-container">
          <div className="image-box">
            <img src="/trans.png" alt="Translation" />
          </div>
          <div className="image-box"></div>
          <div className="image-box"></div>
        </div>

        {/* Headings and text */}
        <div className="content-container">
          <div className="section white-box">
            <h2 className="section-heading">Who We Are?</h2>
            <p className="section-text">
              "We’re dreamers, doers, and problem-solvers.
              <strong> Our mission?</strong> To ensure that language is no longer a barrier to education. By translating English educational content into Urdu, we’re opening doors for millions of learners to connect with world-class knowledge, wherever they are."
            </p>
          </div>

          <div className="section white-box">
            <h2 className="section-heading">Our Why</h2>
            <p className="section-text">
              <strong>Why did we start this journey? </strong>
              Because we believe every learner, regardless of language or location, deserves access to the same opportunities.
              Because education is not just information—it's empowerment, and no one should be left behind."
            </p>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="about-page">
        <div className="video-container">
          <div className="video-placeholder">here comes the video</div>
        </div>

        <div className="text-section">
          <p className="text">
            "Imagine a world where learning has no boundaries—where a student in
            Karachi can absorb a lecture from MIT as easily as a student in
            Boston. That’s the future we’re building."
          </p>
        </div>

        <div>
          <section className="what-sets-us-apart">
            <h2>What Sets Us Apart?</h2>
            <div className="apart-item">
              <h3>1. Precision, Not Just Translation</h3>
              <p>"Our AI understands context, nuance, and the art of teaching—not just words."</p>
            </div>

            <div className="apart-item">
              <h3>2. Learning Tailored to You</h3>
              <p>"We customize translations for academic needs, ensuring relevance and clarity."</p>
            </div>

            <div className="apart-item">
              <h3>3. Empowering Diversity</h3>
              <p>"Celebrating cultures by making global education accessible to Urdu speakers."</p>
            </div>
          </section>
        </div>

        <div className="voices-container">
      <h2>Voices Behind the Vision</h2>
      <div className="quotes-section">

      <div className="quote-item">
          <p>everybody’s one line quote</p>
          <div className="picture-placeholder">EVERYONE'S PICTURE</div>
        </div>

        <div className="quote-item">
          <p>everybody’s one line quote</p>
          <div className="picture-placeholder">EVERYONE'S PICTURE</div>
        </div>

        <div className="quote-item">
          <p>everybody’s one line quote</p>
          <div className="picture-placeholder">EVERYONE'S PICTURE</div>
        </div>

        <div className="quote-item">
          <p>everybody’s one line quote</p>
          <div className="picture-placeholder">EVERYONE'S PICTURE</div>
        </div>
      </div>
      
      <div className="education-section">
        <h3>What Drives You?</h3>
        <textarea
          placeholder="What does education mean to you?"
          className="education-textarea"
        ></textarea>
      </div>
    </div>


      </div>
      <LastContainer />
      <Footer />
    </div>
  );
};

export default About;
