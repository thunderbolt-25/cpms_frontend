import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const Placement = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [placements, setPlacements] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState(null);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await axios.get("/placement/all");
        setPlacements(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchPlacements();
  }, []);

  const handleApply = (company) => {
    alert(`You applied for ${company}`);
    setSelectedPlacement(null);
  };

  return (
    <>
      {user.role === "student" || user.role === "HOD" || user.role === "teacher"? (
        <main>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Placement Drives
          </h2>
          {placements.length ? (
            <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
              <table className="w-full text-left">
                <TableHeader
                  AdditionalRowClasses="rounded-t-xl text-left"
                  AdditionalHeaderClasses="last:text-center"
                  Headers={[
                    "Company",
                    "Department",
                    "Package (LPA)",
                    "Deadline",
                    "Eligibility Criteria",
                    ...(user.role === "student" ? ["Actions"] : [])
                  ]}
                  
                />
                <tbody>
                  {placements.map((placement, index) => (
                    <tr key={index}>
                      <td className="border-t px-4 py-2">{placement.company}</td>
                      <td className="border-t px-4 py-2">{placement.department}</td>
                      <td className="border-t px-4 py-2">{placement.package}</td>
                      <td className="border-t px-4 py-2">
                        {new Date(placement.deadline).toLocaleDateString()}
                      </td>
                      <td className="border-t px-4 py-2 whitespace-pre-wrap">
                        {placement.eligibilityCriteria}
                      </td>
                      {user.role === "student" && (
                        <td className="border-t px-4 py-2 text-center">
                          <button
                            className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-violet-900"
                            onClick={() => setSelectedPlacement(placement)}
                          >
                            Details
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Loading />
          )}
          {error ? <ErrorStrip error={error} /> : ""}
          
          {selectedPlacement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h3 className="mb-4 text-2xl font-semibold text-violet-900 dark:text-white">
                  {selectedPlacement.company}
                </h3>
                <p className="mb-2"><strong>Package:</strong> {selectedPlacement.package} LPA</p>
                <p className="mb-2">
                  <strong>Deadline:</strong>{" "}
                  {new Date(selectedPlacement.deadline).toLocaleDateString()}
                </p>
                <p className="mb-4 whitespace-pre-wrap">
                  <strong>Job Description:</strong> {selectedPlacement.jobDescription || "N/A"}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl duration-200 text-red-400 hover:text-white hover:bg-violet-900"
                    onClick={() => setSelectedPlacement(null)}
                  >
                    Close
                  </button>
                  <button
                    className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl duration-200 text-violet-400 hover:text-white hover:bg-violet-900"
                    onClick={() => handleApply(selectedPlacement.company)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default Placement;
