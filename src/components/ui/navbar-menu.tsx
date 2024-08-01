"use client";

import React from "react";
import Link from "next/link";


interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export const Menu = ({ setActive, children }: MenuProps) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-[#98fb98] dark:bg-black dark:border-white/[0.2] bg-white shadow-xl flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

interface Item {
  item: string
  link: string
}

interface MenuItemProps {
  setActive: (item: string) => void;
  item: Item
  active: string | null
}

export const MenuItem = ({ setActive, item, active }: MenuItemProps) => {
  return (
    <div onMouseEnter={() => setActive(item.item)} className="relative ">
      <Link 
        href={`${item.link}`}
        className={`cursor-pointer text-black hover:opacity-[0.9] dark:text-white ${active === item.item ? 'font-bold text-green-500' : ''}`}
        prefetch={false}
      >
        {item.item}
      </Link>
    </div>
  );
};