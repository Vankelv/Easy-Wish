import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Avatar from '@mui/material/Avatar';

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
            limit: 18 
          }
        });
        const wishes = response.data.wishes.map((wish) => ({
          ...wish,
          avatar: wish.avatar
        }));
      setWishes(wishes);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes(); 

    const intervalId = setInterval(fetchWishes, 3000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [currentPage]); 

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

 
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
      <div className="md:col-span-4">
        <div className="flex text-left flex-wrap font-poppins">
          {assignColorToWishes().map((wish) => (
            <div
              key={wish._id}
              className={`rounded text-[#fffefe] p-4 my-5 mr-5 flex items-center ${wish.color}`}
            >
             <Avatar alt={wish.senderName} src={`${wish.avatar}`} />
              <div className="ml-3">
                <p className="font-bold">{wish.senderName}</p>
                <p>{wish.message}</p>
                
              </div>
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
            "& .MuiPaginationItem-root": { color: isDarkMode ? "#fff" : "#000" }, 
            "& .Mui-selected": { backgroundColor: isDarkMode ? "#fff" : "#000" } 
          }}
        />
      </div>
    </div>
  );
};

export default Home;
