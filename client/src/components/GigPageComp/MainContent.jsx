import React from "react";
import { useState } from "react";
import HeaderContent from "./HeaderContent";
import GigSlider from "./GigSlider";
import SideContent from "./SideContent";
import { PeopleSay } from "../../../data";
import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import NewRequest from "../../utils/NewRequest";
import Loading from "../Loading";
import Reviews from "./Reviews";
import moment from "moment";
import handleImageError from "../../utils/HandleImgErr";
import { Link } from "react-router-dom";

// Parse the date string

const GigMedia = ({ gig }) => {
  return (
    <div>
      <GigSlider>
        {gig?.images?.map((item, index) => (
          <div key={index} className="flex justify-center items-center ">
            <img
              className="object-fill min-h-[300px] sm:max-h-[300px] max-h-[500px] w-full"
              src={
                item ||
                "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
              }
              alt="img"
            />
          </div>
        ))}
      </GigSlider>
    </div>
  );
};

const WhatPeopleSay = () => {
  const { id } = useParams();
  const {
    isLoading: isLoadingReviews,
    error: errorReviews,
    data: reviews,
  } = useQuery({
    queryKey: "reviews",
    queryFn: () => NewRequest(`reviews/${id}`).then((res) => res.data),
  });

  if (isLoadingReviews) return <Loading />;
  if (errorReviews) return <h1>error</h1>;
  return (
    <div className="my-[100px] ">
      {reviews?.length > 0 && (
        <div>
          {" "}
          <div className="flex justify-between xl:w-[60%] ">
            <h1 className="text-[20px] font-bold max-w-[60%]">
              What people loved about this seller
            </h1>
            <a
              href={"#all_reviews"}
              className="text-[var(--primaryColor)] font-medium text-right"
            >
              see all reviews
            </a>
          </div>
          <GigSlider>
            {reviews?.map((item, index) => {
              if (index > 4) return;
              return (
                <div
                  key={index}
                  className="flex justify-center flex-col gap-[10px]  border rounded-md  mx-auto  py-[20px] px-10 "
                >
                  <div className="flex gap-[10px] ">
                    <img
                      onError={handleImageError}
                      className=" rounded-full !object-cover h-[30px] w-[30px]"
                      src={item?.img}
                      alt="img"
                    />
                    <h1 className="font-semibold text-[#555]">
                      {item?.username}
                    </h1>
                    <div />
                    <div className="h-[20px] bg-gray-200 w-[1px]" />
                    <h1 className="flex gap-1 text-[var(--starColor)] items-start text-[20px] relative ">
                      {Array(item?.star)
                        .fill()
                        .map((item, index) => (
                          <AiFillStar
                            key={index}
                            className="text-[var(--starColor)]"
                          />
                        ))}
                      {Array(5 - item?.star)
                        .fill()
                        .map((item, index) => (
                          <AiFillStar key={index} className="text-gray-300" />
                        ))}
                    </h1>
                  </div>
                  <div className="">
                    <p className=" line-clamp-2">{item?.desc}</p>
                    <p className="text-gray-400">
                      {" "}
                      {moment(item?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              );
            })}
          </GigSlider>
        </div>
      )}
    </div>
  );
};
const AboutGig = ({ gig }) => {
  return (
    <div className="xl:w-[60%] w-full">
      <h1 className="text-[20px] font-bold my-[20px]">About this gig</h1>
      <div className="text-[#555]">{gig?.desc}</div>
      <hr className="my-[30px]" />
    </div>
  );
};

const AboutSellerHeader = ({ seller }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("currentUser"));
  const handleContact = async () => {
    if(!User){
      setError("You must login first");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (User._id === seller?._id) {
      setError("You can't contact yourself");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    const id = seller?._id + User?._id;
    try {
      const res = await NewRequest.get(`/getConversation/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if(error.response.status === 401){
        setError("You must login first");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      if (error.response.status === 404) {
        const res = await NewRequest.post(`/createConversation`, {
          to: seller?._id,
          buyerUsername: User?.username,
          buyerImg: User?.img,
          sellerUsername: seller?.username,
          sellerImg: seller?.img,
          lastMessage: "",
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="xl:w-[60%]  w-fit  sm-md:mx-auto mt-[100px]">
      <h1 className="text-[20px] font-bold my-[20px]">About the Seller</h1>
      <div className="flex gap-[30px]">
        <Link to={`/profile/${seller?._id}`}>
          <img
            className={`rounded-full h-[120px] w-[120px] object-cover  `}
            src={seller?.img || "/no_avatar.png"}
            alt="img"
          />
        </Link>
        <div className="flex flex-col items-start gap-1 ">
          <Link
            to={`/profile/${seller?._id}`}
            className="text-[20px] font-bold"
          >
            {seller?.username}
          </Link>
          <h1 className="text-[18px] text-[#555] font-medium">
            {seller?.title || "AI Art Expert"}
          </h1>
          <h1 className="text-[#ffc108] flex items-center   ">
            <AiFillStar /> <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </h1>
          <button
            onClick={handleContact}
            className="p-[10px] px-[30px] sm:px-2 mt-[20px] border border-gray-500  rounded-md hover:text-white hover:bg-[#888] transition-all "
          >
            Contact Me
          </button>
          {error && (
            <div className="text-red-500 font-medium text-center  w-full text-[15px]">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutSellerBody = ({ seller }) => {
  const data = [
    {
      title: "From",
      value: seller?.country || "Belarus",
    },
    {
      title: "Avg. response time",
      value: "2 hours",
    },
    {
      title: "Member Since",
      value: moment(seller?.createdAt).format("MMM YYYY"),
    },
    {
      title: "Last delivery",
      value: "about 2 days",
    },
    {
      title: "Languages",
      value: [
        ...seller?.languages || ["English", "Russian", "Arabic"]
      ],
    },
  ];
  return (
    <div className="xl:w-[60%] w-full  sm-md:mx-auto mt-[50px] border p-[20px] rounded-md">
      <ul className="grid grid-cols-3 gap-[30px] sm:!grid-cols-2">
        {data?.map((item, index) => (
          <li key={index} className="flex flex-col gap-1">
            <h1 className="text-[#666]">{item.title}</h1>
            {Array.isArray(item.value) ? (
              item.value?.map((item, index) => (
                <h1 key={index} className="text-[#666] font-semibold">
                  {item}
                </h1>
              ))
            ) : (
              <h1 className="text-[#666] font-semibold">{item.value}</h1>
            )
            }
          </li>
        ))}
      </ul>
      <hr className="my-[20px]" />
      <h1 className="text-[#666] font-semibold">description</h1>
      <p className="text-[#444]">
        {seller?.desc ||
          "loreum ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
      </p>
    </div>
  );
};

const CreateReview = ({ gig }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newReview) => NewRequest.post("/reviews", newReview),
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
    onError: (error) => {
      // @ts-ignore
      setError(error.response.data);
    },
  });
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [selectedStar, setSelectedStar] = useState(0);
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const User = JSON.parse(localStorage.getItem("currentUser")) || {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      star: selectedStar + 1,
      desc: desc,
      gigId: gig?._id,
      username: User?.username,
      country: User?.country,
      img: User?.img || "",
    };
    setSelectedStar(0);
    setDesc("");
    // @ts-ignore
    mutation.mutate(newReview);
  };
  const handleStarHover = (index) => {
    setHoveredStar(index);
  };

  const handleStarLeave = () => {
    setHoveredStar(null);
  };
  const handleStarClick = (index) => {
    setSelectedStar(index);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 mt-[40px] xl:w-[60%] w-full"
      >
        <textarea
          value={desc}
          onChange={handleDescChange}
          className="p-5 w-full border-[2px] rounded-md outline-none resize-none"
          placeholder="give review to this seller.."
          rows={5}
        />
        <div className="text-gray-300 flex items-center text-[25px] ">
          {Array(5)
            .fill()
            .map((item, index) => (
              <AiFillStar
                key={index}
                className={`cursor-pointer ${
                  index <= hoveredStar || index <= selectedStar
                    ? "text-[--starColor]"
                    : ""
                }`}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
                onClick={() => handleStarClick(index)}
              />
            ))}
        </div>
        <button className="bg-[#ffc108] text-white p-3 rounded-md">
          submit
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

const MainContent = () => {
  const { id } = useParams();
  const { isLoading: isLoadingGigs, error: errorGigs, data: gig } = useQuery(
    id,
    () => NewRequest(`gig/${id}`).then((res) => res.data)
  );
  const UserId = gig?.userId;
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    data: seller,
  } = useQuery({
    queryKey: "userId",
    queryFn: () => NewRequest(`users/${UserId}`).then((res) => res.data),
    enabled: !!UserId,
  });
  if (isLoadingUsers || isLoadingGigs) return <Loading />;
  if (errorUsers || errorGigs) return <h1>error</h1>;
  return (
    <div className="mx-[50px] sm:mx-[30px]  !relative  my-[100px] ">
      {seller && (
        <div>
          <div className="hidden xl:flex  w-[400px]  flex-col gap-[20px]   xl:float-right sticky    !top-0 ">
            <SideContent gig={gig} />
          </div>
          <HeaderContent gig={gig} seller={seller} />
          <GigMedia gig={gig} />
          <div className="hidden sm-xl:flex w-full  flex-col gap-[20px]      !top-0">
            <SideContent gig={gig} />
          </div>
          <WhatPeopleSay />
          <AboutGig gig={gig} />
          <AboutSellerHeader seller={seller} />
          <AboutSellerBody seller={seller} />
          <Reviews />
          <CreateReview gig={gig} />
        </div>
      )}
    </div>
  );
};
// make
export default MainContent;
