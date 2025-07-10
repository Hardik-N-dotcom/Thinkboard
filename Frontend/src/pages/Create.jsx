import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ FIXED
import toast from "react-hot-toast";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/" className="btn btn-outline btn-sm">
            <ArrowLeftIcon className="size-4 mr-1" />
            Back to Notes
          </Link>
        </div>

        <div
          className="card glass border border-accent shadow-xl 
          transition-all duration-300 hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="text-3xl font-bold text-accent mb-4">Create a New Note</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label font-semibold text-base-content">
                  <span className="label-text">Title:- </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a note title..."
                  className=" m-5 input input-bordered input-accent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-base-content">
                  <span className="label-text">Content:- </span>
                </label>
                <textarea
                  placeholder="Write your note..."
                  className="m-5 textarea textarea-bordered textarea-accent h-40 resize-none focus:outline-none focus:ring-2 focus:ring-accent transition"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-accent px-6 transition-transform duration-300 hover:scale-105"
                >
                  ✍️ Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
