import { FaBed, FaBath } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState, useCallback, memo } from "react";
import EditPropertyModal from "./EditPropertyModal"; // Import the new modal component
import { url } from "../consts";

const PropertyCard = memo(({ id, imageURL, address, price, bedrooms, bathrooms, garden, salestatus, fetchData }) => {
  const [edit, setEdit] = useState(false);

  const handleShow = useCallback(() => {
    setEdit(true);
  }, []);

  const handleClose = useCallback(() => {
    setEdit(false);
  }, []);

  return (
    <div className={"item-card flex-column " + salestatus}>
      <img src={imageURL} className="property-img" alt="" />
      <div className="padded-property-container flex-column">
        <div className="flex space-between">
          <p className="p-one property-data property-address">{address}</p>
          <p className="property-data salestatus">{salestatus}</p>
        </div>
        <p className="p-two property-data property-price">£{(price).toLocaleString('en-GB', {minimumFractionDigits: 0})}</p>
        <div>
          <p className="p-three property-data property-beds"><span><FaBed /></span> {bedrooms} </p>
          <p className="p-four property-data property-baths"><span><FaBath /></span> {bathrooms}</p>
          <p className="p-five property-data property-garden"> <span><PiPottedPlantFill /></span> {garden ? 'Yes' : 'No'} </p>
        </div>
        <div>
          <button className="appt-btn float-left btn-left">
            <Link to='/bookings' className="appt-link">Book an appointment</Link>
          </button>
          <button onClick={handleShow} className="edit-btn float-right">Edit</button>
        </div>
      </div>
      
      {edit && (
        <EditPropertyModal
          id={id}
          imageURL={imageURL}
          address={address}
          price={price}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          garden={garden}
          salestatus={salestatus}
          fetchData={fetchData}
          handleClose={handleClose}
        />
      )}
    </div>
  )
});

export default PropertyCard;
