import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Radio } from "../components/Radio";

import "react-datepicker/dist/react-datepicker.css";

function BookAParty () {
    const [startDate, setStartDate] = useState(new Date());
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

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/partyRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                date: startDate.toISOString() // Convert date to ISO string
            })
        })
        .then((response) => {
            response.json().then((data) => {
                console.log("Response from server:", data);
            })
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });

        console.log("Submit");
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <>
            <div>
                {data ? <h1>{JSON.stringify(data, null, 2)}</h1> : 'Loading...'}
            </div>
            <div className="w-screen pt-10 bg-light flex flex-col min-h-screen items-center justify-between relative overflow-hidden">
                <form onSubmit={handleSubmit} className="border-gray-500 border-2 shadow-2xs bg-light w-1/2 h-full flex flex-col items-center justify-center text-black rounded">
                    <h1 className="border-b-2 border-black w-full px-2">Book a Party</h1>
                    <input type="text" name="firstName" placeholder="First Name" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.lastName} onChange={handleChange} />
                    <input type="email" name="email" placeholder="email@example.com" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.email} onChange={handleChange} />
                    <input type="tel" name="phoneNumber" placeholder="###-###-####" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.phoneNumber} onChange={handleChange} />
                    <DatePicker className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" showTimeSelect dateFormat={"Pp"} selected={startDate} onChange={(date) => setStartDate(date)} />
                    <input type="number" name="numPeople" placeholder="# of People" min="8" max="200" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.numPeople} onChange={handleChange} />
                    <select name="location" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.location} onChange={handleChange}>
                        <option value={"Party Room"}>Party Room</option>
                        <option value={"Small Room"}>Small Room</option>
                        <option value={"Dining Room"}>Dining Room</option>
                    </select>
                    <textarea name="comments" placeholder="Additional Comments" maxLength={250} className="form-input border-black border-2 rounded-xl p-2 pb-3 my-2 mb-5" value={data.comments} onChange={handleChange}></textarea>
                    <button type="submit" className="text-white mb-4">Submit</button>
                </form>
            </div>
        </>
    );
}

export default BookAParty