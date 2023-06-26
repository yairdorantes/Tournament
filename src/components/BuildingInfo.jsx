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
      <h1 className="text-white text-center text-xl uppercase">build info</h1>
      <FormBuy />
      <StripeCom totalPrice={15} />
    </div>
  );
};

export default BuildingInfo;
