import React from "react";

const handleLogout = () => {};

const Navbar = () => {
  return (
    <>
      <div className="mx-auto rounded-lg container bg-base-200 mb-4">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-xl text-center align-middle">userProfile</div>
          <h1 className="text-3xl font-bold text-center font-mono">
            LeetSpace();
          </h1>
          <button
            className="text-black font-semibold items-center btn-ghost shadow-md rounded bg-orange-300 p-3 px-4 hover:bg-orange-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
