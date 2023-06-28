import { useContext, useState } from "react";
import logo from "../media/xd.png";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [hidePass, setHidePass] = useState(true);

  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(AuthContext);
  const submit = (data) => {
    console.log(data);
    loginUser(data);
  };
  return (
    <div className="pt-28 h-screen w-screen bg-[#1AA7EE]">
      <div className="text-center">
        <img src={logo} className="w-24 mx-auto" alt="" />
        <h1 className="font-Lilita text-white text-4xl italic mt-5">Nubox</h1>
        <p className="text-white italic font-bold">
          buen lugar para buenos momentos
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="relative max-w-lg mx-auto mt-10"
      >
        <svg
          className="absolute top-2 left-3 w-7 h-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
        </svg>
        <input
          className="rounded-full mb-10 p-3 pl-10 h-10 bg-gray-100 border-2 w-full  border-black"
          type="text"
          name=""
          {...register("email", { required: true })}
        />
        <svg
          className="w-6 h-6 absolute top-[88px] left-3"
          viewBox="0 0 448 512"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M144 144v48h160v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zm-64 48v-48C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64h16z" />
        </svg>
        <input
          className="rounded-full p-3 pl-10 h-10 bg-gray-100 border-2 w-full border-black"
          type={hidePass ? "password" : "text"}
          {...register("password", { required: true })}
        />
        {!hidePass ? (
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            className="absolute right-4 top-[88px] w-7 h-7"
            onClick={() => setHidePass(!hidePass)}
          >
            <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            onClick={() => setHidePass(!hidePass)}
            width="1em"
            className="absolute right-4 top-[88px] w-7 h-7"
          >
            <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
            <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
          </svg>
        )}
        <div className="text-center mt-10 flex justify-center gap-5">
          <button
            type="submit"
            className="bg-[#2164BD] hover:scale-110 transition-all uppercase font-bold italic  text-white cursor-pointer select-none p-2 w-[150px] rounded-full"
          >
            iniciar sesión
          </button>
          <Link to="/signup">
            <button className="bg-secondary uppercase font-bold italic  text-white cursor-pointer select-none p-2 w-[150px] rounded-full">
              Registrarse
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;