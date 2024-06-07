import { useState } from "react";
import "../CSS/AddProperty.css";
import { SiThenorthface } from "react-icons/si";
import Data from "../data/Data.json";
import DisplayProperty from "./DisplayProperty";

export default function AddProperty({fetchData}) {
  // create state
  const [ImageUrl, setImageUrl] = useState("");
  const [Address, setAddress] = useState("");
  const [Price, setPrice] = useState(0);
  const [Bedrooms, setBedrooms] = useState(1);
  const [Bathrooms, setBathrooms] = useState(1);
  const [Garden, setGarden] = useState("No");
  const [SaleStatus, setSaleStatus] = useState("FORSALE");
  const [Seller, setSeller] = useState("")

  const handleSubmit = (e) => {
    // tells the event if the event doesnt get handled dont use the default action as I want to do something else
    e.preventDefault();

    // If seller exists then post to JSON
    // setSaleStatus("FORSALE");
    console.log("Before:" + SaleStatus)
    if (Seller != "") {
      const task = {
        ImageUrl,
        Address,
        Price,
        Bedrooms,
        Bathrooms,
        Garden,
        SaleStatus,
      };

      //code to be added for if new then set to forsale
console.log(task)
      fetch(
        "http://localhost:8000/Properties",
        {
          method: "POST",
          // for most api json call
          headers: { "Content-Type": "application/json" },
          // changing into json data
          body: JSON.stringify(task),
        }
      ).then(
        ()=> {
          alert("New Property Added");

          // reset text boxes
          setImageUrl("");
          setAddress("");
          setPrice(0);
          setBedrooms(0);
          setBathrooms(0);
          setGarden("");
          // setSaleStatus("");
          setSeller("");
          fetchData()
        }
      );

      //otherwise ask seller to register
    } else {
      alert("Seller doesnt exist, please register in the seller page");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
 
      <label>Existing Sellers : </label>
      <select name="Sellers" onChange={(e) => setSeller(e.target.value)} value={Seller}>
        <option value=""></option>
        {Data.Sellers.map((item) => (
          <option value={item.ID}>{item.FirstName + " " + item.SurName}</option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <label htmlFor="fname"> Address :</label>
      <input
        id="fname"
        type="text"
        required
        value={Address}
        // event
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /> <br /> <br />
      <label>
        <span>Price :</span>{" "}
      </label>
      <input
        type="Number"
        required
        value={Price}
        min={0}
        // event is on change ,  target value is whats in the input box
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /> <br /> <br />
      <label>Image URL : </label>
      <input
        type="text"
        required
        value={ImageUrl}
        // event
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br /> <br /> <br />
      <label>Bedrooms : </label>
      <input
        type="number"
        required
        value={Bedrooms}
        min={0}
        // event
        onChange={(e) => setBedrooms(e.target.value)}
      />
      <br /> <br /> <br />
      <label>Bathrooms : </label>
      <input
        type="number"
        required
        value={Bathrooms}
        min={0}
        // event
        onChange={(e) => setBathrooms(e.target.value)}
      />
      <br /> <br /> <br />
      <label>Garden : </label>
      <select
        value={Garden}
        // event
        onChange={(e) => setGarden(e.target.value)}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <br /> <br /> <br />
      <button>Add Property</button>
      <br /> <br /> <br />
    </form>
  );
}
