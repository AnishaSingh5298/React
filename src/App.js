import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReposList from './components/ReposList/ReposList';
import RepoDetails from './components/RepoDetails/RepoDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ReposList />} />
          <Route path="/repo/:repoName" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
