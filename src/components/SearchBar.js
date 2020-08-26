import React,{ useState } from "react";
import { Row} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/SearchBar.css";
import axios from 'axios'


const SearchBar = (props) => {
    const [icNum, setIcNum] = useState("");
    const [icExist, setIcExist] = useState(false);
    const [delayIc, setDelayIc] = useState(null);

    const checkIcNum = icNum => {
        console.log("Making API call to check ic!");
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/records/show?ic_number=${icNum}`
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


    return(
        <div>
        <Row className="justify-content-end">
                <div className="container h-100">
                    <div className="d-flex justify-content-end h-100">
                        <div className="searchbar">
                        <input className="search_input" maxLength = "12" type="text" onChange={handleIcSearch} name="" placeholder="Search NRIC Number..."/>
                        <button className="search_icon" onClick={handleIcSearch}>
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