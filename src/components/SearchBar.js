import React,{ useState } from "react";
import { Row, Col, FormText, FormFeedback, Modal, Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/SearchBar.css";
import axios from 'axios'


const SearchBar = (props) => {
    const{className, modalSearch, toggleModalSearch} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [icNum, setIcNum] = useState("");
    const [icExist, setIcExist] = useState(false);
    const [delayIc, setDelayIc] = useState(null);

    const checkIcNum = icNum => {
        console.log("Making API call to check ic!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/users/check_ic?ic=${icNum}`
          )
          .then(response => {
            console.log(response.data);
            if (response.data.valid) {
              setIcExist(true);
            } else {
              setIcExist(false);
            }
          });
      };

      const handleIcSearch = e => {
        // clears queue so that the old keystrokes don't trigger axios call
        clearTimeout(delayIc);
        const newIc = e.target.value
        setIcNum(newIc)
        // put each new keystroke into the queue
        const newDelay = setTimeout(() => {      
          checkIcNum(newIc);
        }, 500);    
        setDelayIc(newDelay);
      };

      let icformat = /([0-9]){2}([0-1]){1}([0-9]){1}([0-3]){1}([0-9]){7}/
      let icFormFeedback
      let icIsValid
      let icIsInvalid
      if (icNum.length === 0){
        icFormFeedback = <FormFeedback></FormFeedback>
      } else if (icNum.match(icformat) && icExist){
        icFormFeedback = <FormText color="success">IC is available</FormText>
        icIsValid = true
        icIsInvalid = false
      } else if (!icNum.match(icformat)){    
        icFormFeedback = <FormText color="danger">Please input the correct IC format</FormText>
        icIsValid = false
        icIsInvalid = true
      } else if(!icExist){    
        icFormFeedback = <FormText color="danger">Sorry! That's an account exist for this IC Number.</FormText>
        icIsValid = false
        icIsInvalid = true
      }

    return(
        <div>
        <Row className="justify-content-end">
                <div className="container h-100">
                    <div className="d-flex justify-content-end h-100">
                        <div className="searchbar">
                        <input className="search_input" maxLength = "12" type="text" onChange={handleIcSearch} name="" placeholder="Search NRIC Number..."/>
                        <button className="search_icon">
                            <FontAwesomeIcon icon={faSearch} size="sm"/>
                        </button>
                        </div>
                    </div>
                </div>
        </Row>

        </div>
       
    )
}

export default SearchBar;