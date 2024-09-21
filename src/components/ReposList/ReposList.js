import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ReposList.css";

const ReposList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRepo, setActiveRepo] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/orgs/godaddy/repos`
        );
        setRepos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRepos();
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories: {error.message}</p>;

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link
              to={`/repo/${repo.name}`}
              className={activeRepo === repo.name ? "active" : ""}
              onClick={() => setActiveRepo(repo.name)}>
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReposList;
