import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const NavbarItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Decrypt",
    href: "/decrypt",
  },
];

export default function Navbar() {
  return (
    <div>
      <header className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <Image
                className="sm: mx-auto"
                src={"/yusen_logo.png"}
                width={"120"}
                height={"40"}
                alt="yusen_logo"
              />
              <p className="mt-1.5 text-md text-gray-500">
                Invoice TMMIN QR Generator
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              {NavbarItems.map((item, i) => (
                <Link key={i} href={item.href}>
                  <Button variant="link">{item.label}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
