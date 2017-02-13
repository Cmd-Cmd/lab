import React, {Component} from 'react';
import {Container} from 'amazeui-react';
import img from './NotFound.gif';

class NotFound extends Component {
  render() {
    let height = parseInt(document.documentElement.clientHeight, 10);
    return (
      <Container className='am-text-center'
                 style={{minHeight: height - 255 + 'px'}}>
        <h2 className='am-text-xxxl am-margin-top-lg'>404. Not Found</h2>
        <p>没有找到你要的页面</p>
        <img alt='404' src={img} style={{maxWidth: '100%'}}></img>
      </Container>
    );
  }
}

export default NotFound;
