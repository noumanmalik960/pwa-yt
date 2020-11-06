import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Users from './Users'
import NotFound from './NotFound'


function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href=".">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/about">About</Link>
          <Link className="link" to="/users">Users</Link>
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
