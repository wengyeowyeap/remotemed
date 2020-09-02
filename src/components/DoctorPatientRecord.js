import React ,{useState} from "react";
import {Button, ModalFooter, ModalHeader, ModalBody,Table , Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorPatientRecord = (props) => {
    
    const {toggle, user, sugarLevel, cholesterolLevel, bloodPressure, record , getReportFromChildren ,getPaymentFromChildren, getPrescriptionFromChildren} = props
    const [paid,setPaid]=useState(record.paid)
    const [report,setReport]=useState("")
    const [prescription,setPrescription]=useState("")
    const [payment,setPayment]=useState("")


    const handleInput=(e) => {
        if (e.target.name=="report"){
            setReport(e.target.value)
            getReportFromChildren(e.target.value)
        }

        if (e.target.name=="prescription"){
            setPrescription(e.target.value)
            getPrescriptionFromChildren(e.target.value)
        }
        
        if (e.target.name=="payment_amount"){
            setPayment(e.target.value)
            getPaymentFromChildren(e.target.value)
        }

    }

      
    return(
        <div className = "d-flex flex-column mx-2">
            <ModalHeader toggle={toggle}>
            <h3> <span style={{color:"#205072", fontWeight:"bold", textTransform:"uppercase"}}>{user}</span>'s Report</h3>
                    
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
                        <td><Input onChange={handleInput} name="report"></Input></td>
                    </tr>
                    <tr>
                        <th scope="row">Images</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <ul style={{listStyle:"none", paddingInlineStart:"0px"}}>
                                    <div >

                                            <>{record.image_list.map(image=>{
                                            return <img className="mb-2" style={{width:"100%", height:"200px"}} src={image} ></img>
                                            })}</>
                                    
                                    </div>
                                </ul>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Prescription</th>
                            <td style = {{textTransform:"capitalize"}}>
                                <Input onChange={handleInput} name="prescription"></Input>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Payment</th>
                        <td style = {{textTransform:"capitalize"}}>
                                <Input onChange={handleInput} name="payment_amount"></Input>
                            </td>
                    </tr>
                    <tr>
                        <th scope="row">Payment Status</th>
                        {record.paid? <td>Paid</td>  : <td>Havent paid</td>}
                    </tr>
                </tbody>
                </Table>
            </ModalBody>

        </div>
    )
}

export default DoctorPatientRecord;