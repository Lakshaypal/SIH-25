import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

// A reusable dropdown component for the navigation items
const DropdownMenu = ({ label, children }) => {
  return (
    <div className="group relative">
      <button className="flex items-center font-semibold text-text-secondary hover:text-primary transition-colors">
        {label}
        <FiChevronDown className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      {/* Dropdown Panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top
                      invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-200 ease-out z-50">
        <div className="bg-surface rounded-md shadow-lg border border-border p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main Public Header Component
const PublicHeader = () => {
  const dropdownLinkClass = "block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background hover:text-primary rounded-md";

  return (
    <header className="bg-surface/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            BlueCarbon
          </Link>
          
          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu label="Programs">
              <a href="#" className={dropdownLinkClass}>Verified Carbon Standard</a>
              <a href="#" className={dropdownLinkClass}>Plastic Waste Reduction</a>
              <a href="#" className={dropdownLinkClass}>Sustainable Development</a>
            </DropdownMenu>
            
            <DropdownMenu label="Projects">
              <a href="#" className={dropdownLinkClass}>Project Registry</a>
              <a href="#" className={dropdownLinkClass}>Find a Project</a>
              <a href="#" className={dropdownLinkClass}>Submit a Project</a>
            </DropdownMenu>

            <DropdownMenu label="Resources">
              <a href="#" className={dropdownLinkClass}>Methodology Directory</a>
              <a href="#" className={dropdownLinkClass}>Verification & Validation</a>
              <a href="#" className={dropdownLinkClass}>Document Library</a>
            </DropdownMenu>

             <DropdownMenu label="About">
              <a href="#" className={dropdownLinkClass}>Our Mission</a>
              <a href="#" className={dropdownLinkClass}>Our Team</a>
              <a href="#" className={dropdownLinkClass}>Careers</a>
            </DropdownMenu>
          </div>
          
          {/* Action Button */}
          <div>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-all duration-300"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;