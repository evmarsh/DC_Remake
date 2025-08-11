import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";

function PartyRequest() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/partyRequests`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetch_data = await response.json();
        setData(fetch_data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    console.log(data);
  }, [id]);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-light text-black justify-center">
      <h1>Party Request: {id}</h1>
      {data ? (
        <div>
          <h2>Details:</h2>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Location: {data.location}</p>
          <p>Comments: {data.comments}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PartyRequest;