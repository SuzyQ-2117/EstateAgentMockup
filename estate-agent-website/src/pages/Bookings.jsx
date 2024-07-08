
import { useState, useEffect } from "react";
import AddBookings from '../components/AddBooking'
import AllBookings from '../components/AllBookings'
import '../CSS/BookingPage.css'
import { url } from "../consts";

export default function BookingsPage() {

    let [apiData, setData] = useState([]);


    const fetchAllBookings= () => {
      fetch("http://localhost:8001/booking/all")
        .then((response) => response.json())
        .then((data) => setData(data));
    };


    // const fetchProperty = () => {
    //   fetch(`${url}/property/all`)
    //   .then((response) => response.json())
    //   .then((data) => setProperty(data));
    // }
  
      useEffect(() => {
        console.log("Loading booking page");
        fetchAllBookings();
    }, []);

    return (
        <div className="booking flex space-between">
            <div className="half-white-container-left">
                <div className="customer-grid">
                <AllBookings fetchAllBookings={fetchAllBookings} />
                </div>
            </div>
        <div>
            <div className="half-white-container-right">
            <div className="color-background">
            <h1 className="title">Bookings</h1>
            <h2 className="blurb">Book an appointment to view your dream home!</h2>
          </div>
        </div>
            <div className="half-white-container-right">
              <AddBookings fetchAllBookings={fetchAllBookings} />
              </div>
        </div>
    </div>
    )
}