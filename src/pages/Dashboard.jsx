import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Cursor glow state
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const fetchTasks = async () => {
    const res = await API.get("/task");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await API.post("/task", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/task/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
    fetchTasks();
  }, []);

  // cursor glow movement
  const handleMouseMove = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-6 overflow-hidden"
    >
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-40 h-40 rounded-full bg-white/20 blur-3xl transition duration-75"
        style={{
          left: cursor.x - 80,
          top: cursor.y - 80
        }}
      ></div>

      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Dashboard
        </h2>

        <button
          onClick={logout}
          className="bg-white text-sky-600 px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Task Section */}
      <div className="backdrop-blur-lg bg-white/80 p-8 rounded-3xl shadow-xl max-w-3xl mx-auto mb-8 transition hover:scale-[1.01]">
        <h3 className="text-xl font-semibold mb-5 text-black">
          Add New Task
        </h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Task title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-5 p-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition"
          placeholder="Task description"
        />

        <button
          onClick={addTask}
          className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-sky-600 hover:scale-[1.02] transition"
        >
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      <div className="max-w-3xl mx-auto">
        {tasks.length === 0 ? (
          <p className="text-white text-center text-lg mt-10">
            No tasks yet — start by adding one 🚀
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="backdrop-blur-md bg-white/80 p-5 rounded-2xl shadow-lg mb-4 flex justify-between items-center transition hover:scale-[1.02] hover:shadow-2xl"
            >
              <div>
                <h4 className="font-semibold text-lg text-black">
                  {task.title}
                </h4>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
