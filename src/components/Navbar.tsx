'use client';

import { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";

const navMenu = [
  { item: 'Home', link:'/' },
  { item: 'Gifts', link:'/#gifts' },
]
export default function Navbar() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="fixed top-10 inset-x-0 max-w-2xl mx-auto z-50">
      <Menu setActive={setActive}>
        {navMenu.map((menu) => (
          <MenuItem key={menu.item} setActive={setActive} item={menu} active={active} />
        ))}
      </Menu>
    </section>
  )
}