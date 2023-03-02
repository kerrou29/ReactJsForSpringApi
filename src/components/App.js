// import { Component } from "react";
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   state = {
//     patients: []
//   };

//   async componentDidMount() {
//     const response = await fetch('/api/patients/getPatients');
//     const body = await response.json();
//     this.setState({patients: body});
//   }

//   render() {
//     const {patients} = this.state;
//     return (
//         <div className="App">
         
//             <div className="App-intro">
//               <h1 className="text-center">Patients</h1>
//               <table className = "table table-striped">
//                 <thead>
//                   <tr>
//                     <td>Patient Id</td>
//                     <td>Patient Name</td>
//                     <td>Patient Email</td>
//                     <td>Patient Dob</td>
//                     <td>Patient Age</td>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   {patients.map(
//                     patient =>
//                     <tr key={patient.id}>
//                       <td>{patient.id}</td>
//                       <td>{patient.name}</td>
//                       <td>{patient.email}</td>
//                       <td>{patient.dob} </td>
//                       <td>{patient.age}</td>
//                     </tr>
//                 )}
//                 </tbody>
//               </table>
              
//             </div>
//         </div>
//     );
//   }
// }
// export default App;

import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientList from './PatientList';
import PatientEdit from "./PatientEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/getPatients/' exact={true} component={PatientList}/>
            <Route path='/patients/:id' component={PatientEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;

