// import Data from '../data/Data.json'
import AllSellers from '../components/AllSellers'
import RegisterSeller from '../components/RegisterSeller'
import AddBookings from '../components/AddBooking'
import '../CSS/SellersPage.css'
import { useEffect, useState } from 'react';
import {url} from "../consts";

export default function SellersPage() {

  let  [seller, setSeller] = useState([]);

  function fetchSellerData() {
      fetch(`${url}/seller/all`)
          .then((response) => response.json())
          .then((data) => setSeller(data));
  }

  useEffect(() => {
    fetchSellerData()
  }, []);

  return (
    <div className="sellers flex row-reverse space-between">
      <div className="half-white-container-left">
        <div className="customer-grid">
          <AllSellers seller={seller} />
        </div>
      </div>
      <div>
        <div className="half-white-container-right">
          <div className="color-background">
            <h1 className="title">Have a home you're looking to sell?</h1>
            <h2 className="blurb">Our team of experts are on hand to help get your sales listing just right. Register below to start!</h2>
            <h5 className="small-print">Please note - you cannot list your property for sale until you've registered as a Seller.</h5>
          </div>
        </div>
        <div className="half-white-container-right">
          <RegisterSeller fetchSellerData={fetchSellerData} seller={seller} />
        </div>
      </div>
    </div>
  )
}