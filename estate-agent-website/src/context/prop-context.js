import { createContext, useState } from "react";

export const PropContext = createContext()

export function PropProvider({children}) {
        // Add state for each of the Buyer fields
        const [gotFilter, setHasFilter] = useState(false)
        const [priceMin, setPriceMin] = useState(0)
        const [priceMax, setPriceMax] = useState(0)
        const [bedRoomsMin, setBedRoomsMin] = useState(0)
        const [bedRoomsMax, setBedRoomsMax] = useState(0)
        const [bathRoomsMin, setBathRoomsMin] = useState(0)
        const [bathRoomsMax, setBathRoomsMax] = useState(0)
        const [hasGarden, setHasGarden] = useState("")
        const [exSold, setExSold] = useState("")

        function populateFilters(gotFilter, minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths, hasGarden, exSold) {
            setHasFilter(gotFilter)
            setPriceMin(minPrice)
            setPriceMax(maxPrice)
            setBedRoomsMin(minBeds)
            setBedRoomsMax(maxBeds)
            setBathRoomsMin(minBaths)
            setBathRoomsMax(maxBaths)
            setHasGarden(hasGarden)
            setExSold(exSold)
        }

        const PropFilters = {
            gotFilter, priceMin, priceMax, bedRoomsMin, bedRoomsMax, bathRoomsMin, bathRoomsMax, hasGarden , exSold, populateFilters
        }

        return (
            <>
                <PropContext.Provider value={PropFilters}>{children}</PropContext.Provider>
            </>
        );

}