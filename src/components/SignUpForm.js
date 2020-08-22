import React, { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify"
import {FormFeedback, FormText,FormGroup,Label,Input, Col, Row} from 'reactstrap';

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [icNum, setIcNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState ("");
    const [role, setRole] = useState (false);
    const [checkedRoles, setCheckedRoles] = useState ([]);
    const [gender, setGender] = useState ("");
    const [disease, setDisease] = useState ([]);
    const [guardianId, setGuardianId] = useState ("");
    const [delay, setDelay] = useState(null);
    const [icNumValid, setIcNumValid] = useState (null)

    // const checkIcNum = newIcNum => {
    //   axios
    //       .get(
    //         'http://127.0.0.1:5000/api/v1/users/sign_up'
    //       )
    //       .then(response => {
    //         console.log(response.data);
    //         if (response.data.valid) {
    //           setIcNumValid(true);
    //         } else {
    //           setIcNumValid(false);
    //         }
    //       });
    //   };

    const handleSignUp = (e) =>{
        e.preventDefault()
        console.log(name,password,email,icNum,gender)
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/sign_up',
          data: {
            name: name,
            password: password,
            email: email,
            ic_number: icNum,
            gender: gender,
            role: role,
            disease: disease,
            guardianId: guardianId
          }
        })
        .then(response => {
          toast.success("Successfully created a user.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          let user = response.data.user
          setPassword("")
          setName("")
          setEmail("")
          setIcNum("")
          setGender("")
          setRole("")
          setDisease("")
          setGuardianId("")
        })
        .catch(error => {
          console.error(error.message)
          for (let message of error.message){
            toast.error((message), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
          }
        })
      }

      const handleInput = (e) => {
        // if (e.target.name === "icNum"){
        //     clearTimeout(delay)
        //     let newIcNum = e.target.value
        //     setIcNum(newIcNum)
        //     const newDelay = setTimeout(() => {
        //       checkIcNum(newIcNum)
        //     }, 1000);
        //     setDelay(newDelay)
        //   }
          if (e.target.name === "icNum"){
            setIcNum(e.target.value)
          }
          if (e.target.name === "name"){
            setName(e.target.value)
          }
          if (e.target.name === "password"){
            setPassword(e.target.value)
          }
          if (e.target.name === "email"){
            setEmail(e.target.value)
          }
          if (e.target.name === "gender"){
            setGender(e.target.value)
          }
          // if (e.target.name === "role"){
          //   setRole(e.target.value) 
          // }
          if (e.target.name === "disease"){
            setDisease(e.target.value) 
        }
          if (e.target.name === "guardianId"){
            setGuardianId(e.target.value) 
        }        
      }

      const handleChange = (e) => {
        setCheckedRoles(checkedRoles => checkedRoles.set(e.target.name, e.target.checked));
        console.log("checkedRoles: ", checkedRoles);
    }
    
      
      const getInputProp = () => {
        if (!icNum.length) {
            return null;
          }
      
          if (icNum.length == 12) {
            return { valid: true };
          }
      
          if (icNumValid) {
            return { valid: true };
          } 
          
          else {
            return { invalid: true };
          }
      }
    
      const getFormFeedback = () => {
        if (!icNum.length) {
          return null;
        }
    
        if (icNum.length == 12) {
          return <FormFeedback invalid>Please enter correct IC Number</FormFeedback>;
        }
    
        if (icNumValid) {
          return <FormFeedback valid>Please proceed with the registration</FormFeedback>;
        } 
        
        else {
          return <FormFeedback invalid>Sorry! That's an account exist in this IC Number.</FormFeedback>;
        }
      };
    
        return (
            <form  id="signup-form" onSubmit={handleSignUp}>
                <h3>Register New User</h3>

                <br/>

                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control" 
                        onChange={handleInput}
                        value={name}
                    />
                    <FormText> *Please enter name as per NRIC</FormText>
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
                            onChange={handleInput}
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
                            placeholder="Enter email"
                            className="form-control" 
                            onChange={handleInput}
                            value={email}
                        />
                    </FormGroup>
                </Col>
            </Row>
                <FormGroup>
                    <Label for="icNum">NRIC Number</Label>
                    <Input
                        type="text"
                        name="icNum"
                        placeholder="Enter NRIC Number"
                        pattern="[0-9]*"
                        className="form-control"
                        maxLength = "12" 
                        onChange={handleInput}
                        value={icNum}
                        {...getInputProp()}
                    />
                    {getFormFeedback()}
                    <FormText> *Eg: 900101010001 </FormText>
                </FormGroup> 

                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" onChange={handleInput} value={gender}>
                        <option value="choose">Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                </FormGroup>

                <FormGroup> 
                <Label for="role">Role</Label>
                    <div>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleChange} value={1}/> Doctor
                            </Label>
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleChange} value={2}/> Admin
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleChange} value={3}/> Patient
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleChange} value={4} /> Guardian
                            </Label>
                        </FormGroup>
                    </div>
                </FormGroup>

                <FormGroup>
                <Label for="disease">Disease</Label>
                    <div>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={1}/> Diabetes
                            </Label>
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={2}/> Hypertension
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={3}/> High Cholestrol
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={4}/> Psychological
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={5}/> Dermalogical
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleInput} value={6}/> Rehabilitation
                            </Label>
                        </FormGroup>
                    </div>
                </FormGroup>

                <FormGroup>  
                        <Label for="guardianId">Guardian</Label>
                        <Input
                            type="guardianId"
                            name="guardianId"
                            placeholder="Enter Guardian's IC Number"
                            className="form-control" 
                            onChange={handleInput}
                            value={guardianId}
                        />
                </FormGroup>
                
                <br/>
                <Input form="signup-form" type="submit" className="btn btn-primary btn-block" value="Register"/>{' '}
            </form>
        );
    }

    export default SignUpForm;