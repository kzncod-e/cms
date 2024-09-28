import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="navbar  fixed z-50 g-base-200">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            home
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>list</summary>
                <ul className="bg-base-100 rounded-t-none w-fit ">
                  <li className="w-80">
                    <Link to="/add">add new blog</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="flex">
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
