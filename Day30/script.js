const Form = () => {
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const checkTask = (text) => {
    return text.trim().toLowerCase();
  };

  const handleValue = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleResult = () => {
    if (!value.trim()) {
      setMsg("Vui lòng nhập task");
      return;
    }

    for (let i = 0; i < result.length; i++) {
      if (checkTask(result[i]) === checkTask(value)) {
        alert("Task đã tồn tại");
        return;
      }
    }
    setResult([...result, value.trim()]);

    setValue("");
    setMsg("");
  };

  // delete
  const handleDelete = (indexDelete) => {
    alert("Bạn có muốn xóa task");
    setResult(result.filter((_, index) => index !== indexDelete));
  };

  // update
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(result[index]);
  };

  const handleUpdate = () => {
    if (!editValue.trim()) return;

    const newList = [...result];
    newList[editIndex] = editValue;

    for (let i = 0; i < result.length; i++) {
      if (i !== editIndex && checkTask(result[i]) === checkTask(editValue)) {
        alert("Task đã tồn tại");
        return;
      }
    }
    setResult(newList);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="content">
      <h1>Get things done</h1>
      <div className="tasks">
        <input
          className="inputEl"
          placeholder="What is the task today"
          value={value}
          onChange={handleValue}
        />
        <button className="btn" onClick={handleResult}>
          {editIndex ? "Update task" : "Add task"}
        </button>
      </div>
      {msg && <span style={{ color: "red" }}>{msg}</span>}
      <div>
        <ul className="listTask">
          {result.map((task, index) => (
            <li
              key={index}
              className={`taskItem ${editIndex === index ? "editing" : ""}`}
            >
              {editIndex === index ? (
                <>
                  <input
                    className="inputEl"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button className="btn" onClick={handleUpdate}>
                    Update task
                  </button>
                </>
              ) : (
                <>
                  <span>{task}</span>
                  <div className="icon">
                    <svg
                      className="edit"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="pen-to-square"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      onClick={() => handleEdit(index)}
                    >
                      <path
                        fill="currentColor"
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      ></path>
                    </svg>
                    <svg
                      className="delete"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="trash"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      onClick={() => handleDelete(index)}
                    >
                      <path
                        fill="currentColor"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                      ></path>
                    </svg>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const element = <Form />;

// React 18
const root = document.querySelector("#root");
const container = ReactDOM.createRoot(root);
container.render(element);
