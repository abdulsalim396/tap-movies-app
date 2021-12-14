import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Alert, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment'

import Loader from '../components/Loader';

const MovieDetails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});

    const { movieId } = useParams();

    const fetchMovieDetails = async () => {
        try {
            setError(null)
            setLoading(true)
            const response = await axios({
                method: 'GET',
                url: `http://localhost:4000/api/movies/${movieId}`
            })
            setLoading(false)
            setDetails(response?.data?.movie)
            console.log(response)
        } catch(e) {
            setError(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovieDetails();
    }, [])


    return (
        <div className='d-flex justify-content-center'>
            {error &&<Alert variant='danger'>{error}</Alert>}
            {loading ? (
                <Loader />
            ): (
                <Card className='details-card bg-dark text-white my-5'>
                    <Card.Header>
                        <h5>{details.title}</h5>
                    </Card.Header>
                    <Card.Body>
                        <Image className='img-fluid details-image my-2' src={details.poster} alt='movie poster' />
                        <Card.Text>Rating : <strong>{details.rating?.toFixed(2)}</strong></Card.Text>
                        <p>Created at : {moment(details.createdAt).format('DD-MM-YY HH:MM:SS A')}</p>
                        <p>Updated at : {moment(details.updatedAt).format('DD-MM-YY HH:MM:SS A')}</p>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}

export default MovieDetails
