import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";

function BookAParty () {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => setModalIsOpen(true);
    const handleCloseModal = () => setModalIsOpen(false);

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
        let form_is_valid = validateForm();

        if (form_is_valid) {
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
            handleOpenModal();
        }
        else {
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
        }
    }

    return (
        <>
            <div className="w-screen pt-10 bg-light flex flex-col min-h-screen items-center justify-between relative overflow-hidden">
                <form onSubmit={handleSubmit} className="border-gray-500 border-2 shadow-2xs bg-light w-1/2 h-full flex flex-col items-center justify-center text-black rounded">
                    <h1 className="border-b-2 border-black w-full px-2">Book a Party</h1>
                    <div className="flex flex-row gp">
                        <div className="flex flex-col">
                            <p className="">First Name</p>
                            <input required type="text" name="firstName" placeholder="First Name" className="form-input w-[calc(var(--gp-width)/2)] border-black border-2 h-10 rounded-xl p-2 my-2" value={data.firstName} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col">
                            <p className="">Last Name</p>
                            <input required type="text" name="lastName" placeholder="Last Name" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.lastName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <input required type="email" name="email" placeholder="email@example.com" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.email} onChange={handleChange} />
                        <input required type="tel" id="phoneNumber" name="phoneNumber" placeholder="###-###-####" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.phoneNumber} onChange={handleChange} onBlur={formatPhone} />
                    </div>
                    <DatePicker required className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" showTimeSelect dateFormat={"Pp"} selected={startDate} onChange={(date) => setStartDate(date)} />
                    <input required type="number" id="numPeople" name="numPeople" placeholder="# of People" min="8" max="200" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.numPeople} onChange={handleChange} onBlur={checkNumPeople} />
                    <select required name="location" className="form-input border-black border-2 h-10 rounded-xl p-2 my-2" value={data.location} onChange={handleChange}>
                        <option value={"Party Room"}>Party Room</option>
                        <option value={"Small Room"}>Small Room</option>
                        <option value={"Dining Room"}>Dining Room</option>
                    </select>
                    <textarea name="comments" placeholder="Additional Comments (Max 250 characters)" maxLength={250} className="form-input border-black border-2 rounded-xl p-2 pb-3 my-2 mb-5" value={data.comments} onChange={handleChange}></textarea>
                    <button type="submit" className="text-white mb-4 button">Submit</button>
                </form>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Party Request Confirmation"
                className="modal"
                overlayClassName="overlay"
            ></Modal>
        </>
    );
}

export default BookAParty