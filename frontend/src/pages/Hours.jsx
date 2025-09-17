import { set } from "date-fns";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const days = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
];

function Hours() {
  const [hours, setHours] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTimeslot, setSelectedTimeslot] = useState({ id: null, openTime: "", closeTime: "" });
  const [newTimeslot, setNewTimeslot] = useState({ openTime: "", closeTime: "" });
  const [error, setError] = useState("");

  const [hoursModalOpen, setHoursModalOpen] = useState(false);
  const [newHours, setNewHours] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: "" }), {})
  );
  const [hoursError, setHoursError] = useState("");

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const response = await fetch("/api/hours");
        const data = await response.json();
        setHours(data);
      } catch (error) {
        console.error("Error fetching hours:", error);
      }
    };

    fetchHours();
  }, []);

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const response = await fetch("/api/timeslots");
        const data = await response.json();
        setTimeslots(data);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      }
    };

    fetchTimeslots();
  }, []);

  // Helper to format "HH:mm" to "h:mm AM/PM"
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "Closed") return timeStr;
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Find the active hours object
  const activeHours = hours.find(h => h.isActive);

  // Modal handlers
  const openModal = () => {
    setNewTimeslot({ openTime: "", closeTime: "" });
    setError("");
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const openHoursModal = () => {
    setNewHours(days.reduce((acc, day) => ({ ...acc, [day]: "" }), {}));
    setHoursError("");
    setHoursModalOpen(true);
  };
  const closeHoursModal = () => setHoursModalOpen(false);

  // Handle input changes in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTimeslot((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit for new timeslot
  const handleCreateTimeslot = async (e) => {
    e.preventDefault();
    if (!newTimeslot.openTime || !newTimeslot.closeTime) {
      setError("Both open and close times are required.");
      return;
    }
    try {
      const response = await fetch("/api/timeslots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTimeslot),
      });
      if (!response.ok) throw new Error("Failed to create timeslot");
      const created = await response.json();
      setTimeslots((prev) => [...prev, created]);
      closeModal();
    } catch (err) {
      setError("Error creating timeslot.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedTimeslot((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditTimeslot = async (e) => {
    e.preventDefault();
    if (!selectedTimeslot.openTime || !selectedTimeslot.closeTime) {
      setError("Both open and close times are required.");
      return;
    }
    try {
      const response = await fetch(`/api/timeslots/${selectedTimeslot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTimeslot),
      });
      if (!response.ok) throw new Error("Failed to update timeslot");

      // Only parse JSON if there is content
      const text = await response.text();
      let updated = selectedTimeslot;
      if (text) {
        updated = JSON.parse(text);
      }
      setTimeslots((prev) => prev.map(ts => ts.id === updated.id ? updated : ts));
      setEditModalOpen(false);
      const refreshedHours = await fetch("/api/hours").then(res => res.json());
      setHours(refreshedHours);
    } catch (err) {
      setError("Error updating timeslot.");
      console.error(err);
    }
  };

  const handleDeleteTimeslot = async (id) => {
    try {
      const response = await fetch(`/api/timeslots/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete timeslot");
      setTimeslots((prev) => prev.filter(ts => ts.id !== id));
    } catch (err) {
      setError("Error deleting timeslot.");
    }
  };

  const handleHoursSelect = (day, timeslotId) => {
    setNewHours(prev => ({ ...prev, [day]: timeslotId }));
  };

  const handleCreateHours = async (e) => {
    e.preventDefault();
    // Validate all days have a selection
    if (days.some(day => !newHours[day])) {
      setHoursError("Please select a timeslot for each day.");
      return;
    }
    // Build the hours object
    const hoursObj = {};
    hoursObj.isActive = false; // New hours are not active by default
    days.forEach(day => {
      const slot = timeslots.find(ts => ts.id === parseInt(newHours[day]));
      let dayId = day + "Id";
      hoursObj[dayId] = parseInt(newHours[day]);
    });
    console.log("Creating hours: ", hoursObj);
    try {
      const response = await fetch("/api/hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hoursObj),
      });
      if (!response.ok) throw new Error("Failed to create hours");
      const created = await response.json();
      setHours(prev => [...prev, created]);
      closeHoursModal();
    } catch (err) {
      setHoursError("Error creating hours.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-light text-black py-10">
      <h1 className="text-2xl mb-6">Hours</h1>
      <div className="flex gap-8 w-full justify-center">
        {/* Timeslots Table */}
        <div className="flex flex-col items-center">
          <table className="min-w-[220px] max-w-xs w-full bg-white rounded shadow border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Timeslot ID</th>
                <th className="py-2 px-4 text-left">Open</th>
                <th className="py-2 px-4 text-left">Close</th>
              </tr>
            </thead>
            <tbody>
              {timeslots.map((slot) => (
                <tr key={slot.id} className="even:bg-gray-50 hover:cursor-pointer hover:bg-gray-300" onClick={() => {
                  setSelectedTimeslot({ id: slot.id, openTime: slot.openTime, closeTime: slot.closeTime });
                  setError("");
                  setEditModalOpen(true);
                }}>
                  <td className="py-2 px-4">{slot.id}</td>
                  <td className="py-2 px-4">{formatTime(slot.openTime)}</td>
                  <td className="py-2 px-4">{formatTime(slot.closeTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-dark text-white rounded hover:bg-dark/80 transition hover:cursor-pointer"
            onClick={openModal}
          >
            Create New Timeslot
          </button>
        </div>
        {/* Hours Table */}
        <div className="flex flex-col items-center">
          <table className="min-w-[350px] max-w-lg w-full bg-white rounded shadow border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Day</th>
                <th className="py-2 px-4 text-left">Open</th>
                <th className="py-2 px-4 text-left">Close</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                return (
                  <tr key={day} className="even:bg-gray-50">
                    <td className="py-2 px-4 capitalize">{day}</td>
                    <td className="py-2 px-4">{activeHours ? formatTime(activeHours[day].openTime) : "Loading..."}</td>
                    <td className="py-2 px-4">{activeHours ? formatTime(activeHours[day].closeTime) : "Loading..."}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex gap-2">
            <button
              className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/80 transition hover:cursor-pointer"
              onClick={openHoursModal}
            >
              Create New Hours
            </button>
            <button
              className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/80 transition hover:cursor-pointer"
              onClick={() => {
                // TODO: Open modal or dropdown to select active hours
                alert("Select Active Hours clicked!");
              }}
            >
              Select Active Hours
            </button>
          </div>
        </div>
      </div>
      {/* Modal for creating new timeslot */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Timeslot"
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
        <h2 className="text-lg font-semibold mb-4">Create New Timeslot</h2>
        <form onSubmit={handleCreateTimeslot} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1">Open Time (HH:mm or "Closed")</label>
            <input
              type="text"
              name="openTime"
              value={newTimeslot.openTime}
              onChange={handleInputChange}
              placeholder='e.g. "10:00" or "Closed"'
              className="w-full border px-3 py-2 rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Close Time (HH:mm or "Closed")</label>
            <input
              type="text"
              name="closeTime"
              value={newTimeslot.closeTime}
              onChange={handleInputChange}
              placeholder='e.g. "21:00" or "Closed"'
              className="w-full border px-3 py-2 rounded bg-gray-100"
              required
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-400 hover:cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-dark text-white hover:bg-dark/80 hover:cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit Timeslot"
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
        <h2 className="text-lg font-semibold mb-4">Edit Timeslot</h2>
        <form onSubmit={handleEditTimeslot} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1">Open Time (HH:mm or "Closed")</label>
            <input
              type="text"
              name="openTime"
              value={selectedTimeslot.openTime}
              onChange={handleEditInputChange}
              placeholder='e.g. "10:00" or "Closed"'
              className="w-full border px-3 py-2 rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Close Time (HH:mm or "Closed")</label>
            <input
              type="text"
              name="closeTime"
              value={selectedTimeslot.closeTime}
              onChange={handleEditInputChange}
              placeholder='e.g. "21:00" or "Closed"'
              className="w-full border px-3 py-2 rounded bg-gray-100"
              required
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex justify-between gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this timeslot?")) {
                  handleDeleteTimeslot(selectedTimeslot.id);
                  setEditModalOpen(false);
                }
              }}
            >
              Delete
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-400 hover:cursor-pointer"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-dark text-white hover:bg-dark/80 hover:cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={hoursModalOpen}
        onRequestClose={closeHoursModal}
        contentLabel="Create New Hours"
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
        <h2 className="text-lg font-semibold mb-4">Create New Hours</h2>
        <form onSubmit={handleCreateHours} className="flex flex-col gap-4">
          {days.map(day => (
            <div key={day}>
              <label className="block font-semibold mb-1 capitalize">{day}</label>
              <select
                className="w-full border px-3 py-2 rounded bg-gray-100"
                value={newHours[day]}
                onChange={e => handleHoursSelect(day, e.target.value)}
                required
              >
                <option value="">Select timeslot</option>
                {timeslots.map(ts => (
                  <option key={ts.id} value={ts.id}>
                    {formatTime(ts.openTime)} - {formatTime(ts.closeTime)}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {hoursError && <div className="text-red-600">{hoursError}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-400 hover:cursor-pointer"
              onClick={closeHoursModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-dark text-white hover:bg-dark/80 hover:cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Hours;
