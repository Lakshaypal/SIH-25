import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiCircle, FiCompass, FiRepeat, FiChevronsLeft, FiBook, FiCode, FiGithub, FiMessageSquare } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const commonLinkClasses = "flex items-center py-3 px-4 rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-primary text-white";
  const inactiveLinkClasses = "text-text-secondary hover:bg-background";

  const getLinkClass = ({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const topLinks = [
    { path: "/dashboard", icon: <FiGrid />, label: "Overview" },
    { path: "/carbon-pools", icon: <FiCircle />, label: "Carbon Pools" },
    { path: "/explorer", icon: <FiCompass />, label: "Explorer" },
    { path: "/cross-chain", icon: <FiRepeat />, label: "Cross-Chain" },
    { path: "/retirements", icon: <FiRepeat style={{ transform: 'scaleX(-1)' }}/>, label: "Retirements" },
  ];

  const bottomLinks = [
    { path: "/docs", icon: <FiBook />, label: "Docs" },
    { path: "/contracts", icon: <FiCode />, label: "Contracts" },
    { path: "/github", icon: <FiGithub />, label: "Github" },
    { path: "/discord", icon: <FiMessageSquare />, label: "Discord" },
  ];

  return (
    <aside className={`bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-border h-16">
        {isOpen && <span className="text-xl font-bold text-primary">BlueCarbon</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-background">
          <FiChevronsLeft className={`transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {topLinks.map(link => (
          <NavLink to={link.path} key={link.label} className={getLinkClass} title={link.label}>
            <span className="text-xl">{link.icon}</span>
            {isOpen && <span className="ml-4 font-medium">{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
         {bottomLinks.map(link => (
          <NavLink to={link.path} key={link.label} className={getLinkClass} title={link.label}>
            <span className="text-xl">{link.icon}</span>
            {isOpen && <span className="ml-4 font-medium">{link.label}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;