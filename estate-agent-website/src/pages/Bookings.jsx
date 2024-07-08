
import { useState, useEffect } from "react";
import AddBookings from '../components/AddBooking'
import AllBookings from '../components/AllBookings'
import '../CSS/BookingPage.css'
import { url } from "../consts";

export default function BookingsPage() {

    let [apiData, setData] = useState([]);
    const [buyer, setBuyer] = useState();
    const [property, setProperty] = useState();

    const fetchBookingData = () => {
      fetch("http://localhost:8001/booking/all")
        .then((response) => response.json())
        .then((data) => setData(data));
    };

    const fetchBuyers = () => {
      fetch(`${url}/buyers/all`)
      .then((response) => response.json())
      .then((data) => setBuyer(data));
    }

    function fetchProperty() {
      fetch(`${url}/property/all`)
      .then((response) => response.json())
      .then((data) => setProperty(data));
    }
  
      useEffect(() => {
        fetchBookingData();
        fetchBuyers();
        fetchProperty();
    }, []);

    return (
        <div className="booking flex space-between">
            <div className="half-white-container-left">
                <div className="customer-grid">
                <AllBookings fetchBookingData={fetchBookingData} />
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
              <AddBookings fetchBookingData={fetchBookingData} />
              </div>
        </div>
    </div>
    )
}