import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import authService from '../services/AuthService';

function PatientEdit() {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: '',
    email: '',
    dob: ''
  });

  useEffect(() => {
    async function fetchPatient() {
      if (id !== 'new') {
        const patient = await (await fetch(`/api/patients/getPatient/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authService.getCurrentUser().token}`
          }
        })).json();
        setItem(patient);
      }
    }
    fetchPatient();
  }, [id]);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newItem = { ...item };
    newItem[name] = value;
    setItem(newItem);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch('/api/patients' + (item.id ? '/' + item.id : ''), {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getCurrentUser().token}`
      },
      body: JSON.stringify(item)
    });

    window.location.href = '/getPatients';
  }

  const title = <h2>{item.id ? 'Edit Patient' : 'Add Patient'}</h2>;

  return (
    <div>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={item.name || ''}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={item.email || ''}
              onChange={handleChange}
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="dob">Dob</Label>
            <Input
              type="date"
              name="dob"
              id="dob"
              value={item.dob || ''}
              onChange={handleChange}
              autoComplete="dob"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{' '}
            <Button color="secondary" tag={Link} to="/getPatients/">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default PatientEdit;
