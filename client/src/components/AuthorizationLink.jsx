import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

export const AuthorizationLink = ({ market, testProviders, scope }) => {
  const testData = testProviders === "Test" ? "&test=true&input_provider=se-test-bankid-successful&input_username=180012121212" : ""
  const link =
    "https://link.tink.com/1.0/authorize/?" +
    "client_id=" +
    process.env.REACT_APP_CLIENT_ID +
    "&redirect_uri=http://localhost:3000/callback" +
    "&scope=" +
    scope +
    "&market=" +
    market +
    "&locale=en_US" +
    testData
  return <Button href={link}>Connect Bank</Button>;
};

AuthorizationLink.propTypes = {
  ssn: PropTypes.string,
  scope: PropTypes.string.isRequired,
  market: PropTypes.string.isRequired
};

export default AuthorizationLink;
