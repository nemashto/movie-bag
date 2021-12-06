import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { MovieList } from './pages/MoviePages/MoviesList';
import { Header } from './common/components/header';
import { Footer } from './common/components/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
