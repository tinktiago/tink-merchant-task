import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Merchant from "./Merchant";

export const FinancialOverview = ({ data, error, loading }) => {

  if (error) {
    return <noscript />;
  }

  if (loading) {
    return <Spinner className="m-3" width="50px" image={"./spinner.png"} />;
  }

  if (!data) {
    return <noscript />;
  }

  return (
    <Merchant data={data} />
  );
};

FinancialOverview.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  error: PropTypes.string
};

export default FinancialOverview;
