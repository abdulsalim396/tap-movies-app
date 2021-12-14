import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'>
            <Spinner variant='primary' animation='border' />
        </div>
    )
}

export default Loader
