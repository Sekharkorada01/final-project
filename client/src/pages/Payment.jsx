import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NewRequest from "../utils/NewRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import Loading from "../components/Loading";

const stripePromise = loadStripe(
  "pk_test_51Nc1FVH6iNNx9sDB2V2yg5qJov4niuoguXkcpTroQ1ZzrenaKQKiTBLX7NrjFaqmGnZwUfJte03uzuwRBL3MfTVK00kyDdZH8n"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [Error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const User = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    // Create PaymentIntent as soon as the page 
    const RequstPayment = async () => {
      try {
        const res = await NewRequest.post(`/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        setError(error.message);
      }
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    RequstPayment();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  if(isLoading)return <Loading/>
  if(Error)return <h1 className=" h-[70vh] flex justify-center items-center font-bold p text-red-500">{"Something Went Wrong Or You're unauthorized!"}</h1>
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      {clientSecret && (
        <Elements
          // @ts-ignore
          options={options}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
