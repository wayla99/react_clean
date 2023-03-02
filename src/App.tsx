import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "@/components/root-layout/main";
import StaffPage from "@/pages/staff/main";
import Create, { createAction } from "@/pages/blog/create/main";
import Profile from "@/pages/blog/profile/main";
import BlogPage, { tasksLoader } from "@/pages/blog/main";
import StaffCreate from "@/pages/staff/create/main";
import EditStaff from "@/pages/staff/edit/main";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<BlogPage />} loader={tasksLoader} />
      {/*<Route path="create" element={<Main />} action={createAction} />*/}
      <Route path="staff" element={<StaffPage />} />
      <Route path="createStaff" element={<StaffCreate />} />
      <Route path="editStaff/:id" element={<EditStaff />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

type Props = {};
export default function App({}: Props) {
  return <RouterProvider router={router} />;
}
