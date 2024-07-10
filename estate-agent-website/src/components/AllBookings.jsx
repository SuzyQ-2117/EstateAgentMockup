import { useEffect, useState } from "react";
import { url } from "../consts";

function CancelBooking(id, { fetchAllData }) {
  fetch(`${url}/booking/delete/` + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    alert("Viewing Cancelled");
    fetchAllData();
  });
}

function AllBookings({ fetchAllData, allBookings, propertyList }) {
  let [property, setProperty] = useState("");

  const forsale = propertyList.filter((property) => property.saleStatus === "FORSALE");

  useEffect(() => {
    fetchAllData();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredBookings = allBookings.filter(
    (booking) => (!property || booking.address === property) &&
    new Date(booking.bookingDate) >= today
  );

  return (
    <div>
      <div className="property-option">
        <p>Select Property: </p>
        <select name="property" onChange={(e) => setProperty(e.target.value)}>
          <option value="">All Bookings</option>
          {forsale.map((property) => (
            <option value={property.address} key={property.id}>{property.address}</option>
          ))}
        </select>
      </div>
      <br />
      {filteredBookings.length === 0 ? (
        <p>There are no bookings for this property.</p>
      ) : (
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
          {filteredBookings
            .filter((booking) => !property || booking.address === property)
            .map((booking) => (
              <tr className="hover" key={booking.id}>
                <td className="td-border">{booking.buyer}</td>
                <td className="td-border">{booking.address}</td>
                <td className="td-border" >{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="td-border">{booking.bookingTime}</td>
                <td className="td-border">
                  <button
                    onClick={() => CancelBooking(booking.id, { fetchAllData })}
                  >
                    Cancel Booking
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default AllBookings;
