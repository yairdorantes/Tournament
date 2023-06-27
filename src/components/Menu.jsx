import { Link } from "react-router-dom";
import logo from "../media/xd.png";
const Menu = () => {
  return (
    <nav className="fixed  h-34 top-0 left-0 right-0 flex justify-center">
      <div className="w-screen bg-[#1AA7EE] group">
        <Link to={"/"}>
          <div className="flex items-end mt-2 justify-center gap-2">
            <img src={logo} className="w-12" alt="" />
            <div className="text-white font-bold font-Lilita italic text-4xl">
              Nubox
            </div>
          </div>
        </Link>

        <div className="text-white h-2 opacity-0 group-hover:opacity-100  group-hover:h-14 transition-all duration-500 grid grid-cols-2">
          <Link to="/">
            <div className="flex h-full  hover:bg-[#2164BD] p-2 justify-center mb-1 gap-2 font-Lilita text-xl">
              <div>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="w-8 h-8"
                >
                  <path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" />
                  <path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" />
                </svg>
              </div>
              <div className="mt-2">Inicio</div>
            </div>
          </Link>
          <div className="flex h-full  justify-center hover:bg-[#2164BD] duration-300 transition-all p-2  mb-1 gap-2 font-Lilita text-xl">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              className="w-9 h-9"
              width="1em"
            >
              <path d="M6 1v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h6.1c1.26 1.24 2.99 2 4.9 2 3.87 0 7-3.13 7-7 0-1.91-.76-3.64-2-4.9V5a2 2 0 00-2-2h-1V1h-2v2H8V1M5 5h14v2H5m0 2h14v.67c-.91-.43-1.93-.67-3-.67-3.87 0-7 3.13-7 7 0 1.07.24 2.09.67 3H5m11-7.85c2.68 0 4.85 2.17 4.85 4.85 0 2.68-2.17 4.85-4.85 4.85-2.68 0-4.85-2.17-4.85-4.85 0-2.68 2.17-4.85 4.85-4.85M15 13v3.69l3.19 1.84.75-1.3-2.44-1.41V13z" />
            </svg>
            <div className="mt-2">Reservaciones</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
