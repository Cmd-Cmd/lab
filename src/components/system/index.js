import React, {Component} from 'react';
import {Grid, Sticky} from 'amazeui-react';

import Sidebar from './Sidebar';
import './System.css';

class System extends Component {
  render() {
    const width = parseInt(document.documentElement.clientWidth, 10);
    return (
      <Grid id='system'>
        {(width > 640) ? (
            <Sticky>
              <div id='System-menu'>
                <Sidebar></Sidebar>
              </div>
            </Sticky>
          ) : (
            <div id='System-menu'>
              <Sidebar></Sidebar>
            </div>
          )}
        <div id='System-content'>
          abdfdsf
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
          Cmd<br></br>
        </div>
      </Grid>
    );
  }
}

export default System;
