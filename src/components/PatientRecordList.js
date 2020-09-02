import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ReportModal from './ReportModal';




const PatientRecordList = ({user}) => {
    const [records, setRecords] = useState([])
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }



    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/records/me",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then(result => {
                console.log(result.data)
                setRecords(result.data.my_patient_record)
            })

    }, [])





    return (
    <>
    <h5 style={{color:"#205072"}}>Record</h5>
    <br/>
    
    <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
        {records
        ? <> {records.map(record => {
            return (

                <li className="mb-1">
                    <ReportModal record={record} user={user}/>
                </li> 



            )

        })} </>
        : null
        }

    </ul>
    </>
)




}

export default PatientRecordList