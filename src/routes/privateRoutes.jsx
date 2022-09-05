import { Outlet, Navigate } from "react-router-dom";

import DashboardPage from "../pages/admin/dashsboard";
import RouterList from "../routes/routerList";

export default function PrivateRouting({ isAdmin }) {
  if (isAdmin) {
    return (
      <DashboardPage>
        <Outlet />
      </DashboardPage>
    );
  } else return <Navigate to={`${RouterList.user.login}`} />;
}
