import React, {useState, useEffect} from 'react';
import { Table, Modal, NavLink } from 'reactstrap';
import axios from 'axios';
import PatientReport from "./PatientReport"

const PatientList = (props) => {
    const{className} = props;
    const [icNum, setIcNum] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/v1/records/show?ic_number=${icNum}`)
        .then(result => {
          console.log(result.data)
          setUsers(result.data)
        })
        .catch(error => {
          console.log('ERROR: ', error)
        })
      }, []);


  //   return (
  //       <Table className="patient-list">
  //       <thead>
  //           <tr>
  //           <th>User</th>
  //           <th>Info</th>
  //           </tr>
  //       </thead>
  //       {users.map(user => (
  //           <tbody>
  //               <tr>
  //                 <th scope="row">User ID</th>
  //                 <td>{user.id}</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">Name</th>
  //                 <td>{user.name}</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">NRIC Number</th>
  //                 <td>{user.icNum}</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">Gender</th>
  //                 <td>{user.gender}</td>
  //               </tr>
  //               <tr>
  //                 <th scope="row">Disease</th>
  //                   {diseases.map(disease => (
  //                     <td style = {{textTransform:"capitalize"}}>
  //                       <ul>
  //                       <li>{user.disease}</li>
  //                       </ul>
  //                     </td>
  //                   ))}
  //               </tr>
  //               <tr>
  //                 <th scope="row">Disease</th>
  //                   {reports.map(report => (
  //                     <td style = {{textTransform:"capitalize"}}>
  //                       <ul>
  //                       <li>{user.report}</li>
  //                       </ul>
  //                     </td>
  //                   ))}
  //               </tr>
  //           </tbody>
  //       ))} 
  //       </Table>
  // );

  return (
    <Table className="patient-list">
    <thead>
        <tr>
        <th>Patient</th>
        <th>Info</th>
        </tr>
    </thead>
        <tbody>
            <tr>
              <th scope="row">User ID</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>HelloWorld</td>
            </tr>
            <tr>
              <th scope="row">NRIC Number</th>
              <td>900101010101</td>
            </tr>
            <tr>
              <th scope="row">Gender</th>
              <td style = {{textTransform:"capitalize"}}>male</td>
            </tr>
            <tr>
              <th scope="row">Disease</th>
                  <td style = {{textTransform:"capitalize"}}>
                    <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                    <li>diabetes</li>
                    <li>hypertension</li>
                    </ul>
                  </td>
            </tr>
            <tr>
              <th scope="row">Medical Report</th>
                  <td>
                    <ul style={{listStyleType:"square", paddingInlineStart:"0px"}}>
                      <NavLink onClick={toggle}>
                        <li>20.08.2020 | 1400-1430</li>
                        <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
                          <PatientReport modal={modal} toggle={toggle}/>
                        </Modal>  
                      </NavLink>
                      <NavLink onClick={toggle}>
                        <li>10.08.2020 | 1400-1430</li>
                        <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
                          <PatientReport modal={modal} toggle={toggle}/>
                        </Modal>  
                      </NavLink>
                    </ul>
                  </td>
            </tr>
        </tbody>
    </Table>
);

}

export default PatientList;