import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

const Home = ({isDarkMode}) => {
  const [wishes, setWishes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await axios.get("https://easy-wish-uhlf.vercel.app/wish", {
          params: {
            page: currentPage,
            limit: 20 // Adjust the limit as needed
          }
        });
        setWishes(response.data.wishes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes(); // Fetch wishes initially

    const intervalId = setInterval(fetchWishes, 3000); // Polling every 3 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [currentPage]); // Fetch wishes when currentPage changes

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Define custom colors
  const customColors = [
    "bg-blue",
    "bg-pink",
    "bg-orange",
    "bg-green",
    "bg-blue-violet",
    "bg-lemon-dark",
    "bg-dark-green",
    "bg-lemon"
  ];

  const assignColorToWishes = () => {
    return wishes.map((wish, index) => ({
      ...wish,
      color: customColors[index % customColors.length],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mx-10 my-10">
      <div className="md:col-span-2">
        <h1 className="mt-10 font-poppins  font-bold text-[100px] sm:text-[30px]">
          Happy Birthday Naa
        </h1>

        {/* Display wishes */}
        <div className="flex text-left flex-wrap font-poppins">
          {assignColorToWishes().map((wish) => (
            <div
              key={wish._id}
              className={`rounded text-[#fffefe] p-4 my-5 mr-5 ${wish.color}`}
            >
              <p className="font-bold">{wish.senderName}</p>
              <p>{wish.message}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color={isDarkMode ? "secondary" : "primary"}
          size="large"
          className="mt-5"
          sx={{ 
            "& .MuiPaginationItem-root": { color: isDarkMode ? "#fff" : "#000" }, // Adjust text color based on isDarkMode
            "& .Mui-selected": { backgroundColor: isDarkMode ? "#fff" : "#000" } // Adjust selected page background color based on isDarkMode
          }}
        />
      </div>

      {/* Slider col */}
      <div className="md:mt-10">
        <img
          src="https://pagedone.io/asset/uploads/1696488602.png"
          alt="ContactUs tailwind section"
          className="w-full  lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
        />
      </div>
    </div>
  );
};

export default Home;
