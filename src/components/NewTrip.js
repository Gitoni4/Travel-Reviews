import React, { useRef, useState, useCallback }from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import SvgIcon from '@material-ui/core/Icon';
import {ReactComponent as NewTripSvg} from "../illustrations/newTrip.svg";
import Box from '@material-ui/core/Box';
import MyGoogleMap from "./MyGoogleMap.js"
import { withScriptjs } from "react-google-maps";




function preventDefault(event) {
    event.preventDefault();
  }

  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
    titleStyle: {
      textAlign: 'center'
  },
    illustrationSize:{
      width: 200,
      height: 200,
      justify: 'center',
      alignItems: 'center'
    },
    formSpacing:{
      paddingTop: 20,
      paddingBottom: 50
    }
  });

  

export default function Search () {

  const classes = useStyles();

  const MapLoader = withScriptjs(MyGoogleMap);

  return (
    <Container maxwidth="xs">
    <h1 className={classes.titleStyle}>New trip</h1>
    <Box textAlign="center">
    <SvgIcon component={NewTripSvg} className={classes.illustrationSize} />
    </Box>
      <Typography component = 'h1' style={{paddingBottom: "20px"}}>
              Select the city you want to visit
      </Typography>

      <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmTFtKqcgCcEhQCG7_WM8ikF2AQUiBOeg&libraries=places"
      loadingElement={<div style={{ height: `100%` }} />}
    />
    
    </Container>
  );
};
  