import React from "react";
import PropTypes from "prop-types";
import { getCurrency } from "../utils/getCurrency";
import { formatNumber, formatDate } from "../utils/Format";
import { Logo } from "./Logo";

export const Merchant = ({ data }) => {

  if (
    !data ||
    !data.response ||
    !data.response.transactionData ||
    !data.response.categoryData ||
    !data.response.accountData
  ) {
    return <noscript />;
  }
  const currency = getCurrency(data);

  if (data.response.transactionData.count === 0) {
    return (
      <div>
        <h4 className="pink">Some of your transactions</h4>
        <div style={{ margin: "30px" }}>
          <p>You don’t seem to have any transactions.</p>
        </div>
      </div>
    );
  }

const mapLogos = (description) => {
    if(description.toLowerCase().includes("amazon"))
        return "./logos/amazon.png"
    else if(description.toLowerCase().includes("apple"))
      return "./logos/apple.png"
    else if(description.toLowerCase().includes("hedvig"))
      return "./logos/hedvig.png"
    else if(description.toLowerCase().includes("hemkop"))
      return "./logos/hemkop.png"
    else if(description.toLowerCase().includes("h&m"))
      return "./logos/hm.png"
    else if(description.toLowerCase().includes("ikea"))
      return "./logos/ikea.png"
    else if(description.toLowerCase().includes("mcdonalds"))
      return "./logos/mcdonalds.png"
    else if(description.toLowerCase().includes("netflix"))
      return "./logos/netflix.png"
    else if(description.toLowerCase().includes("spotify"))
      return "./logos/spotify.png"
    else if(description.toLowerCase().includes("starbucks"))
      return "./logos/starbucks.png"
    else if(description.toLowerCase().includes("subway"))
      return "./logos/subway.png"
    else return null
  }
  
  //Creating a new set of unique description to help mapping later on.
  //Filtering only transactions categorized as EXPENSES.
  const uniqueDescription = [... new Set(data.response.transactionData.results.filter(result => result.transaction.categoryType === "EXPENSES").map(result => result.transaction.description))];

  let merchants = [];

  //Mapping through the unique descriptions and generating a array of merchant objects with occurrences, total amount spent and logo.
  //Filtering only transactions categorized as EXPENSES.
  uniqueDescription.map((res,index) => {
    let temp = {};
    temp.merchantName = uniqueDescription[index];
    temp.occurrences = data.response.transactionData.results.filter(result => result.transaction.categoryType === "EXPENSES").map(result => result.transaction.description).reduce((pre, cur) => (cur === res) ? ++pre : pre, 0);
    temp.amount = data.response.transactionData.results.filter(result => result.transaction.categoryType === "EXPENSES" && result.transaction.description === temp.merchantName).reduce((acc, cur) => Number(acc + Math.abs(cur.transaction.amount)),0)
    temp.logo = mapLogos(temp.merchantName);
    merchants.push(temp);
  })

  //Finding favorite merchand and most used merchant and saving them to variables, so it is easier to read the code further on.
  const topMerchant = merchants.find(merchant => merchant.amount === Math.abs(Math.max.apply(Math, merchants.map(merchant => merchant.amount))));
  const mostUsedMerchant = merchants.find(merchant => merchant.occurrences === Math.max.apply(Math, merchants.map(merchant => merchant.occurrences)));

  //Mapping transactions and sorting by amount (desc), so we can pick the most expensive one.
  const mostExpensiveTransaction = data.response.transactionData.results.filter(result => result.transaction.categoryType === "EXPENSES").map(result => (
    {id: result.transaction.id,
    amount: Math.abs(result.transaction.amount),
    date: result.transaction.date,
    description: result.transaction.description,
    categoryId: result.transaction.categoryId}
  )).sort((a,b) => b.amount - a.amount).map(transaction => (
      <p className="text-muted" key={transaction.id}>
        Your most expensive transaction was at <strong>{transaction.description}</strong>. You've spent <strong>{formatNumber(transaction.amount)}{currency}</strong> on <strong>{formatDate(new Date(transaction.date))}</strong>
      </p>
    ));

  return (
    <div>
      <h3 className="pink">Your favorite merchant</h3>
      {topMerchant.logo !== null ? <img src={topMerchant.logo} alt={topMerchant.description}/> : <Logo merchName={topMerchant.merchantName}/>}
      <p className="h4 text-dark font-weight-bolder py-3">{formatNumber(topMerchant.amount)}{currency}</p>
      <p className="text-muted">During 2020 you've spent {formatNumber(topMerchant.amount)}{currency} at <strong>{topMerchant.merchantName}</strong></p>
      <h5 className="pink mt-4 font-weight-light">Did you know?</h5>
      {topMerchant.merchantName !== mostUsedMerchant.merchantName ? 
      <p className="text-muted">Your most common merchant was <strong>{mostUsedMerchant.merchantName}</strong>, with <strong>{mostUsedMerchant.occurrences}</strong> expenses throughout the year.</p>
      : 
      <p className="text-muted"><strong>{mostUsedMerchant.merchantName}</strong> was also your most common merchant, with <strong>{mostUsedMerchant.occurrences}</strong> expenses throughout the year.</p>
      }
      <div>{mostExpensiveTransaction.slice(0,1)}</div>
    </div>
  );
};

Merchant.propTypes = {
  data: PropTypes.object.isRequired
};

export default Merchant;
