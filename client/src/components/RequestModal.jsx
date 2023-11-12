import React from "react";

const RequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="z-10 bg-white p-8 rounded-md shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={onClose}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue">Request Form</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="text-gray-700">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={onInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="text-gray-700">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={onInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={onInputChange}
                  className="border p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestModal;
