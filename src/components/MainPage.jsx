import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import Photos from './Photos';
import SearchBar from './SearchBar';
import TitleComponent from './TitleComponent';
import Signin from './Signin';
import * as googleAPI from './gapi';


export default class MainPage extends Component {
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
        <Signin />
        <SearchBar />
        <Photos />
      </div>
    );
  }
}
