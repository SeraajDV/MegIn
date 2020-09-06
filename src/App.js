import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './hooks/useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './components/Job';
import logo from './assets/megin.png';
import JobsPagination from "./components/JobsPagination";
import SearchForm from './components/SearchForm';
import Lottie from 'react-lottie';
import loader from './lotties/loading.json';
import errorIcon from './lotties/error.json';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1)

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: errorIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Container className="my-4">
      <div className="d-flex align-items-center mb-4">
        <h1 style={{color: '#3F48CC', fontWeight: '700', fontSize: 35}}>Meg</h1>
        <img src={logo} height="30" alt="MegIn"/>
      </div>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && 
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Lottie 
            options={defaultOptions1}
            height={200}
            width={200}
          />
        </div>
      }
      {error && 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Lottie 
            options={defaultOptions2}
            height={200}
            width={200}
          />
      </div>
      }
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
