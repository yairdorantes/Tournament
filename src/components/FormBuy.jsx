import { useState } from "react";
import { useForm } from "react-hook-form";
import TimePicker from "./TimePicker";
import { toast } from "react-hot-toast";

const FormBuy = () => {
  const [hrStart, setHrStart] = useState("00:00");
  const [hrEnd, setHrEnd] = useState("00:00");
  const [time, setTime] = useState("start");
  const [openModalClock, setOpenModalClock] = useState(false);
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
        console.log({ ...data, hr_start: hrStart, hr_end: hrEnd });
      }
    } else {
      toast.error("Llena todo los campos por favor");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-white  max-w-lg mx-auto bg-slate-900 p-4 rounded-lg"
      >
        <div className="text-center">Formulario de Pago</div>
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
        <div className="mb-4">
          <label htmlFor="inputField" className="block text-lg font-bold ">
            Número de ocupantes:
          </label>
          <input
            type="number"
            placeholder="número de ocupantes"
            {...register("number_people", {
              required: true,
              min: 1,
              max: 1000,
            })}
            className="mt-2   input input-bordered input-success w-full max-w-xs"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex gap-1">
            <label htmlFor="rad1">Oficina</label>
            <input
              max={100}
              min={1}
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
        <button
          onClick={() => {
            setTime("start");
            setOpenModalClock(true);
          }}
          className="mb-4 btn btn-sm btn-neutral"
        >
          Seleccionar Hora de inicio
        </button>
        <span className="badge font-bold ml-2 badge-success">{hrStart}</span>
        <button
          onClick={() => {
            setTime("end");
            setOpenModalClock(true);
          }}
          className="mb-4 btn btn-sm btn-neutral"
        >
          Seleccionar Hora terminar
        </button>
        <span className="badge font-bold ml-2 badge-success">{hrEnd}</span>
        <div className="text-center">
          <button type="submit" className="btn btn-success w-3/4 mt-2">
            Enviar
          </button>
        </div>
      </form>
      <TimePicker
        time={time === "start" ? hrStart : hrEnd}
        isOpen={openModalClock}
        changeOpen={setOpenModalClock}
        changeTime={time === "start" ? setHrStart : setHrEnd}
      />
    </>
  );
};

export default FormBuy;
