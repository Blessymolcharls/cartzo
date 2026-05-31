import React from 'react';

const Footer = () => (
  <footer className="border-t border-gray-200 bg-white py-6">
    <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
      © {new Date().getFullYear()} Cartzo. Built with React and Tailwind CSS.
    </div>
  </footer>
);

export default Footer;
