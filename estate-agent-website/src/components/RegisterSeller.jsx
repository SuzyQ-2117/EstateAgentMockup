import { useState, useEffect } from "react";
import {url} from "../consts";

const RegisterSeller = (props) => {
    // Add state for each of the Buyer fields
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [existingSeller, setExistingSeller] = useState(false)

    function DoRegister(e) {
        e.preventDefault();

        const filteredSeller = props.seller.filter((seller) => seller.firstName.toLowerCase() === firstName.toLowerCase() && seller.surname.toLowerCase() === surname.toLowerCase())
        
        if (filteredSeller.length > 0) {
            document.getElementById("SellerError").innerHTML = "Seller already exists. Seller ID is " + filteredSeller.map((Seller => Seller.id))
        } else {
            const newSeller = { firstName, surname }
            fetch(`${url}/seller/add`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newSeller)
                }
            ).then((response) => response.json())
            .then((data)=>
                document.getElementById("SellerSuccess").innerHTML="Seller " + firstName + " " + surname + " added successfully. ID is "  + data.id
            )
            .then(() => {
                props.fetchSellerData()
                setFirstName('')
                setSurname('')
            })
        }
    }
    return (
        <div className="register-seller">
            <form onSubmit={DoRegister}>
                <div>
                    <div className="flex-register details">
                        <div className="name-input left">
                            <p>First Name:</p>
                            <input type="text" value={firstName} name="firstName" onChange={(e) => {
                                setFirstName(e.target.value);
                                document.getElementById("SellerError").innerHTML = "";
                                document.getElementById("SellerSuccess").innerHTML = ""
                            }} />
                        </div>
                        <div className="name-input right">
                            <p>Last Name:</p>
                            <input type="text" name="surname" value={surname} onChange={(e) => {
                                setSurname(e.target.value)
                                document.getElementById("SellerError").innerHTML = "";
                                document.getElementById("SellerSuccess").innerHTML = ""
                            }} />
                        </div>
                        <br />
                        <button className="submit-button edit-btn">Add Seller</button>
                    </div>
                    <span style={{ color: "red" }} id="SellerError"></span>
                    <span style={{ color: "blue" }} id="SellerSuccess"></span>
                    
                </div>
            </form>
        </div>
    );
}

export default RegisterSeller;

// document.getElementById("SellerError").innerHTML = ""
// document.getElementById("SellerSuccess").innerHTML = ""

// Search in the JSON file for the First name and Second name entered in the form (now in the state)

// Check if the length of Filtered result is > 0. If so, the seller already exists. Give appropriate error and dont add the user.

// console.log(FilteredSeller)
//    setTimeout(() => {
// const FilteredSeller = SellerData.filter((Seller) => Seller.firstName.toLowerCase() === firstName.toLowerCase() & Seller.surname.toLowerCase() === surname.toLowerCase())
// document.getElementById("SellerSuccess").innerHTML = "Seller added successfully. ID is " + FilteredSeller.map((Seller => Seller.target.id))
//  }, 5000);

// console.log(FilteredSeller.id)