// import Data from '../data/Data.json'
import AllBuyers from '../components/AllBuyers'
import RegisterBuyer from '../components/RegisterBuyer'
import '../CSS/BuyersPage.css'
import { useEffect, useState } from 'react'
import {url} from "../consts";

export default function BuyersPage() {

  let [buyer, setBuyer] = useState([]);

  function fetchBuyerData() {
    fetch(`${url}/buyer/all`)
    .then((response) => response.json())
    .then((data) => setBuyer(data));
  }

  useEffect(() => {
    fetchBuyerData()
  }, []);

  return (
    <div className="buyers flex space-between">
      <div className="half-white-container-left">
        <div className="customer-grid">
          <AllBuyers buyer={buyer}/>
        </div>
      </div>
      <div>
        <div className="half-white-container-right">
          <div className="color-background">
            <h1 className="title">Looking for your new home?</h1>
            <h2 className="blurb">Register as a buyer below so we can help your dreams come true!</h2>
          </div>
        </div>
        <div className="half-white-container-right">
          <RegisterBuyer fetchBuyerData={fetchBuyerData} buyer={buyer} />
        </div>
      </div>
    </div>
  )
}