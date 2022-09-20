import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import { currentUser } from "../../features/user/userSlice";

export default function PrivateRoute({
  path,
  component: Component,
  render,
  ...rest
}) {
  const user = useSelector(currentUser);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
