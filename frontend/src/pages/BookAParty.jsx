import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

function BookAParty() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => {
    setModalIsOpen(false);
    navigate("/");
  }

  const [data, setData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: new Date(),
    numPeople: 8,
    location: "Party Room",
    comments: ""
  });

  // Add state for minTime and maxTime
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);

  // Placeholder: set minTime and maxTime (simulate API call)
  useEffect(() => {
    // Sets minTime non-inclusive
    setMinTime(setHours(setMinutes(new Date(), 0), 10));
    setMaxTime(setHours(setMinutes(new Date(), 0), 21));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let form_is_valid = validateForm();

    if (form_is_valid) {
      fetch('/api/partyRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString()
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });

      handleOpenModal();
    } else {
      console.log("Invalid form data");
    }
  };

  const validateForm = () => {
    let result = true;
    if (/^[A-Za-z]+$/.test(data.firstName) && /^[A-Za-z]+$/.test(data.lastName)) {
      if (data.firstName.length >= 50 || data.lastName.length >= 50) {
        return false;
      }
    } else {
      return false;
    }
    return result;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const checkNumPeople = () => {
    let num = Number(data.numPeople);
    if (num < 8) num = 8;
    if (num > 200) num = 200;
    setData(prev => ({ ...prev, numPeople: num }));
  };

  const formatPhone = () => {
    let phone = data.phoneNumber;
    // Remove non-digit characters
    let new_phone = phone.replace(/\D/g, "");
    let formatted_phone = "";
    if (new_phone.length === 11) {
      formatted_phone = `+${new_phone[0]} ${new_phone.slice(1, 4)}-${new_phone.slice(4, 7)}-${new_phone.slice(7, 11)}`;
    } else if (new_phone.length === 10) {
      formatted_phone = `${new_phone.slice(0, 3)}-${new_phone.slice(3, 6)}-${new_phone.slice(6, 10)}`;
    } else {
      formatted_phone = phone;
    }
    setData(prev => ({ ...prev, phoneNumber: formatted_phone }));
  };

  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-light text-black py-10">
        <h1 className="text-2xl font-bold mb-2 pb-2">Book a Party</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-light p-6 rounded shadow flex flex-col gap-4 border-2 border-black"
        >
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">First Name</label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">Last Name</label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">Email</label>
              <input
                required
                type="email"
                name="email"
                placeholder="email@example.com"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">Phone Number</label>
              <input
                required
                type="tel"
                name="phoneNumber"
                placeholder="###-###-####"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.phoneNumber}
                onChange={handleChange}
                onBlur={formatPhone}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Date & Time</label>
            <DatePicker
              required
              className="border border-black rounded-xl px-3 py-2 bg-white"
              showTimeSelect
              dateFormat="Pp"
              selected={data.date}
              onChange={(date) => setData(prev => ({ ...prev, date }))}
              minDate={new Date()}
              minTime={minTime}
              maxTime={maxTime}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1"># of People</label>
              <input
                required
                type="number"
                name="numPeople"
                min="8"
                max="200"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.numPeople}
                onChange={handleChange}
                onBlur={checkNumPeople}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-1">Location</label>
              <select
                required
                name="location"
                className="border border-black rounded-xl px-3 py-2 bg-white"
                value={data.location}
                onChange={handleChange}
              >
                <option value="Party Room">Party Room</option>
                <option value="Small Room">Small Room</option>
                <option value="Dining Room">Dining Room</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Comments</label>
            <textarea
              name="comments"
              placeholder="Additional Comments (Max 250 characters)"
              maxLength={250}
              className="border border-black rounded-xl px-3 py-2 bg-white"
              value={data.comments}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="text-white bg-dark hover:bg-gray-800 rounded px-4 py-2 mt-2 hover:cursor-pointer">
            Submit
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Party Request Confirmation"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000
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
            alignItems: "stretch"
          }
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Party Request Submitted!</h2>
        <p>Your party request has been received. We hope to see you soon!</p>
        <button
          className="mt-6 px-4 py-2 rounded bg-dark text-white hover:bg-gray-800"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </Modal>
    </>
  );
}

export default BookAParty;