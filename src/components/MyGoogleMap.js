import React, { Component, useCallback } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import JsxParser from 'react-jsx-parser'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

let restaurants = []
let shopping = []
let tourist_attractions = []

function fetchGoogleAPI(param) {
  // param is a highlighted word from the user before it clicked the button
  const town = '' + (param).split(',')[0]
  const country = '' + ((param).split(',')[1]).split(' ')[1]
  console.log(param)
  console.log(town)
  console.log(country)
  const query = town + '+' + country
  console.log(query)
  fetch(`/getLocations?query=${query}&type=restaurant&key=AIzaSyBmTFtKqcgCcEhQCG7_WM8ikF2AQUiBOeg`, {
    method: 'GET'
  }).then(res => res.json()).then(json => {
    restaurants = Array.from(json)
    console.log(restaurants)
  })

  fetch(`/getLocations?query=${query}&type=shopping_mall&key=AIzaSyBmTFtKqcgCcEhQCG7_WM8ikF2AQUiBOeg`, {
    method: 'GET'
  }).then(res => res.json()).then(json => shopping = Array.from(json))

  fetch(`/getLocations?query=${query}&type=tourist_attraction&key=AIzaSyBmTFtKqcgCcEhQCG7_WM8ikF2AQUiBOeg`, {
    method: 'GET'
  }).then(res => res.json()).then(json => tourist_attractions = Array.from(json))
}

function setDynamicPlaces(placesList) {
  console.log("hello")
  let htmlD = ``
  placesList.forEach(element => {
    htmlD += `
    <Card style={{marginBottom:"20px"}}>
    <CardContent>
      <Typography variant='h4'>${element['name']}</Typography>
      <Typography variant='h5'>${element['types']} - ${element['rating']}</Typography>
      <Typography style={{paddingBottom: "5px"}}>formatted_address</Typography>
      <Typography>summarized review</Typography>
      <Button>Read more about it</Button> {/*URL in buton*/}
    </CardContent>
    </Card>`    
  });
}

class MyGoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      coords: { lat: 40.756795, lng: -73.954298 },
      address: '',
      place: '',
      btnClick: false
    };
  }
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          coords: latLng,
          place: address
        })
      )
      .catch(error => console.error('Error', error));
  };

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };  

  toogleButtonState = () => {
    fetchGoogleAPI(this.state.place)
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={this.state.coords} defaultZoom={13}>
        <Marker
          key={this.props.index}
          position={this.state.coords}
          onClick={() => this.handleToggleOpen()}
        >
          {this.state.isOpen && (
            <InfoWindow
              onCloseClick={this.props.handleCloseCall}
              options={{ maxWidth: 100 }}
            >
              <span>This is InfoWindow message!</span>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    ));    

    return (
      <Container>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        { this.state.place && 
        <Grid container direction="row" alignItems="center" style={{paddingTop: "20px"}}>
        <Typography>Do you want to see reviews from &nbsp;</Typography>
        <Typography color="primary">{this.state.place}</Typography>
        <Typography>?</Typography>
        <Button onClick={this.toogleButtonState} variant="contained" color="primary" style={{marginLeft: "20px"}}>Yes, i want</Button>
        </Grid>
        }
        { this.state.btnClick && 
          <Typography>Do you want to see reviews from &nbsp;</Typography>
        }
        { restaurants && 
        <Container maxWidth='xs'>           
          <JsxParser components={{Card, CardContent, Typography}} jsx={setDynamicPlaces(restaurants)}></JsxParser>       
        </Container>
        }
        { shopping &&
        <Container maxWidth='xs'>
          <JsxParser components={{Card, CardContent, Typography}} jsx={setDynamicPlaces(shopping)}></JsxParser>       
        </Container>
        }
        { tourist_attractions &&
        <Container maxWidth='xs'>
          <JsxParser components={{Card, CardContent, Typography}} jsx={setDynamicPlaces(tourist_attractions)}></JsxParser>       
        </Container>
        }
      </Container>
      
    );
  }
}


export default MyGoogleMap;