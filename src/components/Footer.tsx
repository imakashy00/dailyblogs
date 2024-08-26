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
    <footer className="w-full py-10">
      <div className="flex justify-between">
        <div className="flex pr-20 pl-10">
          <Image
            className="w-10 flex  h-10  justify-center"
            src={logo}
            alt="logo"
          />
          <p className="my-3 ml-5 text-gray-800">write, to make it right!</p>
        </div>
        <div className=" pr-20">
          <Link
            href="/privacy-policy"
            className="text-gray-600 flex pt-3 hover:text-yellow-500"
          >
            Privacy Policy
          </Link>{" "}
        </div>
        <div className=" pr-20">
          <Link
            href="/terms-of-service"
            className="text-gray-600 flex pt-3 hover:text-yellow-500"
          >
            Terms of Service
          </Link>
        </div>
        <div className="border  ">
          <input
            className="py-3 px-5  mr-0 focus:outline-none text-sm  text-gray-600"
            type="email"
            placeholder="signup for launch discount"
          />{" "}
          <button type="submit" className="bg-yellow-400 py-3 px-5">
            Signup
          </button>
        </div>
      </div>
      <hr className="mt-20 w-2/5 m-auto border-yellow-400" />
      <div className="px-40  ">
        <ul className="flex w-2/5 justify-between m-auto py-10">
          <li>
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook className="hover:text-yellow-300" />
            </Link>
          </li>
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
          <li>
            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="hover:text-yellow-300" />
            </Link>
          </li>
        </ul>
        <p className="text-sm flex justify-center text-gray-500">
          © {new Date().getFullYear()} DJ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
