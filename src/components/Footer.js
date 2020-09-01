import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => (
  <>
  <div className="footer d-flex align-items-center">
    <div className="justify-content-start" >
      {/* <img src="https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png" alt="stayHomeLogo" height="30px"/> */}
      <FontAwesomeIcon icon={faClinicMedical} size="md"/>
      <span className="ml-3">#STAYHOME #STAYSAFE #REMOTEMED</span>
    </div>
    <div className="ml-auto">
        <div className="col copyright">
        <p className=""><small className="text-white-50">© 2020. All Rights Reserved. - by remoteMed</small></p>
        </div>
    </div>
  </div>
  
  </>
);

export default Footer;