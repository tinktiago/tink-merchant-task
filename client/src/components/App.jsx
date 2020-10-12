import React from "react";
import { Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Callback } from "./Callback";
import { Main } from "./Main";

export const App = () => (
  <Container>
    <Row>
      <Col className="d-inline-flex align-items-center mt-3">
        <div className="rounded-circle" style={{ width: "20px", height: "20px" }}></div>
        <h2 className="m-0 pl-3 text-muted">Fav merchant app</h2>
      </Col>
    </Row>
    <Row className="app">
      <Col md={{ size: 6, offset: 3 }} style={{ paddingTop: "20px" }}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </Col>
    </Row>
  </Container>
);

export default App;
