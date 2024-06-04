import { FaBed, FaBath, FaPoundSign } from "react-icons/fa";
import '../CSS/PropertyDisplay.css'

export default function PropertyCard({ id, ImageUrl, address, price, bedrooms, bathrooms, garden, salestatus, fetchData }) {

  const changeStatus = (SaleStatus) => {
    fetch('http://localhost:8000/Properties/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ SaleStatus }),
    })
      .then(fetchData)
  }

  return (
    // const isgarden = {garden} 
    <div className="item-card">
      <img src={ImageUrl} className="property-img"/>
      <button className="btn">{salestatus}</button>
      {/* <button className="btn">{garden} </button>  */}
      <p className="p-one property-data address" ><span></span>{address}</p>
      <p className="p-two property-data price" >£{price}</p>
      <p className="p-three property-data beds"><span><FaBed /></span> {bedrooms} </p>
      <p className="p-four property-data baths"><span><FaBath /></span> {bathrooms}</p>
      <button className={salestatus.withdrawn ? 'hidden' : 'visible'} onClick={() => changeStatus("WITHDRAWN")}>Withdraw Property</button>
      {/* only show the relevant button, so the IF statement would be appear - ternary op */}
      <button onClick={() => changeStatus("FORSALE")}>Resubmit Property</button>
    </div>

  )
}
