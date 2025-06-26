import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Initial context state with default theme and a dummy setter
const initialState = {
    theme: "system",
    setTheme: () => null,
};

// Create a Theme Context
export const ThemeProviderContext = createContext(initialState);

// ThemeProvider component to manage and provide theme across the app
export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}) {
    // Initialize theme from localStorage or use default
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

    // Update the HTML root class whenever the theme changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove any existing theme classes
        root.classList.remove("light", "dark");

        if (theme === "system") {
            // Detect system theme (light/dark)
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme); // Apply system preference
            return;
        }

        root.classList.add(theme); // Apply selected theme
    }, [theme]);

    // Value provided to context consumers
    const value = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme); // Store theme in localStorage
            setTheme(theme); // Update state
        },
    };

    // Provide theme context to all child components
    return (
        <ThemeProviderContext.Provider
            {...props}
            value={value}
        >
            {children}
        </ThemeProviderContext.Provider>
    );
}

// Define expected prop types
ThemeProvider.propTypes = {
    children: PropTypes.node,
    defaultTheme: PropTypes.string,
    storageKey: PropTypes.string,
};
