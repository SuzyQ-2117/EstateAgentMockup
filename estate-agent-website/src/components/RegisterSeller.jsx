import { useState, useEffect } from "react";
// import WriteToJSON from "./WriteToJSON";
import '../CSS/Register.css';

const RegisterSeller = () => {

    // Add state for each of the Buyer fields
    const [FirstName, setFirstName] = useState('')
    const [SurName, setSurName] = useState('')
    const [ExistingSeller, setExistingSeller] = useState(false)

    const [SellerData, setSellerData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/Sellers')
            .then((response) => response.json())
            .then((data) => setSellerData(data))
    }, [SellerData])

function DoRegister(e) {
    e.preventDefault();
    document.getElementById("SellerError").innerHTML=""
    document.getElementById("SellerSuccess").innerHTML=""
    // Search in the JSON file for the First name and Second name entered in the form (now in the state)
    const FilteredSeller = SellerData.filter((Seller)=> Seller.FirstName.toLowerCase()===FirstName.toLowerCase() & Seller.SurName.toLowerCase()===SurName.toLowerCase())
// Check if the length of Filtered result is > 0. If so, the seller already exists. Give appropriate error and dont add the user.
console.log(FilteredSeller)
if(FilteredSeller.length >0) {
document.getElementById("SellerError").innerHTML="Seller already exists. Seller ID is " + FilteredSeller.map((Seller=>Seller.id))
}
else {

    const newSeller = { FirstName, SurName }
    fetch('http://localhost:8000/Sellers',
    {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(newSeller)
        }
    ).then((response) => response.json())
    .then((dataa)=>
        document.getElementById("SellerSuccess").innerHTML="Seller added successfully. ID is "  + dataa.id
    )
        // const FilteredSeller = SellerData.filter((Seller)=> Seller.FirstName.toLowerCase()===FirstName.toLowerCase() & Seller.SurName.toLowerCase()===SurName.toLowerCase())
        // document.getElementById("SellerSuccess").innerHTML="Seller added successfully. ID is "  + FilteredSeller.map((Seller=>Seller.target.id))
    setFirstName('')
    setSurName('')
    console.log(FilteredSeller.id)
}
}
    return (
        <div class="register-buyer">
            <form onSubmit={DoRegister}>
                <div>
                    <h1 className="App-header">Register a new Seller here</h1>
                    <div className="flex details">
                        <div class="name-input left">
                            <p>First Name:</p>
                            <input type="text" value={FirstName} name="FirstName" onChange={(e) => {
                                setFirstName(e.target.value);
                                document.getElementById("SellerError").innerHTML="";
                                document.getElementById("SellerSuccess").innerHTML=""
                                }} />
                        </div>
                        <div class="name-input right">
                            <p>Surname:</p>
                            <input type="text" name="SurName" value={SurName} onChange={(e) => {
                                setSurName(e.target.value)
                                document.getElementById("SellerError").innerHTML="";
                                document.getElementById("SellerSuccess").innerHTML=""
                                }} />
                        </div>
                    </div>
                    <span style={{color: "red"}}  id="SellerError"></span>
                    <span style={{color: "blue"}} id="SellerSuccess"></span>
                    <br/>
                    <button class="submit-button">Add Seller</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterSeller;
