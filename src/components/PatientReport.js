import React from "react";
import {Button, ModalFooter, ModalHeader, FormFeedback, FormText,FormGroup,Label,Input, ModalBody} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientReport = (props) => {
    const {toggle} = props

    return(
        <div className = "d-flex flex-column mx-5 mt-5 mb-5">
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </div>
    )
}

export default PatientReport;