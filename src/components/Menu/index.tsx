import Link from "next/link";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logoAranda from '@/assets/aranda-logo.png';
import { useRouter } from "next/router";

function classNames(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MenuAranda() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
    
        router.push('/login');
    };

    console.log(session);

    return(
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                <Link href="/" className="flex items-center">
                    <Image src={logoAranda} className="w-10 h-8" alt="Aranda Logo" />
                </Link>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {session?.user?.name}
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                    )}
                                    onClick={handleLogout}
                                >
                                    Sair
                                </button>
                                )}
                            </Menu.Item>
                        </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </nav>
    );
}