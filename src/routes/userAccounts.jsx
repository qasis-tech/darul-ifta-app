import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import RouterList from "../routes/routerList";

const UserAccountRouting = (props) => {
  if (props.userLoginDetails?.user_type === "User") {
    return (
      <div>
        {props.children}
        <Outlet />
      </div>
    );
  } else return <Navigate to={`${RouterList.user.login}`} />;
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(UserAccountRouting);
