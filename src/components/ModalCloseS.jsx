import { useContext, useEffect } from "react";
import Modal from "react-modal";
import AuthContext from "../context/AuthContext";
const customStyles = {
  content: {
    // color: "white",
    backgroundColor: "#00000000",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const ModalCloseS = ({ isOpen, changeOpen }) => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <Modal ariaHideApp={false} style={customStyles} isOpen={isOpen}>
      <div className="bg-[#9fddf3] max-w-lg p-20 rounded-3xl">
        <h2 className="text-center font-bold  text-white  text-2xl">
          ¿Deseas cerrar sesión?
        </h2>
        <div className="flex justify-evenly gap-2 mt-10">
          <button
            onClick={() => logoutUser()}
            className="btn rounded-full text-white btn-success w-24"
          >
            SI
          </button>
          <button
            onClick={() => changeOpen(false)}
            className="btn w-24 rounded-full text-teal-50  btn-error"
          >
            NO
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCloseS;
