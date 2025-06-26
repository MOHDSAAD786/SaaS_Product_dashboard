// Footer component displayed at the bottom of the page
export const Footer = () => {
    return (
        <footer className="flex flex-wrap items-center justify-between gap-4 pt-4">
            {/* Copyright text */}
            <p className="text-base font-medium text-slate-900 dark:text-slate-50">
                © 2025 XD Code All Rights Reserved
            </p>

            {/* Footer links like Privacy Policy and Terms */}
            <div className="flex flex-wrap gap-x-2">
                <a
                    href="#"
                    className="link"
                >
                    Privacy Policy
                </a>
                <a
                    href="#"
                    className="link"
                >
                    Terms of Service
                </a>
            </div>
        </footer>
    );
};
