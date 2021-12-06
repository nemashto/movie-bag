import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { MovieList } from './pages/MoviePages/MoviesList';
import { Header } from './common/components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieList />
    </div>
  );
}

export default App;
