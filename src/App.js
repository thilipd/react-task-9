import './App.css';
import { Card, Button } from '@mui/material';
import { useState } from 'react';
import Header from './Header';
import Home from './Home';


function App() {

  const [toggle, SetToggle] = useState(true);


  const dashboardToggele = (val) => {
    SetToggle(val);
  }



  return (
    <>
      <div className='container'>

        <Header dashboardToggele={dashboardToggele} />
        {(toggle) ? <>
          <Dashboard dashboardToggele={dashboardToggele} />
        </> :
          <>
            <Home />
          </>}

      </div >

    </>
  );
}

export default App;



function Dashboard(props) {

  const handleClick = () => {

    props.dashboardToggele(false)

  }

  return (
    <>

      <div className="dashboard">


        <Card sx={{ minWidth: 275, height: 200 }}
          className='card'>

          <div>

            <h1>Library Dashboard</h1>

          </div>
          <div className='btn'>
            <Button size="small"
              color='secondary'
              variant="contained"

              onClick={(e) => handleClick(e)}>Library  Dashboard</Button>

          </div>
        </Card>

      </div>
    </>

  )
}

