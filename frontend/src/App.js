import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import Blog from './components/Blog';
import Signup from './components/Signup';
import Signup2 from './components/Signup-pg2';
import Login from './components/Login';
import Userdashboard from './components/Userdashboard';
import Contact from './components/Contact-us';
import Query from './components/Query';
import AccountSetting from './components/AccountSetting';
import LearnerHeader from './components/Learner';
import UploadVideo from './components/UploadVideo';
import FAQ from './components/FAQ';
import Footer2 from './components/Footer2';
import PrivacyPage from './components/PrivacyPage';
import Services from './components/Services';
import CompleteProfile from './components/complete_User';
// import ViewTranslation from './components/ViewTranslation';
// eslint-disable-next-line 
import UnregisterUser from './components/unregister_User';
import LectureViewTranslation from './components/LectureTranslation';
import Subjects from './components/SubjectsPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CornerNavigation from "./components/CornerNavigation";
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId="1023365653776-fq5i85u1cgk3rgif49de5lpkakamirhn.apps.googleusercontent.com">
     
        <div className="App">
          <Routes>
            <Route path="/" element={<UnregisterUser />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup2" element={<Signup2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userdashboard" element={<Userdashboard />} />
            <Route path="/accountsetting" element={<AccountSetting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/query" element={<Query />} />
            <Route path="/learnerheader" element={<LearnerHeader />} />
            <Route path="/uploadvideo" element={<UploadVideo />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/footer2" element={<Footer2 />} />
            <Route path="/privacypage" element={<PrivacyPage />} />
            <Route path="/service" element={<Services />} />
            <Route path="/completeUser" element={<CompleteProfile />} />
            <Route path="/unregisterUser" element={<UnregisterUser />} />
            {/* <Route path="/viewtranslation" element={<ViewTranslation />} /> */}
            <Route path="/view-translation" element={<LectureViewTranslation />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/corner-navigation" element={<CornerNavigation />} />
          </Routes>
        </div>
  
    </GoogleOAuthProvider>
  );
}

export default App;
