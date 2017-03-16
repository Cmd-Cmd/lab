import React, {Component} from 'react';
import {Container, Icon} from 'amazeui-react';

class NotFound extends Component {
  render() {
    return (
      <Container className='am-text-center'>
        <h2 className='am-text-xxxl am-margin-top-lg'>404. Not Found</h2>
        <p>没有找到你要的页面</p>
        <img alt='404' src={process.env.PUBLIC_URL + '/img/NotFound.gif'} style={{maxWidth: '100%'}}></img>
        <p>
          <Icon icon='exclamation-triangle' style={{color: 'yellow'}} amSize='lg'></Icon>
          ■■■■■■■■■■ 建设中 ■■■■■■■■■■
          <Icon icon='exclamation-triangle' style={{color: 'yellow'}} amSize='lg'></Icon>
         </p>
      </Container>
    );
  }
}

export default NotFound;
