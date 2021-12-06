import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { MovieList } from './pages/MoviePages/MoviesList';
import { Header } from './common/components/header';
import { Footer } from './common/components/footer';
import { Route, Switch } from 'react-router';
import { AddMovie } from './pages/MoviePages/AddMovie';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <Switch>
          <Route exact path={["/", "/movies"]} component={MovieList} />
          <Route exact path="/movies/add" component={AddMovie} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
