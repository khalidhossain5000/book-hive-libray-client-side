"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  BookOpen,
  User,
  Hash,
  Star,
  LayoutList,
  AlignLeft,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { imageUpload } from "@/lib/imageupload/imageUpload";

const categories = [
  "Novel",
  "Sci-Fi",
  "History",
  "Biography",
  "Technology",
  "Fantasy",
  "Mystery",
  "Education",
  "Other",
];

const AddBookClient = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    quantity: "",
    rating: "",
    category: "",
    shortDescription: "",
    content: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!selectedFile) {
      toast.error("Please upload a book cover image", {
        position: "top-center",
        className: "w-[260px] h-[72px] text-sm font-semibold",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image first
      toast.loading("Uploading image...", {
        id: "image-upload",
      });

      const imageData = await imageUpload(selectedFile);

      if (!imageData.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = imageData.data.display_url;

      // Prepare book data
      const bookData = {
        title: formData.title,
        author: formData.author,
        quantity: parseInt(formData.quantity),
        rating: parseFloat(formData.rating),
        category: formData.category,
        shortDescription: formData.shortDescription,
        content: formData.content,
        image: imageUrl,
      };

      // Save to database with secure endpoint
      toast.loading("Adding book to library...", {
        id: "image-upload",
      });

      const response = await axiosSecure.post("/books", bookData);

      if (response.data.insertedId || response.data.acknowledged) {
        toast.success("Book added successfully!", {
          id: "image-upload",
          position: "top-center",
          className: "w-[260px] h-[72px] text-sm font-semibold",
          removeDelay: 1200,
          iconTheme: {
            primary: "#10b981",
            secondary: "#d1fae5",
          },
          style: {
            border: "1px solid rgba(16, 185, 129, 0.65)",
            color: "white",
            backgroundImage:
              "linear-gradient(135deg, #059669, #10b981, #34d399)",
            boxShadow:
              "0 20px 40px rgba(16, 185, 129, 0.35), 0 0 25px rgba(16, 185, 129, 0.45)",
          },
        });

        // Reset form
        setFormData({
          title: "",
          author: "",
          quantity: "",
          rating: "",
          category: "",
          shortDescription: "",
          content: "",
        });
        setPreviewImage(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add book. Please try again.",
        {
          id: "image-upload",
          position: "top-center",
          className: "w-[260px] h-[72px] text-sm font-semibold",
          removeDelay: 1200,
          iconTheme: {
            primary: "#f87171",
            secondary: "#fee2e2",
          },
          style: {
            border: "1px solid rgba(248, 113, 113, 0.65)",
            color: "white",
            backgroundImage:
              "linear-gradient(135deg, #dc2626, #ef4444, #f87171)",
            boxShadow:
              "0 20px 40px rgba(220, 38, 38, 0.35), 0 0 25px rgba(248, 113, 113, 0.45)",
          },
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-montserrat text-foreground">
          Add New Book
        </h2>
        <p className="text-sm text-foreground/60 font-inter mt-1">
          Fill in the details below to add a new book to the library catalog.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left Side: Image Upload & Preview */}
        <div className="lg:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider font-montserrat mb-6 self-start w-full">
            Book Cover Image
          </h3>

          <div className="w-full max-w-[240px] aspect-[2/3] relative rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 overflow-hidden group flex flex-col items-center justify-center transition-colors hover:border-teal-500 dark:hover:border-teal-500">
            {previewImage ? (
              <>
                <Image
                  src={previewImage}
                  alt="Book Cover Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <label className="cursor-pointer bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-foreground font-inter">
                  Click to Upload
                </span>
                <span className="text-xs text-foreground/50 mt-1">
                  SVG, PNG, JPG (max. 800x400px)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="lg:w-2/3 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider font-montserrat mb-4">
            Book Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Book Title */}
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Book Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. The Great Gatsby"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter"
              />
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Author Name
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="e.g. F. Scott Fitzgerald"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter"
              />
            </div>

            {/* Book Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <LayoutList className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter appearance-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <Hash className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="e.g. 5"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                Rating (1-5)
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
                min="1"
                max="5"
                step="0.1"
                placeholder="e.g. 4.5"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <AlignLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                rows="2"
                placeholder="Brief summary of the book..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter resize-none"
              ></textarea>
            </div>

            {/* Book Content */}
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 font-inter">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Book Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Full content or detailed description..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-foreground font-inter resize-y"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white font-inter rounded-lg shadow-md transition-all active:scale-95 px-8 py-2.5 h-auto min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Book...
                </>
              ) : (
                "Add Book"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookClient;
