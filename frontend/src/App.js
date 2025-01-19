import './App.css';
import {Route, Routes} from 'react-router-dom'
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
import Unregister_User from './components/unregister_User';
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Userdashboard" element={<Userdashboard />} />
          <Route path="/AccountSetting" element={<AccountSetting/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/query" element={<Query />} />
          <Route path="/LearnerHeader" element={<LearnerHeader/>} />
          <Route path="/uploadvideo" element={<UploadVideo />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/footer2" element={<Footer2 />} />
          <Route path="/privacypage" element={<PrivacyPage />} />
          <Route path="/service" element={<Services />} />
          <Route path="/completeUser" element={<CompleteProfile />} />
          <Route path="/unregisterUser" element={<Unregister_User />} />
        </Routes>
    </div>
  );
}
export default App;