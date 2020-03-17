import React from 'react';
import { Router, Link } from "@reach/router"
import './App.css';

const Home = () => {
  return <>
    <header className="App-header">
      React with Intercom!
    </header>

    <p>
      For more, visit our <a href="https://developers.intercom.com/installing-intercom/docs/intercom-javascript">documentation</a> or reach us using the Messenger at <a href="www.intercom.com">www.intercom.com</a>
    </p>
  </>
}

const About = () => {
  return <>
    <header className="App-header">
      Example about page
    </header>

    <p>
      See <code>App.js</code> to see how to hook into routing to send updates to
      Intercom on page changes.
    </p>
  </>
}

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        Try changing pages <span role="img" aria-label="point right">👉</span>
        <Link to="/">Home</Link> |{" "}
        <Link to="about">About</Link>
      </nav>
      <Router>
        <Home path="/" />
        <About path="about" />
      </Router>
    </div>
  );
}

export default App;
