"use client";

import Headnav from "../Components/Headnav/Headnav";
import { useState } from "react";

export default function enquery() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numberOfTravels, setNumberOfTravels] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.lowcostcruises.co.uk/api/public/enquery-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: name,
            email: email,
            phone: phone,
            numberOfTravels: numberOfTravels,
            url: window.location.href,
            message: message,
          }),
        },
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        // Clear all form fields
        setName("");
        setEmail("");
        setPhone("");
        setNumberOfTravels("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Headnav />

      <div
        className="min-h-screen flex items-center justify-center py-10"
        style={{
          backgroundImage: "url('/assets/img/enquery.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Plenty Holidays
          </h1>

          <p className="mb-6 text-gray-500">Thank you for travelling with us</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contact Number
              </label>

              <input
                type="text"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                }}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Number of Travels */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Number of Travels
              </label>

              <input
                type="text"
                value={numberOfTravels}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNumberOfTravels(value);
                }}
                placeholder="Enter number of travellers"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
