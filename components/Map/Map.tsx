// import style from "@/styles/Home.module.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "@/node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "@/components/Map/MakeClusterGroup";
// import location from "@/components/Map/location";
import {
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import {
  getFindDealer,
  deleteFindDealer,
  deleteAllFindDealer,
} from "@/features/admin/find_dealer";
import { appDispatch, appSelector } from "@/store/hooks";

const initialValues: any = {
  text_no_id: 0,
  text_no_name: "",
};

interface Label {
  position: any;
  name: any;
  distance: any;
  imgs: any;
}

const Maps = (props: any) => {
  var DataProps = props;

  var search_bt =
    DataProps.search.fd_busines_type != undefined
      ? DataProps.search.fd_busines_type
      : "";
  var search_lat =
    DataProps.search.location_lat != undefined
      ? DataProps.search.location_lat
      : 32.90691;
  var search_long =
    DataProps.search.location_long != undefined
      ? DataProps.search.location_long
      : -96.413837;
  // var live_search = DataProps.search.live_search != undefined ? DataProps.search.live_search : '';

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

  const [center, setCenter] = React.useState<any>([32.90691, -96.413837]);
  const [initialPosition, setInitialPosition] = React.useState<
    [number, number]
  >([32.90691, -96.413837]);
  const [selectedPosition, setSelectedPosition] = React.useState<
    [number, number]
  >([32.90691, -96.413837]);

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return selectedPosition ? (
      <Marker
        key={selectedPosition[0]}
        position={selectedPosition}
        interactive={false}
      />
    ) : null;
  };

  return (
    <>
      <TextField
        fullWidth
        value={searched}
        label="Live Search..."
        onChange={(e: React.ChangeEvent<any>) => {
          e.preventDefault();
          setSearched(e.target.value);
        }}
      />
      <br />
      <br />

      <MapContainer
        style={{
          height: "50vh",
          width: "66vw",
        }}
        center={selectedPosition || initialPosition}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://www.google.com/maps/vt?lyrs=m@189&x={x}&y={y}&z={z}" />

        <MarkerClusterGroup>
          {rows.length > 0
            ? rows.map((value: any) => {
                if (
                  value.fd_busines_type
                    .toLowerCase()
                    .search(search_bt.toLowerCase()) != -1
                ) {
                  let lat = parseFloat(value.fd_latitude);
                  let long = parseFloat(value.fd_longitude);

                  if (value.fd_busines_type == "Sales & Service") {
                    var flag = "../static/img/marker-icon-2x-red.png";
                  } else if (value.fd_busines_type == "Service Only") {
                    var flag = "../static/img/marker-icon-2x-green.png";
                  } else {
                    var flag = "../static/img/marker-icon-2x-gold.png";
                  }

                  var distances = distance(search_lat, search_long, lat, long);

                  return (
                    <Marker
                      key={value.fd_id}
                      icon={
                        new L.Icon({
                          iconUrl: flag,
                          iconRetinaUrl: MarkerIcon.src,
                          iconSize: [25, 41],
                          iconAnchor: [12.5, 41],
                          popupAnchor: [0, -41],
                          shadowUrl: MarkerShadow.src,
                          shadowSize: [41, 41],
                        })
                      }
                      position={[lat, long]}
                    >
                      <Popup>
                        <p>{`Shop : ${value.fd_shop}`}</p>
                        <p>{`Dealer : ${value.fd_dealer}`}</p>
                        <p>{`Type : ${value.fd_busines_type}`}</p>
                        <p>{`Address : ${
                          value.fd_address +
                          " ," +
                          value.fd_road +
                          " ," +
                          value.fd_subdistrict +
                          " ," +
                          value.fd_district +
                          " ," +
                          value.fd_province +
                          " ," +
                          value.fd_zipcode
                        }`}</p>
                        <p>{`Tel : ${value.fd_tel}`}</p>
                        <p>{`Distance : ${distances}`}</p>
                        <a
                          style={{ fontSize: "25px" }}
                          target="_blank"
                          href={
                            "https://google.com/maps/search/" + lat + "," + long
                          }
                        >
                          View on map
                        </a>
                      </Popup>
                    </Marker>
                  );
                }
              })
            : ""}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

function distance(lat1: any, lon1: any, lat2: any, lon2: any) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d) + " kilometer ";
  else if (d <= 1) return Math.round(d * 1000) + " meter ";
  return d;
}

export default Maps;
