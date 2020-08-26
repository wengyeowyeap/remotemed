import React, { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify"
import {FormFeedback, FormText,FormGroup,Label,Input, Col, Row} from 'reactstrap';

const SignUpForm = () => {
  //initial setup
  const [name, setName] = useState("");
  const [icNum, setIcNum] = useState("");
  const [guardianIcNum, setGuardianIcNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [role, setRole] = useState ([]);
  const [gender, setGender] = useState ("male");
  const [disease, setDisease] = useState ([]);
  //states for handling input
  const [guardian, setGuardian] = useState({});
  const [delayIc, setDelayIc] = useState(null);
  const [delayGuardianIc, setDelayGuardianIc] = useState(null);
  const [delayEmail, setDelayEmail] = useState(null);
  const [icNoDuplicate, setIcNoDuplicate] = useState(false);
  const [icGuardianValid, setIcGuardianValid] = useState(false);
  const [emailNoDuplicate, setEmailNoDuplicate] = useState(false);
  const [checkedRoles, setCheckedRoles] = useState ([]);
  const [checkedDiseases, setCheckedDiseases] = useState ([]);

    const handleSignUp = (e) =>{
        e.preventDefault()
        console.log(name,password,email,icNum,gender, role, disease)
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/create',
          headers: 
            {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }, 
          data: {
            name: name,
            password: password,
            email: email,
            ic_number: icNum,
            gender: gender,
            role: role,
            disease: disease,
            guardian: guardianIcNum
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
          setGender("male")
          setGuardianIcNum("")
          setRole([])
          setDisease([])
          setCheckedRoles([])
          setCheckedDiseases([])
          setTimeout(window.location.reload(false), 5000 )
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

      const checkIcNum = icNum => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check ic!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/users/check_ic?ic=${icNum}`
          )
          .then(response => {
            console.log(response.data);
            if (response.data.valid) {
              setIcNoDuplicate(true);
            } else {
              setIcNoDuplicate(false);
            }
          });
      };

      const checkGuardianAvailability = guardianIcNum => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check guardian ic!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/users/check_guardian?guardian_id=${guardianIcNum}`
          )
          .then(response => {
            setGuardian(response.data)
            console.log(response.data);
            if (response.data.valid) {
              setIcGuardianValid(true);
            } else {
              setIcGuardianValid(false);
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
    
      const handleIcInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delayIc);
        const newIc = e.target.value
        setIcNum(newIc)
        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {      
          checkIcNum(newIc);
        }, 500);    
        setDelayIc(newDelay);
      };
    
      let icformat = /([0-9]){2}([0-1]){1}([0-9]){1}([0-3]){1}([0-9]){7}/
      let icFormFeedback
      let icIsValid
      let icIsInvalid
      if (icNum.length === 0){
        icFormFeedback = <FormFeedback></FormFeedback>
      } else if (icNum.match(icformat) && icNoDuplicate){
        icFormFeedback = <FormText color="success">NRIC is available</FormText>
        icIsValid = true
        icIsInvalid = false
      } else if (!icNum.match(icformat)){    
        icFormFeedback = <FormText color="danger">Please input the correct NRIC format</FormText>
        icIsValid = false
        icIsInvalid = true
      } else if(!icNoDuplicate){    
        icFormFeedback = <FormText color="danger">Sorry! That's an account exist for this NRIC Number.</FormText>
        icIsValid = false
        icIsInvalid = true
      }

      const handleGenderInput = e => {
        const newGender = e.target.value
        setGender(newGender)  
      };
      
      const handleRoleInput = e => {
        if (checkedRoles.includes(e.target.value)){
          checkedRoles.splice(checkedRoles.indexOf(e.target.value), 1)
          setRole(checkedRoles)
        } else{
          checkedRoles.push(e.target.value)
          setRole(checkedRoles)
        }
      }

      const handleDiseaseInput = e => {
        if (checkedDiseases.includes(e.target.value)){
          checkedDiseases.splice(checkedDiseases.indexOf(e.target.value), 1)
          setDisease(checkedDiseases)
        } else{
          checkedDiseases.push(e.target.value)
          setDisease(checkedDiseases)
        }
      }

      const handleGuardianInput = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delayGuardianIc);
        const newGuardianIc = e.target.value
        setGuardianIcNum(newGuardianIc)
        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {      
          checkGuardianAvailability(newGuardianIc);
        }, 500);    
        setDelayGuardianIc(newDelay);
      };
    
      let icGuardianFormat = /([0-9]){2}([0-1]){1}([0-9]){1}([0-3]){1}([0-9]){7}/
      let icGuardianFormFeedback
      let icGuardianIsValid
      let icGuardianIsInvalid
      if (guardianIcNum.length === 0){
        icGuardianFormFeedback = <FormFeedback></FormFeedback>
      } else if (guardianIcNum.match(icGuardianFormat) && icGuardianValid){
        icGuardianFormFeedback = <FormText color="success">Guardian's Name:{guardian.name}</FormText>
        icGuardianIsValid = true
        icGuardianIsInvalid = false
      } else if (!guardianIcNum.match(icGuardianFormat)){    
        icGuardianFormFeedback = <FormText color="danger">Please input the correct IC format</FormText>
        icGuardianIsValid = false
        icGuardianIsInvalid = true
      } else if(!icGuardianValid){    
        icGuardianFormFeedback = <FormText color="danger">Sorry! User not exist</FormText>
        icGuardianIsValid = true
        icGuardianIsInvalid = false
      } 
        return (
            <form  id="signup-form" onSubmit={handleSignUp}>
                <h3 style={{color:"#205072"}}>Register New User</h3>

                <br/>

            <Row form>
                <Col md={9}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
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
                        onChange={handleIcInput}
                        value={icNum}
                        valid={icIsValid}
                        invalid={icIsInvalid}
                    />
                    {icFormFeedback}
                    <FormText> *Eg: 900101010001 </FormText>
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
                            placeholder="Enter email"
                            className="form-control" 
                            onChange={handleEmailInput}
                            value={email}
                            valid={emailIsValid}
                            invalid={emailIsInvalid}
                        />
                        {emailFormFeedback}
                    </FormGroup>
                </Col>
            </Row>


                <FormGroup> 
                    <Label for="role">Role</Label>
                    <div>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleRoleInput} value={1}/> Patient
                            </Label>
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleRoleInput} value={2}/> Guardian
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleRoleInput} value={3}/> Doctor
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="role" onChange={handleRoleInput} value={4} /> Admin
                            </Label>
                        </FormGroup>
                    </div>
                </FormGroup>

                <FormGroup>
                <Label for="disease">Disease</Label>
                    <div>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={1}/> Diabetes
                            </Label>
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={2}/> Hypertension
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={3}/> High Cholestrol
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={4}/> Psychological
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={5}/> Dermalogical
                            </Label>
                        </FormGroup>

                        <FormGroup check inline>
                            <Label check>
                            <Input type="checkbox" name="disease" onChange={handleDiseaseInput} value={6}/> Rehabilitation
                            </Label>
                        </FormGroup>
                    </div>
                </FormGroup>

                <FormGroup>  
                        <Label for="guardian_id">Guardian</Label>
                        <Input
                            type="guardianIcNum"
                            name="guardian"
                            maxLength = "12" 
                            placeholder="Enter Guardian's NRIC Number"
                            className="form-control" 
                            onChange={handleGuardianInput}
                            value={guardianIcNum}
                            valid={icGuardianIsValid}
                            invalid={icGuardianIsInvalid}
                        />
                        {icGuardianFormFeedback}
                </FormGroup>
                
                <br/>
                <Input form="signup-form" type="submit" className="btn btn-primary btn-block" value="REGISTER"/>{' '}
            </form>
        );
    }

    export default SignUpForm;