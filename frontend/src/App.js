import './App.css';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import Blog from './components/Blog';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
    </div>
  );
}

export default App;


