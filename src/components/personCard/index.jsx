import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import styles from "./styles.module.css";

const PersonCard = ({ person, onSelect }) => {
  const initials = person.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");

  return (
    <button
      className={styles.card}
      type="button"
      onClick={onSelect}
      aria-label={`View ${person.name} profile`}
    >
      <span className={styles.photo}>
        {person.photo ? (
          <img src={person.photo} alt="" loading="lazy" />
        ) : (
          <span className={styles.initials} data-color={person.color}>
            {initials}
          </span>
        )}
      </span>
      <span className={styles.info}>
        <span className={styles.team}>{person.team}</span>
        <span className={styles.name}>{person.name}</span>
        <span className={styles.role}>{person.role}</span>
        <span className={styles.location}>
          <FiMapPin aria-hidden="true" />
          {person.office}
        </span>
      </span>
      <FiArrowUpRight className={styles.arrow} aria-hidden="true" />
    </button>
  );
};

export default PersonCard;
