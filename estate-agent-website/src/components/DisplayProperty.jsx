import { useState, useEffect, useContext } from 'react';
import PropertyCard from './PropertyCard';
import { PropContext } from "../context/prop-context"

export default function DisplayProperty({apiData, fetchData}) {
  //context for search filter
  const { gotFilter } = useContext(PropContext)
  const { priceMin } = useContext(PropContext)
  const { priceMax } = useContext(PropContext)
  const { bedRoomsMin } = useContext(PropContext)
  const { bedRoomsMax } = useContext(PropContext)
  const { bathRoomsMin } = useContext(PropContext)
  const { bathRoomsMax } = useContext(PropContext)
  const { hasGarden } = useContext(PropContext)

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
      apiData = apiData.filter((Property) => parseInt(Property.Bathrooms) >= parseInt(bathRoomsMin))
    }
    // If there is a Max Bathrooms filter:
    if (bathRoomsMax) {
      apiData = apiData.filter((Property) => parseInt(Property.Bathrooms) <= parseInt(bathRoomsMax))
    }
    // If there is a Garden filter:
    if (hasGarden === "Yes") {
      apiData = apiData.filter((Property) => Property.Garden === hasGarden)
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
            />
          ))
          }
        </div>
    )
  };
}