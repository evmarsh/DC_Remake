import { useState, useEffect } from 'react';

function Dashboard({className}) {  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/partyRequests");
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
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }; 

  return (
    <div className={`w-screen h-screen flex flex-col items-center bg-light text-black ${className}`}>
      {loading ? <p>Loading...</p> : 
        <table className="items-center justify-center mt-3 border-2 p-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th># of People</th>
              <th>Location</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName} {item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.numPeople}</td>
                <td>{item.location}</td>
                <td>{item.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default Dashboard;