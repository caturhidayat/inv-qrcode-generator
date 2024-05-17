import Image from "next/image";
import Link from "next/link";
import React from "react";

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
              />
              <p className="mt-1.5 text-md text-gray-500">
                Invoice TMMIN QR Generator
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              {NavbarItems.map((item) => (
                <Link href={item.href}>
                  <button className="btn rounded-none bg-blue-800 text-white btn-block btn-sm sm:btn-sm">
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
