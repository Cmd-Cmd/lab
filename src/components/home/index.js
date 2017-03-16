import React, {Component} from 'react';
import {Divider, Grid, Col} from 'amazeui-react';

import Carousel from '../../containers/home/Carousel';
import ListViews from '../../containers/home/ListViews';
import Searches from '../../containers/home/Searches';

class Home extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <Divider />
        <Grid fixed>
          <Col md={8} sm={12}>
            <ListViews />
          </Col>
          <Col md={4} sm={12}>
            <Searches />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default Home;
