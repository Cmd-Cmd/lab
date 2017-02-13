import React, {Component} from 'react';
import {Container} from 'amazeui-react';
import {IndexLink} from 'react-router';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer id='footer'>
        <p className='am-text-center'>
          <IndexLink to='/' className='am-margin-horizontal'>关于我们</IndexLink>
          <IndexLink to='/' className='am-margin-horizontal'>联系我们</IndexLink>
          <IndexLink to='/' className='am-margin-horizontal'>意见反馈</IndexLink>
        </p>
        <Container className='am-text-center'>
          &copy;中山大学珠海校区化学实验信息管理平台
        </Container>
      </footer>
    );
  }
}

export default Footer;
