import { useTheme } from "@/hooks/use-theme"; // Custom hook to manage theme (light/dark)

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react"; // Icons from Lucide

import profileImg from "@/assets/profile-image.jpg"; // User profile image

import PropTypes from "prop-types";

// Header component with sidebar toggle, search, theme toggle, notifications, and profile image
export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme(); // Access theme state and setter

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            {/* Left Section: Sidebar toggle + Search */}
            <div className="flex items-center gap-x-3">
                {/* Sidebar toggle button */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {/* Rotate icon if sidebar is collapsed */}
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>

                {/* Search input */}
                <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>

            {/* Right Section: Theme toggle + Notification + Profile */}
            <div className="flex items-center gap-x-3">
                {/* Theme toggle button */}
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {/* Show sun icon in light mode */}
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    {/* Show moon icon in dark mode */}
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>

                {/* Notification bell icon */}
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                {/* Profile image button */}
                <button className="size-10 overflow-hidden rounded-full">
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="size-full object-cover"
                    />
                </button>
            </div>
        </header>
    );
};

// Define expected prop types
Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
