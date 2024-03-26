import { useState, useEffect } from "react";

function Footer() {
  return (
    <footer class="main-font mt-[50px] bg-black/20">
      <div class="w-full p-4 py-8">
        <div class="flex items-center justify-between md:container md:mb-8">
          <div class="mb-6 md:mb-0">
            <a href="/" className="text-primary text-xl font-bold">
              Movie List
            </a>
          </div>
        </div>

        <div class="main-font justify-center md:container md:justify-between lg:flex">
          <div class="md:mb-8 lg:mb-0">
            <ul class="flex flex-row text-center text-xs text-white md:space-x-7 md:p-0 md:text-sm lg:space-x-8 lg:p-0">
              <li>
                <a
                  href="#"
                  class="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded px-1.5 py-2 hover:text-primary md:p-0 md:px-3 lg:p-0"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-3 md:mb-0">
            <a href="#" class="flex justify-center">
              <p class="self-center whitespace-nowrap text-xs font-normal md:text-sm dark:text-white">
                &copy; 2024 Andry, Deo, Rafi, Shela, Talitha aka Group 3
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
