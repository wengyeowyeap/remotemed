import React,{useState} from "react";
import { NavLink, Table } from 'reactstrap';


const AppointmentList = (props) => {
    const {eachAppointment,showApptList, searchIc} = props;

    return(
    <> 
        <Table>
        <thead>
            <tr>
            <th>Appointments</th>
            <th>Patient's Name: {searchIc}</th>
            </tr>
        </thead>
        {
        showApptList
        ? <tbody>
                <tr>
                <th scope="row">Report List</th>
                        <td style = {{textTransform:"capitalize"}}>
                        <ul style={{listStyleType:"none", paddingInlineStart:"0px"}}>
                        <div>{eachAppointment}</div>
                        </ul>
                    </td>
                </tr>
            </tbody>
        : null
        }
        </Table>
    </>
    )

}


export default AppointmentList;

