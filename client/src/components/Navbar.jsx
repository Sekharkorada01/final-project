import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
// import { HiMenu } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";
import NavbarSlick from "./NavbarSlick";
import NewRequest from "../utils/NewRequest";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const sm_md = useMediaQuery({ query: "(max-width: 1024px)" });
  const [active, setactive] = useState("");
  const [active2, setactive2] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const isActive = () => {
    window.scrollY > 0 ? setactive("active") : setactive("");
    window.scrollY > 100 ? setactive2("active2") : setactive2("");
  };
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        logoRef.current &&
        !logoRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const User = JSON.parse(localStorage.getItem("currentUser")) || {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/gigs?search=${search}`);
  };
  const FirstNavBar = [
    {
      title: "Kizerr Business",
      linkto: "/",
    },
    {
      title: "Kizerr Business",
      linkto: "/",
    },
    {
      title: "Explore",
      linkto: "/gigs",
    },
    {
      title: (
        <h1 className="flex  items-center gap-1">
          <TfiWorld className="mb-[2px] text-[13px]" />
          English
        </h1>
      ),
      linkto: "/",
    },
    {
      title: "Become a Seller",
      linkto: "/",
    },
    {
      title: "Sign in",
      linkto: "/signin",
    },
  ];

  const SellerMenu = [
    {
      title: "Profile",
      linkto: `/profile/${User?._id}`,
    },
    {
      title: "My Gigs",
      linkto: "/mygigs",
    },
    {
      title: "Add a new Gig",
      linkto: "/add",
    },
    {
      title: "Orders",
      linkto: "/orders",
    },
    {
      title: "Messages",
      linkto: "/messages",
    },
  ];
  const MenuBuyer = [...SellerMenu.slice(3)];
  const handleLogout = async () => {
    try {
      await NewRequest.post("/logout");
      localStorage.setItem("currentUser", JSON.stringify({}));
      Cookies.remove("accessToken", { path: "/" });
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`
      
    
      fixed !z-[1000]  top-0 left-0  w-full  Navbar 
      ${
        active && location.pathname === "/"
          ? " active shadow-sm"
          : "bg-[transparent]"
      } 
      ${location.pathname !== "/" && "!relative !bg-white !text-black"}
      ${(active2 || location.pathname !== "/") && "border-b"}
      ${location.pathname === `/message/${id}` && "!hidden"}
        
        `}
    >
      <div
        className={`sm-md:px-[4%] px-[4%] flex gap-[40px]  justify-between items-center h-[80px] max-w-[3000px] mx-auto`}
      >
        <Link to={"/"} className=" h-[60px] flex items-center ">
          {/* <img src={fiverr_logo} alt="logo" /> */}
          {/* <h1
            className={`text-white font-[900] lg:hidden text-[35px] mr-2 pt-2 ${
              (active || location.pathname !== "/") && "!text-[#555]"
            }`}
          >
            <HiMenu />
          </h1> */}
          <h1
            className={`fiverr text-white font-extrabold tracking-[-3px] text-[40px]   ${
              location.pathname !== "/" && "!relative !bg-white !text-black"
            }`}
          >
            kizerr
          </h1>
          <span className="relative flex h-2 w-2 mt-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1dbf73]"></span>
          </span>
        </Link>

        {active2 && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center max-w-[700px] sm:hidden  flex-1  h-[45px] "
          >
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="px-[15px] h-full border-[1px]  w-full sm-md:rounded-md lg:rounded-none  lg:rounded-l-md focus:outline-none sm-md:}"
              placeholder={
                sm_md
                  ? "Find Services"
                  : "What Service are you looking for today?"
              }
            />
            <button
              type="submit"
              className=" w px-[30px] !h-full text-white hover:bg-[#222] transition-all  rounded-r-md bg-[black]"
            >
              <BsSearch />
            </button>
          </form>
        )}

        <ul className="flex gap-[30px] items-center sm:translate-y-[7px]">
          {FirstNavBar?.map((item, index) => {
            return (
              <li
                className={`text-white font-semibold text-[17px] transition-all hover:text-[#1dbf73] ${
                  location.pathname !== "/" && "!relative !bg-white !text-black"
                }  ${item.title !== "Sign in" && "hidden min-1400:block"}
                ${
                  Object.keys(User).length !== 0 &&
                  item.title === "Sign in" &&
                  "hidden"
                }
                `}
                key={index}
              >
                <Link
                  to={item.linkto}
                  className="hover:text-[var(--primaryColor)] transition-all"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
          {Object.keys(User).length === 0 && (
            <Link
              to="/register"
              className={`border-[1px] ${
                active || location.pathname != "/"
                  ? "text-[#1dbf73] border-[#1dbf73] hover:text-white"
                  : "text-white border-white"
              } hover:bg-[#1dbf73] hover:border-[#1dbf73] transition-all  px-[15px] py-[5px] rounded-[5px] `}
            >
              Join
            </Link>
          )}
          {Object.keys(User).length !== 0 && (
            <div className="relative">
              <div
                ref={logoRef}
                className="hover:cursor-pointer rounded-full"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <img
                  title={User?.name}
                  className="w-[42px] h-[42px] object-cover rounded-full"
                  src={User?.img || "/no_avatar.png"}
                  alt="user"
                />
              </div>
              {open && (
                <ul
                  ref={menuRef}
                  className="absolute top-[62px] right-0 w-[200px] z-[1000] rounded-md   bg-white border-[1px] border-gray-300"
                >
                  <li
                  
                    className=" flex  justify-start items-center gap-2 text-[#333] hover:bg-gray-100 transition-all border-b font-bold cursor-pointer  p-2"
                  >
                    <img
                      className="h-[30px] w-[30px] rounded-full"
                      src={User?.img || "/no_avatar.png"}
                      alt="img"
                    />
                    <h1> {User.username}</h1>
                  </li>
                  {User.isSeller
                    ? SellerMenu?.map((item, index) => {
                        return (
                          <li
                            onClick={() => {
                              setOpen(false);
                              navigate(item?.linkto);
                            }}
                            key={index}
                            className="text-[#555] hover:bg-gray-100 transition-all border-b font-bold cursor-pointer p-2  "
                          >
                            {item?.title}
                          </li>
                        );
                      })
                    : MenuBuyer?.map((item, index) => {
                        return (
                          <li
                            onClick={() => {
                              setOpen(false);
                              navigate(item?.linkto);
                            }}
                            key={index}
                            className="text-[#333] hover:bg-gray-100 transition-all border-b font-bold cursor-pointer p-2"
                          >
                            {item?.title}
                          </li>
                        );
                      })}
                  <button
                    className="text-red-500 flex justify-start items-center gap-2  hover:bg-gray-100 border-b font-bold transition-all text-center p-2 w-full"
                    onClick={handleLogout}
                  >
                    Sign out <FiLogOut className="text-[20px]" />
                  </button>
                </ul>
              )}
            </div>
          )}
        </ul>
      </div>
      {(active || location.pathname !== "/") && <hr />}

      {(active2 || location.pathname !== "/") && <NavbarSlick />}
      {/* {(active2 || location.pathname !== "/") && <hr className="" />} */}
    </div>
  );
};

export default Navbar;
