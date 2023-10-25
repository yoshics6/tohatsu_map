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

import Swal from "sweetalert2";
import router from "next/router";
// Table
import { getComparator, stableSort, Order } from "@/components/table/Table";
import {
  EnhancedTableHead,
  EnhancedTableToolbarProps,
} from "@/components/table/admin/find_dealer/TableHeads";
import {
  getFindDealer,
  deleteFindDealer,
  deleteAllFindDealer,
} from "@/features/admin/find_dealer";
import { appDispatch, appSelector } from "@/store/hooks";
import { MenuItem } from "@mui/base";
import axios from "axios";

interface Label {
  position: any;
  name: any;
  distance: any;
  imgs: any;
}

const Maps = () => {

  const dispatch = appDispatch();
  const [searched, setSearched] = React.useState<string>("");
  const { data } = appSelector((state) => state.find_dealer);

  var rows: any = data ?? [];

    // *************************** Use Effect ***************************
    React.useEffect(() => {
      dispatch(getFindDealer(""));
    }, [dispatch]);
  
    React.useEffect(() => {
      dispatch(getFindDealer(searched));
    }, [dispatch, searched]);
    // *************************** Use Effect ***************************

    // console.log(rows)

  const [center, setCenter] = React.useState<any>([32.90691, -96.413837]);
  const [center_lat, setCenterLat] = React.useState<any>(32.90691);
  const [center_long, setCenterLong] = React.useState<any>(-96.413837);

  navigator.geolocation.getCurrentPosition(function(position) {
    setCenterLat(position.coords.latitude);
    setCenterLong(position.coords.longitude);
  });
  
  return (
    <MapContainer
      style={{
        height: "50vh",
        width: "100vw",
      }}
      center={center}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}" />

      <MarkerClusterGroup>
        {rows.length > 0 ? rows.map((value:any) => {

        // if (value.fd_busines_type.toLowerCase().search('Sales & Service'.toLowerCase()) !=-1) 
        // {
        //   console.log(1)
        // }

          let lat = parseFloat(value.fd_latitude);  
          let long = parseFloat(value.fd_longitude); 
          
          if(value.fd_busines_type == 'Sales & Service'){
            var flag = 'https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-red.png';
          }
          else if(value.fd_busines_type == 'Service Only'){
            var flag = 'https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png';
          }
          else{
            var flag = 'https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-gold.png';
          }

          var distances = distance(center_lat , center_long , lat , long)

          return (
            <Marker
              key={value.fd_id}
              icon={
                new L.Icon({
                  iconUrl: flag, // MarkerIcon.src,
                  iconRetinaUrl: MarkerIcon.src,
                  iconSize: [25, 41],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                  shadowUrl: MarkerShadow.src,
                  shadowSize: [41, 41],
                })
              }
              position={[lat,long]}
            >
              <Popup>
                <p>{`Dealer : ${value.fd_dealer}`}</p>
                <p>{`Distance : ${distances}`}</p>
              </Popup>
            </Marker>
          );
        }): ""}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
function distance(lat1: any, lon1: any, lat2: any, lon2: any) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d) + " kilometer ";
  else if (d <= 1) return Math.round(d * 1000) + " meter ";
  return d;
}

export default Maps;
