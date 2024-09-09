"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ALargeSmall,
  BellRing,
  Boxes,
  ChartSpline,
  Check,
  Grip,
  ImageIcon,
  NotebookPen,
  Smile,
  Wrench,
  Zap,
} from "lucide-react";
import logo from "../../public/books.png";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div className="m-auto w-full overflow-hidden sm:overflow-auto sm:w-full">
      <div className="flex mb-10 justify-between w-full sticky top-0 bg-white ">
        <div className="flex  py-5 w-2/5 justify-center">
          <Image className="sm:w-10 w-8 h-8 sm:h-10" src={logo} alt="logo" />
          <p className="text-2xl sm:text-3xl text-yellow-400 pl-2 flex items-center">
            db
          </p>
        </div>
        <div className="flex items-center text-gray-800 w-2/5  justify-center">
          <Link
            className="sm:py-2 py-1 px-4 sm:w-auto w-16 justify-center flex bg-yellow-300 text-gray-800 rounded "
            href={"/signin"}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-full sm:py-64 py-20 m-auto ">
        <h1 className="text-6xl sm:text-7xl sm:flex  sm:px-auto px-6  sm:justify-center sm:font-semibold text-gray-700 ">
          Every Day Matters,
        </h1>
        <h1 className="text-6xl sm:text-7xl sm:flex sm:px-auto px-6 sm:pt-5 sm:justify-center sm:font-semibold text-gray-700  ">
          write it down <span className=" sm:text-6xl text-5xl ">✍️</span>
        </h1>
        <h3 className="text-gray-600 pt-7 flex justify-center text-xl px-6  sm:text-base">
          Journal every day because only the past helps you <br />
        </h3>
        <h3 className="text-gray-600 sm:pt-2 flex justify-center text-xl px-6 sm:text-base">
          {" "}
          become a better version of yourself...
        </h3>
        <Link className="flex justify-center" href={"/signin"}>
          {" "}
          <button className=" rounded bg-yellow-300 my-10 py-2 px-3 sm:my-5  text-gray-800">
            Let&apos;s Start
          </button>
        </Link>
      </div>

      <div className="w-full sm:w-4/5 justify-between m-auto px-10 sm:px-32">
        <h1 className="text-3xl sm:text-5xl text-gray-700 pt-5 w-full justify-center flex">
          Transform Your Days into Stories
        </h1>
        <h2 className=" pt-5 sm:pt-10 w-full text-gray-500 justify-center flex sm:text-base text-sm">
          We Empower You to Capture Every Moment, Reflect on Your Journey,
          <br /> and Turn Your Daily Thoughts into Powerful Narratives.
        </h2>
        <div className="my-10 sm:my-36 w-full h-auto sm:h-[400px] grid grid-cols-1 sm:grid-cols-3">
          <div className="flex flex-col items-center p-10">
            <NotebookPen className="text-blue-400 size-20 sm:size-28 border p-5 border-blue-400 rounded-xl mb-5" />
            <h3 className="py-5 text-lg font-semibold text-gray-700">
              Craft with Ease
            </h3>
            <p className="text-gray-500 p-2 flex sm:text-base text-sm ">
              Our intuitive editor makes journaling a pleasure,with seamless
              writing experience designed for comfort.
            </p>
          </div>
          <div className="flex flex-col items-center p-10 sm:border-r-2 sm:border-l-2 border-r-gray-300 border-l-gray-300 border-dashed">
            <Boxes className="text-purple-400 size-20 sm:size-28 border p-5 border-purple-400 rounded-xl mb-5" />
            <h3 className="py-5 text-lg font-semibold text-gray-700">
              Group Your Memories
            </h3>
            <p className="text-gray-500 p-2 flex  ">
              Effortlessly categorize your daily entries into meaningful groups
              like birthdays, travel, and more.
            </p>
          </div>
          <div className="flex flex-col items-center p-10">
            <ChartSpline className="text-green-400 size-28 border p-5 border-green-400 rounded-xl mb-5" />
            <h3 className="py-5 text-lg font-semibold text-gray-700">
              Grow with Time
            </h3>
            <p className="text-gray-500 p-2 flex  ">
              Gain insights into your habits, emotions, and progress, helping
              you evolve over time.
            </p>
          </div>
        </div>
        <h1 className="text-2xl sm:text-5xl pt-5 w-full justify-center flex">
           Daily Journey Tools 
        </h1>
        <h2 className="pt-5 sm:pt-10 sm:w-2/5 w-4/5 m-auto text-gray-500 justify-center flex">
          Explore the tools to enhance your journaling , making it easier and
          enjoyable to document your thoughts.
        </h2>
        <div className="w-full h-auto sm:h-[800px] p-2 sm:p-10 grid my-10 gap-10 sm:grid-cols-2">
          <div className="flex border-2 border-dashed rounded-2xl hover:border-yellow-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <Smile className="size-8  text-yellow-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Emoji Support
              </h1>
              <p className="text-gray-500">
                Bring your journal to life with emojis! Add a personal touch and
                vibrant flair to your entries, making your experiences and
                emotions come alive.
              </p>
            </div>
          </div>
          <div className="flex border-2 border-dashed rounded-2xl hover:border-indigo-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <ImageIcon className="size-8  text-indigo-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Image Upload
              </h1>
              <p className="text-gray-500">
                Upload day&apos;s images to your journal to make them more
                memorable and complementry.
              </p>
            </div>
          </div>
          <div className="flex border-2 border-dashed rounded-2xl hover:border-pink-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <ALargeSmall className="size-8  text-pink-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Custom Fonts
              </h1>
              <p className="text-gray-500">
                Personalize your journal with custom fonts. Choose from a
                variety of styles to match your mood or theme, giving each entry
                a unique look and feel.
              </p>
            </div>
          </div>
          <div className="flex border-2 border-dashed rounded-2xl hover:border-green-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <Grip className="size-8  text-green-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Dragable Elements
              </h1>
              <p className="text-gray-500">
                Organize your content effortlessly with draggable blocks.
                Rearrange text, images, and other elements to create a layout
                that best represents your thoughts and experiences.
              </p>
            </div>
          </div>
          <div className="flex border-2 border-dashed rounded-2xl hover:border-orange-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <BellRing className="size-8  text-orange-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Daily Remainder
              </h1>
              <p className="text-gray-500">
                Never miss a day of journaling with built-in reminders. Set
                custom notifications to encourage daily writing and keep your
                journaling habit on track.
              </p>
            </div>
          </div>
          <div className="flex border-2 border-dashed rounded-2xl hover:border-blue-400">
            <div className=" flex justify-center pt-5 w-1/5">
              <Wrench className="size-8  text-blue-400" />
            </div>
            <div className="w-4/5 pt-5 ">
              <h1 className=" text-xl text-gray-700 flex justify-start mb-5">
                Dynamic Toolbar
              </h1>
              <p className="text-gray-500">
                A dynamic toolbar that popup on text selection, providing quick
                access to essential tools, making it easy to enhance your
                journaling.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="px-6 sm:w-4/5 justify-between h-auto m-auto mt-32 sm:px-32">
        <h1 className="text-5xl w-3/5 text-gray-700 justify-center mb-5 flex m-auto">
          Pricing
        </h1>
        <h2 className="w-4/5 sm:w-2/5 text-gray-500 justify-center flex m-auto">
          Start Journaling your daily life.
        </h2>
        <div className="my-10 sm:my-28 w-full  h-auto grid gap-10 sm:grid-cols-2">
          {/* <div className="flex flex-col justify-between bg-gray-100 rounded-xl p-10 h-full">
            <div>
              <h2 className="text-3xl text-gray-800">Free</h2>
              <h3 className="py-5 text-2xl text-gray-700">$0 (Free)</h3>
              <h4 className="text-lg text-gray-500">What&apos;s Included:</h4>
              <ul className="mt-5">
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Simple text editor
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Daily reminder
                </li>
              </ul>
            </div>
            <button className="mt-auto rounded-lg bg-gray-400 py-3 px-5">
              Start for Free
            </button>
          </div> */}

          <div className="flex flex-col justify-between bg-green-100 rounded-xl p-10 h-full">
            <div>
              <h2 className="text-3xl flex text-gray-800">
                <Zap className="mr-2 text-green-400 fill-green-400 border-1 border-green-400 border rounded-full size-8" />
                Pro
              </h2>
              <h3 className="py-5 text-2xl text-gray-700">$5 / month</h3>
              <h4 className="text-lg text-gray-500">What&apos;s Included:</h4>
              <ul className="mt-5">
                <li className="my-5 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Rich text editor
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Daily reminder
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Emoji
                </li>
                {/* <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />1 image / Journal
                </li> */}
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Analytics
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Groups your journals
                </li>
              </ul>
            </div>
            <button className="mt-auto rounded-lg bg-green-400 py-3 px-5">
              Get pro
            </button>
          </div>

          <div className="flex flex-col justify-between bg-yellow-100 rounded-xl p-10 h-full">
            <div>
              <h2 className="text-3xl flex text-gray-800">
                <Zap className="mr-2 text-yellow-400 fill-yellow-400 border-1 border-yellow-400 border rounded-full size-8" />{" "}
                Ultimate
              </h2>
              <h3 className="py-5 text-2xl text-gray-700">$9 / month</h3>
              <h4 className="text-lg text-gray-500">What&apos;s Included:</h4>
              <ul className="mt-5">
                <li className="my-5 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Rich text editor
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Daily reminder
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Emoji
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Analytics
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Group your journals
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Add images
                </li>
                {/* <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Add Audio
                </li> */}
                {/* <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  Customized background
                </li>
                <li className="my-4 flex text-gray-800">
                  <Check className="text-blue-500 mr-5" />
                  AI - Autocomplete and query
                </li> */}
              </ul>
            </div>
            <button className="mt-auto bg-yellow-400 rounded-lg py-3 px-5">
              Get Ultimate
            </button>
          </div>
        </div>
      </div>
      {/* TODO: Add testimonoal */}
      {/* Footer */}
      <div className="sm:w-4/5 px-6 sm:px-32 h-auto m-auto py-20">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
