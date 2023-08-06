import { GigReducer, INITIAL_STATE } from "../Reducers/GigReducer";
import { useReducer, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import upload from "../utils/Upload";
import { useMutation, useQueryClient } from "react-query";
import NewRequest from "../utils/NewRequest";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [state, dispatch] = useReducer(GigReducer, INITIAL_STATE);
  const [cover, setCover] = useState(undefined);
  const [feature, setFeature] = useState("");
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newGig) => NewRequest.post("/create", newGig),
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: feature,
    });
    setFeature("");
  };
  const handleUploading = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const Cover = await upload(cover);
      const Images = await Promise.all(
        [...images]?.map(async (item) => {
          const url = await upload(item);
          return url;
        })
      );
      dispatch({
        type: "ADD_IMAGES",
        payload: { cover:Cover, images :Images},
      });
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    setCover(undefined);
    setImages([]);
    setTimeout(() => {
      navigate("/mygigs");
    }, 1000);
  };
  return (
    <div className="my-[100px]">
      <h1 className="w-[90%] mx-auto mb-10 text-[25px] font-bold text-[#555]">
        Add New Gig
      </h1>
      <form onSubmit={handleSubmit} className="flex max-900:flex-col gap-[100px] w-[90%] add-gig-form mx-auto  justify-between">
        <div className="flex flex-col gap-[30px] justify-between flex-1">
          <label>Title</label>
          <input required
            type="text"
            id="title"
            name="title"
            placeholder="eg. I will do something I'm really good at"
            onChange={handleChange}
          />
          <label>Category</label>
          <select name="cat" id="category" onChange={handleChange}>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Writing & Translation">Writing & Translation</option>
            <option value="Video & Animation">Video & Animation</option>
            <option value="Music & Audio">Music & Audio</option>
            <option value="Programming & Tech">Programming & Tech</option>
            <option value="Data">Data</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Photography">Photography</option>
          </select>
          <div>
            <label>Cover Image</label>
            <input required
              type="file"
              id="cover"
              name="cover"
              onChange={(e) => {
                setCover(e.target.files[0]);
              }}
            />
            <label>Upload Images</label>
            <input required
              multiple
              type="file"
              id="cover"
              name="images"
              onChange={(e) => {
                setImages(e.target.files);
              }}
            />
            <button
              onClick={handleUploading}
              disabled={!cover || !images || images.length < 1 }
              className=" disabled:opacity-80 disabled:cursor-not-allowed mt-3 bg-[--primaryColor] py-2 px-4 rounded-md text-white"
            >
              {isUploading ? "uploading..." : "upload"}
            </button>
          </div>
          <label>Description</label>
          <textarea
            id="description"
            name="desc"
            placeholder="Describe your Gig"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="font-bold max-900:hidden block text-[20px] bg-[var(--primaryColor)] text-white  py-[15px]"
          >
            Create
          </button>
        </div>
        <div className="flex flex-col gap-[30px] justify-between  flex-1">
          <label>Service Title</label>
          <input required
            type="text"
            id="Service Title"
            name="shortTitle"
            placeholder="e.g. One-page web design"
            onChange={handleChange}
          />
          <label>Short Description</label>
          <textarea
            id="Short Description"
            name="shortDesc"
            placeholder="Short description for your service"
            onChange={handleChange}
            className="resize-none"
          />
          <label>
            Delivery Time
            <p className="text-[#888] inline-block">(e.g. 3 days)</p>
          </label>
          <input required
            type="text"
            id="Delivery Time"
            name="deliveryTime"
            onChange={handleChange}
          />
          <label>Revisions</label>
          <input required
            type="number"
            min={0}
            id="Revisions"
            name="revisionNumber"
            onChange={handleChange}
          />
          <div>
            <label>Add Features</label>
            <input 
              value={feature}
              type="text"
              placeholder="e.g. page design"
              onChange={(e) => {
                setFeature(e.target.value);
              }}
            />
            <div className="flex flex-wrap gap-3">
              {state.features?.map((f, i) => (
                <div
                  className="flex items-center w-fit mt-2 rounded-md gap-1 border font-bold px-4 py-2"
                  key={i}
                >
                  <p>{f}</p>
                  <p
                    className="text-red-500  cursor-pointer"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    <AiOutlineCloseCircle />
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleFeature}
              disabled={!feature}
              className=" disabled:opacity-80 disabled:cursor-not-allowed mt-3 bg-[--primaryColor] py-2 px-4 rounded-md text-white"
            >
              add
            </button>
          </div>
          <label>Price</label>
          <input required
            type="number"
            min={0}
            id="price"
            name="price"
            placeholder="e.g. One-page web design"
            onChange={handleChange}
          />
        </div>
        <button
            type="submit"
            className="font-bold min-900:hidden block text-[20px] bg-[var(--primaryColor)] text-white  py-[15px]"
          >
            Create
          </button>
      </form>
    </div>
  );
};

export default Add;
