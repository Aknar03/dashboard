import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users } from 'lucide-react';
import * as classes from './Sidebar.module.scss';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/ticketStats', icon: <LayoutDashboard size={18} /> },
    { name: 'Agents', path: '/ticketList', icon: <Users size={18} /> },
  ];

  return (
    <aside className={classes.container}>
      <div className={classes.logo}>Support Dashboard</div>
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${classes.link} ${isActive ? classes.active : ''}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
