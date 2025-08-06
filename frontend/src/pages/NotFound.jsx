import { Link } from "react-router-dom";

function NotFound({className}) {
    const notFoundStyle = {
        background: 'linear-gradient(to bottom, var(--color-dark) 60%, var(--color-light) 40%)',
        color: 'white'
    };

    return (
        <div style={notFoundStyle} className={`w-screen h-screen flex flex-col items-center justify-center bg-light text-black ${className}`}>
            <h1 className="text-4xl">404 - Page Not Found</h1>
            <p className="text-xl mt-4">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 text-blue-500 hover:underline">
                Go back to Home
            </Link>
        </div>
    );
}

export default NotFound;