import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userType, setUserType] = useState("normal");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    city: "city1",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters and include a capital letter, a number, and a symbol";
    }

    // Validate matching passwords
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Validate phone number
    const phoneNumberRegex = /^07\d{8}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Invalid phone number. It should start with 07 and be 10 digits long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      // Prepare data for submission
      const postData = {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        city: formData.city,
        role_id: getUserRoleId(userType), // Function to get role_id based on user type
      };

      try {
        // Send data using Axios
        const response = await axios.post(
          " http://localhost:3000/users",
          postData
        );

        // Handle success (you can customize this part based on your API response)
        swal("Done!", "You've signed up successfully", "success");
      } catch (error) {
        // Handle error (you can customize this part based on your API error handling)
        swal("Error!", error, "success");
      }
    }
  };

  // Function to get role_id based on user type
  const getUserRoleId = (type) => {
    switch (type) {
      case "normal":
        return 3; // Assuming 3 is the role_id for normal users
      case "business":
        return 2; // Assuming 2 is the role_id for business users
      case "charity":
        return 4; // Assuming 4 is the role_id for charity users
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="absolute w-1/2 bg-blue h-[20%] mt-16 shadow-md">
        <h1 className="absolute top-[55%] left-[65%] text-4xl text-white font-bold">
          SIGN UP
        </h1>
        <p className="absolute top-[73%] left-[65%] text-sm text-white font-medium">
          Join the change we make
        </p>
      </div>
      <div className="absolute w-[30%] h-11 bg-div mt-36 "></div>
      <div className="bg-background p-40 ">
        <div className="max-w-xl mx-auto  p-28 bg-white shadow-lg text-blue pt-48">
          <form onSubmit={handleSubmit}>
            <div className="mb-4  ">
              <label
                htmlFor="userType"
                className="block text-sm font-bold mt-6"
              >
                Sign Up as:
              </label>
              <select
                name="userType"
                value={userType}
                onChange={handleUserTypeChange}
                required
                className="block w-full p-2 mt-1 border h-10 "
              >
                <option value="normal">Normal User</option>
                <option value="business">Business User</option>
                <option value="charity">Charity</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-bold ">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={`block w-full p-2 mt-1 border border-blue  h-10 ${
                  formErrors.fullName ? "border-red-500" : ""
                }`}
              />
              {formErrors.fullName && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.fullName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`block w-full p-2 mt-1 border h-10 ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              {formErrors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-bold">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`block w-full p-2 mt-1 border h-10 ${
                  formErrors.password ? "border-red-500" : ""
                }`}
              />
              {formErrors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
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
            <div className="flex flex-wrap justify-between">
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-bold"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className={`block w-full p-2 mt-1 border h-10 ${
                    formErrors.phoneNumber ? "border-red-500" : ""
                  }`}
                />
                {formErrors.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">
                    {formErrors.phoneNumber}
                  </div>
                )}
              </div>
              <div className="mb-4 w-[35%]">
                <label htmlFor="city" className="block text-sm font-bold">
                  City:
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="block w-full p-2 mt-1 border h-10 "
                >
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                  <option value="city3">City 3</option>
                </select>
              </div>{" "}
            </div>
            <div className="text-center mt-4 ">
              <button
                type="submit"
                className="bg-orange  text-white py-2 px-20 shadow-md text-md font-semibold "
              >
                Sign Up
              </button>

              {userType === "normal" ? (
                <div className="text-center mt-4">
                  <div className="font-medium mb-4">or </div>
                  <button className="bg-transparent border border-blue text-blue py-2 px-8  text-md font-semibold">
                    Sign Up with Google
                  </button>
                </div>
              ) : null}

              <div className="text-blue font-medium text-md mt-6">
                Already have an account?{" "}
                <Link to="/signin">
                  <button className="font-bold">Sign In</button>
                </Link>
              </div>
            </div>
          </form>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default SignUp;
