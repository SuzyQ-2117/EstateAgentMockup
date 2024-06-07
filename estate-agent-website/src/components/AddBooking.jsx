import { useState } from "react";
import Data from '../data/Data.json'
import { DiDatabase } from "react-icons/di";

export default function AddBooking({ fetchData }) {
  
  //todays date
  const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();

// const formattedDate = yyyy + '-' + mm + '-' + dd;
const formattedDate = yyyy + '-' + mm + '-' + dd;

 
  
    // create state

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  let [property, setProperty] = useState("");
  let [propertyid, setPropertyID] = useState("");
  let [buyer, setBuyer] = useState("");

let todayDateSel = false
let nowHour = today.getHours()
  //Filter the option list so only holds propertys that are forsale
  //can only use the filter function as an array so need to place the json data into an array

  const dataArray = Object.values(Data.Properties);
  const forsale = dataArray.filter((item) => item.SaleStatus === "FORSALE");

  const existingBooking = Data.Bookings.find((booking) => {
    return (
      booking.date === date &&
      booking.time === time &&
      booking.property === property
    );
  });

  const handleSubmit = (e) => {
    // tells the event if the event doesnt get handled dont use the default action as I want to do something else

    e.preventDefault();

  
    if (property === "" || buyer === "" ) {
      alert("Please select your name & a property to book a viewing for");
    } else {
      if (existingBooking) {
        alert("Please select another time slot as this is booked");
      } else {
        const task = {
          date,
          time,
          property,
          buyer,
          propertyid,
        };

        fetch("http://localhost:8000/Bookings", {
          method: "POST",
          // for most api json call
          headers: { "Content-Type": "application/json" },
          // changing into json data
          body: JSON.stringify(task),
        }).then(() => {
          alert("New Viewing Booked");

          // reset text boxes
          setDate();
          setTime("");
          setProperty("");
          setPropertyID("");
          setBuyer("");
          fetchData();
        });
      }
    }
  };

  const TestBooking = (e) => {
e.preventDefault();
console.log(time)
    console.log(parseInt(time))
  }
  return (
    <div className="register-buyer">
    <form onSubmit={handleSubmit}>
        <div>
             <div className="flex-register details">
                        <div className="name-input left">
                            <p>Buyers: </p>
                                <select name="Buyers" onChange={(e) => setBuyer(e.target.value)} value={buyer}>
                                    <option value=""></option>
                                    {Data.Buyers.map((item) => (
                                    <option value={item.ID}>
                                        {item.FirstName} {item.SurName}{" "}
                                    </option>
                                    ))}
                                </select>
                        </div>  
                        <div className="name-input right">
                            <p>Properties For Sale: </p>
                                <select name="Propertys" onChange={(e) => setProperty(e.target.value)} value={property}>
                                     <option value=""></option>
                                        {forsale.map((item) => (
                                        <option value={item.Address}>{item.Address}</option>
                                        ))}
                                </select>
                        </div>
                     </div>
  
        <div>
            <div className="flex-register details">
                 <div className="name-input left">

                        <p>  Date :</p>
                        <input
            
                            id="fname"
                            type="date"
                            required
                            value={date}
                            min= {formattedDate}
                            // event
                            onChange={(e) => {setDate(e.target.value)
                              setTime("")
                              console.log(e.target.value)
                              if(e.target.value===formattedDate) {
                                 console.log("Today's date selected")
                                 todayDateSel = true}
                                 else{
                                  todayDateSel=false
                                 }
                            }}
                        />
                </div>  
                <div className="name-input right">
                        <p>Time :</p>
                        <select
                            // value={time}
                            // event
                            onChange={(e) => setTime(e.target.options[e.target.selectedIndex].text)}
                        >
                            <option value=""></option>
                            {/* if (date){}<option value="8to9">8am to 9am</option> */}
                            <option value="0"></option>{
                            (todayDateSel && parseInt(nowHour) > 12 ?<option value='9to10'>9am to 10am</option>:"")}
                            {/* (todayDateSel && parseInt(nowHour) > 12?"<option value='9to10'>9am to 10am</option>":"")} */}
                            
                            <option value="10to11">10am to 11am</option>
                            <option value="11to12">11am to 12pm</option>
                            <option value="12to1">12pm to 1pm</option>
                            <option value="13to14">1pm to 2pm</option>
                            <option value="14to15">2pm to 3pm</option>
                            <option value="15to16">3pm to 4pm</option>
                            <option value="16to17">4pm to 5pm</option>
                        </select>
                    </div>
                    </div>
                <button className="submit-button">Add Booking</button>
                <button onClick={TestBooking}>Test Booking</button>
      </div>
      </div>
    </form>
    </div>
  );
}
