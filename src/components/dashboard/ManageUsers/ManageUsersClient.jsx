"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import GlobalLoading from "@/components/shared/GlobalLoading";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Trash2, Shield, User, Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

const ManageUsersClient = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch Users
  const { data: users = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Update Role Mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      // Endpoint to patch role
      const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated successfully", { position: "top-right" });
      refetch();
    },
    onError: (err) => {
      toast.error(`Failed to update role: ${err.message}`, { position: "top-right" });
    },
  });

  // Delete User Mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      // Endpoint to delete user
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The user has been deleted.", "success");
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error!", `Failed to delete user: ${err.message}`, "error");
    },
  });

  const handleUpdateRole = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make this user an ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id: user._id, newRole });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user._id);
      }
    });
  };

  if (isLoading) return <GlobalLoading message="Loading Users Data..." />;
  if (isError) return <div className="p-6 text-red-500 font-bold">Error loading users: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-montserrat text-foreground">Manage Users</h2>
        <p className="text-sm text-foreground/60 font-inter mt-1">
          View and manage all registered users in the system.
        </p>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-sm font-inter">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                      <Image
                        src={user.profilePic || "https://i.ibb.co/fGHXvNYc/profile-i.jpg"}
                        alt={user.name || "User Profile"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-foreground/40" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' 
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {user.role === 'admin' ? <ShieldAlert className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    {user.role?.toUpperCase() || "USER"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {currentUser?.email === user.email ? (
                    <span className="inline-block px-3 py-1.5 text-xs font-semibold text-foreground/40 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      Current User
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleUpdateRole(user)}
                        className="inline-flex items-center justify-center p-2 text-teal-600 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/40 rounded-lg transition-colors cursor-pointer"
                        title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="inline-flex items-center justify-center p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-foreground/50 font-medium">
                  No users found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                  <Image
                    src={user.profilePic || "https://i.ibb.co/fGHXvNYc/profile-i.jpg"}
                    alt={user.name || "User Profile"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground font-montserrat">{user.name}</h3>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    user.role === 'admin' 
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {user.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {user.role?.toUpperCase() || "USER"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-foreground/70 font-inter bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {currentUser?.email === user.email ? (
                <div className="flex-1 py-2 text-center text-sm font-medium text-foreground/40 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  Current User (Actions Disabled)
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleUpdateRole(user)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <Shield className="w-4 h-4" />
                    {user.role === 'admin' ? "Make User" : "Make Admin"}
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-foreground/50 font-medium">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsersClient;
