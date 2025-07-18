import { useState } from "react";

function Menu () {
    const [regularMenu, setRegularMenu] = useState(true);

    const handleButtonClick = (event) => {
        const {name} = event.target;
        if (name == "regularMenu" && !regularMenu) {
            setRegularMenu(true);
        }
        else if (name == "cateringMenu" && regularMenu) {
            setRegularMenu(false);
        }
    }

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
        <>
            <div className="w-screen bg-light text-black flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex flex-row my-2 text-center">
                    <h1 className="">Menu</h1>
                    <div className="flex flex-row col-start-3 text-white">
                        <button name="regularMenu" className="" onClick={handleButtonClick}>Menu</button>
                        <button name="cateringMenu" onClick={handleButtonClick}>Catering</button>
                    </div>
                </div>
                {regularMenu ? 
                    menu_pages.map((page, index) => (
                        <div className="w-3/4 my-3 border-2 border-gray-300 shadow-xl">
                            <img key={index} src={page} />
                        </div>
                    ))
                    :
                    catering_pages.map((page, index) => (
                        <div className="w-3/4 my-3 border-2 border-gray-300 shadow-xl">
                            <img key={index} src={page} />
                        </div>
                    ))
                };
            </div>
        </>
    );
}

export default Menu