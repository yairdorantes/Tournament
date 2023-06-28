import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useEffect, useState } from "react";

const UserReservation = () => {
  const { id } = useParams();
  const [reservs, setReservs] = useState([]);
  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString("es-ES", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }
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
    <div className="pt-28 p-2">
      {!reservs || !reservs.length > 0 ? (
        <div className="alert alert-info max-w-lg mx-auto font-bold text-lg">
          Aún no tienes reservaciones
        </div>
      ) : (
        <div className="max-w-[34rem] mx-auto">
          <div className="text-center mb-2 font-Lilita text-2xl text-[#1BA3D3] ">
            Tus reservaciones
          </div>
          {reservs.map((reserv, i) => (
            <div
              key={i}
              className="border-2 flex justify-between mb-5 p-3 border-[#2164BD] rounded-md"
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="w-20 h-20"
                >
                  <path d="M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h6.1c1.26 1.24 2.99 2 4.9 2 3.87 0 7-3.13 7-7 0-1.91-.76-3.64-2-4.9V5a2 2 0 00-2-2h-1V1h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67-3.87 0-7 3.13-7 7 0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85 0 2.68-2.17 4.85-4.85 4.85-2.68 0-4.85-2.17-4.85-4.85 0-2.68 2.17-4.85 4.85-4.85M15 13v3.69l3.19 1.84.75-1.3-2.44-1.41V13z" />
                </svg>
              </div>
              <div>
                <div>
                  {" "}
                  <span className="font-bold text-lg italic">Lugar</span>:
                  Chiapas {reserv.location}
                </div>
                <div>
                  <span className="font-bold text-lg italic">Horario:</span>{" "}
                  {`${reserv.hr_start} - ${reserv.hr_end}`}
                </div>
                <div>
                  <span className="font-bold text-lg italic">Precio:</span> $
                  {reserv.price}
                </div>
              </div>
              <div className="font-bold italic text-lg">
                {formatDate(reserv.date)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReservation;
