import React, {Component} from 'react';
import {GoTop} from 'amazeui-react';

import Header from '../containers/header';
import Footer from './footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
          {this.props.children}
        <Footer></Footer>
        <GoTop theme='fixed' autoHide></GoTop>
      </div>
    );
  }
}

export default App;
