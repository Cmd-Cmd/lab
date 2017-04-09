import React, {Component} from 'react';
import {Container} from 'amazeui-react';

import data from './data';

import './NotFound.css';

class NotFound extends Component {
  render() {
    const inx = parseInt(Math.random() * 118, 10);
    return (
      <Container className='am-text-center' id='NotFound'>
        <h2 className='am-text-xxxl am-margin-top-lg'>404. Not Found</h2>
        <p>没有找到你要的页面</p>
            <div className='element' style={{
              backgroundColor: data[inx].color
            }}>
              <div className='index'>{data[inx].index}</div>
              <div className='symbol'>{data[inx].symbol}</div>
              <div className='name'>{data[inx].name}</div>
            </div>
            <div className='link'>
              <a href={data[inx].href} target='_blank'>{data[inx].href}</a>
            </div>
      </Container>
    );
  }
}

export default NotFound;
