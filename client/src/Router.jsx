import { Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import MovieDetails from "./pages/MovieDetails";

const Router = () => {
    return (
        <Switch>
            <Route path="/add-movie">
                <AddMovie />
            </Route>
            <Route path="/movie/:movieId">
                <MovieDetails />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            <Home />
        </Switch>
    )
}

export default Router
