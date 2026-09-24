// // src/app/login/page.tsx

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { login } from "../Service/AuthService";
// import { storeAuthData } from "../Service/LocalStorage";
// import Link from "next/link";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const response = await login({
//         email,
//         password,
//       });

//       console.log("Login response:", response);

//       if (response?.success && response?.data) {
//         // Save token/user information
//         storeAuthData(response.data);

//         // Redirect
//         router.push("/Admin");
//       } else {
//         setError(
//           response?.message || "Invalid email or password"
//         );
//       }
//     } catch (error: any) {
//       console.error("Login error:", error);
//       console.log("API error:", error?.response?.data);

//       setError(
//         error?.response?.data?.message ||
//         "Invalid email or password"
//       );
//     } finally {
//       // Always stop loading
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">

//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

//         <h1 className="mb-2 text-3xl font-bold text-gray-900">
//           Plenty Holidays
//         </h1>

//         <p className="mb-6 text-gray-500">
//           Login to your account
//         </p>

//         <form
//           onSubmit={handleLogin}
//           className="space-y-4"
//         >

//           {/* Email */}
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

//           {/* Password */}
//           <div>
//             <label className="mb-1 block text-sm font-medium text-gray-700">
//               Password
//             </label>

//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
//               required
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-sm text-red-600">
//               {error}
//             </p>
//           )}

//           {/* Login */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         <Link
//           href="/Login/Forgotpassword"
//           className="mt-5 flex justify-center"
//         >
//           Forgot Password?
//         </Link>

//       </div>

//     </div>
//   );
// }

// // src/app/Login/page.tsx

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/Admin");
//   }, [router]);

//   return null;
// }
// "use client";

// export default function Login() {
//   return (
//     <div>
//       <h1>Login</h1>
//     </div>
//   );
// }