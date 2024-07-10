import { useState, useCallback } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBed, FaBath } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { url } from "../consts";

export default function EditPropertyModal({ id, imageURL, address, price, bedrooms, bathrooms, garden, salestatus, fetchData, handleClose }) {
  // State for modal visibility and editing
  const [editAddress, setEditAddress] = useState(address);
  const [editPrice, setEditPrice] = useState(price);
  const [editBedrooms, setEditBedrooms] = useState(bedrooms);
  const [editBathrooms, setEditBathrooms] = useState(bathrooms);
  const [editGarden, setEditGarden] = useState(garden);
  const [editImageUrl, setEditImageUrl] = useState(imageURL);
  const [editSaleStatus, setEditSaleStatus] = useState(salestatus);

  // Memoized function for sending update to server
  const sendUpdate = useCallback((e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({ 
      address: editAddress, 
      price: editPrice, 
      bedrooms: editBedrooms, 
      bathrooms: editBathrooms, 
      garden: editGarden, 
      imageURL: editImageUrl, 
      saleStatus: editSaleStatus 
    });

    fetch(`${url}/property/update/${id}?${queryParams}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        alert("Property details amended successfully");
        handleClose(); // Close modal on success
        fetchData(); // Fetch updated data after success
    })
  }, [id, editAddress, editPrice, editBedrooms, editBathrooms, editGarden, editImageUrl, editSaleStatus, handleClose, fetchData]);

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT PROPERTY DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={sendUpdate} id="update-property">
          <div className="form-container">
            <div className="address-title">
              <p>Address:</p>
            </div>
            <div className="price-title">
              <p>Price:</p>
            </div>
            <div className="bedrooms-title">
              <p>Bedrooms:</p>
            </div>
            <div className="bathrooms-title">
              <p>Bathrooms:</p>
            </div>
            <div className="garden-title">
              <p>Garden:</p>
            </div>
            <div className="imageURL-title">
              <p>Image URL:</p>
            </div>
            <div className="status-title">
              <p>Status:</p>
            </div>
            <div className="address-input">
              <input required type="text" defaultValue={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
            </div>
            <div className="price-input">
              <input required type="number" min={0} defaultValue={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
            </div>
            <div className="bedrooms-input">
              <input required type="number" min={0} defaultValue={editBedrooms} onChange={(e) => setEditBedrooms(e.target.value)} />
            </div>
            <div className="bathrooms-input">
              <input required type="number" min={0} defaultValue={editBathrooms} onChange={(e) => setEditBathrooms(e.target.value)} />
            </div>
            <div className="garden-input">
              <select required defaultValue={editGarden} onChange={(e) => setEditGarden(e.target.value)}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="url-input">
              <input required type="text" defaultValue={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
            </div>
            <div className="status-input">
              <select required defaultValue={editSaleStatus} onChange={(e) => setEditSaleStatus(e.target.value)}>
                <option>FORSALE</option>
                <option>WITHDRAWN</option>
                <option>SOLD</option>
              </select>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button variant="secondary" className="filter-btn" onClick={handleClose}>Cancel</button>
        <button form="update-property" variant="primary" className="amend-submit-btn">Amend</button>
      </Modal.Footer>
    </Modal>
  )
};