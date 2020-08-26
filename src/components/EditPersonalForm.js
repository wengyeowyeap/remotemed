import React, { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify"
import {FormFeedback, FormText,FormGroup,Label,Input, Col, Row} from 'reactstrap';

const EditPatientForm = () => {
  //initial setup
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [icNum, setIcNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [gender, setGender] = useState ("male");
  //states for handling input
  const [delayEmail, setDelayEmail] = useState(null);
  const [emailNoDuplicate, setEmailNoDuplicate] = useState(false);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:5000/api/v1/users/me`, 
    {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(result => {
        let user = result.data
        console.log(result.data)
        setUser(result.data)
        setName(user.name)
        setEmail(user.email)
        setIcNum(user.ic_number)
        setGender(user.gender)
      })
      .catch(error => {
        console.log('ERROR: ', error)
    })
  },[])

    const handleEditPersonal = (e) =>{
        e.preventDefault()
        console.log("asdada")
        console.log(name,password,email,icNum,gender)

        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/edit',
          headers: 
          {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, 
          data: {
            name: name,
            password: password,
            email: email,
            gender: gender,
            ic_number: icNum
          }
        })
        .then(response => {
          toast.success("Successfully update user.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          let user = response.data.user
          setPassword("")
          setName(user.name)
          setEmail(user.email)
          setIcNum(user.ic_number)
          setGender(user.gender)
        })
        .catch(error => {
          console.error(error.message)
          // for (let message of error.message){
            toast.error((error.message), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
          // }
        })
      }




      const checkEmail = email => {
        // check if the email is in database
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check email!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/users/check_email?email=${email}`
          )
          .then(response => {
            console.log(response.data);
            if (response.data.valid) {
              setEmailNoDuplicate(true);
            } else {
              setEmailNoDuplicate(false);
            }
          });
      };


// ====================== END OF AXIOS ========================================================
// ====================== HANDLE INPUT START ================================================

      const handleNameInput = e => {
        const newName = e.target.value
         setName(newName)      
      };


      // not doing validation as this field might be deleted soon
      const handlePasswordInput = e => {
        const newPassword = e.target.value
        setPassword(newPassword)    
      };
      
      const handleEmailInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delayEmail);
        const newEmail = e.target.value
        setEmail(newEmail)
        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {      
          checkEmail(newEmail);
        }, 500);    
        setDelayEmail(newDelay);
      };

      let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      let emailFormFeedback
      let emailIsValid
      let emailIsInvalid
      if (email.length === 0){
        emailFormFeedback = <FormFeedback></FormFeedback>
      } else if (email.match(mailformat) && emailNoDuplicate){
        emailFormFeedback = <FormText color="success">Email available</FormText>
        emailIsValid = true
        emailIsInvalid = false
      } else if (!email.match(mailformat)){    
        emailFormFeedback = <FormText color="danger">Please input the correct email format</FormText>
        emailIsValid = false
        emailIsInvalid = true
      } else if(!emailNoDuplicate){    
        emailFormFeedback = <FormText color="danger">Email is already taken</FormText>
        emailIsValid = false
        emailIsInvalid = true
      }
    
      const handleGenderInput = e => {
        const newGender = e.target.value
        setGender(newGender)  
      };
      

        return (
            <form  onSubmit={handleEditPersonal}>
                <h3 style={{color:"#205072"}}>Edit Personal Profile</h3>

                <br/>

            <Row form>
                <Col md={9}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder={user.name}
                        className="form-control" 
                        onChange={handleNameInput}
                        value={name}
                    />
                    <FormText> *Please enter name as per NRIC</FormText>
                </FormGroup>    
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" onChange={handleGenderInput} value={gender}>
                        <option value="choose">Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                </FormGroup>
                </Col>
            </Row>

                <FormGroup>
                    <Label for="icNum">NRIC Number</Label>
                    <Input disabled 
                        placeholder={user.ic_number}
                    />
                </FormGroup>


            <Row form>
                <Col md={6}>
                    <FormGroup>  
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="form-control" 
                            onChange={handlePasswordInput}
                            value={password}
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>  
                        <Label for="email">Email address</Label>
                        <Input
                            type="text"
                            name="email"
                            placeholder={user.email}
                            className="form-control" 
                            onChange={handleEmailInput}
                            value={email}
                        />
                    </FormGroup>
                </Col>
            </Row>

                <br/>
                <Input type="submit" className="btn btn-primary btn-block" value="EDIT & SAVE"/>{' '}
            </form>
        );
    }

    export default EditPatientForm;