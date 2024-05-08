import React, { useState, useEffect } from "react";
import axios from "axios";
import BackgroundLoop from "../components/carousel";
const Home = () => {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/wish");
        setWishes(response.data);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes(); // Fetch wishes initially

    const intervalId = setInterval(fetchWishes, 3000); // Polling every 3 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  // Define custom colors
  const customColors = [
    "bg-blue",
    "bg-pink",
    "bg-orange",
    "bg-green",
    "bg-blue-violet",
    "bg-lemon-dark",
    "bg-bg-dark-green",
  ];

  const assignColorToWishes = () => {
    return wishes.map((wish, index) => ({
      ...wish,
      color: customColors[index % customColors.length] 
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 m-1 gap-4 px-10">
    <div className="md:col-span-2">
    
      {/* Display wishes */}
      <div className="flex flex-wrap font-poppins">
        {assignColorToWishes().map((wish) => (
          <div
            key={wish._id}
            className={`rounded text-[#fffefe] p-4 mb-4 mr-4 ${wish.color}`}
          >
            <p className="font-bold">{wish.senderName}</p>
            <p>{wish.message}</p>
          </div>
        ))}
       
      </div>
    </div>
    { /*slider col */}
    <div className="md:mt-10">
      <img
        src="https://pagedone.io/asset/uploads/1696488602.png"
        alt="ContactUs tailwind section"
        className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
      />
    </div>
   
  </div>
  );
};

export default Home;
