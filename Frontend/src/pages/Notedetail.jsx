import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.findnote); // ✅ use res.data.findnote if backend wraps
      } catch (error) {
        console.error("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>
          <button onClick={handleDelete} className="btn btn-outline btn-error">
            <Trash2Icon className="h-5 w-5 mr-1" />
            Delete
          </button>
        </div>

        <div
          className="card glass border border-neutral shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="text-3xl font-bold text-accent mb-4 border-b border-neutral pb-2">
              ✍️ Edit Your Note
            </h2>

            <div className="form-control mb-6">
              <label className="label font-semibold text-base-content">
                <span className="label-text">Title:- </span>
              </label>
              <input
                type="text"
                placeholder="Note title"
                className="m-4 input input-bordered input-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label font-semibold text-base-content">
                <span className="label-text">Content:- </span>
              </label>
              <textarea
                className="m-4 textarea textarea-bordered textarea-accent h-40 resize-none focus:outline-none focus:ring-2 focus:ring-accent transition"
                placeholder="Write your note here..."
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-accent px-6 transition-transform duration-300 hover:scale-105"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
