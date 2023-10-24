// import style from "@/styles/Home.module.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "@/node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "@/components/Map/MakeClusterGroup";
import location from "@/components/Map/location";

// var fromLatLng = L.latLng([13.548854402658991, 100.616668632408]);
// var toLatLng = L.latLng([13.637807557037638, 100.75532103394023]);

// var dis = fromLatLng.distanceTo(toLatLng) / 1000;
// console.log(dis);

interface Label {
  position: any;
  name: any;
  distance: any;
  imgs: any;
}
const Maps = () => {
  const [center, setCenter] = React.useState<any>([32.90691, -96.413837]);
  return (
    <MapContainer
      style={{
        height: "100vh",
        width: "100vw",
      }}
      center={center}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}" />

      <MarkerClusterGroup>
        {location.map((value: Label, key) => {
          return (
            <Marker
              key={key}
              icon={
                new L.Icon({
                  iconUrl: value.imgs, // MarkerIcon.src,
                  iconRetinaUrl: MarkerIcon.src,
                  iconSize: [25, 41],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                  shadowUrl: MarkerShadow.src,
                  shadowSize: [41, 41],
                })
              }
              position={value.position}
            >
              <Popup>
                <p>{`Dealer : ${value.name}`}</p>
                <p>{`Distance : ${value.distance}`}</p>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Maps;
