import { useEffect, useState } from "react";
import { url } from "../consts";
// import Data from '../data/Data.json'

function CancelBooking(id, { fetchAllBookings }) {
  fetch(`${url}/booking/delete/` + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  }).then(() => {
    alert("Viewing Cancelled");
    fetchAllBookings();
  });
}

function AllBookings({ fetchAllBookings, allBookings }) {
  let [booking, setBooking] = useState([]);
  let [property, setProperty] = useState("");
  const[propertyList, setPropertyList] = useState([]);

  // const dataArray = Object.values(Data.Properties);

  const getPropertyList = () => {
    fetch(`${url}/property/all`)
    .then((response) => response.json())
    .then((data) => setPropertyList(data))
    .then(console.log("Property list: " + propertyList))
  }

  const forsale = propertyList.filter((property) => property.saleStatus === "FORSALE");
  console.log("Properties for sale: ", forsale);

  useEffect(() => {
    fetchAllBookings();
    getPropertyList();
  }, []);

  return (
    <div>
      <div className="property-option">
        <p>Select Property: </p>
                <select name="property" onChange={(e) => setProperty(e.target.value)}>
                <option value="">All Bookings</option>
                {forsale.map((property) => (
                    <option value={property.id} key={property.id}>{property.address}</option>
                ))}
                </select>
      </div>
      <br/>
    <table>
      <thead>
        <tr>
          <th className="th-border">Buyer</th>
          <th>Property Address</th>
          <th>Date</th>
          <th>Time</th>
          <th>Cancel </th>
        </tr>
      </thead>
      <tbody>
        {allBookings
          .filter((booking) => !property || booking.property === property)
          .map((booking) => (
            <tr className="hover" key={allBookings.id}>
              <td className="td-border">{allBookings.buyer}</td>
              <td className="td-border">{allBookings.property}</td>
              <td className="td-border" >{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td className="td-border">{booking.bookingTime}</td>
              <td className="td-border">
                <button
                  onClick={() => CancelBooking(booking.id, { fetchAllBookings })}
                >
                  Cancel Booking
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
</div>
  );
}

export default AllBookings;
