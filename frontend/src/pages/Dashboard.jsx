import SideBar from '../components/SideBar';

function Dashboard({className}) {
  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center bg-light text-black ${className}`}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default Dashboard;