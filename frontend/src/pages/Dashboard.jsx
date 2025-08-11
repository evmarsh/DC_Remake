import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({className}) {  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
    <div className={`w-screen h-screen flex flex-col items-center bg-light text-black ${className} sm:pl-15`}>
      <h1 className="text-2xl mt-4">Party Requests</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {loading ? <p>Loading...</p> : 
        <div className="w-full max-w-6xl px-2 sm:px-4 overflow-x-auto">
          <table className="min-w-full mt-3 border-2 border-gray-300 rounded-lg shadow-lg bg-white text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Id</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Name</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Email</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Phone Number</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Date</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap"># of People</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Location</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Comments</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50 hover:cursor-pointer hover:bg-gray-300" onClick={() => navigate(`/admin/party_requests/${item.id}`)}>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.id}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.firstName} {item.lastName}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.email}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.phoneNumber}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{formatDate(item.date)}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.numPeople}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.location}</td>
                  <td className="px-2 sm:px-4 py-2 border-b">{item.comments.length > 30 ? item.comments.substring(0, 30) + "..." : item.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default Dashboard;