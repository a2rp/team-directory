import { useEffect, useRef } from "react";
import { FiMail, FiMapPin, FiUsers, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const ProfileDialog = ({ person, onClose }) => {
    const closeButton = useRef(null);
    const dialog = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        closeButton.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key === "Tab") {
                const focusable = dialog.current?.querySelectorAll(
                    "button:not([disabled]), a[href]",
                );
                const first = focusable?.[0];
                const last = focusable?.[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus();
        };
    }, [onClose]);

    const initials = person.name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("");

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-name"
                aria-describedby="profile-about"
                ref={dialog}
            >
                <button
                    className={styles.close}
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile"
                    ref={closeButton}
                >
                    <FiX aria-hidden="true" />
                </button>
                <div className={styles.photo}>
                    {person.photo ? (
                        <img src={person.photo} alt="" />
                    ) : (
                        <span data-color={person.color}>{initials}</span>
                    )}
                </div>
                <div className={styles.content}>
                    <p className={styles.team}>{person.team}</p>
                    <h2 className={styles.name} id="profile-name">
                        {person.name}
                    </h2>
                    <p className={styles.role}>{person.role}</p>
                    <p className={styles.about} id="profile-about">
                        {person.about}
                    </p>
                    <div className={styles.details}>
                        <p>
                            <FiMapPin aria-hidden="true" />
                            <span>{person.office} office</span>
                        </p>
                        <p>
                            <FiUsers aria-hidden="true" />
                            <span>{person.team} team</span>
                        </p>
                    </div>
                    <a className={styles.email} href={`mailto:${person.email}`}>
                        <FiMail aria-hidden="true" />
                        <span>Email {person.name.split(" ")[0]}</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ProfileDialog;
