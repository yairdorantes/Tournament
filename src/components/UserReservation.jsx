import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useEffect, useState } from "react";

const UserReservation = () => {
  const { id } = useParams();
  const [reservs, setReservs] = useState([]);
  const getReservations = () => {
    axios
      .get(`${api}/reservations/${id}`)
      .then((res) => {
        console.log(res);
        setReservs(res.data.reservations);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="pt-28">
      <div>jaja</div>
      <div className="max-w-lg mx-auto">
        {reservs.map((reserv, i) => (
          <div key={i} className="border-2 border-black rounded-sm">
            lolas
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReservation;
