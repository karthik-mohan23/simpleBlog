import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="py-4 shadow-xl">
        <nav className="flex w-[90%] container mx-auto justify-between ">
          <Link className="nav-link hover:text-indigo-600" to="/">
            Home
          </Link>
          <div className="space-x-12">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </nav>
      </header>

      <main className="">
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
