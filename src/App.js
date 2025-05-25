import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./Hooks/UserContext";

// components
import Loading from "./Components/Layouts/Loading";

// layouts
import AppLayout from "./Components/Layouts/AppLayout";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import AttendanceLayout from "./Components/Layouts/AttendanceLayout";
import InternalLayout from "./Components/Layouts/InternalLayout";
import RegisterLayout from "./Components/Layouts/RegisterLayout";

// queries
import Paper from "./Components/Queries/Paper";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import Profile from "./Components/Queries/Profile";
import Placement from "./Components/Queries/Placement"; // NEW

// forms
import StaffForm from "./Components/Forms/StaffForm";
import StudentForm from "./Components/Forms/StudentForm";
import NotesForm from "./Components/Forms/NotesForm";
import TimeScheduleForm from "./Components/Forms/TimeScheduleForm";
import Login from "./Components/Forms/Login";

// lazy loading user specific components
const StaffApproval = lazy(() => import("./Components/Queries/StaffApproval"));
const PaperForm = lazy(() => import("./Components/Forms/PaperForm"));
const JoinPaper = lazy(() => import("./Components/Forms/JoinPaper"));
const PlacementForm = lazy(() => import("./Components/Forms/PlacementForm")); // NEW
const JoinPlacement = lazy(() => import("./Components/Forms/JoinPlacement")); // NEW

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_staff" element={<StaffForm />} />
          <Route path="reg_student" element={<StudentForm />} />
        </Route>

        <Route path="/dash" element={<Layout />} errorElement={<ErrorElement />}>
          <Route index element={<Dash />} />

          {/* Paper Routes */}
          <Route path="paper" element={<Paper />} />
          <Route path="paper/:paper" element={<Notes />} />
          <Route path="paper/:paper/add" element={<NotesForm />} />
          <Route path="paper/:paper/:note/edit" element={<NotesForm />} />
          <Route path="paper/:paper/students" element={<StudentsList />} />
          <Route
            path="add_paper"
            element={
              <Suspense fallback={<Loading />}>
                <PaperForm />
              </Suspense>
            }
          />
          <Route
            path="join_paper"
            element={
              <Suspense fallback={<Loading />}>
                <JoinPaper />
              </Suspense>
            }
          />

          {/* Placement Routes */}
          <Route path="placement" element={<Placement />} />
          <Route path="placement/:placement" element={<Placement />} />
          <Route path="placement/:placement/add" element={<PlacementForm />} />
          <Route path="placement/:placement/:note/edit" element={<PlacementForm />} />
          <Route path="placement/:placement/students" element={<StudentsList />} />
          <Route
            path="add_placement"
            element={
              <Suspense fallback={<Loading />}>
                <PlacementForm />
              </Suspense>
            }
          />
          <Route
            path="join_placement"
            element={
              <Suspense fallback={<Loading />}>
                <JoinPlacement />
              </Suspense>
            }
          />

          {/* Common Routes */}
          <Route path="attendance" element={<AttendanceLayout />} />
          <Route path="internal" element={<InternalLayout />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="approve_staff"
            element={
              <Suspense fallback={<Loading />}>
                <StaffApproval />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        className="toast"
        toastClassName="toast-rounded"
        bodyClassName="toast-body"
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
