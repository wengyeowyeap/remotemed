import React, {useState, useEffect} from 'react';
import { Card, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import axios from 'axios'
import Dropin from './Dropin';

const Payment = () => {
  const [record, setRecord] = useState("");
  const [patientId, setPatientId] = useState("");
  const [amount, setAmount] = useState(0);
  const [recordId, setRecordId] = useState("");

useEffect(()=>{
  // Get the info of the record for this payment
  axios.get('http://127.0.0.1:5000/api/v1/records/search?record_id=1', 
  {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
    .then(result => {
      setRecord(result.data)
      console.log(result.data)
      setRecordId(result.data.record_id)
      setPatientId(result.data.patient_id)
      setAmount(result.data.payment_amount)
    })
    .catch(error => {
      console.log('ERROR: ', error)
  })    
}, [localStorage])

  return (
    <>
      <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>Hospital Bill</CardTitle>
          <CardText>Record ID: {record.record_id}</CardText>
          <CardText>Name: {record.patient_name}</CardText>
          <CardText>Doctor: {record.doctor_name}</CardText>
          <br/>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Prescription</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{record.prescription}</td>
                <td>{record.payment_amount}</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
    <Dropin patientId={patientId} amount={amount} recordId={recordId}/>
    </>
  );
};

export default Payment;
