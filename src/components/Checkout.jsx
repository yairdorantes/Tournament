import axios from "axios";
import StripeCom from "./StripeCom";
import { api } from "../api";
import { useEffect, useState } from "react";

const Checkout = ({ formData, price, id }) => {
  const [building, setBuilding] = useState({});
  const getBuilding = () => {
    axios
      .get(`${api}/building/${id}`)
      .then((res) => {
        // console.log(res.data.building, "here");
        setBuilding(res.data.building);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBuilding();
  }, []);

  console.log(formData);
  return (
    <div className="pt-28">
      <div className="text-white text-center font-bold text-2xl mb-4">
        Ubicacion del edificio
      </div>
      <div className="max-w-lg mx-auto h-[400px] mb-10">
        <iframe
          //   className="w-2"

          src={building.g_maps}
          width="100%"
          height="100%"
          // allowfullscreen=""
          loading="lazy"
          className="rounded-sm"
          // referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <StripeCom id={id} formData={formData} totalPrice={price} />
    </div>
  );
};

export default Checkout;
