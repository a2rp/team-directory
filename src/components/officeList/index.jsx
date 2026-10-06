import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import styles from "./styles.module.css";

const OfficeList = ({ offices, onSelect }) => {
  return (
    <section className={styles.section} id="offices" aria-labelledby="offices-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.label}>Where we work</p>
          <h2 className={styles.title} id="offices-title">Four corners, one table.</h2>
        </div>
        <p className={styles.intro}>
          Find teammates in the places we call home.
        </p>
      </div>
      <div className={styles.list}>
        {offices.map((office) => (
          <button
            className={styles.office}
            data-color={office.color}
            key={office.name}
            type="button"
            onClick={() => onSelect(office.name)}
          >
            <span className={styles.top}>
              <FiMapPin aria-hidden="true" />
              <FiArrowUpRight aria-hidden="true" />
            </span>
            <span className={styles.name}>{office.name}</span>
            <span className={styles.region}>{office.region}</span>
            <span className={styles.count}>{office.count} teammates</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default OfficeList;
