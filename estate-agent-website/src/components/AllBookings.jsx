import { useEffect, useState } from "react";
import { url } from "../consts";
import Data from '../data/Data.json'

function CancelBooking(id, { fetchAllBookings }) {
  fetch(`${url}/booking/` + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  }).then(() => {
    alert("Viewing Cancelled");
    fetchAllBookings();
  });
}

function AllBookings({ fetchAllBookings }) {
  let [booking, setBooking] = useState([]);
  let [property, setProperty] = useState("");
  

  const dataArray = Object.values(Data.Properties);
  const forsale = dataArray.filter((item) => item.SaleStatus === "FORSALE");

  useEffect(() => {
    console.log("Running fetch request for all bookings")
    fetchAllBookings();
  }, []);

  return (
    <div>
      <div className="property-option">
        <p>Select Property : </p>

                <select name="Propertys" onChange={(e) => setProperty(e.target.value)}>
                <option value="">All Bookings</option>
                {forsale.map((item) => (
                    <option value={item.Address} key={item.id}>{item.Address}</option>
                ))}
                </select>
      </div>
      <br/>
    <table>
      <thead>
      
        <tr>
          {/* <th>ID</th> */}
          <th className="th-border">Buyer</th>
          <th>Property Address</th>
          <th>Date</th>
          <th>Time</th>
          <th>Cancel </th>
        </tr>
      </thead>
      <tbody>
        {booking
          .filter((booking) => !property || booking.property === property)
          .map((booking) => (
            <tr className="hover" key={booking.id}>
              {/* <td>{booking.id}</td> */}
            
              <td className="td-border">{booking.buyer}</td>
              <td className="td-border">{booking.property}</td>
              <td className="td-border" >{new Date(booking.date).toLocaleDateString()}</td>


              
              <td className="td-border">{booking.time}</td>
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
