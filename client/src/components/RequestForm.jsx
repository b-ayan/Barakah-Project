// RequestForm.js
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";

const RequestForm = ({ isOpen, onClose }) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data object with delivery address and contact number
      const formData = {
        deliveryAddress,
        contactNumber,
        // Add other form fields as needed
      };

      // Make a POST request to your server endpoint with Axios
      const response = await axios.post(
        "http://localhost:3000/requests",
        formData
      );

      // Show a success sweet alert after successful submission
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your request has been submitted successfully.",
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Request form submission error:", error);

      // Show an error sweet alert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error submitting the request form. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {/* Modal content goes here */}
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Request Form</h2>
        {/* Your form inputs go here */}
        <form onSubmit={handleSubmit}>
          {/* Delivery address input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Delivery Address
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="City, Street"
            />
          </div>

          {/* Contact number input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="mt-1 p-2 w-full border border-blue"
              placeholder="Enter contact number"
            />
          </div>

          {/* Add more input fields with similar structure if needed */}

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

export default RequestForm;
