import { Toaster } from "react-hot-toast";
import "./App.css";
import Maps from "./components/Maps";
import Myrouter from "./router/Myrouter";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu></Menu>
      <Myrouter>
        <Maps></Maps>
      </Myrouter>
      <Toaster />

      {/* <div className="btn text-center text-red-500">aja</div> */}
    </>
  );
}

export default App;
