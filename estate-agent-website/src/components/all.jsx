import { useEffect, useState } from "react";
import Data from "../data/Data.json";
import { url } from "../consts";

function CancelBooking(id, { fetchBookingData }) {
  fetch(`${url}/booking/` + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  }).then(() => {
    alert("Viewing Cancelled");
    fetchBookingData();
  });
}

function AllBookings({ fetchBookingData, fetchBuyers, fetchProperty, buyerData, propertyData, apiData }) {
  let [booking, setBooking] = useState([]);
  let [property, setProperty] = useState("");

  const dataArray = Object.values(propertyData);
  const forsale = dataArray.filter((property) => property.saleStatus === "FORSALE");

  useEffect(() => {
    console.log("Running fetch request for all bookings")
    fetchBookingData();
    fetchBuyers();
    fetchProperty();
  }, []);

  return (
    <div>
      <div>
        <p>Select Property: </p>
        <select name="properties" onChange={(e) => setProperty(e.target.value)}>
          <option value="">All Bookings</option>
          {forsale.map((property) => (
            <option value={property.address} key={property.id}>{property.address}</option>
          ))}
        </select>
      </div>
      <br/>
      <table>
        <thead className="property-option">
          <tr>
            <th className="th-border">Buyer</th>
            <th>Property Address</th>
            <th>Date</th>
            <th>Time</th>
            <th>Cancel </th>
          </tr>
        </thead>
        <tbody>
          {apiData.filter((booking) => !property || apiData.property === apiData).map((booking) => (
              <tr className="hover" key={booking.id}>
                <td className="td-border">{booking.buyerData}</td>
                <td className="td-border">{booking.property}</td>
                <td className="td-border" >{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="td-border">{booking.bookingTime}</td>
                <td className="td-border">
                  <button onClick={() => CancelBooking(booking.id, { fetchBookingData })}>Cancel Booking</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllBookings;
