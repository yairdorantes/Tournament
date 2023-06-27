import { Route, Routes } from "react-router-dom";
import BuildingInfo from "../components/BuildingInfo";
import Maps from "../components/Maps";
import PDFComp from "../components/PDFComp";
import { ListBuilds } from "../components/ListBuilds";
import Checkout from "../components/Checkout";

const Myrouter = () => {
  return (
    <Routes>
      <Route path="/building/:id/:price" element={<BuildingInfo />} />
      <Route path="/" element={<Maps />} />
      <Route path="/pdf" element={<PDFComp />} />
      <Route path="/list" element={<ListBuilds />} />
      <Route path="/check" element={<Checkout />} />
    </Routes>
  );
};

export default Myrouter;
