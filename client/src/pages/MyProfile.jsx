/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const MyProfile = () => {
  const { user, setUser, token, backendUrl } = useContext(ShopContext);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        {
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
        },
        {
          headers: {
            token: token, // same auth style as your app
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);          // 🔥 update global user
        setEdit(false);
        alert("Profile updated successfully!");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          My Profile
        </h2>

        {/* Profile Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
            {profileData.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {profileData.name}
            </p>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              disabled={!edit}
              value={profileData.name}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md outline-none ${
                edit ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email (cannot be changed)
            </label>
            <input
              type="email"
              disabled
              value={profileData.email}
              className="w-full border px-4 py-2 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              disabled={!edit}
              value={profileData.phone}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-md outline-none ${
                edit ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              disabled={!edit}
              value={profileData.address}
              onChange={handleChange}
              rows="3"
              className={`w-full border px-4 py-2 rounded-md outline-none ${
                edit ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="px-5 py-2 bg-black text-white rounded-md hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEdit(false)}
                className="px-5 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                disabled={loading}
                className={`px-5 py-2 rounded-md text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:opacity-90"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
