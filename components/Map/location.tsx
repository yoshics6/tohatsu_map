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

const location = [
  {
    position: [33.005033, -97.226713],
    name: "Alliance DFW Boating <br /> Center, Inc.",
    distance: distance(32.90691, -96.413837, 33.005033, -97.226713),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png"
  },
  {
    position: [33.069471, -97.017023],
    name: "La Vida Starships",
    distance: distance(32.90691, -96.413837, 33.069471, -97.017023),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png"
  },
  {
    position: [32.90691, -96.413837],
    name: "Rockwall Marine",
    distance: distance(32.90691, -96.413837, 32.90691, -96.413837),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png"
  },
  {
    position: [32.475711, -97.696689],
    name: "Carey and Sons Marine LLC",
    distance: distance(32.90691, -96.413837, 32.475711, -97.696689),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png"
  },
  {
    position: [32.418897, -97.789195],
    name: "Tim's Marine Service, Inc.",
    distance: distance(32.90691, -96.413837, 32.418897, -97.789195),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-red.png"
  },
  {
    position: [33.069471, -97.017023],
    name: "La Vida Starships",
    distance: distance(32.90691, -96.413837, 33.069471, -97.017023),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-red.png"
  },
  {
    position: [32.866557, -95.750334],
    name: "Service Marine",
    distance: distance(32.90691, -96.413837, 32.866557, -95.750334),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-red.png"
  },
  {
    position: [32.318027, -95.606217],
    name: "Callender Lake Marine",
    distance: distance(32.90691, -96.413837, 32.318027, -95.606217),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-red.png"
  },
  {
    position: [32.06403, -96.436865],
    name: "Blake's Servicing dba Blake's Boats",
    distance: distance(32.90691, -96.413837, 32.06403, -96.436865),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-green.png"
  },
  {
    position: [32.786677, -95.455783],
    name: "S2 Marine",
    distance: distance(32.90691, -96.413837, 32.786677, -95.455783),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-gold.png"
  },
  {
    position: [32.515211, -94.836956],
    name: "White Oak Boat & Motors",
    distance: distance(32.90691, -96.413837, 32.515211, -94.836956),
    imgs: "https://map.iwelcome.net/asset/markercolor/img/marker-icon-2x-gold.png"
  },
];

export default location;
