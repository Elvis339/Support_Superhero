import React, { Component } from "react";
import axios from 'axios';
import PaginationComponent from "../../../components/Layout/Pagination/Pagination";
import { getJwt } from '../../../helpers/jwt';

class Pagination extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    displayPagination: false,
    limiter: 20
  };

  async componentDidMount() {
    try {
      const documentCounter = await axios.get("/api/v1/documents/ping", {
        headers: {
          Authorization: `Bearer: ${getJwt()}`
        }
      });
      const pagination = documentCounter.data.documents;
      if (pagination > this.state.limiter) {
        return this.setState({
          displayPagination: true
        });
      }
      return this.setState({
        displayPagination: false
      });
    } catch (error) {
      console.error(error);
    }
  };


  render() {
      return (
        this.state.displayPagination === true ? <PaginationComponent handlePagination={this.props.handlePagination} /> : null
      ) 
  }
};

export default Pagination;