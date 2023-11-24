// PostFormModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";
import swal from "sweetalert";

const PostForm = ({ showModal, onClose }) => {
  const [foodType, setFoodType] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [city, setCity] = useState("");
  const [expired, setExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [free, setFree] = useState(false);
  const [price, setPrice] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [Subscribed, setSubscribed] = useState("false");

  // ... (other form state variables)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a way to determine the subscription status, replace this logic with your actual subscription check

      // Check if the post is not free and the user is not subscribed
      if (!free && !Subscribed) {
        // Show a SweetAlert indicating that subscription is required
        Swal.fire({
          title: "Subscription Required",
          text: "To post non-free products, please subscribe with us.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Subscribe",
          cancelButtonText: "Close",
          confirmButtonColor: "#26577C", // Customize the confirm button color
          cancelButtonColor: "gray", // Customize the cancel button color
        }).then((result) => {
          if (result.isConfirmed) {
            // Handle subscription redirection or logic
            // You can use history.push('/subscription') or any logic here
          }
        });
      } else {
        // Prepare the data object with all form details
        const formData = {
          foodType,
          details,
          quantity,
          city,
          expired,
          expiryDate,
          free,
          price,
          additionalNotes,
          // Add other form fields as needed
        };

        // Make a POST request to your server endpoint with Axios
        const response = await axios.post(
          "http://localhost:3000/posts",
          formData
        );

        // Handle the response as needed
        console.log("Form submission successful:", response.data);

        // Show a success SweetAlert after successful submission
        // Swal.fire({
        //   icon: "success",
        //   title: "Success!",
        //   text: "Your post will be posted after being verified.",
        // });

        // Close the modal after successful submission
        onClose();
      }
    } catch (error) {
      // Handle errors
      console.error("Form submission error:", error);

      // Show an error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the form. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      {/* Modal content goes here */}
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Form</h2>
        {/* Your form inputs go here */}
        <form onSubmit={handleSubmit}>
          {/* Food type input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Food Type
            </label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="mt-1 p-2 w-full border border-blue "
              placeholder="Enter food type"
            />
          </div>

          {/* Details input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Details
            </label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="cooked meals, raw ingredients, etc."
            />
          </div>

          {/* Quantity input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="servings, weight, units.."
            />
          </div>

          {/* City input (dropdown) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="" disabled>
                Select a city
              </option>
              <option value="amman">Amman</option>
              <option value="zarqa">Zarqa</option>
              {/* Add more cities as needed */}
            </select>
          </div>

          {/* Expired dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Is the food expired?
            </label>
            <select
              value={expired}
              onChange={(e) => setExpired(e.target.value === "true")}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Expiry date input */}
          {!expired && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Expiry Date
              </label>
              <input
                type="date"
                placeholder="Mention the date until which the food is safe to consume"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 p-2 w-full border border-blue"
              />
            </div>
          )}

          {/* Free/Paid dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Free/Paid
            </label>
            <select
              value={free}
              onChange={(e) => setFree(e.target.value === "true")}
              className="mt-1 p-2 w-full border border-blue"
            >
              <option value="true">Free</option>
              <option value="false">Paid</option>
            </select>
          </div>

          {/* If it's paid, show the price input field */}
          {!free && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 w-full border border-blue"
                placeholder="Enter the price"
              />
            </div>
          )}

          {/* Additional notes textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Additional Notes
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter additional notes..."
              rows="3"
            ></textarea>
          </div>

          {/* Add more input fields with similar structure */}

          <div className="flex justify-between">
            <button type="submit" className="bg-blue text-white py-2 px-4 ">
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-blue hover:underline"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PostForm;
