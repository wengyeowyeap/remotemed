import React, {useState, useEffect} from 'react';
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react"
import { useHistory } from 'react-router-dom';

const Dropin = ({patientId, amount, recordId}) => {
  const [btToken, setBtToken] = useState("");
  const [instance, setInstance] = useState("");
  const history = useHistory()
  
useEffect(()=>{
  //Get the client token from Braintree
  axios.get(`http://127.0.0.1:5000/api/v1/payments/new?patient_id=${patientId}`, 
  {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
    .then(result => {
      setBtToken(result.data.token)
      // console.log(result.data)
    })
    .catch(error => {
      // console.log('ERROR: ', error)
  })    
}, [patientId])

  const submitPayment = () => {
    instance.requestPaymentMethod()
    .then( ({nonce}) => {
      console.log(amount)
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/v1/payments/create',
        headers: 
          {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, 
        data: {
          payment_method_nonce: nonce,
          amount_paid: amount,
          record_id: recordId
        }
      })
        .then(result => {
          console.log(result.data)
          history.push('/patient')
        })
        .catch(error => {
          console.log('ERROR: ', error)
      })    
    })
 

}
  if(!btToken) {
    return (<div></div>)
  } else {
    return (
      <>
        <div>
            <DropIn
              options={{ authorization: btToken }}
              onInstance={(instance) => (setInstance(instance))}          />
            <button onClick={submitPayment}>Submit Payment</button>
          </div>
  
  
  
      </>
    );
  }

};

export default Dropin;
