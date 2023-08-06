import { AiFillStar } from "react-icons/ai";

const GigUser = ({ gig, seller }) => {
  return (
    <div className="flex gap-3">
      <div className=" flex items-center gap-3">
        <img
          className="rounded-full h-[40px] w-[40px] object-cover"
          src={
            seller?.img ||
            "/no_avatar.png"
          }
          alt="img"
        />{" "}
        <h1>{seller?.username}</h1>
      </div>
      <div className=" flex items-center gap-1  ">
        {!isNaN(Math.round(gig?.totalStars / gig?.starNumber))
          ? Array(Math.round(gig?.totalStars / gig?.starNumber))
              .fill()
              .map((item, index) => (
                <AiFillStar key={index} className="text-[#ffc108]" />
              ))
          : Array(5)
              .fill()
              .map((item, index) => (
                <AiFillStar key={index} className="text-gray-300" />
              ))}
        {!isNaN(Math.round(gig?.totalStars / gig?.starNumber)) &&
          Array(5 - Math.round(gig?.totalStars / gig?.starNumber))
            .fill()
            .map((item, index) => (
              <AiFillStar key={index} className="text-gray-300" />
            ))}
        {/* {) && (Math.round(gig?.totalStars / gig?.starNumber))} */}
        <p className="text-[#444]">
          {gig?.starNumber > 0 && `(${gig?.starNumber})`}
        </p>
      </div>
    </div>
  );
};
const Category = ({ gig }) => {
  return (
    <div  className="">
      <p className="text-[#888] uppercase text-[25px] mb-3 sm:text-[20px]">{gig?.cat}</p>
      <h1 className="text-[30px] font-semibold mb-3 sm:text-[15px]">{gig?.title}</h1>
    </div>
  );
};

const MainContent = ({ gig, seller }) => {
  return (
    <div className="flex-[2] xl:max-w-[60%] sm-md:w-full flex flex-col gap-[20px]">
      {seller && (
        <div>
          <Category gig={gig}  />
          <GigUser gig={gig} seller={seller} />
        </div>
      )}
    </div>
  );
};

export default MainContent;
