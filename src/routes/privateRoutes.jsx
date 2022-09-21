import { Outlet, Navigate } from "react-router-dom";

import DashboardPage from "../pages/admin/dashsboard/mainContainer";
import RouterList from "../routes/routerList";

export default function PrivateRouting({ isAdmin }) {
  if (true) {
    return (
      <DashboardPage>
        <Outlet />
      </DashboardPage>
    );
  } else return <Navigate to={`${RouterList.user.login}`} />;
}
