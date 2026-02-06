import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await API.get("/task");
    setTasks(res.data);
  };

  // Add task
  const addTask = async () => {
    if (!title) return;

    await API.post("/task", {
      title,
      description
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/task/${id}`);
    fetchTasks();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Auth check + fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Task title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Task description"
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="max-w-2xl mx-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
