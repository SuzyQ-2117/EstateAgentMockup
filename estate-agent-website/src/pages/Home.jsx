import AddProperty from "../components/AddProperty";
import "../CSS/HomePage.css";
import { useState, useContext, useEffect } from "react";
import DisplayProperty from "../components/DisplayProperty";
import FindProperty from "../components/FindProperty";
import { PropContext, PropProvider } from "../context/prop-context";


export default function HomePage() {
  const [filter, setFilter] = useState({});

  //moved from display propertys as need for multiple data fetches
  //fetches data from properties object in JSON file then feed into "AddProperty" so that it can refresh the data after a propoerty is added
  // and passes the api state through to "DisplayProperty" to include apidata for all, fetch data for status change and filter results for filtering

  let [apiData, setData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:8000/Properties")
      .then((response) => response.json())
      .then((data) => setData(data));
  };

    useEffect(() => {
    fetchData();
  }, []);

  // Load values from context
  
    return (
        <PropProvider>
          <div className="page-content">
            <div className="white-container">
              <FindProperty />
             </div>
            <div className="white-container">
<<<<<<< HEAD
              <DisplayProperty />
=======
              <DisplayProperty apiData={apiData} fetchData={fetchData} filterResults="false" />
            </div>
            <div className="white-container">
              <AddProperty fetchData={fetchData}/>
>>>>>>> 7c9a99e792ba651ed78f0783dcabb87637307758
            </div>
          </div>
      </PropProvider>
  );
}
