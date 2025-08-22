"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, Link } from "@root/modules/shared/react/libs/navigation";

export default function SearchNavbar() {
  const pathname = usePathname();

  const activeClass =
    "inline-flex items-center border-b-2 border-red-400 px-1 pt-1 text-sm font-medium text-gray-900";
  const inactiveClass =
    "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const isActive = (href: string) => pathname === href;

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <Link
                href={`/`}
                className={isActive(`/`) ? activeClass : inactiveClass}
              >
                Dofus
              </Link>
              <Link
                href={`/lol`}
                className={isActive(`/lol`) ? activeClass : inactiveClass}
              >
                League of legends
              </Link>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <DisclosureButton
            as={Link}
            href={`/`}
            className="block border-l-4 border-red-400 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
          >
            Dofus
          </DisclosureButton>
          <DisclosureButton
            as={Link}
            href={`/lol`}
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            League of legends
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
