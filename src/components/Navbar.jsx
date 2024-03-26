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
            <a href="/top-rated-movies">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Top Movie
              </p>
            </a>
            <a href="/tv-list">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                TV Series
              </p>
            </a>
            <a href="/people-list">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                People
              </p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
