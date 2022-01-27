import {
  faSearch,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { userObjectVar } from "../../apollo/loginStatus";
function Header() {
  const user = userObjectVar();
  return (
    <div className="sticky top-0 left-0 bg-slate-100 h-14 grid place-items-center px-4 z-40">
      <div className="flex justify-between items-center w-full font-semibold">
        <Link className="cursor-pointer" to={"/"}>
          <h1 className="text-xl">Logo</h1>
        </Link>
        <div className="flex justify-between items-center space-x-3">
          <button className="flex space-x-2 items-center bg-green-500 px-2 py-1 h-10 rounded font-semibold text-white">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            <h1>Search</h1>
          </button>
          <Link to={"/order"}>
            <div className="flex bg-slate-200 shadow py-1 px-2 h-10 items-center rounded cursor-pointer text-green-500 text-xl">
              <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
            </div>
          </Link>
          {user && (
            <div className="flex space-x-1 bg-slate-200 shadow py-1 px-2 h-10 items-center rounded cursor-pointer">
              <div className="rounded-full w-7 h-7 grid place-items-center overflow-hidden">
                {user.avatarImage && (
                  <img
                    src={user.avatarImage.imageUrl}
                    alt="ava"
                    className="w-full h-full object-cover object-center"
                  ></img>
                )}
                {!user.avatarImage && (
                  <FontAwesomeIcon
                    className="text-green-500 text-xl"
                    icon={faUser}
                  ></FontAwesomeIcon>
                )}
              </div>
              <h2>
                {user.name
                  .split(" ")
                  .map((e) => e[0].toUpperCase() + e.slice(1))}
              </h2>
            </div>
          )}
          {!user && (
            <Link to={"/login"}>
              <button className="bg-green-500 px-3 py-2 rounded font-semibold">
                LogIn/SignUp
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
