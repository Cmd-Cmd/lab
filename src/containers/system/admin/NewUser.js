import React, {Component} from 'react';
import {Form, Input, Grid, Col, Button, Icon} from 'amazeui-react';
import $ from 'jquery';

class NewUser extends Component {
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
          创建新用户
        </div>
        <hr></hr>
        <Form id='newUserForm'>
          <Grid>
            <Col sm={12} md={2}>
              <div className='input-name'>
                姓名&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='name' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                学号/工号&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='id' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                密码&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='password' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                邮件
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='email' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                密码找回问题
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='question' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                问题答案
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='answer' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                长号
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='phoneLong' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                短号
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='phoneShort' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                联系地址
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input name='address' />
            </Col>
            <Col sm={12}>
              <small>
                <Icon icon='asterisk' className='am-text-danger'/>
                &nbsp;为必填项
              </small>
              <Button amStyle='success' block>确认更改</Button>
            </Col>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default NewUser;
