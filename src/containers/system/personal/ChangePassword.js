import React, {Component} from 'react';
import {Form, Input, Grid, Col, Button} from 'amazeui-react';
import $ from 'jquery';

class ChangePassword extends Component {
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
          修改密码
        </div>
        <hr></hr>
        <Form id='changePasswordForm'>
          <Grid>
            <Col sm={12} md={3}>
              <div className='input-name'>
                输入原始密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='oriPW' />
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                输入新密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='newPW' placeholder='(默认未更改)' />
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                再次输入新密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='againPW' placeholder='(默认未更改)' />
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                密码找回问题
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='question' placeholder='(默认未更改)' />
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                问题答案
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='answer' placeholder='(默认未更改)' />
            </Col>
            <Col sm={12}>
              <Button amStyle='success' block>确认更改</Button>
            </Col>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default ChangePassword;
