
import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../Components/Notes";
import UpdateForm from "../Components/UpdateForm";
import CreateForm from "../Components/CreateForm";
import "./NotesPage.css"; // Assuming you save the CSS in a file called NotesPage.css

export default function NotesPage() {
    const store = notesStore();

    // Use effect
    useEffect(() => {
      store.fetchNotes();
    }, []);

  return (
    <div className="container"> {/* Apply the container class */}
      <Notes />
      <UpdateForm />
      <CreateForm/>
    </div>
  )
}

