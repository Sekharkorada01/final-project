import { Link, useNavigate, useParams } from "react-router-dom";
import NewRequest from "../utils/NewRequest.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "../components/Loading";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile, BsMic } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import moment from "moment";
import { AiOutlineSearch } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdInsertPhoto } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import upload from "../utils/Upload.js";

const Index = () => {
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [MESSAGE, setMESSAGE] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [clickImage, setClickImage] = useState(false);
  const [currImage, setCurrImage] = useState(undefined);
  const [chosenImage, setChosenImage] = useState(undefined);
  const [isUploading, setisUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const ConvRef = useRef(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    if (ConvRef.current) {
      ConvRef.current.scrollTo({
        top: ConvRef.current.scrollHeight + 1000,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  const {
    isLoading,
    error,
    data: messages,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: "Messages",
    queryFn: () => NewRequest(`/messages/${id}`).then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (message) => NewRequest.post("/createmessage", message),
    onSuccess: () => {
      queryClient.invalidateQueries("Messages");
      scrollToBottom();
    },
  });
  const {
    isLoading: isLoadingConv,
    error: errorConv,
    data: Conv,
    refetch,
  } = useQuery({
    queryKey: "Conv",
    queryFn: () => NewRequest(`/getConversation/${id}`).then((res) => res.data),
  });

  const {
    isLoading: isLoadingAllConvs,
    error: errorAllConvs,
    data: AllConversations,
    refetch: refetchAllConvs,
  } = useQuery({
    queryKey: "Conversation",
    queryFn: () => NewRequest(`/getAllConversations`).then((res) => res.data),
  });
  useEffect(() => {
    refetch();
    refetchMessages();
  }, [id]);
  useEffect(() => {
    refetchAllConvs();
  }, [messages]);
  useEffect(() => {
    if (ConvRef.current) {
      ConvRef.current.scrollTo({
        top: ConvRef.current.scrollHeight + 1000
      });
    }
  }, [messages]);

  const VITE_SECRET_MESSAGE = "L1ne1_Th!sI5A-V3ryStr0ngK3y-N0b0dyC4nGue55-Th3Secr3tK3y1-sC0mpletelyRan-d0mAndUnpredi-ctable2Y0u-Keep1tSaf3And-SecureAtAllTi-m3s3t3cureK3y-isEssential4Da-taProtection-Practic3Str0ng-KeyMaNagement-St0reItInASec-ureVault7OrLo"
  const handleConv = async (item) => {
    navigate(`/message/${item?.id}`);
  };
  const handleEmojie = (e) => {
    setMESSAGE(MESSAGE + e.native);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let media = undefined;
    if (chosenImage) {
      setisUploading(true);
      media = await upload(chosenImage);
      setisUploading(false);
    }
    const newMessage = {
      // @ts-ignore
      desc: MESSAGE
        ? MESSAGE
        : fileName
        ? VITE_SECRET_MESSAGE 
        : "No messages yet",
      conversationId: id,
      img: media,
    };
    // @ts-ignore
    mutation.mutate(newMessage);
    setMESSAGE("");
    setChosenImage(undefined);
    setFileName("");
  };
  console.log(VITE_SECRET_MESSAGE )
  if (isLoading || isLoadingAllConvs || isLoadingConv) return <Loading />;
  if (error || errorAllConvs || errorConv) return <h1>error</h1>;
  return (
    <div className="flex w-full  h-[100vh] fixed top-0 bottom-0 left-0 right-0 ">
      <div
        ref={menuRef}
        className={`w-[25%] max-1200:hidden ${
          openMenu &&
          "max-1200:!block max-1200:fixed max-1200:!top-0 max-1200:!bottom-0 max-1200:!left-0 max-1200:!w-[70%] max-1200:max-w-[400px] max-1200:!z-[2000]"
        } bg-gray-100  border-r border-r-gray-300`}
      >
        <div className="max-1200:w-[70%] max-1200:max-w-[400px] flex justify-between h-[100px] items-center border-b border-gray-300 px-4 fixed right-[75%] top-0 left-0   ">
          <Link to={"/messages"} className="font-bold text-[35px]">
            Chats
          </Link>
          {/* <div className="flex gap-3">
            <button
              className="text-[25px] bg-gray-300 rounded-full p-2"
            >
              <AiOutlineSearch />
            </button>
            <button className="text-[25px] bg-gray-300 rounded-full p-2">
              <GiSettingsKnobs />
            </button>
          </div> */}
        </div>

        <div className="mt-[100px] ">
          {AllConversations?.map((item, index) => (
            <div
              onClick={() => {
                handleConv(item);
              }}
              key={index}
              className={`${
                id == item?.id && "bg-gray-300"
              } cursor-pointer  truncate flex justify-between h-[100px] items-center border-b border-gray-300 px-4`}
            >
              <div className="flex gap-3">
                <img
                  src={
                    (User.isSeller ? item?.buyerImg : item?.sellerImg) ||
                    "/no_avatar.png"
                  }
                  alt="jj"
                  className="h-[40px] w-[40px] rounded-full object-cover df"
                />
                <div className="">
                  <div className="flex gap-1 items-center relative">
                    <h1 className="font-bold text-[20px]">
                      {User.isSeller
                        ? item?.buyerUsername
                        : item?.sellerUsername}
                    </h1>
                    <div className=" bg-[--primaryColor]  translate-y-1 h-2 w-2 rounded-full" />
                  </div>
                  <h1 className="text-gray-500 text-[17px] max-w-[250px] truncate  ">
                    {(item?.lastMessage !==
                      // @ts-ignore
                      VITE_SECRET_MESSAGE  &&
                      item?.lastMessage) ||
                      (item?.lastMessage ===
                        VITE_SECRET_MESSAGE  && (
                        <div className="flex items-center gap-1 text-gray-400">
                          <MdInsertPhoto /> <h1>photo</h1>
                        </div>
                      ))}
                    {}
                  </h1>
                  <p className="text-gray-500 text-[11px]">
                    {moment(item?.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={ConvRef}
        className="w-[75%] max-1200:w-full overflow-auto mb-[100px]"
      >
        <div className="">
          <div
            className={`border-b justify-between border-gray-300 fixed left-[25%] max-1200:left-0 top-0 right-0 h-[100px] bg-gray-50 px-[15px]  items-center flex gap-3`}
          >
            <div
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className="text-[30px] min-1200:hidden cursor-pointer"
            >
              <HiMenu />
            </div>
            <div className="flex gap-2">
              <div className="">
                <img
                  src={
                    (User?.isSeller ? Conv?.buyerImg : Conv?.sellerImg) ||
                    "/no_avatar.png"
                  }
                  alt=""
                  className="h-[40px] w-[40px] rounded-full object-cover dd"
                />
              </div>
              <div className="flex gap-1 items-center ">
                <h1 className="font-bold text-[20px]">
                  {(User?.isSeller ? Conv?.buyerUsername : Conv?.sellerUsername) ||
                    "user"}
                </h1>
                <div className=" bg-[--primaryColor]  translate-y-1 h-2 w-2 rounded-full" />
              </div>
            </div>
          </div>
          <div className={`mb-[50px] mt-[150px] px-[15px] `}>
            {messages?.map((message, index) => (
              <div
                dir={message?.userId === User?._id ? "rtl" : "ltr"}
                key={index}
                className="flex gap-3  flex-1 max-w-full  my-[5px] "
              >
                {message?.userId !== User?._id && (
                  <div className="">
                    <img
                      src={
                        (User?.isSeller ? Conv?.buyerImg : Conv?.sellerImg) ||
                        "/no_avatar.png"
                      }
                      alt=""
                      className="h-[40px] w-[40px] rounded-full object-cover dd"
                    />
                  </div>
                )}
                <div className="max-w-[50%]">
                  <div
                    style={{ wordWrap: "break-word" }}
                    className={` w-full rounded-xl font-semibold py-[5px] px-[10px] text-gray-700 ${
                      message?.userId === User?._id
                        ? "bg-[#0084FF] text-white"
                        : "bg-[#e4e3e3]"
                    } `}
                  >
                    <div className="flex flex-col items-start  justify-start  ">
                      <div
                        className="w-full  flex justify-center"
                        onClick={() => {
                          setClickImage(!clickImage);
                          setCurrImage(message?.img);
                        }}
                      >
                        {message?.img && (
                          <img
                            src={message?.img}
                            alt="gig_cover"
                            className="object-fill max-h-[300px] max-w-full  cursor-pointer rounded-xl"
                          />
                        )}
                        {clickImage && (
                          <div className="fixed px-[20px] top-0 left-0 opacity-[0.3]  right-0 bottom-0 h-[100vh] w-[100vw] bg-[#00000080] z-[1002] flex justify-center items-center  ">
                            <img
                              src={currImage}
                              alt="gig_coverr"
                              className="object-contain max-h-[700px]  z-[1000]  "
                            />
                          </div>
                        )}
                      </div>
                      <p
                        dir="ltr"
                        className={`w-full ${message?.img && "mt-2"} ${
                          message?.desc?.length < 10 &&
                          !message?.img &&
                          "text-center"
                        }`}
                      >
                        {message?.desc !== VITE_SECRET_MESSAGE 
                          ? message?.desc
                          : ""}
                      </p>
                      <p
                        dir="ltr"
                        className={`font-normal text-[10px]   py-1 ${
                          message?.userId === User?._id
                            ? "text-end"
                            : "text-start"
                        } ${
                          message?.userId === User?._id
                            ? " text-[#e8e6e6]"
                            : "text-gray-500"
                        }`}
                      >
                        {moment(message?.createdAt).format("LT")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {fileName && (
          <h1 className=" truncate flex items-center justify-between fixed bottom-[100px] border-t border-gray-300 px-10 sm:px-2 bg-gray-50 right-0 left-[25%] max-1200:left-0 gap-5 ">
            {fileName}
          </h1>
        )}
        <form
          onSubmit={handleSubmit}
          className=" flex items-center justify-between fixed bottom-0 h-[100px] border-t border-gray-300 px-10 sm:px-2 bg-gray-50 right-0 left-[25%] max-1200:left-0 gap-5 "
        >
          {showEmoji && (
            <div className="absolute top-[-437px] left-[100px]">
              <Picker theme="light" data={data} onEmojiSelect={handleEmojie} />
            </div>
          )}
          <div className="flex gap-3 text-[25px] text-gray-600">
            {/* <span className="hover:text-[--primaryColor] transition-all cursor-pointer hover:opacity-[0.90]">
              <BsMic />
            </span> */}
            <span className=" transition-all cursor-pointer hover:opacity-[0.90]">
              <label htmlFor="Attach">
                <MdOutlineAttachFile className="hover:text-[--primaryColor] rounded-full  cursor-pointer " />
              </label>
              <input
                onChange={(e) => {
                  setChosenImage(e.target.files[0]);
                  setFileName(e.target.files[0]?.name);
                }}
                className="hidden"
                id="Attach"
                type="file"
                accept="image/*"
              />
            </span>
            <span
              onClick={() => setShowEmoji(!showEmoji)}
              className="hover:text-[--primaryColor] transition-all cursor-pointer hover:opacity-[0.90]"
            >
              <BsEmojiSmile />
            </span>
          </div>
          <input
            type="text"
            className=" p-4 outline-none w-full font-bold border-[2px] rounded-3xl"
            placeholder="send your message..."
            value={MESSAGE}
            onChange={(e) => setMESSAGE(e.target.value)}
          />
          <button
            disabled={!MESSAGE && !chosenImage}
            type="submit"
            className={`text-[25px]  text-white text-bold p-2  rounded-full outline-none bg-[--primaryColor] disabled:cursor-not-allowed  disabled:bg-gray-500`}
          >
            {isUploading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-300 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <IoMdSend />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
