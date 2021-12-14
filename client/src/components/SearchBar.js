import { Form, Button } from 'react-bootstrap'

const SearchBar = ({ setSearchText, onClickSearch, searchText }) => {

    const onKeyPress = (event) => {
        if(event.charCode === 13) {
            onClickSearch()
        }
    }

    return (
        <div className='d-flex'>
            <Form.Control className='ms-3' type="text" placeholder="Search for movies..." value={searchText} onKeyPress={onKeyPress} onChange={(event) => setSearchText(event.target.value)} />
            <Button className='ms-2' variant="primary" onClick={onClickSearch} >Search</Button>
            <Button variant="warning" className='ms-2' onClick={onClickSearch}>Refresh</Button>
        </div>
    )
}

export default SearchBar
