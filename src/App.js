import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Category from './Pages/Category';
import People from './Pages/People';
import Person from './Pages/Person';
import Error from './Pages/Error';
import MovieDetails from './Pages/MovieDetails';
import SearchList from './Pages/SearchList';
import CastList from './Pages/CastList';

function App() {
  return (
    <Router>
      <Navbar />
      <Modal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='categories' element={<Categories />} />
        <Route path='category/:id' element={<Category />} />
        <Route path='movie/:id' element={<MovieDetails />} />
        <Route path='people' element={<People />} />
        <Route path='person/:id' element={<Person />} />
        <Route path='searchlist' element={<SearchList />} />
        <Route path='castlist/:id' element={<CastList />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
