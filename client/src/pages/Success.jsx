import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NewRequest from "../utils/NewRequest";

const Success = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { search } = useLocation();
  const parmas = new URLSearchParams(search);
  const payment_intent = parmas.get("payment_intent");
  const User = JSON.parse(localStorage.getItem("currentUser")) || {};
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const Request = async () => {
      await NewRequest.post(`/createOrder/${id}`, {
        payment_intent: payment_intent,
        buyerUsername: User?.username,
        buyerCountry: User?.country,
      });
    };
    if (sessionStorage.getItem("payment_intent") !==  payment_intent) {
      Request();
      sessionStorage.setItem("payment_intent", payment_intent);
    }
  
  }, []);
  return (
    <div className="min-h-[85vh] flex justify-center items-center flex-col">
      <h1 className="font-bold text-[--primaryColor] text-[30px] mb-[20px]">
        Payment Successful!
      </h1>
      <p className="text-center w-[320px] f">
        We are delighted to inform you that we received your payments
      </p>
      <Link
        to="/orders"
        className="bg-[--primaryColor] mt-[50px] mb-[20px] text-center  rounded-md p-1 px-2 text-white font-bold"
      >
        View Orders
      </Link>
      <Link
        to="/gigs"
        className="underline text-[--primaryColor]  text-center  rounded-md p-1 px-2  font-bold"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
