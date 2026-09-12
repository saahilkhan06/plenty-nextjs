"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import httpClient from "@/app/Service/httpClient";

export default function Updatepassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    setSuccessMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await httpClient.put("/account/update-password", {
        oldPassword,
        newPassword,
      });

      // Show success message
      setSuccessMessage("Password updated successfully");

      // Clear inputs
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Update password error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
        <h1 className="mb-1 text-2xl font-semibold text-stone-800">
          Update Password
        </h1>

        <p className="mb-6 text-sm text-stone-500">
          Change your account password
        </p>

        {/* Old Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-stone-700">
            Old Password
          </label>

          <input
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setOldPasswordError("");
            }}
            placeholder="Enter old password"
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-violet-500"
          />

          {oldPasswordError && (
            <p className="mt-1 text-xs text-red-600">✕ {oldPasswordError}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-stone-700">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full  rounded-md border  px-3 py-2 outline-none focus:border-violet-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="text-xs">Confirm Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />

          {confirmPassword && (
            <p
              className={`text-xs mt-1 ${
                newPassword === confirmPassword
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {newPassword === confirmPassword
                ? "✓ Passwords match"
                : "✕ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {successMessage && (
          <p className="mt-3 text-center text-sm text-green-600">
            ✓ {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}
