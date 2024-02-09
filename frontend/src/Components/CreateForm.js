import notesStore from "../stores/notesStore";
import './CreateForm.css';

export default function CreateForm() {
  const store = notesStore();

  if (store.updateForm._id) return <></>;

  return (
    <div className="create-form-container">
     <div className="create-form">
      <h2 >Create note</h2>
      <form onSubmit={store.createNote}>
        <input
          onChange={store.updateCreateFormField}
          value={store.createForm.title}
          name="title"
        />
        <textarea
          onChange={store.updateCreateFormField}
          value={store.createForm.body}
          name="body"
        />
        <button type="submit" className="create-form-button">Create note</button>
      </form>
      </div>
    </div>
  );
}