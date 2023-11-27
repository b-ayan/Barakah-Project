import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";

const Details = ({ showModal, onClose }) => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/1"); // Replace '1' with the actual post ID you want to display
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRepost = () => {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure you want to repost this post?",
      confirmButtonText: "Repost",
    });
  };

  return (
    <Modal isOpen={showModal} onRequestClose={onClose}>
      <div className="bg-white p-20 max-w-xl mx-auto text-blue">
        <h2 className="text-2xl font-bold mb-6">Post Details</h2>
        {/* Display fetched data here */}
        <div>
          <p>
            <strong>Food Type:</strong> {postData.foodType}
          </p>
          <p>
            <strong>Details:</strong> {postData.details}
          </p>
          <p>
            <strong>Quantity:</strong> {postData.quantity}
          </p>
          <p>
            <strong>City:</strong> {postData.city}
          </p>
          <p>
            <strong>Is Expired:</strong> {postData.expired ? "Yes" : "No"}
          </p>
          {!postData.expired && (
            <p>
              <strong>Expiry Date:</strong> {postData.expiryDate}
            </p>
          )}
          <p>
            <strong>Free/Paid:</strong> {postData.free ? "Free" : "Paid"}
          </p>
          {!postData.free && (
            <p>
              <strong>Price:</strong> {postData.price}
            </p>
          )}
          <p>
            <strong>Additional Notes:</strong> {postData.additionalNotes}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={handleRepost}
            className="text-white p-2 bg-blue "
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-blue  hover:underline"
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Details;
