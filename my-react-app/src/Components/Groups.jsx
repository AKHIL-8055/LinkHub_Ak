import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Groups.module.css";  // Import the CSS module

const Groups = () => {
  const [groups, setGroups] = useState([]); // Holds paginated group data
  const [batch, setBatch] = useState(""); // Batch filter
  const [query, setQuery] = useState(""); // Search query
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const params = new URLSearchParams();
        if (batch) params.append("batch", batch);
        if (query) params.append("query", query);
        params.append("page", page);
        params.append("size", 20); // 20 items per page

        const response = await fetch(`http://ec2-3-108-64-248.ap-south-1.compute.amazonaws.com:8080/groups?${params.toString()}`, {
          method: "GET",
          credentials: "include", // If authentication is needed
        });

        const data = await response.json();
        setGroups(data.content); // Extracting content array
        setTotalPages(data.page.totalPages); // Extract total pages
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [batch, query, page]); // Refetch when batch, query, or page changes

  const handleContactUs = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=helplinkhub@gmail.com", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/_linkhub_vitap?igsh=Z2xxeGUyaGF1NWIy", "_blank");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
  <h2>LinkHub.</h2>

  {/* Filters Section */}
  <div className={styles.filterContainer}>
    <label>Filter by Batch:</label>
    <select 
      value={batch} 
      onChange={(e) => setBatch(e.target.value)} 
      className={styles.fullWidth}
    >
      <option value="">All</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
    </select>
  </div>

  {/* Search Input */}
  <div className={styles.searchContainer}>
    <label>Search:</label>
    <input 
      type="text" 
      placeholder="Search" 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
      className={styles.fullWidth}
    />
  </div>

  {/* Navigation Buttons */}
  <button onClick={() => navigate("/addgroup")}>Add Group</button>
  <button onClick={() => navigate("/mygroups")}>My Groups</button>
  <button onClick={() => navigate("/about")}>About Us</button>
  <button onClick={handleContactUs}>Mail</button>
  <button onClick={handleInstagram}>Instagram</button>
  <button onClick={() => navigate("/logout")}>Logout</button>
</div>


      {/* Main Content - Scrollable Groups Section */}
      <div className={styles.mainContent}>
        {groups.length > 0 ? (
          <div className={styles.groupsContainer}>
            {groups.map(({ id, ...group }) => (
              <div className={styles.groupBox} key={id}>
                <p><strong>Batch:</strong> {group.batchNumber}</p>
                <p><strong>Semester:</strong> {group.semester}</p>
                <p><strong>Course:</strong> {group.courseName}</p>
                <p><strong>Professor:</strong> {group.professorName}</p>
                <p><strong>Slot:</strong> {group.slot}</p>
                <a
                  href={group.groupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.joinBtn}
                >
                  Join Group
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noGroups}>No groups found.</p>
        )}

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <span> Page {page + 1} of {totalPages} </span>
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Groups;
