import React from "react";
import {Button, ModalFooter, ModalHeader, ModalBody,Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientReport = (props) => {
    const {toggle, user, report, sugarLevel, cholesterolLevel, bloodPressure,} = props
    console.log(user)

      
    return(
        <div className = "d-flex flex-column mx-2">
            <ModalHeader toggle={toggle}>
                <h3> <span style={{color:"#205072", fontWeight:"bold", textTransform:"uppercase"}}>{user.name}</span>'s Report</h3>
                    <small>- Datetime -</small>
            </ModalHeader> 
            <ModalBody>
                <Table className="patient-report table-borderless">
                <tbody>
                    <tr>
                        <th scope="row">Doctor In-Charge</th>
                        <td>Dr. StellaLuna</td>
                    </tr>
                    <tr>
                        <th scope="row">Glucose Level</th>
                        <td>{user.sugarLevel}mmol/L</td>
                    </tr>
                    <tr>
                        <th scope="row">Blood Pressure</th>
                        <td>SYS{user.bloodPressure}mmHg ; DIA________mmHg</td>
                    </tr>
                    <tr>
                        <th scope="row">Cholesterol Level</th>
                        <td>TC{user.cholesterolLevel}mmol/L ; HDL________mmol/L ; TG________mmol/L ; LDL________mmol/L</td>
                    </tr>
                    <tr>
                        <th scope="row">Report</th>
                        <td>{user.report}lorem is not just a normal snippet—it’s actually a generator. Every time you expand it, it will generate a 30-words dummy text, splitted into a few sentences.</td>
                    </tr>
                    <tr>
                        <th scope="row">Images</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                                <li>image 1</li>
                                <li>image 2</li>
                                </ul>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Prescription</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                                <li>Med 1 and dose</li>
                                <li>Med 2 and dose</li>
                                </ul>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Payment</th>
                        <td>RM 200.00</td>
                    </tr>
                </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" disabled onClick={toggle}>Edit & Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </div>
    )
}

export default PatientReport;