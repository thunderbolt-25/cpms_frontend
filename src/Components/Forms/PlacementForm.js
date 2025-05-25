import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const PlacementForm = () => {
  const { user } = useContext(UserContext);
  const [newPlacement, setNewPlacement] = useState({
    department: user.department,
    company: "",
    jobDescription: "",
    package: "",
    deadline: "",
    eligibilityCriteria: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addPlacement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/placement", newPlacement); 
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setNewPlacement({
      ...newPlacement,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="placement">
          <h2 className="mb-2 mt-3 text-4xl font-bold text-violet-950 underline decoration-2 underline-offset-4 dark:text-slate-400 md:text-6xl">
            Add Placement
          </h2>
          <form className="w-full md:w-1/3">
            <label htmlFor="department">Department:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              id="department"
              value={newPlacement.department}
              disabled
            />
            <label htmlFor="company">Company:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              id="company"
              required
              value={newPlacement.company}
              onChange={handleFormChange}
            />
            <label htmlFor="jobDescription">Job Description:</label>
            <textarea
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="jobDescription"
              rows="3"
              required
              value={newPlacement.jobDescription}
              onChange={handleFormChange}
            />
            <label htmlFor="package">Package (CTC in LPA):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              id="package"
              min="0"
              step="0.1"
              required
              value={newPlacement.package}
              onChange={handleFormChange}
            />
            <label htmlFor="deadline">Deadline:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              id="deadline"
              required
              value={newPlacement.deadline}
              onChange={handleFormChange}
            />
            <label htmlFor="eligibilityCriteria">Eligibility Criteria:</label>
            <textarea
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="eligibilityCriteria"
              rows="2"
              required
              value={newPlacement.eligibilityCriteria}
              onChange={handleFormChange}
            />
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
              onClick={addPlacement}
            >
              <FaPlus />
              Add
            </button>
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default PlacementForm;
