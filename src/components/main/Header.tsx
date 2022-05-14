import { useReactiveVar } from "@apollo/client";
import { faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartVar } from "../../apollo/reactiveVar/cart";
import { logout, userObjectVar } from "../../apollo/reactiveVar/loginStatus";
import Cart from "../Customer/CartComponent/Cart";
interface OptionList {
  optionName: string;
  clickHandler: () => void;
}

const UserButton: FC = () => {
  const navigate = useNavigate();
  const [userOptionOpen, setUserOptionOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        userOptionOpen &&
        divRef.current &&
        !divRef.current.contains(e.target as Node)
      ) {
        setUserOptionOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [userOptionOpen]);
  const user = useReactiveVar(userObjectVar);
  if (!user)
    return (
      <Link to={"/login"}>
        <button className="bg-green-500 px-3 py-2 rounded font-semibold">
          LogIn/SignUp
        </button>
      </Link>
    );
  const optionList: OptionList[] = [
    {
      optionName: "Order History",
      clickHandler() {
        navigate("/orders-history");
      },
    },
    {
      optionName: "Log out",
      clickHandler() {
        logout();
      },
    },
  ];
  return (
    <div
      ref={divRef}
      onClick={() => {
        setUserOptionOpen((pre) => !pre);
      }}
      className="flex bg-slate-200 shadow py-1 px-[0.6rem] h-10 items-center rounded cursor-pointer relative"
    >
      {userOptionOpen && (
        <div className="absolute top-[110%] right-0 min-w-full w-max bg-slate-200 flex flex-col space-y-1 rounded p-1">
          {optionList.map(({ clickHandler, optionName }, i) => (
            <div
              onClick={clickHandler}
              key={i}
              className="bg-white rounded w-full py-2 px-2 text-center text-sm border border-transparent hover:border-green-600 hover:text-green-700 shadow"
            >
              {optionName}
            </div>
          ))}
        </div>
      )}
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
      <h2 className="ml-2">
        {user.name.split(" ").map((e) => e[0].toUpperCase() + e.slice(1))}
      </h2>
    </div>
  );
};

function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useReactiveVar(cartVar);
  const numOfItems = cart?.cartItems
    .map((item) => item.quantity)
    .reduce((acc, cur) => acc + cur, 0);
  return (
    <Fragment>
      <Cart open={cartOpen} setOpen={setCartOpen} />
      <div className="sticky w-full top-0 left-0 bg-slate-100 h-14 grid place-items-center px-4 z-10">
        <div className="flex justify-between items-center w-full font-semibold">
          <Link className="cursor-pointer" to={"/"}>
            <h1 className="text-xl">Logo</h1>
          </Link>
          <div className="flex justify-between items-center space-x-3">
            <div
              onClick={() => setCartOpen((pre) => !pre)}
              className="flex bg-slate-200 shadow py-1 px-2 h-10 items-center rounded cursor-pointer text-green-500 text-xl relative"
            >
              <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
              {numOfItems && (
                <span className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 text-xs font-semibold w-5 h-5 grid place-items-center bg-green-500 rounded-full text-white">
                  {numOfItems}
                </span>
              )}
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
