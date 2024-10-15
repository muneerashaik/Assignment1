import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import { ModalContext } from "../store/ModalContext";
import { INITIAL_ROUTE, TRANSACTION_ROUTE, LOCAL_ADMIN } from "../Constants";
import { fetchUserProfile } from "../http";

export default function Sidebar() {
  const context = useContext(ModalContext);
  const location = useLocation();
  const { data } = useQuery({
    queryKey: ["Profile"],
    queryFn: fetchUserProfile,
  });

  let email = "";
  let name = "";
  if (data) {
    email = data.email;
    name = data.name;
  }
  const path = location.pathname;
  const isAdmin = localStorage.getItem(LOCAL_ADMIN);
  let content = <div className="active_indicator_transaction">i</div>;

  if (path === INITIAL_ROUTE) {
    content = <div className="active_indicator_dashboard">i</div>;
  }

  return (
    <aside className="sidebar">
      {content}
      <div>
        <img src="Logo.png" className="ml-5" />
        <ul>
          <NavLink
            to={INITIAL_ROUTE}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="font-bold flex items-center">
              <IoHome className="mr-2 ml-6" />
              Dashboard
            </li>
          </NavLink>
          <NavLink
            to={TRANSACTION_ROUTE}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li className="font-bold flex items-center">
              <GrTransaction className="mr-2 ml-6" />
              {isAdmin ? "All Transaction" : "Transaction"}
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="flex gap-2 items-start px-2 mt-auto">
        <FaCircleUser className="text-2xl text-blue-600 ml-6" />

        <div className="flex flex-col flex-grow text-xs">
          <p className="font-medium" style={{ color: "rgba(80, 88, 135, 1)" }}>
            {name}
          </p>
          <p
            className="font-medium"
            style={{ color: "rgba(113, 142, 191, 1)" }}
          >
            {email}
          </p>
        </div>

        <IoIosLogOut
          onClick={() => context.handelOpenModal("isLogout")}
          color="rgba(113, 142, 191, 1)"
          className="text-lg mr-12 "
        />
      </div>
      ;
    </aside>
  );
}
