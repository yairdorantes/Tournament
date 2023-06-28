import { useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../api";

const Addbuild = ({ id }) => {
  const [showBtns, setShowBtns] = useState(false);
  return (
    <div className="absolute h-24  z-50 bottom-24 cursor-pointer  right-32 text-white ">
      <div
        className={`flex flex-col opacity-0 ${
          showBtns && "opacity-100"
        } transition-all duration-200  gap-3`}
      >
        <Link to={`${server}/admin/api/building/add/`}>
          <div className="btn w-full btn-success">añadir edificio</div>
        </Link>
        <Link to={`${server}/admin/api/building/${id}/delete/`}>
          <div
            onClick={() => console.log("xd")}
            className="btn w-full btn-error"
          >
            Eliminar Edificio
          </div>
        </Link>
      </div>
      <div className="absolute z-10 right-0 mt-3">
        <div
          onClick={() => setShowBtns(!showBtns)}
          className="bg-white hover:scale-125 transition-all w-16 h-10 flex justify-center items-center  rounded-full"
        >
          <svg
            viewBox="0 0 920 1000"
            fill="currentColor"
            height="1em"
            width="1em"
            className="text-[#1E6896] w-12 h-12 mx-auto"
          >
            <path d="M110 390c30.667 0 56.667 10.667 78 32s32 47.333 32 78c0 29.333-10.667 55-32 77s-47.333 33-78 33-56.667-11-78-33-32-47.667-32-77c0-30.667 10.667-56.667 32-78s47.333-32 78-32m350 0c30.667 0 56.667 10.667 78 32s32 47.333 32 78c0 29.333-11 55-33 77s-47.667 33-77 33-55-11-77-33-33-47.667-33-77c0-30.667 10.667-56.667 32-78s47.333-32 78-32m350 0c30.667 0 56.667 10.667 78 32s32 47.333 32 78c0 29.333-10.667 55-32 77s-47.333 33-78 33-56.667-11-78-33-32-47.667-32-77c0-30.667 10.667-56.667 32-78s47.333-32 78-32" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Addbuild;
