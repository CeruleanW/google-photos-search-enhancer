import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Photos from './Photos/Photos';
import SearchBar from './SearchBar';
import TitleComponent from './TitleComponent';
import GoogleBtn from './GoogleBtn';
import * as GapiConnection from './GapiConnection';

export default class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  componentDidMount() {
    // load gapi
    // googleAPI.loadApi();
    // instantiate the network request
    // show the loading modal
    // When connection is successful
    // - set state to isConnected
    // get all the meta data from Google Photos
    // display some recent photos(indicate success)
  }

  render() {
    return (
      <div>
        <CssBaseline />

        <TitleComponent />
        <GoogleBtn />
        <SearchBar />
        <Photos />
      </div>
    )
  }
}
