import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const JoinPlacement = () => {
  const { user, setPlacementList } = useContext(UserContext);
  const [error, setError] = useState("");
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const getAllPlacements = async () => {
      try {
        const response = await axios.get("placement/manage/" + user._id);
        setPlacements(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getAllPlacements();

    const updatePlacements = async () => {
      const response = await axios.get(`placement/student/${user._id}`);
      setPlacementList(response.data);
    };

    return () => updatePlacements();
  }, [user, setPlacementList]);

  const handleJoin = async (e) => {
    const placementId = e.currentTarget.id;
    const index = e.target.name;
    const students = placements[index].students;
    students.push(user._id);
    updateStudents(placementId, students, index);
  };

  const handleLeave = async (e) => {
    const placementId = e.currentTarget.id;
    const index = e.target.name;
    const students = placements[index].students;
    const updatedStudents = students.filter((student) => student !== user._id);
    updateStudents(placementId, updatedStudents, index);
  };

  const updateStudents = async (placementId, studentsObj, placementIndex) => {
    setError("");
    try {
      const response = await axios.patch("/placement/" + placementId, {
        students: studentsObj,
        id: placementId,
      });
      toast.success(response.data.message);
      const updated = placements.map((placement, index) => {
        if (index === parseInt(placementIndex)) {
          placement.joined = !placement.joined;
          return placement;
        } else return placement;
      });
      setPlacements(updated);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {user.role === "student" ? (
        <main>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Manage Placement
          </h2>
          <form>
            {placements.length ? (
              <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                <table className="w-full text-left">
                  <TableHeader
                    AdditionalRowClasses={"rounded-t-xl text-left"}
                    AdditionalHeaderClasses={"last:text-center"}
                    Headers={[
                      "Placement",
                      "Department",
                      "Year",
                      "Semester",
                      "Teacher",
                      "Manage",
                    ]}
                  />
                  <tbody>
                    {placements?.map((placement, index) => (
                      <tr key={index}>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                          {placement.paper}
                        </td>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                          {placement.department}
                        </td>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                          {placement.year}
                        </td>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                          {placement.semester}
                        </td>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 px-4 py-2">
                          {placement.teacher.name}
                        </td>
                        <td className="border-t-[1px] border-violet-400 dark:border-slate-400 p-0">
                          {!placement.joined ? (
                            <button
                              type="button"
                              id={placement._id}
                              name={index}
                              onClick={handleJoin}
                              className="m-0 flex h-auto w-full justify-center bg-transparent py-3 text-lg hover:bg-violet-900 hover:text-slate-100 dark:text-slate-100"
                            >
                              Join
                            </button>
                          ) : (
                            <button
                              type="button"
                              id={placement._id}
                              name={index}
                              onClick={handleLeave}
                              className="m-0 flex h-auto w-full justify-center bg-transparent py-3 text-lg hover:bg-red-600 hover:text-slate-100 dark:text-slate-100"
                            >
                              Leave
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Loading />
            )}
          </form>
          {error && <ErrorStrip error={error} />}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default JoinPlacement;
