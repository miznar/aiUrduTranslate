import './App.css';
import {Route, Routes,route} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/search" element={<Search />} />
        </Routes>
    </div>
  );
}

export default App;


