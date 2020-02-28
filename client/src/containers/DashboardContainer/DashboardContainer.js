import React, { Component, Fragment } from "react";
import Navigation from "../../components/Layout/Navigation/Navigation";
import Frame from "../../components/Layout/Frame/Frame";
import Card from "../../components/Layout/Cards/Cards";
import Resource from "../Resource/Resource";
import Pagination from '../LayoutController/PaginationContainer/PaginationContainer';

class DashboardController extends Component {
  constructor(props) {
    super(props);
    this.handler.bind(this);
    this.handlePagination.bind(this);
  }

  state = {
    filter: "all",
    limiter: 20
  };

  handler(e) {
    return this.setState({
      [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
    });
  }

  handlePagination(e) {
    return this.setState({ limiter: this.state.limiter + 5 })
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
        <Pagination handlePagination={e => this.handlePagination(e)} />
      </Fragment>
    );
  }
}

export default DashboardController;
