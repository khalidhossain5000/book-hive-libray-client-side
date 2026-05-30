"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import GlobalLoading from "@/components/shared/GlobalLoading";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Trash2, Pencil, BookOpen, Hash, Star, Loader2 } from "lucide-react";
import Image from "next/image";
import { imageUpload } from "@/lib/imageupload/imageUpload";

const categories = [
  "Novel",
  "Sports & Games",
  "Computer & Coding",
  "Sci-Fi",
  "History",
  "Biography",
  "Technology",
  "Fantasy",
  "Mystery",
  "Education",
  "Other",
];

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    rating: "",
    shortDescription: "",
    content: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    data: books = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooks");
      return res.data;
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/allBooks-delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The book has been deleted.", "success");
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error!", `Failed to delete book: ${err.message}`, "error");
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: async ({ id, data, imageFile }) => {
      if (imageFile) {
        toast.loading("Uploading image...", {
          id: "image-upload",
          position: "top-center",
        });
        const imageData = await imageUpload(imageFile);
        if (!imageData?.success) {
          toast.dismiss("image-upload");
          throw new Error("Image upload failed");
        }
        data.image = imageData.data.display_url;
        toast.success("Image uploaded successfully", {
          id: "image-upload",
          position: "top-center",
        });
      }

      toast.loading("Updating book...", {
        id: "book-update",
        position: "top-center",
      });

      const res = await axiosSecure.put(`/all-books/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Book updated successfully!", {
        id: "book-update",
        position: "top-center",
      });
      refetch();
      setIsEditing(false);
      setSelectedBook(null);
      setSelectedImageFile(null);
      setImagePreview("");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update book. Please try again.", {
        id: "book-update",
        position: "top-center",
      });
    },
  });

  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      quantity: String(book.quantity ?? ""),
      rating: String(book.rating ?? ""),
      shortDescription: book.shortDescription || "",
      content: book.content || "",
    });
    setSelectedImageFile(null);
    setImagePreview(book.image || "");
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    if (selectedImageFile && imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setIsEditing(false);
    setSelectedBook(null);
    setSelectedImageFile(null);
    setImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook) return;

    Swal.fire({
      title: "Update book?",
      text: "Are you sure you want to update this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateBookMutation.mutate({
          id: selectedBook._id || selectedBook.id,
          data: {
            title: formData.title,
            author: formData.author,
            category: formData.category,
            quantity: parseInt(formData.quantity, 10) || 0,
            rating: parseFloat(formData.rating) || 0,
            shortDescription: formData.shortDescription,
            content: formData.content,
          },
          imageFile: selectedImageFile,
        });
      }
    });
  };

  const handleDelete = (book) => {
    Swal.fire({
      title: "Delete book?",
      text: `Are you sure you want to delete \"${book.title}\"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookMutation.mutate(book._id || book.id);
      }
    });
  };

  if (isLoading) return <GlobalLoading message="Loading books..." />;
  if (isError)
    return (
      <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300">
        Error loading books: {error?.message || "Unexpected error"}
      </div>
    );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-montserrat text-foreground">
          Manage Books
        </h2>
        <p className="text-sm text-foreground/60 font-inter mt-1">
          Review all books, update details, or remove entries from the catalog.
        </p>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-sm font-inter">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Book</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Copies</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {books.map((book) => {
              const isAvailable = (book.quantity ?? 0) > 0;
              return (
                <tr
                  key={book._id || book.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        {book.image ? (
                          <Image
                            src={book.image}
                            alt={book.title || "Book cover"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-slate-400">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {book.title || "Untitled"}
                        </p>
                        <p className="text-xs text-foreground/70">
                          {book.author || "Unknown author"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {book.category || "General"}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {book.quantity ?? 0}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    <div className="inline-flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      {(parseFloat(book.rating) || 0).toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        isAvailable
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                      }`}
                    >
                      {isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(book)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 px-3 py-2 text-xs font-semibold transition"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      className="inline-flex items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40 px-3 py-2 text-xs font-semibold transition"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {books.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-foreground/50 font-medium"
                >
                  No books found in the library.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {books.map((book) => {
          const isAvailable = (book.quantity ?? 0) > 0;
          return (
            <div
              key={book._id || book.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="p-4 flex items-start gap-4">
                <div className="relative w-16 h-20 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title || "Book cover"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-slate-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {book.title || "Untitled"}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {book.author || "Unknown author"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <Hash className="w-3.5 h-3.5" />
                        {book.category || "General"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {(parseFloat(book.rating) || 0).toFixed(1)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isAvailable
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                        }`}
                      >
                        {isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/70 line-clamp-3">
                      {book.shortDescription ||
                        book.content ||
                        "No description available."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-950/60 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-foreground/70">
                  Copies:{" "}
                  <span className="font-semibold text-foreground">
                    {book.quantity ?? 0}
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    onClick={() => handleOpenEdit(book)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(book)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEditing && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl my-6 flex flex-col max-h-[calc(100vh-3rem)]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4 flex-shrink-0">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Edit Book
                </h3>
                <p className="text-sm text-foreground/60">
                  Update the book details and save changes.
                </p>
              </div>
              <button
                onClick={handleCloseEdit}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition ml-4 flex-shrink-0"
              >
                Close
              </button>
            </div>
            <form
              onSubmit={handleUpdateSubmit}
              className="space-y-6 p-4 sm:p-6 overflow-y-auto flex-1"
            >
              <div className="grid gap-4 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr]">
                <div className="space-y-3">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Book thumbnail
                    </p>
                    <div className="relative h-48 sm:h-60 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Book cover preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
                          <BookOpen className="w-8 h-8" />
                          <p className="text-xs text-center">
                            Current thumbnail will appear here. Choose a new
                            image to replace it.
                          </p>
                        </div>
                      )}
                    </div>
                    <label className="mt-4 block text-sm font-medium text-foreground">
                      Change cover image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-foreground outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-teal-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 dark:border-slate-700 dark:bg-slate-950"
                      />
                    </label>
                    <p className="mt-2 text-xs text-foreground/60">
                      Leave empty to keep the current cover image.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Title
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Author
                      <input
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Category
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Copies
                      <input
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Rating
                      <input
                        name="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-foreground">
                      Short description
                      <input
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </label>
                  </div>
                  <label className="space-y-2 text-sm font-medium text-foreground">
                    Full content
                    <textarea
                      name="content"
                      rows="4"
                      value={formData.content}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end flex-shrink-0 border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
