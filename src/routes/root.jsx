import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        {/* other elements */}
        <Outlet />
        <nav>
          <ul>
            <li>
              <Link to={`login`}>Login</Link>
            </li>
            <li>
              <Link to={`register`}>Register</Link>
            </li>
            {/* <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li> */}
          </ul>
        </nav>

        {/* other elements */}
      </div>
    </>
  );
}