import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "@/constants";

import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

import { cn } from "@/utils/cn";

import PropTypes from "prop-types";

// Sidebar component with forwardRef to control sidebar behavior externally
export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                // Common styles for sidebar container
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                // If collapsed, adjust width and alignment
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                // Handle responsiveness for small screens
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            {/* Logo and branding section */}
            <div className="flex gap-x-3 p-3">
                {/* Light mode logo */}
                <img
                    src={logoLight}
                    alt="Logoipsum"
                    className="dark:hidden"
                />
                {/* Dark mode logo */}
                <img
                    src={logoDark}
                    alt="Logoipsum"
                    className="hidden dark:block"
                />
                {/* Show logo text only when sidebar is expanded */}
                {!collapsed && (
                    <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">
                        SaaS Product Dashboard
                    </p>
                )}
            </div>

            {/* Sidebar navigation links */}
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        {/* Section title (e.g., Dashboard, Management) */}
                        <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>
                            {navbarLink.title}
                        </p>

                        {/* Each link under the section */}
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                            >
                                {/* Icon for the nav item */}
                                <link.icon
                                    size={22}
                                    className="flex-shrink-0"
                                />
                                {/* Label text only if sidebar is expanded */}
                                {!collapsed && (
                                    <p className="whitespace-nowrap">
                                        {link.label}
                                    </p>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

// Set component name for debugging
Sidebar.displayName = "Sidebar";

// Define expected props
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
