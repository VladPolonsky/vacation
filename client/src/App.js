import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { BrowserRouter as Router } from 'react-router-dom'


export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  )
}
