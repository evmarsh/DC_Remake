import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import ReactModal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";

function PartyRequest() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/partyRequests/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status:" ${response.status}`);
        }
        const fetch_data = await response.json();
        setData(fetch_data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_is_valid = validateForm();

    if (form_is_valid) {
      try {
        const response = await fetch(`/api/partyRequests/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data,
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Only parse JSON if there is content
        let result = null;
        const text = await response.text();
        if (text) {
          result = JSON.parse(text);
          console.log("Response from server:", result);
        } else {
          console.log("No content in response.");
        }

        navigate("/admin");

      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Invalid form data");
    }
  }

    const validateForm = () => {
        let result = true;
        if (/^[A-za-z]+$/.test(data.firstName) && /^[A-za-z]+$/.test(data.lastName)) {
            if (data.firstName.length >= 50 || data.lastName.length >= 50) {
                return false;
            }
        }
        else {
            return false;
        }

        //

        return result;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const checkNumPeople = () => {
        let people = document.getElementById("numPeople");
        if (people.value < 8) {
            people.value = 8;
        }
        else if (people.value > 200) {
            people.value = 200;
        }

        data.numPeople = people.value;
    }

    const formatPhone = () => {
        let phone = document.getElementById("phoneNumber");
        //Check for at least 10 digits
        if (phone.value.length >= 10) {
            let new_phone = phone.value;
            new_phone = new_phone.replace(/-/g,"");
            new_phone = new_phone.replace("(","");
            new_phone = new_phone.replace(")","");
            new_phone = new_phone.replace("+","");
            new_phone = new_phone.replace(" ","");

            console.log(new_phone);

            let formatted_phone = "";
            //check for extra digit
            if (new_phone.length == 11) {
                let phone_array = new_phone.split('');
                phone_array.splice(0, 0, '+');
                phone_array.splice(2, 0, ' ');
                phone_array.splice(6, 0, '-');
                phone_array.splice(10, 0, '-');

                formatted_phone = phone_array.join('');
            }
            else {
                let phone_array = new_phone.split('');
                phone_array.splice(3, 0, '-');
                phone_array.splice(7, 0, '-');

                formatted_phone = phone_array.join('');
            }

            phone.value = formatted_phone
            data.phoneNumber = formatted_phone;
        }
    }

    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/partyRequests/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Optionally, you can show a success message here

        setIsOpen(false); // Close the modal
        navigate("/admin"); // Redirect to the admin page
      } catch (error) {
        console.error("Error deleting party request:", error);
        // Optionally, set error state or show an error message
      }
    }

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-light text-black justify-center">
      <h1 className="my-2">Party Details</h1>
      {data ? (
        <form className="max-w-md w-full bg-light border-2 p-6 rounded shadow" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              onBlur={formatPhone}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              dateFormat="Pp"
              showTimeSelect
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Number of People:</label>
            <input
              type="number"
              name="numPeople"
              id="numPeople"
              value={data.numPeople}
              onChange={handleChange}
              onBlur={checkNumPeople}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Location:</label>
            <input
              type="text"
              name="location"
              value={data.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Comments:</label>
            <textarea
              name="comments"
              value={data.comments}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              rows={3}
            />
          </div>
          <div className="flex justify-between mb-3">
            <button type="submit" className="mt-4 text-white px-4 py-2 rounded button hover:cursor-pointer">
              Submit
            </button>
            <button
              type="button"
              className="mt-4 text-white px-4 py-2 rounded bg-red-600 hover:bg-red-700 hover:cursor-pointer"
              onClick={handleOpenModal}
            >
              Delete
            </button>
          </div>
          <Link to="/admin" className="mt-4 text-blue-600 hover:underline">
            Back to Party Requests
          </Link>
        </form>
      ) : loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : null}

      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            maxWidth: "400px",
            margin: "auto",
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "0.5rem",
            padding: "2rem",
            background: "#fff",
            color: "#111",
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          },
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this party request?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="mr-2 text-white px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 hover:cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white px-4 py-2 rounded bg-red-600 hover:bg-red-700 hover:cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default PartyRequest;