import notesStore from "../stores/notesStore";
import "./UpdateForm.css";

export default function UpdateForm() {
  const store = notesStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div  className="create-form-container">
     <div className="create-form">
      <h2>Update note</h2>
      <form onSubmit={store.updateNote}>
        <input
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.title}
          name="title"
        />
        <textarea
          onChange={store.handleUpdateFieldChange}
          value={store.updateForm.body}
          name="body"
        />
        <button type="submit"  className="create-form-button">Update note</button>
      </form>
      </div>
    </div>
  );
}