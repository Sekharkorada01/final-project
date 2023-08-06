import React, { useEffect } from "react";
import { useLocation } from "react-router";
import GigCard from "../components/GigsPageComp/GigCard";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useQuery } from "react-query";
import NewRequest from "../utils/NewRequest";
import SkeletonLoading from "../components/SkeletonLoading";
import Loading from "../components/Loading";

const Gigs = () => {
  const { search } = useLocation();
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("1000");
  const [open, setOpen] = useState(false);
  const [sortby, setSortby] = useState("createdAt");
  const [bestOrPop, setBestOrPop] = useState("Newest");
  const [NoGigs , setNoGigs] = useState('Loading...')
 const params = new URLSearchParams(search);
  const category = params.get("cat");
  const special = params.get("special");
  const { isLoading, isFetching, error, data, refetch } = useQuery(
    "repoData",
    async () =>
      await NewRequest(
        `/gigs?cat=${encodeURIComponent(category)}&min=${min}&max=${max}&sort=${sortby}`
      ).then((res) => res.data)
  );
  useEffect(() => {
    refetch();
  }, [sortby]);
  useEffect(() => {
      setTimeout(() => {
          setNoGigs('No Gigs Found')
      }, 500);
  },[]);

  const apply = () => {
    refetch();
  };
  if(isLoading)return <Loading/>
  if (error) return "An error has occurred";
  return (
    <div className="my-[50px] ">
      <div className="mx-[4%]">
        <div className="flex flex-col gap-5">
          <p className="text-[#b8b6b6] capitalize">{category}</p>
          <h1 className="text-[30px] font-semibold capitalize">{special}</h1>
          <p className="text-[#444]">
            Explore the boundaries of art and technology with Fiverr&apos;s AI
            artists
          </p>
        </div>
        <div className="flex justify-between sm-md:flex-col sm-md:items-center sm-md:gap-7 items-start mt-10">
          <div className="flex items-center gap-5">
            <p className="text-[#444] font-bold">Budget</p>
            <div className="sm:flex sm:flex-col mx-auto ">
              <input
                onChange={(e) => {
                  setMin(e.target.value);
                }}
                className="p-1 mr-2 sm:mb-2 sm:mr-0  border-[2px] rounded-md outline-[--primaryColor] min-w-[200px]"
                type="number"
                max={max}
                min={0}
                placeholder="min"
              />
              <input
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                className="p-1 border-[2px] rounded-md outline-[--primaryColor] min-w-[200px]"
                type="number"
                min={min}
                max={1000}
                placeholder="max"
              />
            </div>
            <button
              className="bg-[var(--primaryColor)] px-2 py-1 text-white rounded-md clickable"
              onClick={apply}
            >
              Apply
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[15px] text-[#555]">Sort by</p>
            <div
              className="flex items-center font-bold relative cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {bestOrPop}
              <MdKeyboardArrowDown className="cursor-pointer text-[20px]" />
              {open && (
                <ul className="absolute top-7 right-0 flex flex-col gap-3 p-3 border-[1px] border-[#888] rounded-md bg-white">
                  <li
                    onClick={() => {
                      setSortby("createdAt");
                      setBestOrPop("Newest");
                      setOpen(false);
                    }}
                    className="text-[#666] font-medium cursor-pointer"
                  >
                    Newest
                  </li>
                  <li
                    onClick={() => {
                      setSortby("price");
                      setBestOrPop("Best Selling");
                      setOpen(false);
                    }}
                    className="text-[#666] font-medium cursor-pointer"
                  >
                    Popular{" "}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {data?.length > 0 ? (
        <ul
          className={`flex flex-wrap gap-10 justify-center items-center ${
            isLoading || isFetching ? "mt-10" : ""
          }`}
        >
          {data?.map((item, index) => {
            if (isLoading || isFetching) return <SkeletonLoading key={index} />;
            return <GigCard key={index} item={item} />;
          })}
        </ul>
      ) : (
        <div className="flex justify-center min-h-[300px]   !h-full  items-center mt-10">
          <p className="text-[#888] sm:text-[20px] text-[30px]">{NoGigs}</p>
        </div>
      )}
    </div>
  );
};

export default Gigs;
