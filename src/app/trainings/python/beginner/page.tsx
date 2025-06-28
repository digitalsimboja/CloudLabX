"use client";

import React, { useState } from "react";
import Navbar from "../../../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../../../components/Footer";

const beginnerCourses = [
  {
    id: 1,
    title: "Install and Setup for Mac and Linux",
    description:
      "Get started by installing Python and setting up your development environment.",
    videoUrl:
      "https://www.youtube.com/watch?v=YYXdXT2l-Gg&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=1",
    thumbnail: "/assets/trainings/python/install-setup.jpg",
  },
  {
    id: 2,
    title: "Strings - Working with Textual Data",
    description:
      "Learn how to manipulate and use strings effectively in Python.",
    videoUrl:
      "https://www.youtube.com/watch?v=k9TUPpGqYTo&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=2",
    thumbnail: "/assets/trainings/python/strings.jpg",
  },
  {
    id: 3,
    title: "Integers and Floats - Working with Numeric Data",
    description:
      "Understand how to perform calculations and use numbers in Python.",
    videoUrl:
      "https://www.youtube.com/watch?v=khKv-8q7YmY&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=3",
    thumbnail: "/assets/trainings/python/numbers.jpg",
  },
  {
    id: 4,
    title: "Lists, Tuples, and Sets",
    description:
      "Explore Python’s core data structures and how to use them effectively.",
    videoUrl:
      "https://www.youtube.com/watch?v=W8KRzm-HUcc&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=4",
    thumbnail: "/assets/trainings/python/collections.jpg",
  },
  {
    id: 5,
    title: "Dictionaries - Working with Key-Value Pairs",
    description: "Master dictionaries for efficient data access using keys.",
    videoUrl:
      "https://www.youtube.com/watch?v=daefaLgNkw0&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=5",
    thumbnail: "/assets/trainings/python/dictionaries.jpg",
  },
  {
    id: 6,
    title: "Conditionals and Booleans",
    description: "Learn to control your program flow using if, else, and elif.",
    videoUrl:
      "https://www.youtube.com/watch?v=f4KOjWS_KZs&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=6",
    thumbnail: "/assets/trainings/python/conditionals.jpg",
  },
  {
    id: 7,
    title: "Loops and Iterations",
    description:
      "Understand looping with for and while loops, and how to iterate over collections.",
    videoUrl:
      "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=7",
    thumbnail: "/assets/trainings/python/loops.jpg",
  },
  {
    id: 8,
    title: "Functions",
    description: "Build reusable blocks of code with Python functions.",
    videoUrl:
      "https://www.youtube.com/watch?v=9Os0o3wzS_I&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=8",
    thumbnail: "/assets/trainings/python/functions.jpg",
  },
  {
    id: 9,
    title: "Import Modules and Exploring the Standard Library",
    description: "Explore Python’s built-in modules and how to organize code.",
    videoUrl:
      "https://www.youtube.com/watch?v=CqvZ3vGoGs0&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU&index=9",
    thumbnail: "/assets/trainings/python/modules.jpg",
  },
];

export default function BeginnerPythonTrainings() {
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const visibleCourses = showAll
    ? beginnerCourses
    : beginnerCourses.slice(0, 3);

  const handleCardClick = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const renderDetail = () => {
    if (selectedId !== 1) return null;

    return (
      <div className="bg-dark-800 text-gray-200 rounded-xl p-6 mt-8 max-w-5xl mx-auto transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Installation Guide (Mac & Linux)
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-400">
            Mac (Homebrew)
          </h3>
          <pre className="bg-dark-700 p-4 rounded-md text-sm overflow-x-auto">
            {`# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python3

# Verify
python3 --version
pip3 --version`}
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-400">
            Linux (Ubuntu / Debian)
          </h3>
          <pre className="bg-dark-700 p-4 rounded-md text-sm overflow-x-auto">
            {`# Update packages
sudo apt update

# Install Python and pip
sudo apt install python3 python3-pip -y

# Verify
python3 --version
pip3 --version`}
          </pre>
        </div>

        <p className="mt-4 text-sm text-gray-400">
          For more details, refer to the{" "}
          <a
            href="https://www.youtube.com/watch?v=YYXdXT2l-Gg"
            target="_blank"
            className="text-indigo-400 underline"
            rel="noopener noreferrer"
          >
            full video tutorial
          </a>
          .
        </p>
      </div>
    );
  };

  return (
    <>
      <Navbar isLoggedIn={false} />

      <section className="min-h-screen bg-dark-900 text-gray-200 px-4 py-10">
        <div className="max-w-5xl mx-auto text-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Beginner Python Trainings
          </h1>
          <p className="text-gray-400 text-lg">
            Learn the fundamentals of Python programming through step-by-step
            video tutorials.
          </p>
        </div>

        {/* <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {visibleCourses.map((course, index) => (
            <a href={course.videoUrl} target="_blank" rel="noopener noreferrer" key={index}>
              <div className="bg-dark-800 hover:bg-dark-700 transition p-5 rounded-xl border border-gray-700 shadow-lg cursor-pointer flex flex-col h-full">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm">{course.description}</p>
              </div>
            </a>
          ))}
        </div> */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {visibleCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCardClick(course.id)}
              className="cursor-pointer"
            >
              <div className="bg-dark-800 hover:bg-dark-700 transition p-5 rounded-xl border border-gray-700 shadow-lg flex flex-col h-full">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedId && renderDetail()}

        {!showAll && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Show All Trainings
            </button>
          </div>
        )}

        <div className="mt-20 text-center">
          <h2 className="text-2xl text-white font-semibold mb-4">
            Want to suggest a training?
          </h2>
          <p className="text-gray-400 mb-6">
            Let us know if you have a beginner-friendly Python course we should
            include.
          </p>
          <Link href="/contact">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
