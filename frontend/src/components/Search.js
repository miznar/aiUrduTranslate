import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.css';
import Header from './creamHeader';
import Footer from './Footer';
import LastContainer from './lastContainer';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [blogs, setBlogs] = useState([]);
    const [learnerStory, setLearnerStory] = useState(null);
    const [counts, setCounts] = useState({ blogs: 0, learner_stories: 0, subjects: 0 });
   const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/search-content/')  
            .then(res => {
                setBlogs(res.data.blogs);
                setLearnerStory(res.data.learner_story);
                setCounts(res.data.counts);

            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="search-page">
            <Header />
            <div className="search-container">
                            <div className="aligned-content">
                            <h1 className="search-heading">Search</h1>
                            <p className="search-description">
                                Search for translations, courses, resources, and more...
                            </p>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="What can we help you find?"
                                    className="search-input"
                                />
                            </div>
                </div>


                <div className="page-container">
                    <div className="filter-container">
                        <h3>Filter by:</h3>
                        <h4>Type:</h4>
                        <ul className="filter-list">
                            <li><span className="filter-label">Blog</span><span className="filter-count">{counts.blogs.toString().padStart(2, '0')}</span></li>
                            <li><span className="filter-label1">Learner Story</span><span className="filter-count">{counts.learner_stories.toString().padStart(2, '0')}</span></li>
                            <li><span className="filter-label2">Subjects</span><span className="filter-count">{counts.subjects.toString().padStart(2, '0')}</span></li>
                        </ul>

                    </div>
                            <div className="blogsaligned-content">

                    <div className="blog-section">
                        <h4>Blogs</h4>
                       {blogs.map((blog, index) => (
                                <div
                                    key={index}
                                    className="blog-item"
                                    onClick={() => navigate('/blog', {
                                        state: {
                                            title: blog.title,
                                            oneLiner: blog.oneLinerHeader,
                                            content: blog.mainContent,
                                            date: blog.date || "May 2025", // optional
                                            image: blog.image || "" // optional if you want to support pictures
                                        }
                                    })}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>Blog</h3>
                                    <h2>{blog.title}</h2>
                                    <p>{blog.oneLinerHeader}</p>
                                    <p>{blog.mainContent.split('. ')[0]}.</p>
                                    <hr className="separator" />
                                </div>
                            ))}


                        {learnerStory && (
                            <div className="blog-item">
                                <h3>Learner Story</h3>
                                <p>{learnerStory.story.split('. ')[0]}.</p>
                                <hr className="separator" />
                            </div>
                        )}

                    </div>
                    </div>

                </div>
            </div>
            <LastContainer />
            <Footer />
        </div>
    );
};

export default Search;
