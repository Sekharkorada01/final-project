import React from "react";
import { useNavigate } from "react-router";
import NewRequest from "../utils/NewRequest";
import Loading from "../components/Loading";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";
import { BsCheck2All } from "react-icons/bs";
import { MdInsertPhoto } from "react-icons/md";
const Index = () => {
  const { isLoading, error, data: Conversations } = useQuery({
    queryKey: "Conversation",
    queryFn: () => NewRequest(`/getAllConversations`).then((res) => res.data),
  });
  const VITE_SECRET_MESSAGE = "L1ne1_Th!sI5A-V3ryStr0ngK3y-N0b0dyC4nGue55-Th3Secr3tK3y1-sC0mpletelyRan-d0mAndUnpredi-ctable2Y0u-Keep1tSaf3And-SecureAtAllTi-m3s3t3cureK3y-isEssential4Da-taProtection-Practic3Str0ng-KeyMaNagement-St0reItInASec-ureVault7OrLo"
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => NewRequest.put(`/updateConversation/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("Conversation");
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };
  if (isLoading) return <Loading />;
  if (error) return <h1>error</h1>;
  return (
    <div className="my-[100px] min-h-[49vh] relative">
          <h1 className="font-bold text-[30px] my-10 text-[#444] w-[90%] mx-auto pl-4 ">Contacts</h1>
        {Conversations?.length > 0 ? (
          <table className="table-auto w-[90%] mx-auto  border border-gray-300 rounded-lg  ">
            <tbody>
              <tr className=" text-left bg-gray-100">
                <th className="px-5  py-5  ">
                  {User.isSeller ? "buyer" : "Seller"}
                </th>
                <th>Last Message</th>
                <th>Date</th>
                <th className="px-5">Action</th>
              </tr>
            </tbody>
            {Conversations?.map((c, index) => {
              const lastMessage = c?.lastMessage.slice(0,50) + (c?.lastMessage?.length > 50 ? "..." : "");
              return (
                <tbody key={index}>
                  <tr
                    className={`${
                      ((User?.isSeller && !c?.readBySeller) ||
                        (!User?.isSeller && !c?.readByBuyer)) &&
                      "bg-[#1dbf730f]"
                    }  mx-10 `}
                  >
                    <td className="px-5 py-5  ">
                      <h3 className="font-bold ">
                        {User?.isSeller ? c?.buyerUsername : c?.sellerUsername}
                      </h3>
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/message/${c?.id}`);
                      }}
                      className=" pt-[20px] line-clamp-1 max-w-[900px] cursor-pointer"
                    >
                      <p>  {(c?.lastMessage !==
                      // @ts-ignore
                      VITE_SECRET_MESSAGE  &&
                      c?.lastMessage) ||
                      (c?.lastMessage ===
                        VITE_SECRET_MESSAGE  && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <MdInsertPhoto /> <h1>photo</h1>
                        </div>
                      ))}</p>
                    </td>
                    <td className="">
                      {" "}
                      <p className="text-[12px]">{moment(c.updatedAt).fromNow()}</p>
                    </td>
                    <td className="px-5">
                      {(User.isSeller && !c.readBySeller) ||
                      (!User.isSeller && !c.readByBuyer) ? (
                        <button
                          onClick={() => {
                            handleRead(c.id);
                          }}
                          className=" text-white bg-[var(--primaryColor)] font-semibold text-[13px] px-3 py-2 rounded-sm"
                        >
                          Mark As Read
                        </button>
                      ) : (
                        <h1 className="text-[--primaryColor] font-bold text-[18px]">
                          <BsCheck2All />
                        </h1>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        ) : (
          <h1 className="text-center font-bold text-[25px] absolute  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
           No Contacts Yet !
          </h1>
        )}
    </div>
  );
};

export default Index;
