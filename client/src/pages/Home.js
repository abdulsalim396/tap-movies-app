import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Card, Button } from 'react-bootstrap';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const Home = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`)
            setMovies(response?.data);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    }

    const viewMovie = (movieId) => {
        history.push(`/movie/${movieId}`)
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}
            <SearchBar searchText={searchText} setSearchText={setSearchText} onClickSearch={fetchMovies} />
            {loading ? (
                <Loader />
            ) : (
                <div className='mt-5 d-flex justify-content-center flex-wrap'>
                    {
                        movies.map((movie) => (
                            <Card className='movie-card bg-dark text-white m-3' key={movie.id}>
                                <Card.Header>
                                    <h5>{movie.title}</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Img className='card-image' src={movie.poster} alt={movie.title} />
                                    <Card.Text>Askjhfbdj MSdhvbas shshsh shhshshauu eheh</Card.Text>
                                    <Card.Text>Rating : {movie.rating}</Card.Text>
                                    <Button variant="info" onClick={() => viewMovie(movie.id)}>View Movie</Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            )}
        </>
    )
}

export default Home
