import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  makeStyles,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Chart from 'chart.js';
import { css } from '@emotion/react';
import { createGlobalStyle } from '@emotion/material/styles';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E0E0E0;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const theme = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff4081',
    },
  },
};

function App() {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('input URL')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div>
      <GlobalStyle />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Option Chain
          </Typography>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Dashboard />
          </Grid>
          <Grid item xs={6}>
            <CallsVsPutsOI data={data} />
          </Grid>
          <Grid item xs={6}>
            <OIDataTable data={data} />
          </Grid>
          <Grid item xs={12}>
            <PCRGraph data={data} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

function Dashboard() {
  return (
    <Typography variant="body1">
      This is the Dashboard page. Navigate to other pages using the navigation
      bar above.
    </Typography>
  );
}

function CallsVsPutsOI({ data }) {
  return (
    <div>
      {data ? (
        <Chart
          type="bar"
          data={{
            labels: data.labels,
            datasets: [
              {
                label: 'Calls OI',
                data: data.callsOI,
                backgroundColor: theme.palette.primary.main,
              },
              {
                label: 'Puts OI',
                data: data.putsOI,
                backgroundColor: theme.palette.secondary.main,
              },
            ],
          }}
        />
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
}
