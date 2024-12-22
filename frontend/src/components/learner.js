import './learner.css';
import './Search.css';
import Header from './creamHeader';
import Footer from './Footer';
import LastContainer from './lastContainer';

const Learner = () => {
    return (
        <div className="learner-page">
            <Header />
            {/* Search Section */}
            <div className="search-container">
                <h1 className="search-heading">Search</h1>
                <p className="search-description">
                    Search for translations, courses, resources, and more...
                </p>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="What can we help you find?"
                        className="search-input"
                    />
                </div>


                {/* Filter Section */}
                <div className="page-container">
                <div className="filter-container">
                    <h3>Learner Name:</h3>
                    <h4>Type:</h4>
                    <ul className="filter-list">
                        <li>
                            <span className="filter-label">Profile</span>
                        </li>
                        <li>
                            <span className="filter-label1">Account</span>
                        </li>
                    </ul>
                </div>

                {/* Blog Section */}
                <div className="blog-section">
                    <h4>Blogs</h4>
                    <div className="blog-item">
                        <h3>Blog</h3>
                        <h2>‘Technology Insights’</h2>
                        <p>"How Large Language Models Are Revolutionizing Machine Translation"</p>
                        <p1>Educate readers about the tech behind your platform in a simple, relatable way.</p1>
                    </div>
                    <hr />
                    <div className="blog-item">
                        <h3>Blog</h3>
                        <h2-1>‘How It Works’</h2-1>
                        <p>"Why Translating Educational Content into Urdu Matters"</p>
                        <p2>Highlight the global push for accessible education and your platform's role in this movement.</p2>
                    </div>
                    <hr />
                    <div className="blog-item">
                        <h3>Blog</h3>
                        <h2>‘Technology Insights’</h2>
                        <p>"How AI Powers Accurate English-Urdu Translations for Educational Videos"</p>
                        <p3>Explain the technology, algorithms, and human-AI collaboration that make your platform unique.</p3>
                    </div>
                </div>
                </div>
            </div>
            <LastContainer />
            <Footer />
        </div>
    );
}
export default Learner;