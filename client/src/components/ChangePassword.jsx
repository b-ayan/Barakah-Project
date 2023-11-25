import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate old password (you may add more validation rules)
    if (!formData.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    // Validate new password
    if (!formData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        // Prepare data for submission
        const postData = {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        };

        // Send data using Axios
        const response = await axios.post(
          "http://localhost:3000/change-password",
          postData
        );

        // Handle success (you can customize this part based on your API response)
        console.log("Password change successful:", response.data);

        // Reset the form
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        // Handle error (you can customize this part based on your API error handling)
        console.error("Error changing password:", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto  bg-white p-12 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-bold">
            Old Password:
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            className="block w-full p-2 mt-1 border h-10"
          />
          {formErrors.oldPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formErrors.oldPassword}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-bold">
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className={`block w-full p-2 mt-1 border h-10 ${
              formErrors.newPassword ? "border-red-500" : ""
            }`}
          />
          {formErrors.newPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formErrors.newPassword}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`block w-full p-2 mt-1 border h-10 ${
              formErrors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {formErrors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formErrors.confirmPassword}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-orange text-white py-2 px-8 shadow-md text-md font-semibold"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
