import { Route, Routes } from "react-router-dom";
import BuildingInfo from "../components/BuildingInfo";
import Maps from "../components/Maps";
import PDFComp from "../components/PDFComp";

const Myrouter = () => {
  return (
    <Routes>
      <Route path="/building/:id" element={<BuildingInfo />} />
      <Route path="/" element={<Maps />} />
      <Route path="/pdf" element={<PDFComp />} />
    </Routes>
  );
};

export default Myrouter;
