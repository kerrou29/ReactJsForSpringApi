import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { withRouter } from './withRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import authService from '../services/AuthService';

class PatientEdit extends Component {

    emptyItem = {
        name: '',
        email: '',
        dob:''

    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const patient = await (await fetch(`/api/patients/getPatient/${this.props.match.params.id}`)).json();
            this.setState({item: patient});
        }  
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/api/patients' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + authService.getCurrentUser().token
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/getPatients');
    }
    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Patient' : 'Add Patient'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dob">Dob</Label>
                        <Input type="date" name="dob" id="dob" value={item.dob || ''}
                               onChange={this.handleChange} autoComplete="dob"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/getPatients/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(PatientEdit);