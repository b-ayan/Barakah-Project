import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head
const TABLE_HEAD = ["User", "Role", "City", "Phone", "Created at", "Action"];

const Users = () => {
  // State to store table rows, search term, and pagination
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data from API when component mounts or when pagination changes
  useEffect(() => {
    // Make an Axios request to your API endpoint with pagination parameters
    Axios.get("http://localhost:3000/users", {
      params: {
        page: currentPage,
      },
    })
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setTableRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]); // The effect runs when currentPage or itemsPerPage changes

  // Handle delete button click
  const handleDelete = (user_id) => {
    // Add your delete logic here
    console.log(`Deleting user with id ${user_id}`);
  };

  // Filter the table rows based on the search term
  const filteredRows = tableRows.filter((row) => {
    const searchFields = ["username", "email", "role", "city", "phone", "date"];
    return searchFields.some(
      (field) =>
        row[field] &&
        row[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate pagination info
  const totalItems = tableRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-background">
      {/* Add the search input field */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white w-[25%] border border-blue ml-[20%] "
      />

      <Card className="h-full w-[80%] mt-8 ml-[20%]  bg-blue-gray-50/50 ">
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead className="bg-white">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className=" bg-blue-gray p-4">
                    <Typography className="text-md leading-none font-semibold text-blue">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(
                (
                  { img, username, email, role, industry, city, phone, date },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  return (
                    <tr key={username} className={classes}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={username} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {role}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {industry}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 "
                        >
                          {city}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {phone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete User">
                          <IconButton
                            variant="text"
                            onClick={() => handleDelete(3)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Pagination controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="bg-blue hover:bg-blue-600 text-white mr-4 cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Previous
        </button>
        <span className="mr-4 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className=" bg-blue hover:bg-blue-600 text-white ml-4 cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
