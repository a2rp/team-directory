import { FiArrowUpRight } from "react-icons/fi";
import styles from "./styles.module.css";

const TeamList = ({ teams, onSelect }) => {
    return (
        <section
            className={styles.section}
            id="teams"
            aria-labelledby="teams-title"
        >
            <div className={styles.heading}>
                <div>
                    <p className={styles.label}>Teams</p>
                    <h2 className={styles.title} id="teams-title">
                        Different craft. Shared care.
                    </h2>
                </div>
                <p className={styles.intro}>
                    Small groups, clear focus, plenty of room to work together.
                </p>
            </div>
            <div className={styles.list}>
                {teams.map((team) => (
                    <button
                        className={styles.team}
                        data-color={team.color}
                        key={team.name}
                        type="button"
                        onClick={() => onSelect(team.name)}
                    >
                        <span className={styles.top}>
                            <span className={styles.number}>{team.count}</span>
                            <FiArrowUpRight aria-hidden="true" />
                        </span>
                        <span className={styles.name}>{team.name}</span>
                        <span className={styles.description}>
                            {team.description}
                        </span>
                        <span className={styles.action}>Meet the team</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default TeamList;
