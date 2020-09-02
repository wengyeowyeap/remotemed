import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { NavLink, Table} from 'reactstrap';
import SearchBar from './SearchBar';

const AdminCheckApptList = (props) => {

    const [searchIc, setSearchIc] = useState('');
    const [apptList, setApptList]= useState([]);

    const handleButtonClick = (e) =>{
    axios.get(`http://127.0.0.1:5000/api/v1/appointments/show?ic_number=${searchIc}`, 
    {
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(result => {
        let apptList = result.data.all_list
        console.log(result.data.all_list)
        setApptList(apptList)

        })
        .catch(error => {
        console.log('ERROR: ', error)
    })
    }

      const [showAppt,setShowAppt] = useState(false)
      const [doctor, setDoctor] = useState("");
      const [patient, setPatient] = useState("");
      const [startDateTime, setStartDateTime] = useState("");
      const [endDateTime, setEndDateTime] = useState("");

      const handleCheckApptClick = (e) =>{ 
        console.log(e)
        axios.get(`http://127.0.0.1:5000/api/v1/appointments/search?appointment_id=${e}`,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }, 
        })
          .then(result => {
            let user = result.data
            console.log(result.data)
            setShowAppt(true)
            setDoctor(user.doctor_id)
            setPatient(user.patient_id)
            setStartDateTime(user.appointment_start)
            setEndDateTime(user.appointment_start)
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

    return(
        <> 
        <SearchBar onButtonClick={handleButtonClick} searchIc={searchIc} setSearchIc={setSearchIc} onEnterPress={handleKeypress} />
        <br/>
        <div>
        <h3 style={{color:"#205072"}}>Appointment Schedules</h3>
        <br/>
        {apptList == null
            ?   <h5>There is no upcoming appointment.</h5>
            :   <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                {apptList.map((aplist,apli) => {
                            return(
                                <>
                                    <li key={apli}>
                                        <NavLink value={aplist.appointment_id} onClick={() => handleCheckApptClick(aplist.appointment_id)}>{aplist.start_time}</NavLink>
                                    </li>
                                </>
                            )
                        })}
                </ul>
        }
        </div>
        {
          showAppt
          ? <Table>
            <thead>
                <tr>
                <th></th>
                <th>Appointment Info</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <th scope="row">Doctor ID</th>
                  <td>{doctor}</td>
                </tr>
                <tr>
                  <th scope="row">Patient ID</th>
                  <td>{patient}</td>
                </tr>
                <tr>
                  <th scope="row">Start Datetime</th>
                  <td>{startDateTime}</td>
                </tr>
                <tr>
                  <th scope="row">End Datetime</th>
                  <td>{endDateTime}</td>
                </tr>
            </tbody>
          </Table>
          : null
        }
    </>  
    )
}

export default AdminCheckApptList;
