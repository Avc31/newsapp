import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LatestNews from './components/LatestNews';
import WeatherBar from './components/WeatherBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 6;
  const latestpageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  return (
    <div className='container-fluid'>
      <Router>
      <NavBar />
      <div className='row'>
        <div className='col-md-3'>
          
            
            <Routes>
              <Route path="/" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="general" latestpageSize={latestpageSize} country="us" category="general" />} />
              <Route path="/business" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="business" latestpageSize={latestpageSize} country="us" category="business" />} />
              <Route path="/entertainment" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={latestpageSize} country="us" category="entertainment" />} />
              <Route path="/general" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="general" latestpageSize={latestpageSize} country="us" category="general" />} />
              <Route path="/health" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="health" latestpageSize={latestpageSize} country="us" category="health" />} />
              <Route path="/science" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="science" latestpageSize={latestpageSize} country="us" category="science" />} />
              <Route path="/sports" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="sports" latestpageSize={latestpageSize} country="us" category="sports" />} />
              <Route path="/technology" element={<LatestNews setProgress={setProgress} apiKey={apiKey} key="technology" latestpageSize={latestpageSize} country="us" category="technology" />} />
            </Routes>
          
        </div>
        <div className='col-md-7'>
          
            <Routes>
              <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
              <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
              <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
              <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
              <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
              <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
              <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
              <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
            </Routes>
          
        </div>
        <div className='col-md-2'>
          <WeatherBar />
        </div>
      </div>
      <Footer />
      </Router>
    </div>
  )

}

export default App;