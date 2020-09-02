import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';
import PatientReport2 from "./PatientReport2"

const ReportModal = (props) => {
  const {
    record, user
  } = props;


  const [modal, setModal] = useState(false);
  

  const toggle = () => setModal(!modal);

  return (
    <div>
      <NavLink color="danger" onClick={toggle}>{record.appointment_id}</NavLink>
      <Modal size="lg" isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <PatientReport2  user={user} record={record} />

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReportModal;