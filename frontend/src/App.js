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
import question  from './components/Questions';
import Question from './components/Questions';
import AccountSetting from './components/AccountSetting';
import Query from './components/Query';
import Contact from './components/Contact-us';
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
          <Route path="/Contact-us" element={<Contact />} />
          <Route path="/Questions" element={<Question />} />
          <Route path="/query" element={<Query />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </div>
  );
}
export default App;