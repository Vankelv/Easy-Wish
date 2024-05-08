import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Home = ({ isDarkMode }) => {
  const [wishes, setWishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWishes = async (page) => {
      try {
        const response = await axios.get("http://localhost:8080/wish", {
          params: {
            page,
            limit: 10 // Adjust the limit as needed
          }
        });
        setWishes(response.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes(currentPage); // Fetch wishes initially

    const intervalId = setInterval(() => {
      fetchWishes(currentPage); // Fetch wishes periodically
    }, 5000);

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [currentPage]);

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
    "bg-border-red"
  ];

  const assignColorToWishes = () => {
    return wishes.map((wish, index) => ({
      ...wish,
      color: customColors[index % customColors.length] // Cycle through custom colors for wishes
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 m-10 gap-4 px-10">
      <div className="md:col-span-2">
        {/* Display wishes */}
        <div className="flex flex-wrap font-poppins">
          {assignColorToWishes().map((wish) => (
            <div
              key={wish._id}
              className={`rounded p-4 mb-4 mr-4 ${wish.color}`}
            >
              <p className="font-bold">{wish.senderName}</p>
              <p>{wish.message}</p>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <Stack spacing={2} justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            size="large"
          />
        </Stack>
      </div>
      {/* Slider column */}
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
