import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import NewRequest from "../utils/NewRequest";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
const Index = () => {
  const navigate = useNavigate();
  const {
    isLoading: isLoadingOrders,
    error: errorOrders,
    data: orders,
  } = useQuery({
    queryKey: "orders",
    queryFn: () => NewRequest(`/getOrders`).then((res) => res.data),
  });
  // const { isLoading, error, data } = useQuery({
  //   queryKey: "userId",
  //   queryFn: () => 
  // });
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const handleOrder = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = order.sellerId + order.buyerId;
   const seconduser =   await NewRequest(`users/${User.isSeller ?buyerId : sellerId}`).then((res) => res.data)
    try {
      const res = await NewRequest.get(`/getConversation/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await NewRequest.post(`/createConversation`, {
          to: User?.isSeller ? buyerId : sellerId,
          buyerUsername: User?.isSeller ? seconduser.username : User?.username,
          buyerImg: User?.isSeller ? seconduser?.img : User?.img,
          sellerUsername: User?.isSeller ? User?.username : seconduser?.username,
          sellerImg: User?.isSeller ? User?.img : seconduser?.img,  
          lastMessage: "",
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  if (isLoadingOrders) return <Loading />;
  if (errorOrders) return <h1>Error....</h1>;
  return (
    <div className="my-[100px] min-h-[49vh]  relative">
      <div className="flex justify-between w-[90%] sm:w-[98%] mx-auto my-6">
        <h1 className="font-bold text-[30px] text-[#444]">Orders</h1>
      </div>
      {orders?.length > 0 ? (
        <table className="w-[90%] sm:w-[98%] mx-auto border">
          <tbody>
            <tr className=" text-left bg-gray-100 p-2">
              <th className="pl-3 py-[15px]">Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Buyer</th>
              <th>country</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orders?.map((order, index) => {
            return (
              <tbody key={index}>
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 && "bg-[#1dbf730f]"
                  } cursor-pointer`}
                >
                  <td className={`p-[10px] w-[calc(100%/6)] `}>
                    <img
                      className="h-[40px] w-[70px]"
                      src={order?.img}
                      alt=""
                    />
                  </td>
                  <td className={`w-[calc(100%/6)] `}>
                    <h3>{order?.title?.slice(0,Math.min(order?.title?.length , 10) )+"..."}</h3>
                  </td>
                  <td className={`w-[calc(100%/6)] `}>
                    <p>${order?.price}</p>
                  </td>
                  <td className={`w-[calc(100%/6)] `}>
                    {" "}
                    <p>{order?.buyerUsername} </p>
                  </td>
                  <td className={`w-[calc(100%/6)] `}>
                    {" "}
                    <p>{order?.buyerCountry} </p>
                  </td>
                  <td className={`text-blue-500 text-[30px] w-[calc(100%/6)] `}>
                    <p
                      onClick={() => {
                        handleOrder(order);
                      }}
                    >
                      <AiOutlineMail />
                    </p>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <h1 className="font-bold text-center text-[25px] absolute  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">No Orders Yet !</h1>
      )}
    </div>
  );
};

export default Index;
