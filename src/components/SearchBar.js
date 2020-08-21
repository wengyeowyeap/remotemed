import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchBar = () => {

    return(
        <Row className="justify-content-end">
            <Col md={4}>
                <InputGroup>
                    <Input placeholder="Search IC Number" />
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <FontAwesomeIcon icon={faSearch} size="sm"/> 
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Col>
        </Row>
    )
}

export default SearchBar;