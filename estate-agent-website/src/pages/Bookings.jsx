import { useState, useEffect } from "react";
import AddBookings from '../components/AddBooking'
import AllBookings from '../components/AllBookings'
import '../CSS/BookingPage.css'
import { url } from "../consts";

export default function BookingsPage() {

    let [allBookings, setAllBookings] = useState([]);


    const fetchAllBookings= () => {
      fetch(`${url}/booking/all`)
        .then((response) => response.json())
        .then((data) => {
          // Sort the data array by bookingDate in ascending order
          const sortedData = data.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
          setAllBookings(sortedData);
          console.log("Sorted Bookings: ", sortedData);
        })
        .catch((error) => {
          console.error("Error fetching bookings: ", error);
        });
          // setAllBookings(data));
        // console.log("Running fetch request for all bookings")
    };

      useEffect(() => {
        console.log("Loading booking page");
        fetchAllBookings();
    }, []);

    return (
        <div className="booking flex space-between">
            <div className="half-white-container-left">
                <div className="customer-grid">
                <AllBookings fetchAllBookings={fetchAllBookings}
                allBookings={allBookings} />
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