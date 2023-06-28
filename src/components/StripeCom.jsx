import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
// import { toast } from "react-hot-toast";
import { api } from "../api";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PDFContext from "../context/PDFContext";
import AuthContext from "../context/AuthContext";
// import AuthContext from "../context/AuthContext";
// import randomstring from "randomstring";
import cryptoRandomString from "crypto-random-string";

const stripePromise = loadStripe(
  "pk_test_51KjBqNA9KCn8yVMOEG2TF4LAS9CZwMVfMuAIHu1opMaabVxmgUri9qkETyQ9Q7DGyB6g9bNxEg62zf6dsqQZGdij00t1hmBwwH"
);
// const stripePromise = loadStripe(
//   "pk_live_51KjBqNA9KCn8yVMO98jMn54DDq0dIPKklBcNWUKFLlSvVGEtqzJ5sHlmJ5MaUKUaphT20Qyt8gPW6TaPkVtUSMv900QVTGcMpg"
// );

const CheckOut = ({ formData, totalPrice, building }) => {
  const { getPDF, pdfBase64 } = useContext(PDFContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myKey = cryptoRandomString({ length: 10 });
    const pdf = await getPDF({
      ...formData,
      clave: myKey,
      location: building.location,
    });
    console.log({ ...formData, pdf: pdfBase64 });
    const amountInDollars = totalPrice;
    const amountInCents = Math.round(amountInDollars * 100);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoader(true);
      const { id } = paymentMethod;
      axios
        .post(`${api}/checkout`, {
          id_payment: id,
          amount: amountInCents,
          // user_id: user.id,s
          formData: {
            ...formData,
            pdf,
            id_user: user.id,
            clave: myKey,
            id_building: building.id,
          },
          client_email: formData.email,
        })
        .then((res) => {
          console.log(res.data);
          console.log(getPDF(formData));
          toast.success("Pago realizado con éxito");
          navigate(`/reservations/${user.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Pago rechazado, intenta de nuevo");
        })
        .finally(() => setLoader(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="text-lg mb-2 text-white">Datos de pago</div> */}
      <div className="bg-cyan-500 uppercase text-center mb-2 font-bold text-xl p-1 w-full">
        Datos de Pago
      </div>
      <div className="">
        <CardElement className="bg-gray-100  border-2 border-gray-700 rounded-md p-4" />
      </div>
      <button
        disabled={loader}
        className="btn  btn-info text-white text-lg w-full mt-2 "
      >
        {loader ? <Loader /> : `Reservar por $${totalPrice}`}
      </button>
    </form>
  );
};

const StripeCom = ({ totalPrice, formData, building }) => {
  return (
    <div className="max-w-lg mx-auto text-white">
      <Elements stripe={stripePromise}>
        <CheckOut
          formData={formData}
          building={building}
          totalPrice={totalPrice}
        />
      </Elements>
    </div>
  );
};

export default StripeCom;
