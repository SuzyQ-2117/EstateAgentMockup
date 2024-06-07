import { useState, useEffect, useContext } from "react";
import { PropContext } from "../context/prop-context";
 
const FindProperty = () => {
    const { populateFilters } = useContext(PropContext)
 
    //    Add state for each of the Buyer fields
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(0)
    const [bedRoomsMin, setBedRoomsMin] = useState(0)
    const [bedRoomsMax, setBedRoomsMax] = useState(0)
    const [bathRoomsMin, setBathRoomsMin] = useState(0)
    const [bathRoomsMax, setBathRoomsMax] = useState(0)
    const [garden, setGarden] = useState(false)
    const [exSold, setExSold] = useState(false)

    function AddFilter(e) {
        e.preventDefault();
        console.log(true, priceMin, priceMax, bedRoomsMin, bedRoomsMax, bathRoomsMin, bathRoomsMax, (garden ? "Yes" : "No"))
        populateFilters(true, parseInt(priceMin), parseInt(priceMax), parseInt(bedRoomsMin), parseInt(bedRoomsMax), parseInt(bathRoomsMin), parseInt(bathRoomsMax), (garden ? "Yes" : "No"), exSold)
    }
 
    function ResetList(ListtoReset, SourceList, MinMax) {
        const tempList = document.getElementById(ListtoReset)
        const sourceList = document.getElementById(SourceList)
        tempList.innerHTML = sourceList.innerHTML
        tempList.options[0].innerHTML = MinMax === "Min" ? "No Min" : "No Max"
 
    }
 
    function ResetFilters(e) {
        e.preventDefault();
        ResetList("PriceMin", "sourcePrice", "Min")
        ResetList("PriceMax", "sourcePrice", "Max")
        ResetList("BedsMin", "sourceBedBath", "Min")
        ResetList("BedsMax", "sourceBedBath", "Max")
        ResetList("BathsMin", "sourceBedBath", "Min")
        ResetList("BathsMax", "sourceBedBath", "Max")
        const tempList = document.getElementById("chkHasGarden")
        tempList.checked = false
        populateFilters(false, 0, 0, 0, 0, 0, 0, "No", false)
    }
 
    return (
        <>
        <div className="filter-container">
            <form onSubmit={AddFilter}>
                <div className="container">
 
                    <div className="price">
                        <div className="price-heading">
                            <p>PRICE</p>
                        </div>
                        <div className="price-min">
                            <select name="PriceMin" id="PriceMin" onChange={(e) => {
                                setPriceMin(e.target.value)
                                const maxPrice = document.getElementById("PriceMax")
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                let tempValue = maxPrice.options[maxPrice.selectedIndex].value
                                if(parseInt(maxPrice.options[1].value) > parseInt(e.target.value)){
                                    ResetList("PriceMax","sourcePrice", "Max")
                                }
 
                                for (let i = maxPrice.options.length - 1; i > 0; i--) {
                                    if(maxPrice.options[i].value===tempValue){maxPrice.selectedIndex=i; console.log("Index set done")}
                                    if (parseInt(maxPrice.options[i].value) < parseInt(e.target.value)) { maxPrice.remove(i); }
                                }
 
                            }}>
                                <option value="0">No Min</option>
                                <option value="10000">£10,000</option>
                                <option value="20000">£20,000</option>
                                <option value="30000">£30,000</option>
                                <option value="40000">£40,000</option>
                                <option value="50000">£50,000</option>
                                <option value="60000">£60,000</option>
                                <option value="70000">£70,000</option>
                                <option value="80000">£80,000</option>
                                <option value="90000">£90,000</option>
                                <option value="100000">£100,000</option>
 
                                <option value="110000">£110,000</option>
                                <option value="120000">£120,000</option>
                                <option value="130000">£130,000</option>
                                <option value="140000">£140,000</option>
                                <option value="150000">£150,000</option>
                                <option value="160000">£160,000</option>
                                <option value="170000">£170,000</option>
                                <option value="180000">£180,000</option>
                                <option value="190000">£190,000</option>
                                <option value="200000">£200,000</option>
 
                                <option value="210000">£210,000</option>
                                <option value="220000">£220,000</option>
                                <option value="230000">£230,000</option>
                                <option value="240000">£240,000</option>
                                <option value="250000">£250,000</option>
                                <option value="275000">£275,000</option>
                                <option value="300000">£300,000</option>
                                <option value="325000">£325,000</option>
                                <option value="350000">£350,000</option>
                                <option value="375000">£375,000</option>
                                <option value="400000">£400,000</option>
                                <option value="425000">£425,000</option>
                                <option value="450000">£450,000</option>
                                <option value="475000">£475,000</option>
                                <option value="500000">£500,000</option>
 
                                <option value="550000">£550,000</option>
                                <option value="600000">£600,000</option>
                                <option value="650000">£650,000</option>
                                <option value="700000">£700,000</option>
                                <option value="750000">£750,000</option>
                                <option value="800000">£800,000</option>
                                <option value="850000">£850,000</option>
                                <option value="900000">£900,000</option>
                                <option value="950000">£950,000</option>
                                <option value="1000000">£1,000,000</option>
 
                                <option value="1100000">£1,100,000</option>
                                <option value="1200000">£1,200,000</option>
                                <option value="1300000">£1,300,000</option>
                                <option value="1400000">£1,400,000</option>
                                <option value="1500000">£1,500,000</option>
                                <option value="1600000">£1,600,000</option>
                                <option value="1700000">£1,700,000</option>
                                <option value="1800000">£1,800,000</option>
                                <option value="1900000">£1,900,000</option>
                                <option value="2000000">£2,000,000</option>
 
                                <option value="2100000">£2,100,000</option>
                                <option value="2200000">£2,200,000</option>
                                <option value="2300000">£2,300,000</option>
                                <option value="2400000">£2,400,000</option>
                                <option value="2500000">£2,500,000</option>
                                <option value="2750000">£2,750,000</option>
                                <option value="3000000">£3,000,000</option>
 
                                <option value="3250000">£3,250,000</option>
                                <option value="3500000">£3,500,000</option>
                                <option value="3750000">£3,750,000</option>
                                <option value="4000000">£4,000,000</option>
                                <option value="4250000">£4,250,000</option>
                                <option value="4500000">£4,500,000</option>
                                <option value="4750000">£4,750,000</option>
                                <option value="5000000">£5,000,000</option>
                                <option value="5500000">£5,500,000</option>
                                <option value="6000000">£6,000,000</option>
                                <option value="6500000">£6,500,000</option>
                                <option value="7000000">£7,000,000</option>
                                <option value="7500000">£7,500,000</option>
                                <option value="8000000">£8,000,000</option>
                                <option value="8500000">£8,500,000</option>
                                <option value="9000000">£9,000,000</option>
                                <option value="9500000">£9,500,000</option>
                                <option value="10000000">£10,000,000</option>
 
                                <option value="12500000">£12,500,000</option>
                                <option value="15000000">£15,000,000</option>
 
                            </select>
                        </div>
                        <div className="price-to">
                            <p>to</p>
                        </div>                        
                        <div className="price-max">
                            <select name="PriceMax" id="PriceMax" onChange={(e) => {
                                setPriceMax(e.target.value)
                                const minPrice = document.getElementById("PriceMin")
                                let tempValue = minPrice.options[minPrice.selectedIndex].value
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                if(parseInt(e.target.value) === 0 || parseInt(minPrice.options[minPrice.length-1].value) < parseInt(e.target.value)){
                                    ResetList("PriceMin","sourcePrice", "Min")
                                }
                           
                                for (let i = minPrice.options.length - 1; i > 0; i--) {
                                    if(minPrice.options[i].value===tempValue){minPrice.selectedIndex=i}
                                    if (parseInt(minPrice.options[i].value) > parseInt(e.target.value) && parseInt(e.target.value)>0) { minPrice.remove(i) }
                                }
                            }}>
                                <option value="0">No Max</option>
                                <option value="10000">£10,000</option>
                                <option value="20000">£20,000</option>
                                <option value="30000">£30,000</option>
                                <option value="40000">£40,000</option>
                                <option value="50000">£50,000</option>
                                <option value="60000">£60,000</option>
                                <option value="70000">£70,000</option>
                                <option value="80000">£80,000</option>
                                <option value="90000">£90,000</option>
                                <option value="100000">£100,000</option>
 
                                <option value="110000">£110,000</option>
                                <option value="120000">£120,000</option>
                                <option value="130000">£130,000</option>
                                <option value="140000">£140,000</option>
                                <option value="150000">£150,000</option>
                                <option value="160000">£160,000</option>
                                <option value="170000">£170,000</option>
                                <option value="180000">£180,000</option>
                                <option value="190000">£190,000</option>
                                <option value="200000">£200,000</option>
 
                                <option value="210000">£210,000</option>
                                <option value="220000">£220,000</option>
                                <option value="230000">£230,000</option>
                                <option value="240000">£240,000</option>
                                <option value="250000">£250,000</option>
                                <option value="275000">£275,000</option>
                                <option value="300000">£300,000</option>
                                <option value="325000">£325,000</option>
                                <option value="350000">£350,000</option>
                                <option value="375000">£375,000</option>
                                <option value="400000">£400,000</option>
                                <option value="425000">£425,000</option>
                                <option value="450000">£450,000</option>
                                <option value="475000">£475,000</option>
                                <option value="500000">£500,000</option>
 
                                <option value="550000">£550,000</option>
                                <option value="600000">£600,000</option>
                                <option value="650000">£650,000</option>
                                <option value="700000">£700,000</option>
                                <option value="750000">£750,000</option>
                                <option value="800000">£800,000</option>
                                <option value="850000">£850,000</option>
                                <option value="900000">£900,000</option>
                                <option value="950000">£950,000</option>
                                <option value="1000000">£1,000,000</option>
 
                                <option value="1100000">£1,100,000</option>
                                <option value="1200000">£1,200,000</option>
                                <option value="1300000">£1,300,000</option>
                                <option value="1400000">£1,400,000</option>
                                <option value="1500000">£1,500,000</option>
                                <option value="1600000">£1,600,000</option>
                                <option value="1700000">£1,700,000</option>
                                <option value="1800000">£1,800,000</option>
                                <option value="1900000">£1,900,000</option>
                                <option value="2000000">£2,000,000</option>
 
                                <option value="2100000">£2,100,000</option>
                                <option value="2200000">£2,200,000</option>
                                <option value="2300000">£2,300,000</option>
                                <option value="2400000">£2,400,000</option>
                                <option value="2500000">£2,500,000</option>
                                <option value="2750000">£2,750,000</option>
                                <option value="3000000">£3,000,000</option>
 
                                <option value="3250000">£3,250,000</option>
                                <option value="3500000">£3,500,000</option>
                                <option value="3750000">£3,750,000</option>
                                <option value="4000000">£4,000,000</option>
                                <option value="4250000">£4,250,000</option>
                                <option value="4500000">£4,500,000</option>
                                <option value="4750000">£4,750,000</option>
                                <option value="5000000">£5,000,000</option>
                                <option value="5500000">£5,500,000</option>
                                <option value="6000000">£6,000,000</option>
                                <option value="6500000">£6,500,000</option>
                                <option value="7000000">£7,000,000</option>
                                <option value="7500000">£7,500,000</option>
                                <option value="8000000">£8,000,000</option>
                                <option value="8500000">£8,500,000</option>
                                <option value="9000000">£9,000,000</option>
                                <option value="9500000">£9,500,000</option>
                                <option value="10000000">£10,000,000</option>
 
                                <option value="12500000">£12,500,000</option>
                                <option value="15000000">£15,000,000</option>
 
                            </select>
                        </div>
 
                    </div>
 
                    <div className="bathrooms">
                        <div className="bathrooms-heading">
                            <p>BATHROOMS</p>
                        </div>
                        <div className="bathrooms-min">
                            <select name="BathsMin" id="BathsMin" onChange={(e) => {
                                setBathRoomsMin(e.target.value)
                                const maxBaths = document.getElementById("BathsMax")
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                let tempValue = maxBaths.options[maxBaths.selectedIndex].value
                                if(parseInt(maxBaths.options[1].value) > parseInt(e.target.value)){
                                    ResetList("BathsMax","sourceBedBath", "Max")
                                }
                                for (let i = maxBaths.options.length - 1; i > 0; i--) {
                                    if(maxBaths.options[i].value===tempValue){maxBaths.selectedIndex=i}
                                    if (parseInt(maxBaths.options[i].value) < parseInt(e.target.value)) { maxBaths.remove(i); }
                                }
 
                            }}>
                                <option value="0">No Min</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="999999999">10+</option>
                            </select>
                        </div>
                        <div className="bathrooms-to">
                            <p>to</p>
                        </div>
                        <div className="bathrooms-max">
                            <select name="BathsMax" id="BathsMax" onChange={(e) => {
                                setBathRoomsMax(e.target.value)
                                const minBaths = document.getElementById("BathsMin")
                                let tempValue = minBaths.options[minBaths.selectedIndex].value
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                if(parseInt(e.target.value) === 0 || parseInt(minBaths.options[minBaths.length-1].value) < parseInt(e.target.value)){
                                    ResetList("BathsMin","sourceBedBath", "Min")
                                }
                                for (let i = minBaths.options.length - 1; i > 0; i--) {
                                    if(minBaths.options[i].value===tempValue){minBaths.selectedIndex=i}
                                    if (parseInt(minBaths.options[i].value) > parseInt(e.target.value) && parseInt(e.target.value)>0) { minBaths.remove(i) }
                                }
                        }}>
                                <option value="0">No Max</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="999999999">10+</option>
                            </select>
                        </div>
                    </div>
 
                    <div className="bedrooms">
                        <div className="bedrooms-heading">
                            <p>BEDROOMS</p>
                        </div>
                        <div className="bedrooms-min">
                            <select name="BedsMin" id="BedsMin" onChange={(e) => {
                                setBedRoomsMin(e.target.value)
                                const maxBeds = document.getElementById("BedsMax")
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                let tempValue = maxBeds.options[maxBeds.selectedIndex].value
                                if(parseInt(maxBeds.options[1].value) > parseInt(e.target.value)){
                                    ResetList("BedsMax","sourceBedBath", "Max")
                                }
                                for (let i = maxBeds.options.length - 1; i > 0; i--) {
                                    if(maxBeds.options[i].value===tempValue){maxBeds.selectedIndex=i}
                                    if (parseInt(maxBeds.options[i].value) < parseInt(e.target.value) ) { maxBeds.remove(i); }
                                }
 
                            }}>
                                <option value="0">No Min</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="999999999">10+</option>
                            </select>
                        </div>
                        <div className="bedrooms-to">
                            <p>to</p>
                        </div>
                        <div className="bedrooms-max">
                            <select name="BedsMax" id="BedsMax" onChange={(e) => {
                                setBedRoomsMax(e.target.value)
                                const minBeds = document.getElementById("BedsMin")
                                let tempValue = minBeds.options[minBeds.selectedIndex].value
                                // If we need to repopulate options that were removed earlier, reset it first and remove afresh
                                console.log("target value is " + e.target.value)
 
                                if(parseInt(e.target.value) === 0 || parseInt(minBeds.options[minBeds.length-1].value) < parseInt(e.target.value)){
                                    ResetList("BedsMin","sourceBedBath", "Min")
                                }
                                for (let i = minBeds.options.length - 1; i > 0; i--) {
                                    if(minBeds.options[i].value===tempValue){minBeds.selectedIndex=i}
                                    if (parseInt(minBeds.options[i].value) > parseInt(e.target.value) && parseInt(e.target.value)>0) { minBeds.remove(i) }
                                }
 
                            }}>
                                <option value="0">No Max</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="999999999">10+</option>
                            </select>
                        </div>
                    </div>
 
                    <div className="garden">
                        <div className="garden-heading">
                            <p>GARDEN?</p>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="Garden" id="chkHasGarden" value={garden} onChange={(e) => {
                                setGarden(e.target.checked)
                            }} />
                        </div>
                    </div>
<br/><br/><br/><br/><br/>
                    <div >
                        <div >
                            <p>Exclude Sold?</p>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="ExSole" id="chkExSold" value={exSold} onChange={(e) => {
                                setExSold(e.target.checked)
                            }} />
                        </div>
                    </div>

                    <div className="reset">
                        <button className="reset-filter-btn filter-btn" onClick={ResetFilters}>Reset Filters</button>
                    </div>
                    <div className="submit">
                        <button className="submit-filter-btn">Search</button>
                    </div>
                </div>
                <span style={{ color: "red" }} id="ProSearchError"></span>
            </form>
        </div>
        <div hidden>
        {/* Selects to be hidden and be used to refresh / rest the dorpdowns visible in screen */}
 
        <select hidden name="sourcePrice" id="sourcePrice">
            <option value="0">No Min Max</option>
            <option value="10000">£10,000</option>
            <option value="20000">£20,000</option>
            <option value="30000">£30,000</option>
            <option value="40000">£40,000</option>
            <option value="50000">£50,000</option>
            <option value="60000">£60,000</option>
            <option value="70000">£70,000</option>
            <option value="80000">£80,000</option>
            <option value="90000">£90,000</option>
            <option value="100000">£100,000</option>
 
            <option value="110000">£110,000</option>
            <option value="120000">£120,000</option>
            <option value="130000">£130,000</option>
            <option value="140000">£140,000</option>
            <option value="150000">£150,000</option>
            <option value="160000">£160,000</option>
            <option value="170000">£170,000</option>
            <option value="180000">£180,000</option>
            <option value="190000">£190,000</option>
            <option value="200000">£200,000</option>
 
            <option value="210000">£210,000</option>
            <option value="220000">£220,000</option>
            <option value="230000">£230,000</option>
            <option value="240000">£240,000</option>
            <option value="250000">£250,000</option>
            <option value="275000">£275,000</option>
            <option value="300000">£300,000</option>
            <option value="325000">£325,000</option>
            <option value="350000">£350,000</option>
            <option value="375000">£375,000</option>
            <option value="400000">£400,000</option>
            <option value="425000">£425,000</option>
            <option value="450000">£450,000</option>
            <option value="475000">£475,000</option>
            <option value="500000">£500,000</option>
 
            <option value="550000">£550,000</option>
            <option value="600000">£600,000</option>
            <option value="650000">£650,000</option>
            <option value="700000">£700,000</option>
            <option value="750000">£750,000</option>
            <option value="800000">£800,000</option>
            <option value="850000">£850,000</option>
            <option value="900000">£900,000</option>
            <option value="950000">£950,000</option>
            <option value="1000000">£1,000,000</option>
 
            <option value="1100000">£1,100,000</option>
            <option value="1200000">£1,200,000</option>
            <option value="1300000">£1,300,000</option>
            <option value="1400000">£1,400,000</option>
            <option value="1500000">£1,500,000</option>
            <option value="1600000">£1,600,000</option>
            <option value="1700000">£1,700,000</option>
            <option value="1800000">£1,800,000</option>
            <option value="1900000">£1,900,000</option>
            <option value="2000000">£2,000,000</option>
 
            <option value="2100000">£2,100,000</option>
            <option value="2200000">£2,200,000</option>
            <option value="2300000">£2,300,000</option>
            <option value="2400000">£2,400,000</option>
            <option value="2500000">£2,500,000</option>
            <option value="2750000">£2,750,000</option>
            <option value="3000000">£3,000,000</option>
 
            <option value="3250000">£3,250,000</option>
            <option value="3500000">£3,500,000</option>
            <option value="3750000">£3,750,000</option>
            <option value="4000000">£4,000,000</option>
            <option value="4250000">£4,250,000</option>
            <option value="4500000">£4,500,000</option>
            <option value="4750000">£4,750,000</option>
            <option value="5000000">£5,000,000</option>
            <option value="5500000">£5,500,000</option>
            <option value="6000000">£6,000,000</option>
            <option value="6500000">£6,500,000</option>
            <option value="7000000">£7,000,000</option>
            <option value="7500000">£7,500,000</option>
            <option value="8000000">£8,000,000</option>
            <option value="8500000">£8,500,000</option>
            <option value="9000000">£9,000,000</option>
            <option value="9500000">£9,500,000</option>
            <option value="10000000">£10,000,000</option>
 
            <option value="12500000">£12,500,000</option>
            <option value="15000000">£15,000,000</option>
 
        </select>
 
        <select hidden name="sourceBedBath" id="sourceBedBath" >
            <option value="0">No Min Max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="999999999">10+</option>
        </select>
 
        {/* End of: Selects to be hidden and be used to refresh / rest the dorpdowns visible in screen */}
        </div>
</>        
    );
}
 
export default FindProperty;