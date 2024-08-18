import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeographicalDistributionChart = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/geographical-distribution")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Process data to format for Leaflet
        const processedData = data.map((item) => ({
          city: item._id,
          count: item.count,
          lat: item.lat || 51.505, // Placeholder value, replace with actual latitude
          lng: item.lng || -0.09, // Placeholder value, replace with actual longitude
        }));
        setLocations(processedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="map-container">
      <h2>Geographical Distribution of Customers</h2>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, idx) => (
          <Marker key={idx} position={[location.lat, location.lng]}>
            <Popup>
              {location.city}: {location.count} customers
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeographicalDistributionChart;
