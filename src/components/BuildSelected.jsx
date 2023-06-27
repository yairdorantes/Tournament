import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";

const BuildSelected = ({ show, setShow, building }) => {
  return (
    <div className=" ">
      <div
        className={`fixed w-[32rem]  transition-all duration-700 left-1/2 ${
          show ? "bottom-64" : "-bottom-full"
        } bottom-10 transform -translate-x-1/2  z-10 border-2 border-blue-400 rounded-md `}
        data-theme="light"
      >
        <OutsideClickHandler onOutsideClick={() => setShow(false)}>
          <div className="flex gap-2">
            <div
              className="bg-cover bg-center min-h-[200px] w-[60%]"
              style={{
                backgroundImage: `url(${building.image})`,
              }}
            ></div>
            <div className="p-2 w-3/4">
              <h1 className="font-bold">{building.name}</h1>
              <div className="border-t mt-1 border-gray-300"></div>
              <div className="mt-2 italic font- text-cyan-400 font-bold">
                Desde ${building.price}
              </div>
              <div className="border-2 mb-5 rounded-lg p-2">
                <div className="capitalize">{building.type}</div>
                <div>{building.location}</div>
                <div className="flex gap-4">
                  <div className="flex gap-1 items-center">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M0 4.5A2.5 2.5 0 012.5 2h11A2.5 2.5 0 0116 4.5v7a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 010 11.5v-7zM2.5 3A1.5 1.5 0 001 4.5v7A1.5 1.5 0 002.5 13h11a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0013.5 3h-11zm10.854 4.646a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708l3-3a.5.5 0 01.708 0zm0 2.5a.5.5 0 010 .708l-.5.5a.5.5 0 01-.708-.708l.5-.5a.5.5 0 01.708 0z" />
                    </svg>
                    {building.space}m
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M5.216 14A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                      />
                      <path d="M4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                    {building.capacity} personas
                  </div>
                </div>
              </div>
              <Link to={`/building/${building.id}/${building.price}`}>
                <div className="text-center">
                  <button
                    disabled={!building.available}
                    className={`select-none hover:scale-105 cursor-pointer ${
                      building.available ? "bg-cyan-400 " : "bg-red-400"
                    } text-white font-bold p-2 rounded-3xl w-1/2 text-center mx-auto `}
                  >
                    {building.available ? "Contactar" : "No disponible"}
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default BuildSelected;
