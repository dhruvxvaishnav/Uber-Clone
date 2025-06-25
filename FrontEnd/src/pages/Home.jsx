import { Link } from "react-router-dom";
import UserLogin from "./UserLogin";

const Home = () => {
  return (
    <div>
      <div className="bg-[url(/Traffic_Light.png)] w-full pt-8 h-screen bg-red-400 flex justify-between flex-col">
        <img className="w-16 ml-8" src="Uber_logo_2018.png" alt="Uber Logo" />
        <div className="bg-white pb-7 px-4 py-4">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link
            to="/userLogin"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
