import { useState } from "react";
import { useForm } from "react-hook-form";
import TimePicker from "./TimePicker";
import { toast } from "react-hot-toast";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";
// import StripeCom from "./StripeCom";

const FormBuy = () => {
  const [hrStart, setHrStart] = useState("00:00");
  const [hrEnd, setHrEnd] = useState("00:00");
  const [time, setTime] = useState("start");
  const [openModalClock, setOpenModalClock] = useState(false);
  const [showing, setShowing] = useState(true);
  const [formData, setFormData] = useState({});
  const { price, id } = useParams();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (openModalClock) return; // Do nothing if the modal is open
    if (hrStart !== "00:00" && hrEnd !== "00:00") {
      if (hrStart === hrEnd) {
        toast.error("Selecciona otro rango de horas");
      } else if (data.date === "2023-06-08") {
        console.log("fecha here");
      } else {
        toast.success("ey");
        // window.location.href = "/check";
        const newData = {
          ...data,
          hr_start: hrStart,
          hr_end: hrEnd,
          price,
          id_building: id,
        };
        setFormData(newData);
        setShowing(false);
      }
    } else {
      toast.error("Llena todo los campos por favor");
    }
  };

  return (
    <>
      {showing && (
        <div className="pt-28">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white  max-w-lg mx-auto bg-slate-900 p-4 rounded-lg"
          >
            <div className="text-center font-bold mb-2 text-lg">
              Formulario de reservación
            </div>
            <div className="bg-cyan-500 uppercase text-center font-bold text-xl p-1 w-full">
              informacion personal
            </div>
            <div className="mb-4">
              <label htmlFor="inputField" className="block text-lg font-bold ">
                Nombre Completo:
              </label>
              <input
                type="text"
                placeholder="Nombre completo"
                {...register("name", { required: true })}
                className="mt-2 input input-bordered input-success w-full max-w-xs"
              />
            </div>{" "}
            <div className="mb-4  ">
              <label htmlFor="inputField" className="block  text-lg font-bold ">
                Correo electrónico:
              </label>
              <input
                lang="es"
                type="email"
                placeholder="ejemplo@gmail.com"
                {...register("email", { required: true })}
                className="mt-2 input input-bordered input-success w-full max-w-xs"
              />
            </div>{" "}
            <div className="mb-4">
              <label htmlFor="inputField" className="block text-lg font-bold ">
                Nombre de tu empresa:
              </label>
              <input
                type="text"
                placeholder="empresa"
                {...register("company", { required: true })}
                className="mt-2 input input-bordered input-success w-full max-w-xs"
              />
            </div>{" "}
            <div className="bg-cyan-500 uppercase text-center font-bold text-xl p-1 w-full">
              reservación
            </div>
            <div className="mb-4">
              <label htmlFor="inputField" className="block text-lg font-bold ">
                Fecha:
              </label>
              <input
                lang="es"
                type="date"
                placeholder="empresa"
                {...register("date", { required: true })}
                className="mt-2 input input-bordered input-success w-full max-w-xs"
              />
            </div>{" "}
            <div className="mb-3 badge badge-info">Tipo: </div>
            <div className="flex gap-4 mb-4">
              <div className="flex gap-1">
                <label htmlFor="rad1">Oficina</label>
                <input
                  id="rad1"
                  type="radio"
                  name="radio-5"
                  className="radio radio-success"
                  value={"oficina"}
                  {...register("type", { required: true })}
                />
              </div>
              <div className="flex gap-1">
                <label htmlFor="rad2">Salón</label>
                <input
                  id="rad2"
                  type="radio"
                  name="radio-5"
                  value={"salon"}
                  className="radio radio-success"
                  {...register("type", { required: true })}
                />
              </div>
            </div>
            {/* ****************************** */}
            <div className="mb-3 badge badge-info">Ocupantes: </div>
            <div className="flex gap-4 mb-4">
              <div className="flex gap-1">
                <label htmlFor="rad1">1-50</label>
                <input
                  id="rad3"
                  type="radio"
                  name="radio-7"
                  className="radio radio-success"
                  value={"1-50"}
                  {...register("num_people", { required: true })}
                />
              </div>
              <div className="flex gap-1">
                <label htmlFor="rad2">1-100</label>
                <input
                  id="rad4"
                  type="radio"
                  name="radio-7"
                  value={"1-100"}
                  className="radio radio-success"
                  {...register("num_people", { required: true })}
                />
              </div>
              <div className="flex gap-1">
                <label htmlFor="rad2">1-200</label>
                <input
                  id="rad5"
                  type="radio"
                  name="radio-7"
                  value={"1-200"}
                  className="radio radio-success"
                  {...register("num_people", { required: true })}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setTime("start");
                setOpenModalClock(true);
              }}
              className="mb-4 btn btn-sm btn-neutral"
            >
              Seleccionar Hora de inicio
            </button>
            <span className="badge font-bold ml-2 py-4 badge-success">
              {hrStart}
            </span>
            <button
              onClick={() => {
                setTime("end");
                setOpenModalClock(true);
              }}
              className="mb-4 btn btn-sm btn-neutral"
            >
              Seleccionar Hora de finalizacion
            </button>
            <span className="badge py-4 font-bold ml-2 badge-success">
              {hrEnd}
            </span>
            <div className="text-center">
              <button type="submit" className="btn btn-info w-3/4 mt-2">
                Enviar
              </button>
            </div>
            {/* <StripeCom totalPrice={15} /> */}
          </form>
          <TimePicker
            time={time === "start" ? hrStart : hrEnd}
            isOpen={openModalClock}
            changeOpen={setOpenModalClock}
            changeTime={time === "start" ? setHrStart : setHrEnd}
          />
        </div>
      )}
      {!showing && <Checkout price={price} id={id} formData={formData} />}
    </>
  );
};

export default FormBuy;
