import { useCallback, useMemo, useState } from "react";
import { FiArrowRight, FiGlobe, FiUsers } from "react-icons/fi";
import SiteHeader from "./components/siteHeader/index.jsx";
import DirectoryControls from "./components/directoryControls/index.jsx";
import PersonCard from "./components/personCard/index.jsx";
import ProfileDialog from "./components/profileDialog/index.jsx";
import TeamList from "./components/teamList/index.jsx";
import OfficeList from "./components/officeList/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import { teamMembers } from "./data/teamMembers.js";
import styles from "./App.module.css";

const teamDetails = [
    {
        name: "Product",
        description: "Choose the right problems and shape what comes next.",
        color: "yellow",
    },
    {
        name: "Design",
        description: "Make clear, useful paths through complex ideas.",
        color: "blue",
    },
    {
        name: "Engineering",
        description: "Build dependable tools and thoughtful systems.",
        color: "yellow",
    },
    {
        name: "Customer",
        description: "Listen closely and carry feedback into the work.",
        color: "blue",
    },
    {
        name: "People",
        description: "Make room for good work and healthy teams.",
        color: "yellow",
    },
    {
        name: "Operations",
        description: "Keep the details moving so everyone can focus.",
        color: "blue",
    },
];

const officeDetails = [
    { name: "New York", region: "North America", color: "yellow" },
    { name: "London", region: "United Kingdom", color: "blue" },
    { name: "Toronto", region: "Canada", color: "yellow" },
    { name: "Singapore", region: "Asia Pacific", color: "blue" },
];

const App = () => {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [office, setOffice] = useState("all");
    const [activeLetter, setActiveLetter] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);

    const departments = teamDetails.map((team) => ({
        ...team,
        count: teamMembers.filter((person) => person.team === team.name).length,
    }));

    const offices = officeDetails.map((place) => ({
        ...place,
        count: teamMembers.filter((person) => person.office === place.name)
            .length,
    }));

    const peopleBeforeLetter = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return teamMembers.filter((person) => {
            const matchesText = [
                person.name,
                person.role,
                person.team,
                person.office,
            ]
                .join(" ")
                .toLowerCase()
                .includes(searchText);
            const matchesTeam =
                department === "all" || person.team === department;
            const matchesOffice = office === "all" || person.office === office;

            return matchesText && matchesTeam && matchesOffice;
        });
    }, [search, department, office]);

    const visiblePeople = activeLetter
        ? peopleBeforeLetter.filter(
              (person) => person.name.charAt(0).toUpperCase() === activeLetter,
          )
        : peopleBeforeLetter;

    const handleClear = () => {
        setSearch("");
        setDepartment("all");
        setOffice("all");
        setActiveLetter("");
    };

    const handleTeamSelect = (teamName) => {
        setSearch("");
        setDepartment(teamName);
        setOffice("all");
        setActiveLetter("");
        document
            .getElementById("people")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleOfficeSelect = (officeName) => {
        setSearch("");
        setDepartment("all");
        setOffice(officeName);
        setActiveLetter("");
        document
            .getElementById("people")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleProfileClose = useCallback(() => {
        setSelectedPerson(null);
    }, []);

    const hasFilters = Boolean(
        search.trim() ||
        department !== "all" ||
        office !== "all" ||
        activeLetter,
    );

    return (
        <div className={styles.app} id="top">
            <SiteHeader />
            <main className={styles.main}>
                <section className={styles.hero} aria-labelledby="hero-title">
                    <div className={styles.copy}>
                        <p className={styles.label}>
                            One team, across four places
                        </p>
                        <h1 className={styles.title} id="hero-title">
                            Good work starts with <em>good people.</em>
                        </h1>
                        <p className={styles.intro}>
                            Meet the people behind the work. Find a teammate,
                            learn what they do, and say hello.
                        </p>
                        <a className={styles.action} href="#people">
                            <span>Meet the team</span>
                            <FiArrowRight aria-hidden="true" />
                        </a>
                        <div className={styles.facts}>
                            <span>
                                <strong>{teamMembers.length}</strong> people
                            </span>
                            <span>
                                <strong>{departments.length}</strong> teams
                            </span>
                            <span>
                                <strong>{offices.length}</strong> offices
                            </span>
                        </div>
                    </div>
                    <div
                        className={styles.artwork}
                        role="img"
                        aria-label="A team of twelve people across four offices"
                    >
                        <div className={styles.artTop}>
                            <span>COMMON GROUND</span>
                            <FiGlobe aria-hidden="true" />
                        </div>
                        <div className={styles.artMain}>
                            <span className={styles.number}>
                                {teamMembers.length}
                            </span>
                            <span className={styles.artText}>
                                people
                                <br />
                                on the same
                                <br />
                                side of the work
                            </span>
                        </div>
                        <span className={styles.artMark} aria-hidden="true">
                            <FiUsers />
                        </span>
                        <div className={styles.places}>
                            {offices.map((place) => (
                                <span key={place.name}>
                                    <span
                                        className={styles.dot}
                                        aria-hidden="true"
                                    />
                                    {place.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <DirectoryControls
                    search={search}
                    onSearchChange={setSearch}
                    department={department}
                    onDepartmentChange={setDepartment}
                    office={office}
                    onOfficeChange={setOffice}
                    activeLetter={activeLetter}
                    onLetterChange={setActiveLetter}
                    departments={departments}
                    offices={offices}
                    peopleForLetters={peopleBeforeLetter}
                    visibleCount={visiblePeople.length}
                    totalCount={teamMembers.length}
                    hasFilters={hasFilters}
                    onClear={handleClear}
                />

                {visiblePeople.length > 0 ? (
                    <section
                        className={styles.people}
                        aria-label="Team directory results"
                    >
                        {visiblePeople.map((person) => (
                            <PersonCard
                                key={person.id}
                                person={person}
                                onSelect={() => setSelectedPerson(person)}
                            />
                        ))}
                    </section>
                ) : (
                    <div className={styles.empty}>
                        <span className={styles.emptyIcon}>
                            <FiUsers aria-hidden="true" />
                        </span>
                        <h2>No teammates found</h2>
                        <p>
                            Try a different name, team, office, or first
                            initial.
                        </p>
                        <button type="button" onClick={handleClear}>
                            Clear filters
                        </button>
                    </div>
                )}

                <TeamList teams={departments} onSelect={handleTeamSelect} />
                <OfficeList offices={offices} onSelect={handleOfficeSelect} />
            </main>
            <SiteFooter />
            <BackToTop />
            {selectedPerson && (
                <ProfileDialog
                    person={selectedPerson}
                    onClose={handleProfileClose}
                />
            )}
        </div>
    );
};

export default App;
