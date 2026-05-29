"use client";

import React, { useState } from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import GlobalLoading from "@/components/shared/GlobalLoading";
import { Mail, User, Shield, Camera, X, Edit3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageUpload } from "@/lib/imageupload/imageUpload";
import { toast } from "sonner";

const SettingsProfile = () => {
  const { user, setUser, loading, updateUserProfile } = useAuth();
  const { role, roleLoading } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (loading || roleLoading) return <GlobalLoading />;
  if (!user) return <div className="p-6">User not found</div>;

  const openModal = () => {
    setNameInput(user?.displayName || "");
    setPreviewImage(user?.photoURL || null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleSaveChanges = async () => {
    try {
      setIsUpdating(true);
      let photoURL = user?.photoURL;

      // Upload new image if selected
      if (selectedFile) {
        const imageData = await imageUpload(selectedFile);
        photoURL = imageData?.data?.display_url || photoURL;
      }

      // Update Firebase Profile
      await updateUserProfile({
        displayName: nameInput,
        photoURL: photoURL,
      });

      // Instantly update UI by modifying the user state in Context
      if (setUser) {
        setUser((prev) => ({
          ...prev,
          displayName: nameInput,
          photoURL: photoURL,
        }));
      }

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-montserrat text-foreground">
          Profile Settings
        </h2>
        <p className="text-sm text-foreground/60 font-inter mt-1">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-32 w-full bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-900 dark:to-teal-700"></div>

        <div className="px-6 sm:px-10 pb-10 relative">
          {/* Avatar Profile */}
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 overflow-hidden shadow-md">
              <Image
                src={
                  user?.photoURL || "https://i.ibb.co/fGHXvNYc/profile-i.jpg"
                }
                alt={user?.displayName || "Profile"}
                fill
                className="object-cover"
              />
            </div>
            <Button
              onClick={openModal}
              className="bg-teal-600 hover:bg-teal-700 text-white font-inter rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Update Profile
            </Button>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider font-montserrat mb-3">
                  Personal Details
                </h3>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-foreground/50 font-medium">
                      Full Name
                    </span>
                    <span className="text-base font-semibold text-foreground truncate font-inter">
                      {user?.displayName || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-foreground/50 font-medium">
                      Email Address
                    </span>
                    <span className="text-base font-semibold text-foreground truncate font-inter">
                      {user?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider font-montserrat mb-3">
                  Account Status
                </h3>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-foreground/50 font-medium">
                      Role
                    </span>
                    <span className="text-base font-semibold text-foreground uppercase tracking-wide font-inter">
                      {role || "User"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="text-lg font-bold font-montserrat text-foreground">
                Update Profile
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="relative w-28 h-28 rounded-full border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-foreground/30" />
                    )}

                    {/* Hover Overlay for Upload */}
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity duration-200">
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-xs font-medium">Change</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {previewImage && (
                    <button
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-2 border-white dark:border-slate-900 cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-foreground/50 font-medium">
                  Click the avatar to upload a new photo
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground/80 font-inter">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter"
                />
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                disabled={isUpdating}
                className="font-inter cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="bg-teal-600 hover:bg-teal-700 text-white font-inter cursor-pointer min-w-[140px]"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsProfile;
