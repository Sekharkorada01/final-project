import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router";
import { useQuery , useQueryClient , useMutation } from "react-query";
import NewRequest from "../../utils/NewRequest";
import Loading from "../Loading";
function Reviews(){
  const {
    isLoading: isLoadingReviews,
    error:errorReviews,
    data: reviews,
  } = useQuery({
    queryKey: "reviews",
    queryFn: ()=>
    NewRequest(`reviews/${id}`).then((res) => res.data),

  }
    
  );
  const { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (deleteReview) => NewRequest.delete(`/reviews/${deleteReview}`),
    mutationKey: "deleteReview",
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
    onError: (error) => {
      // @ts-ignore
      setError(error.response.data);
    },
    
  });
  const handleDelete = async (item) => {
      mutation.mutate(item?._id);
  };
  return (
    <div className="xl:w-[60%] w-full my-[100px]" id={"all_reviews"}>
    {isLoadingReviews ?<Loading />: errorReviews ? <h1>error</h1> : reviews?.map((item, index) => (
        <div
          key={index}
          className={`flex justify-center flex-col gap-[10px]  border-b  mx-auto  p-[20px] ${
            index === 0 && "border-t"
          } `}
        >
          <div className="flex gap-[10px]   ">
            <div className='flex gap-[10px]'>
              <img
                className=" rounded-full !object-cover h-[30px] w-[30px]"
                src={item?.img || "/no_avatar.png"}
                alt=""
              />
              <div>
                <h1 className="font-semibold text-[#555]">{item?.username}</h1>
                <h1 className="font-[500] text-[#555] sm:text-[12px] ">{item?.country}</h1>
              </div>
            </div>
            <div className="flex gap-3 mt-1    flex-1  justify-end">
              <h1 className="flex  text-[var(--starColor)] items-start text-[16px] relative ">
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
                    <AiFillStar
                      key={index}
                      className="text-gray-300"
                    />
                  ))}
              </h1>
              <div className=" hidden xl:block h-[20px] bg-gray-200 w-[1px] ml-3" />
              <p className="hidden xl:block text-gray-400 sm:text-[10px] ">
                {moment(item?.createdAt).fromNow()} 
              </p>
              
            </div>
            <div />
          </div>
          <div className="ml-[40px]">
            
            <p className='text-[#666]'>{item?.desc}</p>
              <p className=" xl:hidden text-gray-400 sm:text-[10px] mt-2 ">
                {moment(item?.createdAt).fromNow()} 
              </p>
          </div>
        {
          (item?.userId == JSON.parse(localStorage.getItem("currentUser"))?._id) && (
            <button onClick={() => {
              handleDelete(item)
            }} dir='rtl' className='cursor-pointer mr-3  text-[20px] text-gray-500'>
            <BsFillTrashFill/>
            </button>
          )
        }
        </div>
      ))}
      
      {errorReviews && <h1>error</h1>}
    </div>
  );
}


export default Reviews;
