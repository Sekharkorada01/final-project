import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router";

const CheckoutForm = () => {
  const {id} = useParams()
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://kizerr.pages.dev/success/${id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-[70%]">
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => {
          // @ts-ignore
          setEmail(e.value);
        }}
      />
      <PaymentElement
        id="payment-element"
        // @ts-ignore
        options={paymentElementOptions}
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-[--primaryColor] p-3 w-full mt-10 mb-3 rounded-md text-white font-bold"
      >
        <span>{isLoading ? "  Processing..." : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-600 text-center">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
