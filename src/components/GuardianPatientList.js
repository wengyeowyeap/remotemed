import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { Table, FormFeedback, FormText, Input, Row, Col} from 'reactstrap';
import { NavLink } from 'reactstrap';

const GuardianPatientList = (props) => {
    const{guardian} = props;

    const [patientList, setPatientList]= useState([]);
    const [user, setUser] = useState("");
    const [icNum, setIcNum] = useState("");
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState ("male");
    const [disease, setDisease] = useState ([]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/users/show_my_patient`, 
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(result => {
            let patientList = result.data.my_patient
            console.log(result.data.my_patient)
            setPatientList(patientList)

          })
          .catch(error => {
            console.log('ERROR: ', error)
        })
      },[])

    //   axios for onClick patient name for its detail
      const handleCheckPatient = (e) =>{
        console.log(e)
        axios.get(`http://127.0.0.1:5000/api/v1/users/show_patient?ic_number=${e}`, 
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(result => {
            let user = result.data
            console.log(result.data)
            setUser(user)
            setName(user.name)
            setEmail(user.email)
            setIcNum(user.ic_number)
            setGender(user.gender)
            setDisease(user.disease)
          })
          .catch(error => {
            console.log('ERROR: ', error)
        })
      }

          //   axios post to edit patient's personal profile

    const [delayEmail, setDelayEmail] = useState(null);
    const [emailNoDuplicate, setEmailNoDuplicate] = useState(false);

      const handleEditPatientPersonal = (e) =>{
        e.preventDefault()
        console.log(name,email,icNum,gender,guardian.ic_number,user.role)

        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/api/v1/users/edit',
          headers: 
          {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, 
          data: {
            name: name,
            password: user.password,
            email: email,
            ic_number: icNum,
            gender: gender,
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
          setName(user.name)
          setEmail(user.email)
          setGender(user.gender)
        })
        .catch(error => {
          console.error(error.message)
            toast.error((error.message), {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
        })
      }

      const checkEmail = email => {
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

      const handleNameInput = e => {
        const newName = e.target.value
         setName(newName)      
      };


      const handleEmailInput = e => {
        clearTimeout(delayEmail);
        const newEmail = e.target.value
        setEmail(newEmail)
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
      } else if (email == user.email) {
        emailFormFeedback = <FormText color="success">Maintain Email</FormText>
        emailIsValid = true
        emailIsInvalid = false
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


    return(
        <>
        <Row>
          <Col md="4">
        <div>
        <h3 style={{color:"#205072"}}>Your Patient</h3>
        <br/>
        {patientList == null
            ?   <h5>No patient under your guardian.</h5>
            :   <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                {patientList.map((list,li) => {
                            return(
                                <>
                                    <li key={li}>
                                        <NavLink value={list.ic_number} onClick={() => handleCheckPatient(list.ic_number)}>{list.name}</NavLink>
                                    </li>
                                </>
                            )
                        })}
                </ul>
        }
        </div>
        </Col>

        <Col md="8">
        {
          user
          ? <form  onSubmit={handleEditPatientPersonal}>
          <h3 style={{color:"#205072"}}>Edit Patient's Profile</h3>
          <br/>
          <Table className="patient-list">
              <thead>
                  <tr>
                  <th>User</th>
                  <th>Info</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                  <th scope="row">User ID</th>
                  <td>{user.id}</td>
                  </tr>
                  <tr>
                  <th scope="row">Name</th>
                      <td>
                      <Input
                          type="text"
                          name="name"
                          className="form-control" 
                          onChange={handleNameInput}
                          value={name}
                      />
                      <FormText> *Please enter name as per NRIC</FormText>
                      </td>
                  </tr>
                  <tr>
                  <th scope="row">NRIC Number</th>
                  <td>{user.ic_number}</td>
                  </tr>
                  <tr>
                  <th scope="row">Email</th>
                      <td>
                      <Input
                          type="text"
                          name="email"
                          className="form-control" 
                          onChange={handleEmailInput}
                          value={email}
                          valid={emailIsValid}
                          invalid={emailIsInvalid}
                      />
                      {emailFormFeedback}    
                      </td>
                  </tr>
                  <tr>
                  <th scope="row">Gender</th>
                  <td>
                  <Input type="select" name="gender" onChange={handleGenderInput} value={gender}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </Input>
                  </td>
                  </tr>
                  <tr>
                  <th scope="row">Disease</th>
                          <td style = {{textTransform:"capitalize"}}>
                          <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                      {disease.map((d) => {
                      return(
                          <>
                          <li>{d}</li>
                          </>
                      )
                      })}
                          </ul>
                      </td>
                  </tr>
              </tbody>
              </Table>
              <br/>
              <Input type="submit" className="btn btn-primary btn-block" value="EDIT & SAVE"/>{' '}
              </form>
          : null
        }
        </Col>
        </Row> 
    </>  
    )
}

export default GuardianPatientList;