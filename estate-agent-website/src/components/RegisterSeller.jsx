import { useState, useEffect } from "react";

const RegisterSeller = (props) => {
    // Add state for each of the Buyer fields
    const [FirstName, setFirstName] = useState('')
    const [SurName, setSurName] = useState('')
    const [ExistingSeller, setExistingSeller] = useState(false)

    function DoRegister(e) {
        e.preventDefault();

        const FilteredSeller = props.seller.filter((Seller) => Seller.FirstName.toLowerCase() === FirstName.toLowerCase() && Seller.SurName.toLowerCase() === SurName.toLowerCase())
        
        if (FilteredSeller.length > 0) {
            document.getElementById("SellerError").innerHTML = "Seller already exists. Seller ID is " + FilteredSeller.map((Seller => Seller.id))
        } else {
            const newSeller = { FirstName, SurName }
            fetch('http://localhost:8001/Seller/All',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newSeller)
                }
            ).then((response) => response.json())
            .then((dataa)=>
                document.getElementById("SellerSuccess").innerHTML="Seller " + FirstName + " " + SurName + " added successfully. ID is "  + dataa.id
            )
            .then(() => {
                props.fetchSellerData()
                setFirstName('')
                setSurName('')
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
                            <input type="text" value={FirstName} name="FirstName" onChange={(e) => {
                                setFirstName(e.target.value);
                                document.getElementById("SellerError").innerHTML = "";
                                document.getElementById("SellerSuccess").innerHTML = ""
                            }} />
                        </div>
                        <div className="name-input right">
                            <p>Surname:</p>
                            <input type="text" name="SurName" value={SurName} onChange={(e) => {
                                setSurName(e.target.value)
                                document.getElementById("SellerError").innerHTML = "";
                                document.getElementById("SellerSuccess").innerHTML = ""
                            }} />
                        </div>
                    </div>
                    <span style={{ color: "red" }} id="SellerError"></span>
                    <span style={{ color: "blue" }} id="SellerSuccess"></span>
                    <br />
                    <button className="submit-button">Add Seller</button>
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
// const FilteredSeller = SellerData.filter((Seller) => Seller.FirstName.toLowerCase() === FirstName.toLowerCase() & Seller.SurName.toLowerCase() === SurName.toLowerCase())
// document.getElementById("SellerSuccess").innerHTML = "Seller added successfully. ID is " + FilteredSeller.map((Seller => Seller.target.id))
//  }, 5000);

// console.log(FilteredSeller.id)