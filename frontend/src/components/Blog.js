import './Blog.css';
import Header from './creamHeader';
import Footer from './Footer';
import LastContainer from './lastContainer';

const Blog = () => {
    return (
        <div>
            <Header />
            <div className="blog-container">
                <div className="blog-header">
                    <p className="blog-category">Blog</p>
                    <h1 className="blog-title">‘Technology Insights’</h1>
                </div>
                {/* Picture section */}
                <div className="blog-image-section">
                    <div className="blog-image-placeholder"></div>
                    <h5>Picture Caption</h5>
                    <hr />
                    <div className="blog-meta">
                        <span>date</span>
                        <span className="blog-share">Share</span>
                    </div>
                    <div className= "highlight-text">
                    "How Large Language Models Are Revolutionizing <br/> Machine Translation"
                    </div>
                </div>
                {/* Text */}
                <div className="blog-content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Eget cras risus ut consequat
                        neque. <br /> Malesuada tincidunt feugiat in arcu laoreet. Vel morbi pharetra
                        pharetra rutrum. <br /> Nulla adipiscing consectetur lectus condimentum
                        gravida. Id orci porta imperdiet <br /> id vivamus cras. Pellentesque viverra
                        a ante tortor. Mauris suscipit sed etiam eu <br /> id nunc egestas turpis.
                    </p>
                </div>

                <div className="read-next">
                    <h2>Read Next</h2>
                    <div className="next-blog">
                        <p className="next-blog-category">Blog</p>
                        <h3 className="next-blog-title">‘How It Works’</h3>
                        <p className="next-blog-description">
                            "Why Translating Educational Content into Urdu Matters"
                        </p>
                        <p>
                            Highlight the global push for accessible education and your
                            platform’s role in this movement.
                        </p>
                    </div>
                </div>
            </div>
            <LastContainer />
            < Footer />
        </div>
    );
};

export default Blog;