import React, { useState } from "react"
import { Router, Switch, Route, Link } from "react-router-dom"
import { createBrowserHistory } from "history"
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
  shutdown as shutdownIntercom
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

const UserForm = () => {
  const [email, setEmail] = useState(localStorage.email)
  const [loggedIn, setLoggedIn] = useState(!!email)

  // This is just an example, replace the name and created_at with real values!
  // You can add other user details too: https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects
  const handleLogin = async e => {
    e.preventDefault()
    // Fake login response from "server" with user data
    const user = await Promise.resolve({
      email,
      name: "Jane Doe",
      created_at: new Date().getTime() / 1000
    })
    bootIntercom(user)
    setLoggedIn(true)
    localStorage.email = user.email
  }

  const handleLogout = () => {
    shutdownIntercom()
    setLoggedIn(false)
    delete localStorage.email
    // Reboot Intercom in anonymous visitor mode
    bootIntercom()
  }

  return (
    <div className="App-userForm">
      {loggedIn ? (
        <div>
          Hi {email}! <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          Try logging in{" "}
          <span role="img" aria-label="point right">
            👉
          </span>
          <input onChange={e => setEmail(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

const history = createBrowserHistory()

history.listen(location => {
  // Calls Intercom('update') on every page change
  updateIntercom()
})

function App() {
  loadIntercom()
  bootIntercom({
    email: localStorage.email
  })

  return (
    <Router history={history}>
      <div className="App">
        <UserForm />

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
