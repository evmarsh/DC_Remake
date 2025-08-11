import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PartyRequest() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSubmit = (event) => {
        event.preventDefault();
        let form_is_valid = validateForm();

        if (form_is_valid) {
            fetch(`/api/partyRequests/${id}`, {
                method: 'PUT',
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

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-light text-black justify-center">
      <h1 className="my-2">Party Details</h1>
      {data ? (
        <form className="max-w-md w-full bg-light border-2 p-6 rounded shadow">
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
          <div className="flex justify-between">
            <button type="submit" className="mt-4 text-white px-4 py-2 rounded button">
              Submit
            </button>
            <button
              type="button"
              className="mt-4 text-white px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              // onClick={handleDelete} // Add your delete handler here
            >
              Delete
            </button>
          </div>
        </form>
      ) : loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : null}
    </div>
  );
}

export default PartyRequest;