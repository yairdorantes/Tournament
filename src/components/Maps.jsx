import { useEffect, useState } from "react";
import bgMap from "../media/map.jpg";
import { Link } from "react-router-dom";
import BuildSelected from "./BuildSelected";
import axios from "axios";
import { api } from "../api";

const Maps = () => {
  const [buildSelected, setBuildSelected] = useState({});
  const [showBuilding, setShowBuilding] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const getBuildings = () => {
    axios
      .get(`${api}/building`)
      .then((res) => {
        console.log(res);
        setBuildings(res.data.buildings);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="pt-28">
      <BuildSelected
        show={showBuilding}
        building={buildSelected}
        setShow={setShowBuilding}
      />
      {/* <input type="date" /> */}
      {/* <div className="text-white text-lg text-center font-bold">
        Edificio seleccionado:
        <Link to={`/building/${buildSelected.id}`}>
          {" "}
          <span className="link link-info">{buildSelected.title}</span>
        </Link>
      </div> */}
      <div className="flex flex-col gap-2 text-white">
        <div className="flex gap-2">
          <div className="bg-success w-7 h-7 rounded-full"></div>
          <div>Disponible</div>
        </div>
        <div className="flex gap-2">
          <div className="bg-error w-7 h-7 rounded-full "></div>
          <div>Ocupado</div>
        </div>
      </div>
      <div
        className="min-h-screen bg-cover rounded-lg mt-10 bg-center pt-5 gap-"
        style={{
          backgroundImage: `linear-gradient(rgba(4, 4, 4, 0.787), rgba(12, 12, 12, 0.839)), url(${bgMap})`,
        }}
      >
        <div className="grid  grid-cols-1 gap-y-10 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {buildings.map((build, i) => (
            <div
              key={i}
              className="flex items-center flex-col flex-wrap wrap justify-center"
            >
              {build.type === "office" ? (
                <div
                  onClick={() => {
                    setBuildSelected(build);
                    setShowBuilding(true);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className={`w-20 h-20 hover:scale-150 ${
                      build.available ? "text-success" : "text-red-500"
                    } transition-all text-gray-200`}
                  >
                    <path d="M5 3v18h6v-3.5h2V21h6V3H5m2 2h2v2H7V5m4 0h2v2h-2V5m4 0h2v2h-2V5M7 9h2v2H7V9m4 0h2v2h-2V9m4 0h2v2h-2V9m-8 4h2v2H7v-2m4 0h2v2h-2v-2m4 0h2v2h-2v-2m-8 4h2v2H7v-2m8 0h2v2h-2v-2z" />
                  </svg>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setBuildSelected(build);
                    setShowBuilding(true);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className={`w-20 h-20 hover:scale-150 ${
                      build.available ? "text-success" : "text-red-500"
                    } transition-all text-gray-200`}
                  >
                    <path d="M12 5C6.5 5 2 9.5 2 15v6h20v-6c0-5.5-4.5-10-10-10m0 2c2.53 0 4.78 1.17 6.25 3H5.76C7.22 8.17 9.47 7 12 7M8 19H4v-4c0-1.06.21-2.07.58-3H8v7m6 0h-4v-7h4v7m6 0h-4v-7h3.42c.37.93.58 1.94.58 3v4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
