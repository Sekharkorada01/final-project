import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import NewRequest from "../utils/NewRequest";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: "SellerGigs",
    queryFn: () =>
      NewRequest(`gigs?userId=${User._id}`).then((res) => res.data),
  });

  // use Mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => NewRequest.delete(`/gig/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("SellerGigs");
    },
  });
  const handleDelete = (item) => {
    mutation.mutate(item?._id);
  };
  if (isLoading) return <Loading />;
  if (error) return <h1>Error</h1>;
  return (
    <div className="my-[100px] min-h-[49vh]">
      <div className="flex justify-between w-[90%]   mx-auto my-6">
        <h1 className="font-bold text-[30px] text-[#444]">Gigs</h1>
      </div>
      <table className="w-[90%]   mx-auto ">
        <thead>
          <tr className=" text-left">
            <th className="pl-3">Image</th>
            <th className="sm:hidden">Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
        </thead>
        {data?.map((gig, index) => {
          return (
            <tbody key={index}>
              <tr className={`${index % 2 === 0 && "bg-[#1dbf730f]"} `}>
                <td className="p-[10px] ">
                  <img
                    className="h-[40px] w-[70px] object-cover cursor-pointer"
                    onClick={() => {
                      navigate(`/gig/${gig?._id}`);
                    }}
                    src={gig?.cover}
                    alt=""
                  />
                </td>
                <td className="truncate sm:hidden">
                  <h3>{gig?.title}</h3>
                </td>
                <td className="">
                  <p>${gig?.price}</p>
                </td>
                <td className="">
                  {" "}
                  <p>{gig?.sales} </p>
                </td>
                <td className="text-red-600 text-[30px] sm:text-[20px]">
                  <button
                  
                    onClick={() => {
                      handleDelete(gig);
                    }}
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Index;
