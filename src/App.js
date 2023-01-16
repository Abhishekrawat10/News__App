import "./App.css";
import React,{useState} from "react";
import Navbar from "./components/Navbar"
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const apiKey = process.env.REACT_APP_newsapp 
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar
          />
            <LoadingBar
              color='#f11946'
              progress={progress}
            />
          <Routes>
            <Route exact path="/newsapp" element={<News apiKey={apiKey} setProgress={setProgress} key="1" pageSize={10} country="in" category="General" />} />
            <Route exact path="/home" element={<News apiKey={apiKey} setProgress={setProgress} key="0" pageSize={10} country="in" category="General" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="Sports" pageSize={10} country="in" category="Sports" />} />
            <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="2" pageSize={10} country="in" category="General" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="Science" pageSize={10} country="in" category="Science" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={10} country="in" category="Entertainment" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="Business" pageSize={10} country="in" category="Business" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="Technology" pageSize={10} country="in" category="Technology" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="Health" pageSize={10} country="in" category="Health" />} />
          </Routes>
        </Router>
      </div>
    )
}

export default App