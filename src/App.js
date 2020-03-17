import React from "react"
import { Router, Switch, Route, Link } from "react-router-dom"
import { createBrowserHistory } from "history"
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom
} from "./intercom"
import "./App.css"

const Home = () => {
  return (
    <>
      <header className="App-header">React with Intercom!</header>

      <p>
        For more, visit our{" "}
        <a href="https://developers.intercom.com/installing-intercom/docs/basic-javascript#section-single-page-app">
          documentation
        </a>{" "}
        or reach us using the Messenger at{" "}
        <a href="www.intercom.com">www.intercom.com</a>
      </p>
    </>
  )
}

const About = () => {
  return (
    <>
      <header className="App-header">Example About</header>

      <p>
        See <code>App.js</code> to see how to hook into routing to send updates
        to Intercom on page changes.
      </p>
    </>
  )
}

const history = createBrowserHistory()

history.listen(location => {
  // Calls Intercom('update') on every page change
  updateIntercom()
})

function App() {
  loadIntercom()
  bootIntercom()

  return (
    <Router history={history}>
      <div className="App">
        <nav className="App-nav">
          Try changing pages{" "}
          <span role="img" aria-label="point right">
            👉
          </span>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
