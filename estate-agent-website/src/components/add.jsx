import { useState } from "react";
import Data from '../data/Data.json'
import { url } from "../consts";
import { DiDatabase } from "react-icons/di";

export default function AddBooking({ fetchBookingData, buyerData, propertyData }) {

  //todays date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  // const formattedDate = yyyy + '-' + mm + '-' + dd;
  const formattedDate = yyyy + '-' + mm + '-' + dd;

  // create state
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  let [property, setProperty] = useState("");
  let [propertyid, setPropertyID] = useState("");
  let [buyer, setBuyer] = useState("");

  //Filter the option list so only holds properties that are forsale
  //can only use the filter function as an array so need to place the json data into an array
  const dataArray = Object.values(Data.Properties);
  const forsale = dataArray.filter((item) => item.SaleStatus === "FORSALE");

  const existingBooking = Data.Bookings.find((booking) => {
    return (
      booking.bookingDate === bookingDate &&
      booking.bookingTime === bookingTime &&
      booking.property === property

    );
  });

  const handleSubmit = (e) => {
    
    // tells the event if the event doesnt get handled dont use the default action as I want to do something else
    e.preventDefault();
    console.log(bookingDate);
    console.log(bookingTime);
    if (property === "" || buyer === "") {
      alert("Please select your name & a property to book a viewing for");
    } else {
      if (existingBooking) {
        alert("Please select another time slot as this is booked");
      } else {
        console.log("date in add", bookingDate)
        const booking = {
          bookingDate,
          bookingTime,
          property: {id: property},
          buyer: {id: buyer}
        };

        fetch("http://localhost:8001/booking/new", {
          method: "POST",
          // for most api json call
          headers: { "Content-Type": "application/json" },
          // changing into json data
          body: JSON.stringify(booking),
        }).then(() => {
          alert("New Viewing Booked");

          // reset text boxes
          setBookingDate(formattedDate);
          setBookingTime("");
          setProperty("");
          setPropertyID("");
          setBuyer("");
          fetchBookingData();
        });
      }
    }
  };

  return (
    <div className="register-buyer">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex-register details">
            <div className="name-input left">
              <p>Buyers: </p>
              <select name="Buyers" onChange={(e) => setBuyer(e.target.value)} value={buyer}>
                <option value=""></option>
                {buyerData.map((buyer) => (
                  <option value={buyer.id} key={buyer.id}>{buyer.firstName} {buyer.surname}{" "}</option>
                ))}
              </select>
            </div>
            <div className="name-input right">
              <p>Properties For Sale: </p>
              <select name="property" onChange={(e) => setProperty(e.target.value)} value={property.address}>
                <option value=""></option>
                {propertyData.map((property) => (
                  <option value={property.address} key={property.id}>{property.address}</option>
                ))}
              </select>
            </div>
            <div className="name-input ">
              <p>  Date:</p>
              <input id="fname" type="date" required value={bookingDate} min={formattedDate} onChange={(e) => setBookingDate(e.target.value)} />
            </div>
            <div className="name-input">
              <p>Time:</p>
              <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                <option value=""></option>
                <option value="8-9am">8am to 9am</option>
                <option value="9-10am">9am to 10am</option>
                <option value="10-11am">10am to 11am</option>
                <option value="11am-12pm">11am to 12pm</option>
                <option value="12-1pm">12pm to 1pm</option>
                <option value="1-2pm">1pm to 2pm</option>
                <option value="2-3pm">2pm to 3pm</option>
                <option value="3-4pm">3pm to 4pm</option>
                <option value="4-5pm">4pm to 5pm</option>
              </select>
            </div>

          </div>
          <button className="submit-button">Add Booking</button>
        </div>
      </form>
    </div>
  );
}
