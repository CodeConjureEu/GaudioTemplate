export interface ICoordinate {
  longitude: number;
  latitude: number;
}
export interface ILocation {
  name: string;
  coordiante: ICoordinate;
}
export const locations: ILocation[] = [
  {
    name: "Frauen Brunnen Einsiedeln",
    coordiante: {
      latitude: 47.1265432,
      longitude: 8.7523298,
    },
  },
  {
    name: "Kloster Einsiedeln",
    coordiante: {
      latitude: 47.1265432,
      longitude: 8.7523298,
    },
  },
  {
    name: "Aussichtpunkt St. Benedikt Plattforms",
    coordiante: {
      latitude: 47.1253739,
      longitude: 8.7556303,
    },
  },
  {
    name: "Panorama Einsiedeln",
    coordiante: {
      latitude: 47.1303645,
      longitude: 8.7495532,
    },
  },
  {
    name: "Chärnehus",
    coordiante: {
      latitude: 47.1303645,
      longitude: 8.7495532,
    },
  },
  {
    name: "Bibliothek Werner Oechslin",
    coordiante: {
      latitude: 47.1251934,
      longitude: 8.7449378,
    },
  },
  {
    name: "Pumptrack Einsiedeln",
    coordiante: {
      latitude: 47.1370108,
      longitude: 8.7404847,
    },
  },
];
