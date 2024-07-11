// import AddProperty from "../components/AddProperty";
import "../CSS/HomePage.css";
import { useState, useContext, useEffect } from "react";
import DisplayProperty from "../components/DisplayProperty";
import FindProperty from "../components/FindProperty";
import { PropContext, PropProvider } from "../context/prop-context";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Data from "../data/Data.json";
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
  
  const fetchData = (filterProp) => {
    fetch(`${url}/property/filtersearch?` + filterProp)
      .then((response) => response.json())
      .then((data) => setData(data));
      }

  useEffect(() => {
    fetchData();
  }, []);
  // Load values from context

  function fetchSellerData() {
    console.log("Fetching Seller Data on Modal opening");
    fetch(`${url}/seller/all`)
        .then((response) => response.json())
        .then((data) => setSellerData(data));
        console.log(sellerData);
      }

  const handleCloseAdd = () => setShowAdd(false);

  const handleShowAdd = () => {
    console.log("clicked add property");
    fetchSellerData();
    setShowAdd(true);
  }

  const handleSubmit = (e) => {
    // tells the event if the event doesnt get handled dont use the default action as I want to do something else
    e.preventDefault();
    console.log(seller);
    // If seller exists then post to JSON
    if (seller !== "") {
      const property = {seller: {id: seller},
                        imageURL,
                        address,
                        price,
                        bedrooms,
                        bathrooms,
                        garden,
                        saleStatus};
      fetch(`${url}/property/add`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(property)})
          .then(() => {
            alert("New Property Added");
            // reset text boxes
            setImageUrl("");
            setAddress("");
            setPrice(0);
            setBedrooms(0);
            setBathrooms(0);
            setGarden("");
            setSeller("");
            fetchData()
            handleCloseAdd()
          }
        );
    } else {
      //otherwise ask seller to register
      alert("Seller doesnt exist, please register in the seller page");
    }
  };

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
        <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>ADD PROPERTY</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="new-property-container">
                <div className="existing-seller-title">
                  <label>Existing Sellers : </label>
                </div>
                <div className="new-address-title">
                  <label htmlFor="fname"> Address :</label>
                </div>
                <div className="new-price-title">
                  <label><span>Price :</span>{" "}</label>
                </div>
                <div className="new-bedrooms-title">
                  <label>Bedrooms : </label>
                </div>
                <div className="new-bathrooms-title">
                  <label>Bathrooms : </label>
                </div>
                <div className="new-garden-title">
                  <label>Garden : </label>
                </div>
                <div className="new-ImagUrl-title">
                  <label>Image URL : </label>
                </div>
                <div className="existing-seller-input">
                  <select name="Sellers" onChange={(e) => setSeller(e.target.value)} value={seller}>
                    <option value=""></option>
                    
                    {sellerData.map((item) => (
                      <option value={item.id} key={item.id}>{item.firstName + " " + item.surname}</option>
                    )
                    )}
                  </select>
                </div>
                <div className="new-address-input">
                  <input id="fname" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="new-price-input">
                  <input type="Number" required value={price} min={0} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="new-bedrooms-input">
                  <input type="number" required value={bedrooms} min={0} onChange={(e) => setBedrooms(e.target.value)} />
                </div>
                <div className="new-bathrooms-input">
                  <input type="number" required value={bathrooms} min={0} onChange={(e) => setBathrooms(e.target.value)} />
                </div>
                <div className="new-garden-input">
                  <select value={garden} onChange={(e) => setGarden(e.target.value)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="new-image-input">
                  <input type="text" required value={imageURL} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" className="filter-btn" onClick={handleCloseAdd}>Cancel</button>
            <button variant="primary" className="amend-submit-btn" type="submit" onClick={handleSubmit}>Add Property</button>
          </Modal.Footer>
        </Modal>
      </div>
    </PropProvider>

  );
}