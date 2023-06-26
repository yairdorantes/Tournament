import TimeKeeper from "react-timekeeper";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
// import OutsideClickHandler from "react-outside-click-handler";

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
const TimePicker = ({ isOpen, changeOpen, time, changeTime }) => {
  return (
    <div>
      <Modal ariaHideApp={false} style={customStyles} isOpen={isOpen}>
        {/* <OutsideClickHandler
          onOutsideClick={() => {
            // handleOpen(!isOpen);
            console.log("xd");
          }}
        > */}
        <div>
          <TimeKeeper
            time={time}
            onChange={(data) => changeTime(data.formatted12)}
          />
        </div>
        <div className="text-center mt-4">
          <button onClick={() => changeOpen(false)} className="btn btn-error">
            Cerrar
          </button>
        </div>
        {/* </OutsideClickHandler> */}
      </Modal>
    </div>
  );
};

export default TimePicker;
