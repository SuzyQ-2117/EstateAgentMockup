import { useState } from "react";
import Data from '../data/Data.json';
import { url } from "../consts";

export default function AddBooking({ fetchAllData, allBookings, buyerList, propertyList }) {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  let [property, setProperty] = useState("");
  let [propertyID, setPropertyID] = useState("");
  let [buyer, setBuyer] = useState("");

  //gets today's date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  //formats today's fate into a useable string that can be compared against other string values
  const formattedDate = yyyy + '-' + mm + '-' + dd;

  //filters the list of properties to only include proerties where the salestatus is FORSALE and assigns the filtered list to a new variable called forsale
  const forsale = propertyList.filter((property) => property.saleStatus === "FORSALE");

  //the function that submits a new booking
  const handleSubmit = (e) => {
    e.preventDefault();
    //checks if either property or buyer have been left as blank and alerts the user to select a property and buyer
    if (property === "") {
      alert("Please select a property to book a viewing for");
    } if(buyer === "Not listed") {
      alert("Please register your name on the Buyers page");
    } else {
      //if property and buyer are not blank, this will compare existing bookings with the suggested new booking and will make sure that the date & time & property are not already booked and assigns it a value of either true (date & time & property all match) or false (one or more fields do not match)
      const existingBooking = allBookings.find((booking) => (
        booking.bookingDate === bookingDate &&
        booking.bookingTime === bookingTime &&
        booking.property === property.id
      ));
      //this is shorthand for if(existingBooking == true) - if the date/time/property match an existing booking, then the booking is not sent to the server
      if (existingBooking) {
        alert("Please select another time slot as this is booked");
      } else {
        //only packs the data into the const and sends it to the server if the value of existingBooking is false - which is implied because it it's not true it can only be one other value
        const newBooking = {
          bookingDate,
          bookingTime,
          property: { id: property, address: property },
          buyer: { id: buyer }
        };

        fetch(`${url}/booking/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBooking),
        }).then(() => {
          alert("New Viewing Booked");
          setBookingDate("");
          setBookingTime("");
          setProperty("");
          setPropertyID("");
          setBuyer("");
          fetchAllData();
        });
      }
    }
  };


  //sets the state for both property AND propertyID at the same time from only one input field
  const handlePropertyChange = (propertyAddress) => {
    setProperty(propertyAddress);
    const selectedProperty = propertyList.find(property => property.address === propertyAddress);
    if (selectedProperty) {
      setPropertyID(selectedProperty.propertyID);
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
                <option value="">Please select</option>
                {buyerList.map((buyer) => (
                  <option value={buyer.id} key={buyer.id}>{buyer.firstName} {buyer.surname}{" "}</option>
                ))}
                <option value="Not listed">Not listed</option>
              </select>
            </div>
            <div className="name-input right">
              <p>Properties For Sale: </p>
              <select name="property" onChange={(e) => handlePropertyChange(e.target.value)} value={property}>
                <option value="">Please select</option>
                {forsale.map((property) => (
                  <option value={property.id} key={property.id}>{property.address}</option>
                ))}
              </select>
            </div>
            <div className="name-input ">
              <p>Date:</p>
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
