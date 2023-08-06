import { useState } from "react";
import NewRequest from "../utils/NewRequest";
import { useNavigate } from "react-router-dom";
import upload from "../utils/Upload";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
const Register = () => {
  const [file, setFile] = useState(null);
  const [checked, setChecked] = useState(false);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skill, setSkill] = useState("");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    title: "",
    country: "",
    desc: "",
    isSeller: false,
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await NewRequest.post("/login", {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      const User = JSON.parse(localStorage.getItem("currentUser"));
      Cookies.set("accessToken", User?._id, { path: "/" });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = "";
    if (file) {
      url = await upload(file);
    }
    const newUser = {
      ...user,
      img: url,
      skills,
      languages,
    };
    try {
      await NewRequest.post("/register", newUser);
      handleLogin();
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleCheck = (e) => {
    setChecked(e.target.checked);
    setUser({ ...user, [e.target.name]: e.target.checked });
  };
  const handleSkill = (e) => {
    e.preventDefault();
    setSkills([...skills, skill]);
    setSkill("");
  };
  const handleLanguage = (e) => {
    e.preventDefault();
    setLanguages([...languages, language]);
    setLanguage("");
  };
  return (
    <div className="my-[100px]  max-w-[80%] mx-auto">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        action="POST"
        className="flex flex-wrap justify-between gap-[100px] register_form "
      >
        <div className="flex flex-col gap-3 justify-center divv flex-1 min-w-[300px] max-w-[400px] mx-auto ">
          <h1 className="font-bold text-[#666] text-[25px] mb-[20px]">
            Create a new account
          </h1>
          <label className="w-full text-[#888] text-[15px]">Username</label>
          <input
            required
            onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor] "
            type="text"
            name="username"
            id="username"
          />
          <label className="w-full text-[#888] text-[15px]">Email</label>
          <input
            required
            onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
            type="email"
            name="email"
            id="email"
          />
          <label className="w-full text-[#888] text-[15px]">Password</label>
          <input
            required
            onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
            type="password"
            name="password"
            id="password"
          />
          <label className="w-full text-[#888] text-[15px]">Country</label>
          <input
            required
            onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
            type="text"
            name="country"
            id="Country"
          />

          <label className="w-full text-[#888] text-[15px]">Title</label>
          <input
            required
            onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
            type="text"
            name="title"
            id="title"
          />
          <button
            className="min-900:block hidden clickable bg-[--primaryColor] text-white p-3 w-full max-w-[400px] mx-auto rounded-sm font-bold  "
            type="submit"
          >
            {error ? "Error" : (loading ? "Processing..." : "Create Account")}
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-1 min-w-[300px] max-w-[400px] mx-auto  !max-h-[900px]">
          <h1 className="font-bold text-[#666] text-[25px] mb-[20px]">
            I want to become a seller
          </h1>
          <div className="flex mb-5">
            <label className="w-full text-[#888] text-[15px]">
              Activate the seller account
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isSeller"
                value=""
                className="sr-only peer outline-none "
                checked={checked}
                onChange={handleCheck}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer    dark:bg-gray-200 peer-checked:after:translate-x-full peer-checked:after:mt-[1px] after:mt-[1px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[--primaryColor]"></div>
            </label>
          </div>
          <label className="w-full text-[#888] text-[15px]">
            Profile Picture (optional)
          </label>
          <input
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
            type="file"
            name="profilePicture"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {checked && (
            <div>
              <div>
                <label className="w-full text-[#888] text-[15px]">
                  Add Skills
                </label>
                <div className="flex justify-between items-center gap-3 w-full">
                  <input
                    className="flex-grow block rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
                    value={skill}
                    type="text"
                    placeholder="e.g. Graphic Design"
                    onChange={(e) => {
                      setSkill(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleSkill}
                    disabled={!skill}
                    className=" translate-y-[-7px] disabled:opacity-80 disabled:cursor-not-allowed mt-3 bg-[--primaryColor] p-3 rounded-sm text-white"
                  >
                    add
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills?.map((s, i) => (
                    <div
                      className="flex items-center w-fit mt-2 rounded-md gap-1 border-[2px] font-bold px-4 py-2 "
                      key={i}
                    >
                      <p>{s}</p>
                      <p
                        className="text-red-500  cursor-pointer"
                        onClick={() =>
                          setSkills(skills.filter((skill) => skill !== s))
                        }
                      >
                        <AiOutlineCloseCircle />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <label className="w-full text-[#888] text-[15px] ">
                  Add Lanugages
                </label>
                <div className="flex justify-between items-center gap-3 w-full">
                  <input
                    className="flex-grow block rounded-sm p-3 border border-[#777] outline-[--primaryColor]"
                    value={language}
                    type="text"
                    placeholder="e.g. English"
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleLanguage}
                    disabled={!language}
                    className=" translate-y-[-7px] disabled:opacity-80 disabled:cursor-not-allowed mt-3 bg-[--primaryColor] p-3 rounded-sm text-white"
                  >
                    add
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {languages?.map((l, i) => (
                    <div
                      className="flex items-center w-fit mt-2 rounded-md gap-1 border-[2px] font-bold px-4 py-2   "
                      key={i}
                    >
                      <p>{l}</p>
                      <p
                        className="text-red-500  cursor-pointer"
                        onClick={() =>
                          setLanguages(
                            languages.filter((language) => language !== l)
                          )
                        }
                      >
                        <AiOutlineCloseCircle />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <label className="w-full text-[#888] text-[15px]">
            Description (optional)
          </label>
          <textarea
          onChange={handleChange}
            className="w-full rounded-sm p-3 border border-[#777] outline-[--primaryColor] resize-none flex-grow overflow-auto "
            name="desc"
            id="description"
          />
          <button
            className="hidden max-900:block clickable bg-[--primaryColor] text-white p-3 w-full max-w-[400px] mx-auto rounded-sm font-bold  "
            type="submit"
          >
            {error ? "Error" : (loading ? "Processing..." : "Create Account")}
          </button>
        </div>
      </form>
      {error && (
        <div className="bg-red-500 text-white p-3 w-full max-w-[400px] mx-auto rounded-sm font-bold text-center mt-5">
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;
