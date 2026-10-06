import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import styles from "./styles.module.css";

const base = import.meta.env.BASE_URL;

const links = [
    { label: "Portfolio", href: "https://www.ashishranjan.net" },
    { label: "GitHub", href: "https://github.com/a2rp" },
    { label: "CodePen", href: "https://codepen.io/ash1198" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan" },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/" },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com" },
];

const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/" },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/ashishranjan" },
    { label: "Patreon", href: "https://www.patreon.com/ashishranjan" },
];

const SiteFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.credit}>
                    <a
                        className={styles.logo}
                        href="https://www.ashishranjan.net"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={base + "logo.png"} alt="Ashish Ranjan" />
                    </a>
                    <p>
                        &copy; {new Date().getFullYear()}{" "}
                        <a
                            href="https://github.com/a2rp"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ashish Ranjan
                        </a>
                        . All rights reserved.
                    </p>
                    <a
                        className={styles.source}
                        href="https://github.com/a2rp/team-directory"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub aria-hidden="true" />
                        <span>Source code</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>
                <nav className={styles.links} aria-label="Footer links">
                    <div className={styles.group}>
                        <h2>Links</h2>
                        {links.map((link) => (
                            <a
                                href={link.href}
                                key={link.label}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className={styles.group}>
                        <h2>Support</h2>
                        {supportLinks.map((link) => (
                            <a
                                href={link.href}
                                key={link.label}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default SiteFooter;
