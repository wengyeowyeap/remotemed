import React,{ useState } from "react";
import { Row} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/SearchBar.css";


const SearchBar = ({ onButtonClick, searchIc, setSearchIc, onEnterPress }) => {
//   const [searchIc, setSearchIc] = useState('');

  const handleIcSearch = e => {
    setSearchIc(e.target.value)    
  };

    return(
        <div>
        <Row className="justify-content-end">
                <div className="container h-100">
                    <div className="d-flex justify-content-end h-100">
                        <div className="searchbar">
                            {
                                handleIcSearch
                                ? <><input className="search_input" maxLength = "12" type="text" value={searchIc} onChange={handleIcSearch} onKeyPress={onEnterPress} placeholder="Search NRIC Number..."/>
                                <button className="search_icon" onClick={() => onButtonClick(searchIc)}>
                                    <FontAwesomeIcon icon={faSearch} size="sm"/>
                                </button></>
                                : null
                                
                            }
                        
                        </div>
                    </div>
                </div>
        </Row>

        </div>
       
    )
}

export default SearchBar;