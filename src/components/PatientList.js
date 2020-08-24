import React, {useState, useEffect} from 'react';
import { Table, Modal, NavLink } from 'reactstrap';
import axios from 'axios';
import PatientReport from "./PatientReport"

const PatientList = (props) => {
    const{className} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/v1/users')
        .then(result => {
          console.log(result.data)
          setUsers(result.data)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
      }, []);


    return (
        <Table className="patient-list">
        <thead>
            <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>IC Number</th>
            <th>Gender</th>
            <th>Disease</th>
            </tr>
        </thead>
        {users.map(user => (
            <tbody>
                <tr>
                <td>{user.id}</td>
                <td>
                    <NavLink onClick={toggle}>{user.username}</NavLink>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <PatientReport toggle={toggle}/>
                    </Modal>
                </td>
                <td>{user.icNum}</td>
                <td>{user.gender}</td>
                <td>{user.disease}</td>
                </tr>
            </tbody>
        ))} 
        </Table>
  );
}

export default PatientList;