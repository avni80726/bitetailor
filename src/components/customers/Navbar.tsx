import { useState } from "react";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 fixed top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold text-red-500">Bite Tailor</h1>
                <input className="bg-white-500 text-black border w-2xl " placeholder="Search for resturant,cuisine or a dish"></input>


                <div className="relative z-20">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-white bg-red-500 px-4 py-2 rounded-md"
                    >
                        Avni
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded-md z-30">
                            <a
                                href="/profile"
                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                Profile
                            </a>
                            <a
                                href="/orders"
                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                Orders
                            </a>
                            <a
                                href="/logout"
                                className="block px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
