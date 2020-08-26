import React from "react";
import {Button, ModalFooter, ModalHeader, ModalBody,Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientReport = (props) => {
    const {toggle} = props

    return(
        <div className = "d-flex flex-column mx-2">
            <ModalHeader toggle={toggle}>
                <h3>HelloWorld's Report</h3>
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
                        <td>________mmol/L</td>
                    </tr>
                    <tr>
                        <th scope="row">Blood Pressure</th>
                        <td>SYS________mmHg ; DIA________mmHg</td>
                    </tr>
                    <tr>
                        <th scope="row">Cholesterol Level</th>
                        <td>TC________mmol/L ; HDL________mmol/L ; TG________mmol/L ; LDL________mmol/L</td>
                    </tr>
                    <tr>
                        <th scope="row">Report</th>
                        <td>lorem is not just a normal snippet—it’s actually a generator. Every time you expand it, it will generate a 30-words dummy text, splitted into a few sentences.</td>
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