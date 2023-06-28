import { Route, Routes } from "react-router-dom";
import BuildingInfo from "../components/BuildingInfo";
import Maps from "../components/Maps";
import PDFComp from "../components/PDFComp";
import { ListBuilds } from "../components/ListBuilds";
import Checkout from "../components/Checkout";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";
import UserReservation from "../components/UserReservation";
import Admin from "../components/Admin";
const Myrouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Maps />} />
        <Route path="/building/:id/:price" element={<BuildingInfo />} />
        <Route path="/pdf" element={<PDFComp />} />
        <Route path="/list" element={<ListBuilds />} />
        <Route path="/check" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reservations/:id" element={<UserReservation />} />
      </Route>
    </Routes>
  );
};

export default Myrouter;
