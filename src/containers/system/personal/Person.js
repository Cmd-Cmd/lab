import React, {Component} from 'react';
import {Input, Grid, Col, Button} from 'amazeui-react';
import $ from 'jquery';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    };
  }

  changeInfo(e) {
    e.preventDefault();
    if (this.state.change) {
      console.log($('#personForm').serializeArray());
    }
    this.setState((prevState, props) => ({
      change: !prevState.change
    }));
  }

  render() {
    return (
      <div>
        <div className='systemTitle'>
          个人信息
        </div>
        <hr></hr>
        <form id='personForm'>
          <Grid>
            <Col sm={12} md={8}>
              <Grid>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    邮件
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input defaultValue='123456789@qq.com' name='email'
                         disabled={(this.state.change) ? false : true} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    长号
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input defaultValue='13467985213' name='phoneLong'
                         disabled={(this.state.change) ? false : true} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    短号
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input defaultValue='467913' name='phoneShort'
                         disabled={(this.state.change) ? false : true} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    地址
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input defaultValue='XXXXXXXXXXXXXX' name='address'
                         disabled={(this.state.change) ? false : true} />
                </Col>
                <Col sm={12}>
                  <Button amStyle='success' block
                          onClick={(e) => this.changeInfo(e)}>
                    {(this.state.change) ? '确认修改' : '修改信息'}
                  </Button>
                </Col>
              </Grid>
            </Col>
            <Col sm={12} md={4}>
              <Grid>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    姓名
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input defaultValue='Cmd' disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    学号
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input defaultValue='11111111' disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    上次登录
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input defaultValue='2017-2-28 13:15:20' disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    创建时间
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input defaultValue='1900-1-1 0:00:00' disabled></Input>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Person;
