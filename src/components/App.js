import React, {Component} from 'react';
import {GoTop} from 'amazeui-react';

import Header from '../containers/header';
import Footer from './footer';

class App extends Component {
  componentDidMount() {
    document.getElementById('loading')
            .setAttribute('class', 'am-animation-fade am-animation-reverse');
    setTimeout(function() {
      document.getElementById('loading').parentNode.removeChild(
        document.getElementById('loading')
      );
    }, 1000);
  }

  render() {
    let height = parseInt(document.documentElement.clientHeight, 10) - 255;
    if (parseInt(document.documentElement.clientHeight, 10) <= 640) {
      height += 90;
    }
    return (
      <div>
        <Header></Header>
        <div style={{minHeight: height + 'px'}} id='appMain'>
          {this.props.children}
        </div>
        <Footer></Footer>
        <GoTop theme='fixed' autoHide></GoTop>
      </div>
    );
  }
}

export default App;
