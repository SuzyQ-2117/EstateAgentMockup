import { useEffect, useState } from "react";
import Data from "../data/Data.json";

function CancelBooking(id, { fetchData }) {
  fetch("http://localhost:8000/Bookings/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  }).then(() => {
    alert("Viewing Cancelled");
    fetchData();
  });
}

function AllBookings({ fetchData }) {
  let [booking, setBooking] = useState([]);
  let [property, setProperty] = useState("");

  const dataArray = Object.values(Data.Properties);
  const forsale = dataArray.filter((item) => item.SaleStatus === "FORSALE");

  useEffect(() => {
    fetch("http://localhost:8000/Bookings")
      .then((response) => response.json())
      .then((data) => setBooking(data));
  }, []);

  console.log("Booking date", booking.date)

  return (
    <div>
    <table>
      <thead>
      <div className="property-option">
        <p>Select Property : </p>

                <select name="Propertys" onChange={(e) => setProperty(e.target.value)}>
                <option value="">All Bookings</option>
                {forsale.map((item) => (
                    <option value={item.Address}>{item.Address}</option>
                ))}
                </select>
    
      </div>
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

     
                
              {/* {(() => {
                    // const dateObj = new Date(booking.date);
                    // const day = dateObj.getDate();
                    // const month = dateObj.getMonth() + 1; // Months are zero-indexed
                    // const year = dateObj.getFullYear();

                    // // Add leading zeros if necessary
                    // const formattedDate = `${day < 10 ? "0" : ""}${day}/${
                    // month < 10 ? "0" : ""
                    // }${month}/${year}`;
                    // alert ("display format" + formattedDate )

                    // return formattedDate;
                 })()} */}
{/* </td> */}
              
              
              <td className="td-border">{booking.time}</td>
              <td className="td-border">
                <button
                  onClick={() => CancelBooking(booking.id, { fetchData })}
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
