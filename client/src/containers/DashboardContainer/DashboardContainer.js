import React, { Component, Fragment } from "react";
import Navigation from "../../components/Layout/Navigation/Navigation";
import Frame from "../../components/Layout/Frame/Frame";
import Card from "../../components/Layout/Cards/Cards";
import Resource from "../Resource/Resource";
import Pagination from "../../components/Layout/Pagination/Pagination";
import axios from "axios";
import { getJwt } from "../../helpers/jwt";

class DashboardController extends Component {
  constructor(props) {
    super(props);
    this.handler.bind(this);
  }

  state = {
    filter: "all",
    limiter: 20,
    displayPagination: false
  };

  async componentDidMount() {
    try {
      const data = await axios.get("/api/v1/documents/ping", {
        headers: { Authorization: `Bearer: ${getJwt()}` }
      });
      const pagination = data.data.documents;
      if (pagination > this.state.limiter) {
        return this.setState({
          displayPagination: true
        });
      }
      return this.setState({ displayPagination: false });
    } catch (error) {
      console.error(error);
    }
  }

  handler(e) {
    return this.setState({
      [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
    });
  }

  render() {
    return (
      <Fragment>
        <Navigation handleClick={e => this.handler(e)} show={true} />
        <Frame row={true}>
          <Resource
            path={`/api/v1/documents?filter=${this.state.filter}&limiter=${this.state.limiter}`}
            render={data => {
              return data.payload.map((val, index) => {
                return (
                  <Fragment key={index}>
                    <Card title={val.title} uri={`/document/${val._id}`} />
                  </Fragment>
                );
              });
            }}
          />
        </Frame>
        {this.state.displayPagination === true ? (
          <Pagination
            handlePagination={() =>
              this.setState({ limiter: this.state.limiter + 5 })
            }
          />
        ) : null}
      </Fragment>
    );
  }
}

export default DashboardController;
