// "use client";

// import { useState } from "react";
// import { baseUrl } from "@/app/Service/Helper";

// export default function Forgotpassword() {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const resetlink = async (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch(
//         `${baseUrl}/public/send-reset-password-link`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: email,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Email does not exist");
//         return;
//       }

//       setSuccess(data.message || "Reset link has been sent to your email.");
//     } catch {
//       // Intentionally ignored here: a failed request is already reported to the
//       // user with a generic error message, and we don't want to rethrow it.
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
//         <h1 className="mb-2 text-3xl font-bold text-gray-900">
//           Plenty Holidays
//         </h1>

//         <p className="mb-6 text-gray-500">
//           Reset your password
//         </p>

//         <form onSubmit={resetlink} className="space-y-4">
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               Email
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-sm text-red-600">
//               {error}
//             </p>
//           )}

//           {success && (
//             <p className="text-sm text-green-600">
//               {success}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send reset link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }