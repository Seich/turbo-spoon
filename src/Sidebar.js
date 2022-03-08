import { NavLink } from "react-router-dom";
import css from "./Sidebar.module.scss";

export function Sidebar() {
  return (
    <nav>
      <ul>
        <li className={css.link}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/give-consent"
          >
            Give consent
          </NavLink>
        </li>

        <li className={css.link}>
          <NavLink
            className={({ isActive }) => (isActive ? css.active : "")}
            to="/consents"
          >
            Collected consents
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
