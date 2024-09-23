"use client";
import axios from "axios";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { URLSearchParams } from "url";

const CalendarComponent = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const router = useRouter();
  const currentMonth = dayjs().month(); // Current month as index (0 = January, 11 = December)
  const selectedMonth =
    (searchParams && parseInt(searchParams.get("month") ?? "")) || currentMonth;
  // send the selected year to the backend
  const selectedYear = searchParams.get("year") ?? dayjs().year();
  const daysInMonth = dayjs().month(selectedMonth).daysInMonth(); // Get the number of days in the selected month
  const firstDayOfMonth = dayjs().month(selectedMonth).startOf("month").day(); // Get the index of the first day of the month

  // State to store moods fetched from backend
  const [moods, setMoods] = useState<{ [key: number]: string }>({});

  // Fetch moods for the selected month from the backend
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const { data } = await axios.get(`/api/moods?month=${selectedMonth}?year=${selectedYear}`);
        setMoods(data); // Assuming data is an object with day as key and mood as value
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };

    fetchMoods();
  }, [selectedMonth, selectedYear]);

  // Function to get background color based on mood
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "bg-yellow-300";
      case "sad":
        return "bg-blue-300";
      case "neutral":
        return "bg-gray-300";
      case "angry":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="col-span-4">
      <div className="flex items-center spaace-y-2">
        <ChevronLeft
          className="p-1 size-8 border rounded-l-md"
          onClick={() => router.push(`/dashboard?month=${selectedMonth - 1}`)}
        />
        <span className="px-2">
          {dayjs().month(selectedMonth).format("MMMM")}{" "}
          {/* Display year */}
          {dayjs().month(selectedMonth).format("YYYY")}
          
          
        </span>
        <ChevronRight
          className="p-1 border rounded-r-md size-8"
          onClick={() => router.push(`/dashboard?month=${selectedMonth + 1}`)}
        />
         
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-sm">
            {day}
          </div>
        ))}
        
        {Array.from({ length: 42 }).map((_, i) => {
          const dayNumber = i - firstDayOfMonth + 1; // Calculate the day of the month
          const mood = moods[dayNumber]; // Get the mood for the current day
          const moodColor = getMoodColor(mood); // Get the background color based on mood

          return (
            <div
              key={i}
              className={`${
                dayNumber > 0 && dayNumber <= daysInMonth ? moodColor : ""
              } p-1 rounded-full`}
            >
              {dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarComponent;
