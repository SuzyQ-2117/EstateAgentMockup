import AddPropertyModal from "../components/AddPropertyModal";
import "../CSS/HomePage.css";
import { useState, useContext, useEffect } from "react";
import DisplayProperty from "../components/DisplayProperty";
import FindProperty from "../components/FindProperty";
import { PropContext, PropProvider } from "../context/prop-context";
import {url} from "../consts";

export default function HomePage() {
  const [filter, setFilter] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const [imageURL, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [garden, setGarden] = useState(false);
  const [saleStatus, setSaleStatus] = useState("FORSALE");
  const [seller, setSeller] = useState("");
  const [sellerData, setSellerData] = useState([]);

  //moved from display propertys as need for multiple data fetches
  //fetches data from properties object in JSON file then feed into "AddProperty" so that it can refresh the data after a property is added
  // and passes the api state through to "DisplayProperty" to include apidata for all, fetch data for status change and filter results for filtering
  let [apiData, setData] = useState([]);
  
  function fetchData(filter) {
    console.log("FETCHING")
    fetch(`${url}/property/filtersearch?` + filter)
      .then((response) => response.json())
      .then((data) => setData(data));
      }

  useEffect(() => {
    fetchData();
  }, []);
  // Load values from context

  function fetchSellerData() {
    console.log("Fetching Seller Data on page load");
    fetch(`${url}/seller/all`)
        .then((response) => response.json())
        .then((data) => setSellerData(data));
      }

  const handleShowAdd = () => {
    console.log("clicked add property");
    fetchSellerData();
    setShowAdd(true);
  }

  return (
    <PropProvider>
      <div className="page-content">
        <div className="white-container">
          <FindProperty />
        </div>
        <div className="white-container">
          <DisplayProperty  apiData={apiData} fetchData={fetchData} filterResults="false" />
        </div>
        <div className=" flex space-around white-container">
          <div className="filter-container add-banner">
            <h2>Have a property you want to sell?</h2>
            <h4>Click here to add your property details! </h4>
          </div>
          <button variant="primary" className="amend-submit-btn" onClick={handleShowAdd}>Add</button>
        </div>
        <AddPropertyModal showAdd={showAdd} setShowAdd={setShowAdd} sellerData={sellerData} fetchData={fetchData}/>
      </div>
    </PropProvider>

  );
}