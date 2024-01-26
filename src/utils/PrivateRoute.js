import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { userExist } = useContext(AuthContext);

  return (
    <Route {...rest}>{!userExist ? <Redirect to="/auth" /> : children}</Route>
  );
};

export default PrivateRoute;
