import React, { useState, useEffect } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("India");
  const [results, setResults] = useState([]);
  const [tracked, setTracked] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("trackedJobs")) || [];
    setTracked(savedJobs);
  }, []);
  const searchJobs = async () => {
    if (!keyword) {
      alert("Please enter a job title to search.");
      return;
    }
    setLoading(true);
    try {
      const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        keyword + " in " + location
      )}&page=1&num_pages=1`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "4c4272e957msh43a3c2f3c0a539cp1d7703jsnaca16317c9f0", // Replace with your API key
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        alert("No jobs found. Try a different keyword or location.");
        setResults([]);
      } else {
        setResults(data.data.slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };
  const trackJob = (job) => {
    const newTracked = [
      ...tracked,
      {
        title: job.job_title,
        company: job.employer_name,
        url: job.job_apply_link,
      },
    ];
    setTracked(newTracked);
    localStorage.setItem("trackedJobs", JSON.stringify(newTracked));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 Job Tracker</h1>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Job title (e.g., React Developer)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchJobs();
          }}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Location (e.g., India, Remote, USA)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchJobs();
          }}
          style={styles.input}
        />
        <button onClick={searchJobs} style={styles.button}>
          Search
        </button>
      </div>

      <section>
        <h2>🎯 Top Results</h2>
        {loading && <p>⏳ Loading jobs...</p>}
        {!loading && results.length === 0 && (
          <p>Start your search above to see results.</p>
        )}

        <div style={styles.grid}>
          {results.map((job, index) => (
            <div key={index} style={styles.card}>
              <h3>{job.job_title}</h3>
              <p style={styles.company}>@ {job.employer_name}</p>
              <p>📍 {job.job_country}</p>
              <div style={styles.actions}>
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  Apply
                </a>
                <button onClick={() => trackJob(job)} style={styles.button}>
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>📌 Tracked Jobs</h2>
        {tracked.length === 0 && <p>No jobs tracked yet.</p>}
        <div style={styles.grid}>
          {tracked.map((job, index) => (
            <div key={index} style={{ ...styles.card, backgroundColor: "#ffeaa7" }}>
              <h3>{job.title}</h3>
              <p style={styles.company}>@ {job.company}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                🔗 View
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
  },
  title: {
    textAlign: "center",
  },
  searchBar: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    width: "40%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minWidth: "200px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  company: {
    color: "#555",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  link: {
    color: "#0984e3",
    textDecoration: "none",
  },
};

export default App;
