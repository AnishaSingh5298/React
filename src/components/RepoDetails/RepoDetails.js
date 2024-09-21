import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RepoDetails.css";

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/godaddy/${repoName}`
        );
        setRepo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [repoName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repository: {error.message}</p>;

  return (
    <div>
      {repo && (
        <>
          <h2>{repo.name}</h2>
          <p>
            <strong>Description:</strong>{" "}
            {repo.description || "No description available"}
          </p>
          <p>
            <strong>Link:</strong>{" "}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.html_url}
            </a>
          </p>
          <p>
            <strong>Language:</strong> {repo.language}
          </p>
          <p>
            <strong>Forks:</strong> {repo.forks_count}
          </p>
          <p>
            <strong>Open Issues:</strong> {repo.open_issues_count}
          </p>
          <p>
            <strong>Watchers:</strong> {repo.watchers_count}
          </p>
        </>
      )}
    </div>
  );
};

export default RepoDetails;
