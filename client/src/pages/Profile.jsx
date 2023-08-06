import { useQuery } from "react-query";
import NewRequest from "../utils/NewRequest";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { MdLocationPin } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import SkeletonLoading from "../components/SkeletonLoading";
import GigCard from "../components/GigsPageComp/GigCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading";
const Profile = () => {
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { isLoading: loadingInfo, error: errorInfo, data: user } = useQuery({
    queryKey: "userId",
    queryFn: () => NewRequest(`users/${id}`).then((res) => res.data),
  });
  const {
    isLoading: loadingGigs,
    error: errorGigs,
    data: gigs,
    isFetching,
  } = useQuery({
    queryKey: "SellerGigs",
    queryFn: () => NewRequest(`gigs?userId=${id}`).then((res) => res.data),
  });
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleContact = async () => {
    if (!User || User._id === user?._id) {
       setError("You can't contact yourself");
       setTimeout(() => {
         setError(null);
       }, 3000);
       return;
    }
    const id = user?._id + User?._id;
    try {
      const res = await NewRequest.get(`/getConversation/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await NewRequest.post(`/createConversation`, {
          to: user?._id,
          buyerUsername: User?.username,
          buyerImg: User?.img,
          sellerUsername: user?.username,
          sellerImg: user?.img,
          lastMessage: "",
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  if (loadingInfo || loadingGigs) return <Loading/>;
  if (errorInfo || errorGigs) return "An error has occurred: ";
  const Info = () => {
    // insure that the url is https not http
    const userImg = user?.img?.includes("https")
      ? user?.img
      : user?.img?.replace("http", "https");
    return (
      <div className="w-[35%] max-w-[450px] max-900:px-4 max-900:w-full">
        {/* Profile Card */}
        <div className="bg-white  relative w-full border-2">
          <div className="absolute right-5 top-10 flex items-center gap-1 border border-[--primaryColor] w-fit px-[19px] text-[--primaryColor] font-bold py-[1px]  rounded-full">
            <div className="w-1 h-1 rounded-full bg bg-[--primaryColor]" />
            <h1 className="sm:text-[13px]">Online</h1>
          </div>
          <div className="my-10 mx-auto flex flex-col items-center  max-w-[90%] ">
            <div className="">
              <img
                className="rounded-full overflow-hidden sm:w-[130px] sm:h-[130px] w-40 h-40 object-cover  "
                src={userImg}
                alt=""
              />
            </div>
            <div className="flex gap-1  items-center ">
              <h1 className=" capitalize font-bold mt-4 text-[25px]">
                {user?.username}
              </h1>
              <h1 className="bg-[#FF62AD] w-fit text-white text-[11px] mt-2  py-[1px] px-[10px] font-bold rounded-full ">
                NEW
              </h1>
            </div>
            <button
              onClick={handleContact}
              className="p-[10px] px-[30px] sm:px-2 mt-[20px] border border-gray-500  rounded-md hover:text-white  hover:bg-[#888] transition-shadow shadow-sm   "
            >
              Contact Me
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <hr className="mt-10 border-gray-300 w-[90%]" />
            <div className="text-[#666] flex justify-between mt-5 w-[90%]">
              <p className="flex items-center gap-1">
                <MdLocationPin /> From
              </p>
              <h1 className="font-bold">{user?.country}</h1>
            </div>
            <div className="flex justify-between text-[#666] mt-5 w-[90%]">
              <p className="flex items-center gap-1">
                {" "}
                <BsFillPersonFill /> Member since
              </p>
              <h1 className="font-bold ">
                {moment(user?.createdAt).format("MMMM YYYY")}
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white mt-5 py-10 px-[10%] relative w-full border-2">
          <h1 className="text-[18px] font-bold mb-2">Description</h1>
          <p className="text-[#666] text-[18px]">{user?.desc}</p>
          <hr className="border-gray-300 my-10" />
          <h1 className="font-bold mb-2 text-[18px]">Languages</h1>
          {user?.languages?.map((lang, i) => (
            <p key={i} className="text-[18px] text-[#666] mb-2">
              {lang}
            </p>
          ))}
          <hr className="border-gray-300 my-10" />
          <h1 className="font-bold mb-2 text-[18px] ">Skills</h1>
          <ul className="flex flex-wrap gap-3">
            {user?.skills?.map((skill, i) => (
              <p
                key={i}
                className="text-[18px] text-[#666] px-3 py-1 border border-gray-400 rounded-3xl"
              >
                {skill}
              </p>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const Gigs = () => {
    return (
      <div className="w-[60%] max-900:mt-10 max-900:w-full max-900:px-3 ">
        <h1 className="font-bold text-[20px] border-b-[4px] border-b-[--primaryColor] w-fit max-1200:mx-auto">
          {user?.username + "'s Gigs"}
        </h1>
        <ul
          className={`flex flex-wrap gap-10 justify-start  max-1200:justify-center items-center ${
            loadingGigs || isFetching ? "mt-10" : ""
          }`}
        >
          <Link to={"/add"} className="rounded-sm max-900:hidden">
            <div className="w-[320px] mt-[50px] h-[430px] shadow-lg flex justify-center items-center border rounded-sm flex-col gap-2 bg-white">
              <div className="w-[100px] h-[100px] rounded-full bg-[#333] relative text-white">
                <IoAdd className="!text-white text-[50px] absolute Center" />
              </div>
              <h1 className="font-bold"> Create a new Gig</h1>
            </div>
          </Link>
          {gigs?.map((item, index) => {
            if (loadingGigs || isFetching)
              return <SkeletonLoading key={index} />;
            return <GigCard key={index} item={item} />;
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="py-[70px] min-1200:px-[5%] bg-[#f2f1ef] flex justify-between gap-[10%] mx-auto  min-h-[100vh] max-900:flex-col max-900:items-center   ">
      <Info />
      <Gigs />
    </div>
  );
};

export default Profile;
