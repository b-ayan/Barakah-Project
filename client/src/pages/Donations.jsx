import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import food from "../assets/food.png";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15; // Set the number of products per page
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  var endPoint = "";

  // Filter products based on selected category
  const filteredDonations =
    selectedCategory === "All"
      ? donations
      : donations.filter((donation) => donation.category === selectedCategory);

  // Filter products based on search input
  const filteredBySearch = searchInput
    ? filteredDonations.filter((donation) =>
        donation.foodName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : filteredDonations;

  // Sort products based on the selected sort option
  const sortedDonations = [...filteredBySearch];
  if (sortOption === "priceLowToHigh") {
    sortedDonations.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    sortedDonations.sort((a, b) => b.price - a.price);
  } else if (sortOption === "topRated") {
    sortedDonations.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "newArrivals") {
    // Implement your sorting logic for new arrivals
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/cards")
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const pageCount = Math.ceil(sortedDonations.length / productsPerPage);
  const displayedProducts = sortedDonations.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="bg-background text-blue">
      <img
        src="https://images.unsplash.com/photo-1550895030-823330fc2551?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2ltcGxlJTIwcGF0dGVybnxlbnwwfHwwfHx8MA%3D%3D"
        className="w-full h-48 object-cover"
      />
      <div className=" lg:mx-32 ">
        {/* <div className="flex flex-col ">
          <div className="flex flex-col justify-start items-start text-left">
            <div className="mx-auto text-lg">Drinkwares</div>
            <div className="mx-auto text-lg">Tablewares</div>
            <div className="mx-auto text-lg">Cookingwares</div>
            <div className="mx-auto text-lg">Decoration</div>
            <Sidebar />
          </div>
        </div> */}

        <div className="flex justify-between ">
          {/* Add search bar */}
          <div className=" mt-8 shadow-md mx-10 w-[80%]">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>{" "}
          <Link to="/signup" title="">
            <button className="bg-orange  text-white py-2 px-4 shadow text-md font-semibold mt-9">
              Add Post
            </button>{" "}
          </Link>
        </div>

        <div className="flex mt-10 mx-20 justify-between">
          <div className="mb-0">
            {/* Category Filter Buttons */}
            <div className="flex space-x-4">
              <button
                className={`border px-4 py-2 rounded-lg ${
                  selectedCategory === "All"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={`border px-4 py-2 rounded-lg ${
                  selectedCategory === "Tablewares"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("Tablewares")}
              >
                Tablewares
              </button>
              <button
                className={`border px-4 py-2 rounded-lg ${
                  selectedCategory === "Drinkwares"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("Drinkwares")}
              >
                Drinkwares
              </button>
              <button
                className={`border px-4 py-2 rounded-lg ${
                  selectedCategory === "Cookware"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("Cookware")}
              >
                Cookware
              </button>
              <button
                className={`border px-4 py-2 rounded-lg ${
                  selectedCategory === "Decorative"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCategory("Decorative")}
              >
                Decorative
              </button>
            </div>
          </div>
          <div className="mb-0">
            {/* Sorting Dropdown */}
            <label className="block text-sm font-medium text-gray-700">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
              >
                <option value="default">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
                <option value="newArrivals">New Arrivals</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center flex-wrap  mt-14">
          <div className="flex flex-wrap gap-3 justify-around ">
            {displayedProducts.map((Donation) => (
              <div
                key={Donation.id}
                className="max-w-sm w-[340px] overflow-hidden shadow-lg mb-5"
              >
                <img className="w-full" src={food} alt="Food Image" />
                <div className="px-6 py-4 bg-white h-40">
                  <Link to="/details">
                    <div className="font-bold text-xl mb-2 text-blue">
                      {Donation.foodName}
                    </div>
                  </Link>
                  <div className="text-gray-700 text-base inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <p className="ml-2 inline-block">{Donation.location}</p>
                  </div>
                  <p className="text-gray-700 text-base mb-4">
                    Posted by: {Donation.username}
                  </p>
                  <p className="text-gray-700 text-base flex justify-end">
                    {Donation.postedTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            className="flex flex-row gap-6 m-10"
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />{" "}
        </div>
      </div>{" "}
    </div>
  );
};

export default Donations;
