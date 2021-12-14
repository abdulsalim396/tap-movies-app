import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header';
import Router from "./Router";

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Container className="mt-5">
          <Router />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
