import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddMovie = () => {
    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(false);
    const history = useHistory();

    const onChangeFormField = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: name === 'movieRating' ? Number(value) : value,
        })
    }

    const onClickSubmit = async () => {
        console.log("formValues", formValues)
        try {
            await axios({
                url: "http://localhost:4000/api/movies",
                method: 'POST',
                data: formValues,
            });
            history.push('/');
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Card>
                <Card.Header>
                    <h4>Add movie</h4>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" placeholder="Movie Title" name="title" onChange={onChangeFormField} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rating">
                            <Form.Label>Movie Rating</Form.Label>
                            <Form.Control type="number" placeholder="Movie Rating" name="rating" onChange={onChangeFormField} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="poster">
                            <Form.Label>Movie Poster</Form.Label>
                            <Form.Control type="text" placeholder="Movie Poster" name="poster" onChange={onChangeFormField} />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={() => onClickSubmit()}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddMovie
