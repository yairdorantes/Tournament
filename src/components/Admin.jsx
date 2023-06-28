import axios from "axios";
import { api } from "../api";
import { useEffect, useState } from "react";
import ModalCloseS from "./ModalCloseS";

const Admin = () => {
  const [render, setRender] = useState("clients");
  const [modalSesion, setModalSesion] = useState(false);
  return (
    <div className="pt-28 flex justify-center gap-4 flex-wrap ">
      <ModalCloseS isOpen={modalSesion} changeOpen={setModalSesion} />
      <div className="flex flex-col   text-center gap-5">
        <button
          onClick={() => setRender("clients")}
          className={`btn w-44 mx-auto btn-info ${
            render === "clients" && "bg-[#1E6896]"
          }  rounded-full text-white hover:scale-110 `}
        >
          Informacion clientes
        </button>
        <button
          onClick={() => setRender("facturas")}
          className={`btn btn-info ${
            render === "facturas" && "bg-[#1E6896]"
          } rounded-full text-white hover:scale-110 `}
        >
          Facturas
        </button>
        <button
          onClick={() => {
            setModalSesion(true);
            setRender("");
          }}
          className={`btn btn-info rounded-full ${
            modalSesion && "bg-[#1E6896]"
          } text-white hover:scale-110`}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="">
        {(render === "clients" && <ListClients />) ||
          (render === "facturas" && <Facturas />)}
      </div>
    </div>
  );
};

const ListClients = () => {
  const [clients, setClients] = useState([]);

  const getClients = () => {
    axios
      .get(`${api}/clients`)
      .then((res) => {
        console.log(res);
        setClients(res.data.clients);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="overflow-x-auto ">
      <table className="table">
        <thead>
          <tr className="text-center text-black text-lg">
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients &&
            clients.map((client, i) => {
              const nameParts = client.name.split(" ");
              const firstName = nameParts[0] || "";
              const lastNamePart1 = nameParts[1] || "";
              const lastNamePart2 = nameParts.slice(2).join(" ");
              return (
                <tr className="text-lg" key={i}>
                  <th>{client.id}</th>
                  <td>{firstName}</td>
                  <td>{lastNamePart1}</td>
                  <td>{lastNamePart2}</td>
                  <td>{client.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
const Facturas = () => {
  const [reservs, setReservs] = useState([]);
  const getReservations = () => {
    axios
      .get(`${api}/reservations`)
      .then((res) => {
        console.log(res);
        setReservs(res.data.reservations);
      })
      .catch((error) => console.log(error));
  };
  const handleButtonClick = (pdf) => {
    const base64Data = pdf;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  };

  useEffect(() => {
    getReservations();
  }, []);
  return (
    <div className="font-bold">
      {reservs &&
        reservs.map((reserv, i) => (
          <div
            key={i}
            className="w-[330px] flex gap-2 justify-center items-center mb-3 p-2 rounded-2xl bg-[#9fddf3]"
          >
            <div>
              Factura {reserv.type}, ${reserv.price}, clave {reserv.clave}
            </div>
            <div>
              <button onClick={() => handleButtonClick(reserv.pdf)}>
                <svg
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="w-8 h-8 cursor-pointer hover:text-[#aa0a00] hover:scale-110"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM64 224h24c30.9 0 56 25.1 56 56s-25.1 56-56 56h-8v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm24 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v48h8zm72-64c0-8.8 7.2-16 16-16h24c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-24c-8.8 0-16-7.2-16-16V240zm32 112h8c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-8v96zm96-128h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V240c0-8.8 7.2-16 16-16z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Admin;
