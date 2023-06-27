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
// import AuthContext from "../context/AuthContext";
const stripePromise = loadStripe(
  "pk_test_51KjBqNA9KCn8yVMOEG2TF4LAS9CZwMVfMuAIHu1opMaabVxmgUri9qkETyQ9Q7DGyB6g9bNxEg62zf6dsqQZGdij00t1hmBwwH"
);

const CheckOut = ({ formData, totalPrice }) => {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const stripe = useStripe();
  // const redirect = useREd
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          formData,
          client_email: "yairmasterlol@gmail.com",
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Pago realizado con éxito");
          navigate("/");
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
      <button disabled={loader} className="btn  btn-info w-full mt-2 ">
        {loader ? <Loader /> : `Reservar por $${totalPrice}`}
      </button>
    </form>
  );
};

const StripeCom = ({ totalPrice, formData }) => {
  return (
    <div className="max-w-lg mx-auto text-white">
      <Elements stripe={stripePromise}>
        <CheckOut formData={formData} totalPrice={totalPrice} />
      </Elements>
    </div>
  );
};

export default StripeCom;
