import { useState } from "react";

function Menu () {
    const [regularMenu, setRegularMenu] = useState(true);

    const handleButtonClick = (event) => {
        const {name} = event.target;
        if (name === "regularMenu" && !regularMenu) {
            setRegularMenu(true);
        }
        else if (name === "cateringMenu" && regularMenu) {
            setRegularMenu(false);
        }
    };

    //TODO: need to change to api call
    const menu_pages = [
        "src/assets/menu1.jpg", 
        "src/assets/menu2.jpg",
        "src/assets/menu3.jpg",
        "src/assets/menu4.jpg",
        "src/assets/menu5.jpg"
    ];

    const catering_pages = [
        "src/assets/catering1.jpg",
        "src/assets/catering2.jpg",
        "src/assets/catering3.jpg"
    ];
    
    return (
        <div className="w-screen min-h-screen bg-light text-black flex flex-col items-center">
            <h1 className="text-3xl mt-6 mb-2 w-full text-center">Menu</h1>
            <div className="flex gap-4 mb-6">
                <button
                    name="regularMenu"
                    className={`px-6 py-2 rounded-l-full rounded-r-full font-semibold transition-colors duration-200 border-2 hover:cursor-pointer ${
                        regularMenu
                            ? "bg-dark text-white border-dark shadow"
                            : "bg-white text-dark border-gray-400 hover:bg-gray-200"
                    }`}
                    onClick={handleButtonClick}
                >
                    Menu
                </button>
                <button
                    name="cateringMenu"
                    className={`px-6 py-2 rounded-l-full rounded-r-full font-semibold transition-colors duration-200 border-2 hover:cursor-pointer ${
                        !regularMenu
                            ? "bg-dark text-white border-dark shadow"
                            : "bg-white text-dark border-gray-400 hover:bg-gray-200"
                    }`}
                    onClick={handleButtonClick}
                >
                    Catering
                </button>
            </div>
            <div className="flex flex-col items-center w-full">
                {(regularMenu ? menu_pages : catering_pages).map((page, index) => (
                    <div key={index} className="w-full md:w-3/5 my-3 border-2 border-gray-300 shadow-xl rounded-lg overflow-hidden bg-white">
                        <img src={page} alt={`Menu page ${index + 1}`} className="w-full h-auto object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;