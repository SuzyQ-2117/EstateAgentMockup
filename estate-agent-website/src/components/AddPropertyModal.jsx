import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { url } from '../consts';

export default function AddPropertyModal({ showAdd, setShowAdd, fetchData, sellerData }) {

  const [imageURL, setImageURL] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [garden, setGarden] = useState(false);
  const [saleStatus, setSaleStatus] = useState('FORSALE');
  const [seller, setSeller] = useState('');

  const handleCloseAdd = () => {
    resetAdd();
    fetchData();
    setShowAdd(false);
  }

  const resetAdd = () => {
    console.log("Resetting states")
    setImageURL('');
    setAddress('');
    setPrice(0);
    setBedrooms(0);
    setBathrooms(0);
    setGarden('');
    setSeller('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seller !== "Not listed") {
      const property = {
        seller: { id: seller },
        imageURL,
        address,
        price,
        bedrooms,
        bathrooms,
        garden,
        saleStatus,
      };
      fetch(`${url}/property/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      })
        .then(() => {
          alert('New Property Added');
          handleCloseAdd();
        });
    } else {
      alert("Please register your name on the Sellers page");
      handleCloseAdd();
    }
  };

  return (
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
                <option></option>

                {sellerData.map((item) => (
                  <option value={item.id} key={item.id}>{item.firstName + " " + item.surname}</option>
                )
                )}
                <option value="Not listed">Not listed</option>
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
              <input type="text" required value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </div>
          </div>

        </form>
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" className="filter-btn" onClick={handleCloseAdd}>Cancel</button>
        <button variant="primary" className="amend-submit-btn" type="submit" onClick={handleSubmit}>Add Property</button>
      </Modal.Footer>
    </Modal>
  )
}