import { useState, useEffect } from "react";
import AddBookings from '../components/AddBooking';
import AllBookings from '../components/AllBookings';
import '../CSS/BookingPage.css';
import { url } from "../consts";

export default function BookingsPage() {
  let [allBookings, setAllBookings] = useState([]);
  let [buyerList, setBuyerList] = useState([]);
  let [propertyList, setPropertyList] = useState([]);

  //fetching all data in the actual Bookings page and then passing it through as props to the Add/All components will cut down on fetches and re-renders

  //doing this asynchronously will allow the other code to execute while this carries out the fetches & variable assignments in the background. The three fetches happen at the same time (rather than one after another) and then await Promise.all makes the fetchAllData function pause until all three feches have completed
  const fetchAllData = async () => {
    console.log("fetching all data");
    const [bookingsResponse, buyersResponse, propertiesResponse] = await Promise.all([
      fetch(`${url}/booking/all`),
      fetch(`${url}/buyer/all`),
      fetch(`${url}/property/all`)
    ]);

    //sets the consts as the JSON response values
    //await here makes sure that the JSON has been extracted before assignment
    const bookingsData = await bookingsResponse.json();
    const buyersData = await buyersResponse.json();
    const propertiesData = await propertiesResponse.json();

    //sorts the dates in ascending order here so that the AllBookings component doesn't fetch again and sort
    const sortedBookingsData = bookingsData.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
    //sets State values to be equal to th JSON responses for each fetch 
    setAllBookings(sortedBookingsData);
    setBuyerList(buyersData);
    setPropertyList(propertiesData);

  };

  //no dependency array in the useEffect so runs only on load/component mount
  useEffect(() => {
    console.log("Loading booking page");
    fetchAllData();
  }, []);

  return (
    <div className="booking flex space-between">
      <div className="half-white-container-left">
        <div className="customer-grid">
          {/* Parses the state values through to the components instead of letting them fetch the data and process it */}
          <AllBookings
            fetchAllData={fetchAllData}
            allBookings={allBookings}
            propertyList={propertyList}
          />
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
          <AddBookings
            fetchAllData={fetchAllData}
            allBookings={allBookings}
            buyerList={buyerList}
            propertyList={propertyList}
          />
        </div>
      </div>
    </div>
  );
}
