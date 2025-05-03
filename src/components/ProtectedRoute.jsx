import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  //  Step 1: Get user from localStorage
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = userString ? JSON.parse(userString) : null;
    console.log(" ProtectedRoute: User =", user);
  } catch (error) {
    console.error(" Error parsing user JSON:", error);
    localStorage.removeItem("user");
  }

  //  Step 2: Get and validate token
  const token = localStorage.getItem("token"); //  use 'token', not 'jwtToken'
  let tokenValid = false;
  let tokenRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(" JWT Decoded:", decoded);

      // Token is valid if not expired
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        tokenValid = true;
        tokenRole =
          decoded.role || decoded.authorities || decoded.roles || null;
      } else {
        console.warn(" Token expired");
      }
    } catch (err) {
      console.error(" Invalid token:", err);
    }
  }

  //  If no user and no valid token => redirect to login
  if ((!user || (!user.name && !user.email)) && !tokenValid) {
    console.warn("🔁 Redirecting to login (no valid user/token)");
    return <Navigate to="/login" />;
  }

  // Role validation
  const effectiveRole = user?.role || tokenRole;

  if (roleRequired && effectiveRole !== roleRequired) {
    console.warn(
      ` Redirecting to home. Role "${effectiveRole}" ≠ required "${roleRequired}"`
    );
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
