import { useState, useEffect, useContext } from 'react';
import PropertyCard from './PropertyCard';
import { PropContext } from "../context/prop-context"
import Modal from 'react-bootstrap/Modal';

export default function DisplayProperty({ id, apiData, fetchData, handleClose, handleShow }) {
  //context for search filter
  const { gotFilter } = useContext(PropContext)
  const { priceMin } = useContext(PropContext)
  const { priceMax } = useContext(PropContext)
  const { bedRoomsMin } = useContext(PropContext)
  const { bedRoomsMax } = useContext(PropContext)
  const { bathRoomsMin } = useContext(PropContext)
  const { bathRoomsMax } = useContext(PropContext)
  const { hasGarden } = useContext(PropContext)
  const { exSold } = useContext(PropContext)

  const [modalState, setModalState] = useState(false)

  const [ImageUrl, setImageUrl] = useState("");
  const [Address, setAddress] = useState("");
  const [Price, setPrice] = useState(0);
  const [Bedrooms, setBedrooms] = useState(1);
  const [Bathrooms, setBathrooms] = useState(1);
  const [Garden, setGarden] = useState("No");
  const [SaleStatus, setSaleStatus] = useState("FORSALE");
  const [Seller, setSeller] = useState("")
  const [edit, setEdit] = useState([])
  const [editAddress, setEditAddress] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editBedrooms, setEditBedrooms] = useState("")
  const [editBathrooms, setEditBathrooms] = useState("")
  const [editGarden, setEditGarden] = useState("")
  const [editImageUrl, setEditImageUrl] = useState("")
  const [editSaleStatus, setEditSaleStatus] = useState("")
  const [editID, setEditID] = useState("")

  useEffect(() => {
    setEditID(edit)
}, [edit]);

  // gotFilter will be true if user input is coming from the Find Property Component. If solid, filter the JSON and display only the result
  if (gotFilter) {
    // If there is a Min Price filter:
    if (priceMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Price) >= parseInt(priceMin))
    }
    // If there is a Max Price filter:
    if (priceMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Price) <= parseInt(priceMax))
    }
    // If there is a Min Bedrooms filter:
    if (bedRoomsMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) >= parseInt(bedRoomsMin))
    }
    // If there is a Max Bedrooms filter:
    if (bedRoomsMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) <= parseInt(bedRoomsMax))
    }
    // If there is a Min Bathrooms filter:
    if (bathRoomsMin) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) >= parseInt(bathRoomsMin))
    }
    // If there is a Max Bathrooms filter:
    if (bathRoomsMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Bedrooms) <= parseInt(bathRoomsMax))
    }
    // If there is a Garden filter:
    if (hasGarden === "Yes") {
      apiData = apiData.filter((Property) => Property.Garden === hasGarden)
    }
    // If there is a Exclude Sold filter:
    console.log("Ex sold is:" + exSold)
    if (exSold) {
      console.log("Inside Ex sold ")
      apiData = apiData.filter((Property) => Property.SaleStatus !== "SOLD")
    }
  }
  if (apiData.length === 0) {
    return (
      <h1>There are no properties matching your search. Try changing the filters to see other properties.</h1>
    )
  } else {
    return (
      <div className="property-card-container flex wrap">
        {apiData.map((item) => (
          <PropertyCard
            id={item.id}
            ImageUrl={item.ImageUrl}
            address={item.Address}
            price={item.Price}
            bedrooms={item.Bedrooms}
            bathrooms={item.Bathrooms}
            garden={item.Garden}
            salestatus={item.SaleStatus}
            fetchData={fetchData}
            edit={edit}
            setEdit={setEdit}
            setEditID={setEditID}
            setEditAddress={setEditAddress}
            setEditPrice={setEditPrice}
            setEditBathrooms={setEditBathrooms}
            setEditBedrooms={setEditBedrooms}
            setEditGarden={setEditGarden}
            setEditImageUrl={setEditImageUrl}
            setEditSaleStatus={setEditSaleStatus}
          />

        ))
        }
      </div>
    )
  };
}