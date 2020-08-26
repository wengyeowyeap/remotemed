import React from "react";

const AppointmentList = (props) => {
    const {day,showAppointment, setShowAppointment} = props;

    return(
    <>
    {
        setShowAppointment
        ?   <div>
                <h5>day:{day}</h5>
                <ul>
                    <li>Appointment 1</li>
                    <li>Appointment 2</li>
                </ul>
            </div>
        : null
    }
    </>
    )

}

export default AppointmentList;
