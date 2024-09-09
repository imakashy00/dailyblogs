import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/books.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full  py-10">
      <div className="space-y-6 sm:space-y-0 sm:flex  sm:justify-between ">
        <div className="sm:flex sm:pr-20 sm:pl-10">
          <Image
            className="w-10 flex m-auto   h-10  justify-center"
            src={logo}
            alt="logo"
          />
          <p className="my-3 justify-center flex ml-5 text-gray-800">
            write, to make it right!
          </p>
        </div>
        <div className="justify-center flex  sm:pr-10">
          <Link
            href="/privacy"
            className="text-gray-600 flex pt-3 hover:text-yellow-500"
          >
            Privacy Policy
          </Link>{" "}
        </div>
        <div className="justify-center flex  sm:pr-10">
          <Link
            href="/terms-of-service"
            className="text-gray-600 flex pt-3 hover:text-yellow-500"
          >
            Terms of Service
          </Link>
        </div>
        <div className="pl-8 flex flex-col sm:flex sm:flex-row sm:pl-0">
          <input
            className="py-3 pl-1 sm:pl-4 text-center focus:outline-none text-sm border text-gray-600"
            type="email"
            placeholder="signup for launch discount"
          />{" "}
          <button
            type="submit"
            className="bg-yellow-400 w-[100px] sm:w-auto m-auto mt-4 sm:mt-0 py-3 px-5 text-sm sm:text-base"
          >
            Signup
          </button>
        </div>
      </div>
      <hr className="mt-20 sm:w-2/5 m-auto border-yellow-400" />
      <div className="sm:px-40  ">
        <ul className="flex w-2/5 justify-between m-auto py-10">
          <li>
            <Link
              href="mailto:imakashy00@gmail.com"
              target="_blank"
              aria-label="email"
            >
              <Mail className="hover:text-yellow-300" />
            </Link>
          </li>
          <li>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="hover:text-yellow-300" />
            </Link>
          </li>
          <li>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="hover:text-yellow-300" />
            </Link>
          </li>
        </ul>
        <p className="text-sm flex justify-center text-gray-500">
          © {new Date().getFullYear()} db. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
