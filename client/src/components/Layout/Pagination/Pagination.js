import React from "react";
import CenterHorizontally from "../CenterHorizontaly/CenterHorizontaly";
import { Button } from "react-bootstrap";

const pagination = props => (
  <CenterHorizontally>
    {" "}
    <Button variant='outline-dark' onClick={props.handlePagination}>Show more...</Button>
  </CenterHorizontally>
);

export default pagination;
