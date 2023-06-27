import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import StripeCom from "./StripeCom";
import FormBuy from "./FormBuy";

const BuildingInfo = () => {
  const getBuilding = () => {
    axios
      .get(`${api}/test`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getBuilding();
  }, []);

  return (
    <div>
      <FormBuy />
    </div>
  );
};

export default BuildingInfo;
