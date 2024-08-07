import { useState, useEffect } from "react";
import {url} from "../consts";

const RegisterBuyer = (props) => {
    // Add state for each of the Buyer fields
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [ExistingBuyer, setExistingBuyer] = useState(false)

    function DoRegister(e) {
        e.preventDefault();

        const FilteredBuyer = props.buyer.filter((Buyer) => Buyer.firstName.toLowerCase() === firstName.toLowerCase() && Buyer.surname.toLowerCase() === surname.toLowerCase())

        if (FilteredBuyer.length > 0) {
            document.getElementById("BuyerError").innerHTML = "Buyer already exists. Buyer ID is " + FilteredBuyer.map((Buyer => Buyer.id))
        } else {
            const newBuyer = { firstName, surname }
            fetch(`${url}/buyer/add`,
                {   method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBuyer)
                }
            ).then((response) => response.json())
            .then((dataa)=>         
                document.getElementById("BuyerSuccess").innerHTML="Buyer " + firstName + " " + surname + " added successfully. ID is "  + dataa.id
        )
            .then(() => {
                props.fetchBuyerData()
                setFirstName('')
                setSurname('')  
            })
        }
    }

    return (
        <div className="register-buyer">
            <form onSubmit={DoRegister}>
                <div>
                    <div className="flex-register details">
                        <div className="name-input left">
                            <p>First Name:</p>
                            <input type="text" value={firstName} name="firstName" onChange={(e) => {
                                setFirstName(e.target.value);
                                document.getElementById("BuyerError").innerHTML = "";
                                document.getElementById("BuyerSuccess").innerHTML = ""
                            }} />
                        </div>
                        <div className="name-input right">
                            <p>Surname:</p>
                            <input type="text" name="surname" value={surname} onChange={(e) => {
                                setSurname(e.target.value)
                                document.getElementById("BuyerError").innerHTML = "";
                                document.getElementById("BuyerSuccess").innerHTML = ""
                            }} />
                        </div>
                    </div>
                    <span style={{ color: "red" }} id="BuyerError"></span>
                    <span style={{ color: "blue" }} id="BuyerSuccess"></span>
                    <br />
                    <button className="submit-button">Add Buyer</button>
                </div>
            </form>
        </div>
    );

}
export default RegisterBuyer;


//these need to be replaced as we shouldn't be doing direct DOM manipulation
//have your <p> tag with a statevalue <p {buyererror}>
//have a state attached to these instead

// document.getElementById("BuyerError").innerHTML = ""
// document.getElementById("BuyerSuccess").innerHTML = ""

// Search in the JSON file for the First name and Second name entered in the form (now in the state)

// rather than checking the JSON file directly, send a GET request instead
// the JSON will eventually be replaced with a Java backend which we won't be able to access directly

// const FilteredBuyer = props.buyer.find((Buyer) => Buyer.firstName.toLowerCase()===firstName.toLowerCase() && Buyer.surname.toLowerCase()===surname.toLowerCase())
// Check if the length of Filtered result is > 0. If so, the buyer already exists. Give appropriate error and dont add the user.
// console.log(FilteredBuyer)


// setTimeout(() => {
// const FilteredBuyer = BuyerData.filter((Buyer) => Buyer.firstName.toLowerCase() === firstName.toLowerCase() & Buyer.surname.toLowerCase() === surname.toLowerCase())
// document.getElementById("BuyerSuccess").innerHTML = "Buyer added successfully. ID is " + FilteredBuyer.map((Buyer => Buyer.target.id))
// document.getElementById("BuyerError").innerHTML="Buyer added successfully. ID is "  + FilteredBuyer.map((Buyer=>Buyer.id))

// console.log(FilteredBuyer.id)