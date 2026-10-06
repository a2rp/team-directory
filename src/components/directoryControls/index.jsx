import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const DirectoryControls = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  office,
  onOfficeChange,
  activeLetter,
  onLetterChange,
  departments,
  offices,
  visibleCount,
  totalCount,
  hasFilters,
  onClear,
}) => {
  const letters = [...new Set(departments.flatMap((team) => team.members))]
    .map((person) => person.name.charAt(0).toUpperCase())
    .sort();

  return (
    <section className={styles.section} id="people" aria-labelledby="people-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.label}>The people index</p>
          <h2 className={styles.title} id="people-title">Find your people.</h2>
        </div>
        <p className={styles.summary}>
          {visibleCount} of {totalCount} teammates
        </p>
      </div>
      <div className={styles.filters}>
        <label className={styles.search}>
          <FiSearch aria-hidden="true" />
          <span className={styles.screenReader}>Search by name or role</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search people, roles, or teams"
          />
        </label>
        <label className={styles.selectLabel}>
          <span>Team</span>
          <span className={styles.selectWrap}>
            <select value={department} onChange={(event) => onDepartmentChange(event.target.value)}>
              <option value="all">All teams</option>
              {departments.map((team) => (
                <option key={team.name} value={team.name}>{team.name}</option>
              ))}
            </select>
            <FiChevronDown aria-hidden="true" />
          </span>
        </label>
        <label className={styles.selectLabel}>
          <span>Office</span>
          <span className={styles.selectWrap}>
            <select value={office} onChange={(event) => onOfficeChange(event.target.value)}>
              <option value="all">All offices</option>
              {offices.map((place) => (
                <option key={place.name} value={place.name}>{place.name}</option>
              ))}
            </select>
            <FiChevronDown aria-hidden="true" />
          </span>
        </label>
        {hasFilters && (
          <button className={styles.clear} type="button" onClick={onClear}>
            <FiX aria-hidden="true" />
            <span>Clear filters</span>
          </button>
        )}
      </div>
      <div className={styles.alphabet}>
        <span className={styles.browse}>Browse by first name</span>
        <div className={styles.letters} aria-label="Filter by first initial">
          <button
            className={!activeLetter ? styles.active : ""}
            type="button"
            aria-pressed={!activeLetter}
            onClick={() => onLetterChange("")}
          >
            All
          </button>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              className={activeLetter === letter ? styles.active : ""}
              key={letter}
              type="button"
              disabled={!letters.includes(letter)}
              aria-pressed={activeLetter === letter}
              aria-label={`Names starting with ${letter}`}
              onClick={() => onLetterChange(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectoryControls;
