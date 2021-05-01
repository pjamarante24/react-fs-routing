import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const modules = require.context('./', true, /\/pages\/((?!test).)*\.js$/)

const routes = modules.keys().reduce((prev, key) => {
  const component = modules(key).default

  const path = key
    .replace(/^(.\/pages)(\/.*)(\.js)$/, '$2')
    .replace('index', '')
    .replace(/(\[)(.*)(\])/, ':$2')

  prev.push({ path, component })

  return prev
}, [])

function Root() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
