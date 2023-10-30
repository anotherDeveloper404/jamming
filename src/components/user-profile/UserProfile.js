import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserProfile = (props) => {
    console.log(props.user);
    const onSignIn = () => {
        props.onSignIn();
    };

    const renderImage = () => {
        if(props.user.hasOwnProperty('id') && props.user.images.length > 0) {
            return (
                <img
                    className="h-8 w-8 rounded-full"
                    src={props.user.images[0].url}
                    alt={props.user.name}
                />
            );
        } else {
            return (
                <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>
            );
        }
    };

    const renderActions = () => {
        if(props.user.hasOwnProperty('id')) {
            return (
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            {renderImage()}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            )
        } else {
            return (
                <button
                onClick={onSignIn}
                    className="text-base font-medium text-white hover:text-gray-300"
                >
                    Sign in
                </button>
            )
        }
    }

    return (
        <div className="ml-3 relative">
            {renderActions()}
        </div>
    )
};

export default UserProfile;
