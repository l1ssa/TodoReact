import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import About from './pages/about/About';
import Todos from './pages/todos/Todos';
import Rate from './pages/rate/Rate';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/about" element={<About />} />
        <Route path="/rate" element={<Rate />} />
      </Routes>
    </Router>
  );
}

export default App;


