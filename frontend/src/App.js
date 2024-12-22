import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import Blog from './components/Blog';
import Signup from './components/Signup';
import Signup2 from './components/Signup-pg2';
import Login from './components/Login';
import Learner from './components/learner';
import LearnerHeader from './components/LearnerHeader';
import Userdashboard from './components/Userdashboard';
import AccountSetting from './components/AccountSetting';

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
          <Route path="/learner" element={<Learner />} />
          <Route path="/LearnerHeader" element={<LearnerHeader />} />
          <Route path="/Userdashboard" element={<Userdashboard />} />
          <Route path="/AccountSetting" element={<AccountSetting />} />

        </Routes>
    </div>
  );
}

export default App;


