import React ,{useState} from "react";
import {Button, ModalFooter, ModalHeader, ModalBody,Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientReport2 = (props) => {
    
    const {toggle, user, report, sugarLevel, cholesterolLevel, bloodPressure,record} = props
    const [paid,setPaid]=useState(record.paid)
    console.log("beforepaid")
    console.log(paid)

    const handlePayment=() => {
      
    }

      
    return(
        <div className = "d-flex flex-column mx-2">
            <ModalHeader toggle={toggle}>
                <h3> <span style={{color:"#205072", fontWeight:"bold", textTransform:"uppercase"}}>abcdefg</span>'s Report</h3>
                    <small>- Datetime -</small>
            </ModalHeader> 
            <ModalBody>
                <Table className="patient-report table-borderless">
                <tbody>
                    <tr>
                        <th scope="row">Doctor In-Charge</th>
                        <td>{record.doctor_id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Glucose Level</th>
                        <td>{record.sugar_level} mmol/L</td>
                    </tr>
                    <tr>
                        <th scope="row">Blood Pressure</th>
                        <td>Sys : {record.systolic_blood_pressure} mmHg       ;       Dia : {record.diastolic_blood_pressure} mmHg</td>
                    </tr>
                    <tr>
                        <th scope="row">Cholesterol Level</th>
                        <td>TC {record.cholestrol_level} mmol/L </td>
                    </tr>
                    <tr>
                        <th scope="row">Report</th>
                        <td>{record.report}</td>
                    </tr>
                    <tr>
                        <th scope="row">Images</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                                <div >
                                    {record.image_list.map(image=>{
                                        return <img className="mb-2" style={{width:"100%", height:"200px"}} src={image} ></img>
                                    })}
                                    </div>
                                </ul>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Prescription</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                                <li>{record.prescription}</li>
                                <li>Med 2 and dose</li>
                                </ul>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Payment</th>
                        {record.paid?<td> {record.payment_amount} has been paid. </td> : <> <td>{record.payment_amount}</td> <Button onClick={handlePayment} color="primary">Pay Now</Button> </>}
                    </tr>
                    <tr>
                        <th scope="row">Payment Status</th>
                        {record.paid? <td>Paid</td>  : <td>Havent paid</td>}
                    </tr>
                </tbody>
                </Table>
            </ModalBody>
            {/* <ModalFooter>
            <Button color="primary" disabled onClick={toggle}>Edit & Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter> */}
        </div>
    )
}

export default PatientReport2;