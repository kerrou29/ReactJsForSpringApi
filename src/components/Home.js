import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
render() {
        return (
            <div>
        <Container fluid>
                    <Button color="link"><Link to="/getPatients">Patients</Link></Button>
                </Container>
            </div>
        );
    }
}
export default Home;