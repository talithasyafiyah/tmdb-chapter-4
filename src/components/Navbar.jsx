import { useState, useEffect } from "react";

function Navbar() {
  return (
    <nav className="py-4 px-3 fixed top-0 w-full z-10 bg-background">
      <div className="container flex justify-between items-center">
        <a href="/" className="text-primary text-xl font-bold">
          Movie List
        </a>
        <div className="hidden md:flex items-center gap-2">
          <div className="flex gap-4">
            <p className="text-sm font-normal text-white cursor-pointer hover:text-primary">
              Movie
            </p>
            <p className="text-sm font-normal text-white cursor-pointer hover:text-primary">
              TV Series
            </p>
            <p className="text-sm font-normal text-white cursor-pointer hover:text-primary">
              People
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
