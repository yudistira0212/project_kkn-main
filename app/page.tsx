"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import panitia from "./images/gaul.jpg";
import Rectangle3 from "./images/Rectangle 3.png";
import Rectangle6 from "./images/Rectangle 6.png";

const navigation = [
  { name: "Beranda", href: "" },
  { name: "Berita Desa", href: "baru" },
  { name: "Data Desa", href: "#" },
  { name: "Pemerintahan Desa", href: "#" },
  { name: "Lembaga Desa", href: "#" },
  { name: "Profil Desa", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-end p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" color="white" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div>
        <div className=" relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-[50px] -z-10 transform-gpu overflow-hidden"
            aria-hidden="true"
          >
            <div>
              <Image
                src={panitia}
                className="object-cover h-[700px] lg:h-auto w-full"
                alt=""
              />
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: "0.5" }}
              />
            </div>
          </div>
          <div className="max-w-2xl mt-[300px] sm:mt-[250px] lg:mt-56 xl:mt-[250px] 2xl:mt-[300px] relative z-10">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Kampung Siwi
              </h1>
              <p className="mt-6 text-lg leading-8 text-white line-clamp-3 sm:line-clamp-none">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus
                quam maecenas volutpat ipsum praesent praesent facilisis.
                Molestie ligula convallis enim quam.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[320px] px-6 pt-14 lg:px-8">
          <h1 className="underlined-text">
            <strong>POTENSI KAMPUNG</strong>
          </h1>

          <div className="flex justify-between">
            <div className="py-6">
              <p>
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus
                quam maecenas volutpat ipsum praesent praesent facilisis.
                Molestie ligula convallis enim quam.
              </p>
              <Image src={Rectangle6} alt="" className="py-6" />
            </div>
            <div className="flex-col">
              <Image src={Rectangle3} alt="" />
              <p className="py-6 ">
                Lorem ipsum dolor sit amet consectetur. Nunc eu venenatis massa
                ipsum. Diam habitant a ultrices neque suscipit eget at. Lectus
                quam maecenas volutpat ipsum praesent praesent facilisis.
                Molestie ligula convallis enim quam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
