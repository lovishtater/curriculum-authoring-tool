import React from "react";
import Logo from "../../assets/pencil.svg"
const Navigation = () => {
  return (
      <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center">
                  <div className="flex flex-1 items-center justify-center">
                      <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto" src={Logo} alt="Logo" />
                            <h3 className="text-white text-2xl font-bold">
                            Curriculum Creator
                            </h3>
                      </div>
                  </div>
              </div>
            </div>
      </nav>
  );
};

export default Navigation;
