import React ,{useState,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const LoginForm = (props) => {
    const [ic , setIc]=useState("")
    const [password, setPassword]=useState("")
    const history=useHistory()
    console.log(ic)
    console.log(password)
    
    const handleInput=(e) => {
        if (e.target.name==="ic"){
            setIc(e.target.value)

        }
        if (e.target.name==="password"){
            setPassword(e.target.value)
        }

      
    }

    const handleLogin=(e) => {
        e.preventDefault()
        axios({
            method:"POST",
            url:'http://127.0.0.1:5000/api/v1/sessions/login',
            data:{
                ic_number:ic,
                password:password
            }

        })
        .then(result=>{
            console.log(result)
            toast.success(result.data.message)
            localStorage.setItem("token",result.auth_token)
            setPassword("")
            setIc("")
            if (result.data.user.role.includes("patient")){
                history.push('/patient')
            }
            if (result.data.user.role.includes("guardian")){
                history.push('/guardian')
            }
            if (result.data.user.role.includes("doctor")){
                history.push('/doctor')
            }
            if (result.data.user.role.includes("admin")){
                history.push('/admin')
            }
        })

        
      
    }


  return (
    <Form id="login-form" onSubmit={handleLogin}>
      <FormGroup>
        <Label for="identificationNumber">NRIC Number</Label>
        <Input type="text" name="ic" id="ic" placeholder="Enter NRIC Number" onChange={handleInput} maxLength="12" value={ic}/>
        <FormText>Eg. 850403075664</FormText>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" value={password} onChange={handleInput} />
      </FormGroup>
     
      <Button color="success">Submit</Button>
    </Form>
  );
}

export default LoginForm;