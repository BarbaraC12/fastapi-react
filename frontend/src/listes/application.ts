import location from "../listes/location.ts"
import { randomArrayItem } from "@mui/x-data-grid-generator";
import { GridRowsProp } from "@mui/x-data-grid";

const randomLoc = () => {
    return randomArrayItem(location);
};

const application: GridRowsProp = [
    {
      id: 1,
      name: "App Nom1 a",
      trigram: "JRD",
      mep: new Date("2024-06-18"),
      availability: 50,
      ref: false,
      location: randomLoc().name,
    },
    {
      id: 2,
      name: "Abp de Nom2",
      trigram: "ADF",
      mep: new Date("2024-06-18"),
      availability: 90,
      ref: true,
      location: randomLoc().name,
    },
    {
      id: 3,
      name: "Abcdef",
      trigram: "NFD",
      mep: new Date("2020-01-18"),
      availability: 100,
      ref: true,
      location: randomLoc().name,
    },
];

export default application;