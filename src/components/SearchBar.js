import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/SearchBar.css";

const SearchBar = () => {

    return(
        <Row className="justify-content-end">
                <div className="container h-100">
                    <div className="d-flex justify-content-end h-100">
                        <div className="searchbar">
                        <input className="search_input" maxLength = "12" type="text" name="" placeholder="Search NRIC Number..."/>
                        <p className="search_icon"><FontAwesomeIcon icon={faSearch} size="sm"/></p>
                        </div>
                    </div>
                </div>
        </Row>
    )
}

export default SearchBar;