import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faFacebookSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope} from "@fortawesome/free-regular-svg-icons";
import { faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/HomeHighlight.css";

const HomeHighlight = () => (
        <div className="mt-5 pt-5 pb-5 highlight">
        <div className="container">
        <div className="row">
            <div className="col-lg-5 col-xs-12 about-company">
            <h2>Heading</h2>
            <p className="pr-5 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
            <p><a href="#"><FontAwesomeIcon icon={faFacebookSquare} size="sm"/></a><a href="#"><FontAwesomeIcon icon={faLinkedin} size="sm"/></a></p>
            </div>
            <div className="col-lg-3 col-xs-12 links">
            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                <ul className="m-0 p-0">
                <li>- <a href="https://intouchhealth.com/finding-the-right-term-for-modern-digital-healthcare/" target="_blank">Knowledge 1</a></li>
                <li>- <a href="#">Nam mauris velit</a></li>
                <li>- <a href="#">Etiam vitae mauris</a></li>
                </ul>
            </div>
            <div className="col-lg-4 col-xs-12 location">
            <h4 className="mt-lg-0 mt-sm-4">Location</h4>
            <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
            <p className="mb-0"><FontAwesomeIcon icon={faPhone} size="md"/>(541) 754-3010</p>
            <p><FontAwesomeIcon icon={faEnvelope} size="md"/>info@hsdf.com</p>
            </div>
        </div>
        </div>
        </div>
);

export default HomeHighlight;

