import React, { useState } from "react";
import food from "../assets/food.png";

const Details = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestFood = () => {
    // Add logic to handle the food request
    // You can send the request details to the server or perform any other action
    openModal(); // Open the modal after handling the request
  };

  return (
    <div className="bg-background pt-28 relative pb-24">
      <div className="max-w-[50%] mx-auto bg-white overflow-hidden shadow-lg">
        <img
          src={food}
          alt="Food"
          className="w-[35%] mx-auto h-64 object-cover absolute top-16 left-96 ml-12"
        />

        <div className="p-24 pt-60">
          <div className="flex items-center mb-1">
            <div className="text-2xl font-bold mr-6 text-blue">
              Delicious Food Name
            </div>
            <span className="ml-4 text-blue">September 30, 2023</span>
          </div>

          <div className="mb-1 text-blue font-medium">Donator123</div>
          <div className="mb-4 text-blue font-medium">City, Country</div>

          <div className="mb-4 text-blue">
            <span className="text-blue font-bold block">Details:</span> Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta?
          </div>
          <div className="flex items-center gap-20 text-blue mb-8">
            <div className="mb-4">
              <span className="font-bold">Quantity:</span> 5 servings
            </div>

            <div className="mb-4">
              <span className="font-bold">Expiry Date:</span> 2023-12-31
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-orange text-white font-semibold py-2 px-4 hover:bg-blue hover:text-white transition duration-300"
              onClick={openModal}
            >
              Request Food
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
