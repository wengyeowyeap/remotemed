import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faClinicMedical, faPhone, faFax } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => (
  <>
  <div className="footer d-flex align-items-center">
    <div className="justify-content-start" >
      {/* <img src="https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png" alt="stayHomeLogo" height="30px"/> */}
      <FontAwesomeIcon icon={faClinicMedical} size="md"/>
      <span className="ml-3">#STAYHOME #STAYSAFE #REMOTEMED
      <FontAwesomeIcon icon={faPhone} size="md"className="mr-2 ml-3"/>Tel: +603 5521 5151<FontAwesomeIcon icon={faFax} size="md"className="mr-2 ml-3"/>Fax: +603 5521 5150
      </span>
    </div>
    <div className="ml-auto">
        <div className="col copyright">
        <small className="text-white-50">© 2020. All Rights Reserved. - by remoteMed</small>
        </div>
    </div>
  </div>
  
  </>
);

export default Footer;