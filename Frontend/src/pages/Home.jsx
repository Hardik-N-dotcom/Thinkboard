import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import Navbar from '../components/Navbar';
import NotesNotFound from '../components/NotesNotFound';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data.notes); // ✅ Fix: extract the array
      } catch (error) {
        console.log(error.response);
        toast.error("Failed to fetch notes");
      }
    };

    fetchnotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {notes.length === 0 && <NotesNotFound />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default Home;
