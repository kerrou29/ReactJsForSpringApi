import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';



class PatientList extends Component {

    constructor(props) {
        super(props);
        this.state = {patients: null, isLoading:true
        };
        this.remove = this.remove.bind(this);
    }


    // componentDidMount() {
    //     fetch('/api/patients/getPatients')
    //         .then(response => response.json())
    //         .then(data => this.setState({patients: data}));
    // }

    async componentDidMount() {
        const response = await fetch('/api/patients/getPatients');
        const data = await response.json();
        this.setState({patients: data, isLoading: false});
    }

    async remove(id) {
        await fetch(`/api/patients/deletePatient/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPatients = [...this.state.patients].filter(i => i.id !== id);
            this.setState({patients: updatedPatients});
        });
    }

    

    
    render() {

    
        const {patients, isLoading} = this.state;
        const { user } = this.props;

        if (!user) {
          return <p>Please log in to view the patient list</p>;
        }
    
        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (!patients || patients.length === 0) {
            return <p>No patients found.</p>;
          }
    
        const patientList = patients.map(patient => {
            return <tr key={patient.id}>
                <td style={{whiteSpace: 'nowrap'}}>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.dob}</td>
                <td>{patient.age}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/patients/" + patient.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(patient.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to={"/patients/new"} >Add Patient</Button>
                    </div>
                    <h3>Patients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="30%">Dob</th>
                            <th width="30%">Age</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default PatientList;