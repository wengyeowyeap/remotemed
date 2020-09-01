import React, {useState} from 'react';
import { Table, Modal, NavLink } from 'reactstrap';
import axios from 'axios';
import PatientReport from "./PatientReport"
import SearchBar from "./SearchBar"

const PatientList = (props) => {
    const{className} = props;

    const [user, setUser] = useState("");
    const [icNum, setIcNum] = useState("");
    const [modal, setModal] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [guardian, setGuardian] = useState("");
    const [role, setRole] = useState ([]);
    const [gender, setGender] = useState ("male");
    const [disease, setDisease] = useState ([]);
    // const [guardianId, setGuardianId] = useState ("");

    const toggle = () => setModal(!modal);

    const [searchIc, setSearchIc] = useState('');

    const handleButtonClick = (e) =>{
      console.log(searchIc)
      axios.get(`http://127.0.0.1:5000/api/v1/users/show_patient?ic_number=${searchIc}`, 
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
        .then(result => {
          let user = result.data
          console.log(result.data)
          console.log(user.name, user.email, user.ic_number, user.disease, user.guardian)
          setUser(result.data)
          setName(user.name)
          setEmail(user.email)
          setIcNum(user.ic_number)
          setGender(user.gender)
          setRole(user.role)
          setDisease(user.disease)
          setGuardian(user.guardian)
          setSearchIc("")
        })
        .catch(error => {
          console.log('ERROR: ', error)
      })
    }

    const handleKeypress = e => {
      //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleButtonClick();
      }
    };

    const [report,setReport] = useState ("")
    const [doctor, setDoctor] = useState({});
    const [appointment, setAppointment] = useState({});
    const [sugarLevel, setSugarLevel] = useState ("");
    const [cholesterolLevel, setCholesterolLevel] = useState ("");
    const [bloodPressure, setBloodPressure] = useState ("");

    const handleReportDisplay = (e) =>{
        console.log(searchIc)
        axios.get(`http://127.0.0.1:5000/api/v1/records/show?ic_number=${searchIc}`, 
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(result => {
            let report = result.data
            console.log(result.data)
            console.log(report.sugar_level)
            setReport(result.data)
            setSugarLevel(report.name)
            setCholesterolLevel(report.email)
            setBloodPressure(report.ic_number)
          })
          .catch(error => {
            console.log('ERROR: ', error)
        })
      }


    return (
      <>
      <SearchBar onButtonClick={handleButtonClick} searchIc={searchIc} setSearchIc={setSearchIc} onEnterPress={handleKeypress} />
        <br/>

        <Table className="patient-list">
        <thead>
            <tr>
            <th>User</th>
            <th>Info</th>
            </tr>
        </thead>
        {
          user
          ? <tbody>
                <tr>
                  <th scope="row">User ID</th>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th scope="row">NRIC Number</th>
                  <td>{user.ic_number}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope="row">Gender</th>
                  <td style = {{textTransform:"capitalize"}}>{user.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Disease</th>
                        <td style = {{textTransform:"capitalize"}}>
                        <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                        { disease
                          ? <> {disease.map((d) => {
                              return(
                                <>
                                <li>{d}</li>
                                </>
                              )
                            })} </>
                          : <h5>No diseases found.</h5>
                        }
                            
                        </ul>
                      </td>
                </tr>
                <tr>
                  <th scope="row">Guardian</th>
                  {
                    user.guardian == null
                    ? <td>*no guardian assigned</td>
                    : <td>{user.guardian}</td>
                  }
                </tr>
                {/* <tr>
                  <th scope="row">Medical Report</th>
                    {reports.map(report => (
                      <td style = {{textTransform:"capitalize"}}>
                        <ul>
                        <li>{user.report}</li>
                        </ul>
                      </td>
                    ))}
                </tr> */}
                <tr>
                <th scope="row">Medical Report</th>
                    <td>
                      <ul style={{listStyleType:"square", paddingInlineStart:"0px"}}>
                        <NavLink onClick={() => {toggle(); handleReportDisplay();}}>
                          <li>20.08.2020 | 1400-1430</li>
                          <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
                            <PatientReport searchIc={searchIc} user={user} name={name} modal={modal} report={report} sugarLevel={sugarLevel} cholesterolLevel={cholesterolLevel} bloodPressure={bloodPressure} toggle={toggle} />
                          </Modal>  
                        </NavLink>
                      </ul>
                    </td>
              </tr>
            </tbody>
          : null
        }
   
            

        </Table>
        </>
  );
}

export default PatientList;

