import Footer from "../components/Footer";

function BookAParty () {
    return (
        <div className="min-w-screen bg-light flex flex-col items-center justify-center relative overflow-hidden">
            <form className="border-gray-500 border-2 shadow-2xs bg-light w-1/2 h-dvh flex flex-col items-center justify-center text-black rounded">
                <input type="text" name="firstName" placeholder="First Name" className="border-black border-2 w-3/4 h-10 rounded-xl p-2" />
            </form>
            <Footer className={"w-full"} />
        </div>
    );
}

export default BookAParty