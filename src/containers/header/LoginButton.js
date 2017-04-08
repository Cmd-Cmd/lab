import React, {Component} from 'react';
import {Button, Modal, ModalTrigger,
        Grid, Col, Input, Icon} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import {login} from '../../action/fetch';

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.modal = (
      <Modal id='loginModal' title='登录' closeViaDimmer>
        <form id='loginForm' onSubmit={(e) => {
          e.preventDefault();
          let form = {};
          $($('#loginForm').serializeArray()).each((inx, ele) => {
            form[ele.name] = ele.value;
          });
          // TODO: 验证验证码
          delete form.captcha;
          if (form.id.length + form.pw.length === 0) {
            return;
          }
          this.props.login(form);
        }}>
          <Grid>
            <Col sm={12} id='loginAlert'></Col>
            <Col sm={12}>
              <Input addonBefore={<Icon icon='user' />}
                     placeholder='学号/工号' type='text' amStyle='primary'
                     name='id' required />
            </Col>
            <Col sm={12}>
              <Input addonBefore={<Icon icon='lock' />}
                     placeholder='密码' type='password' amStyle='warning'
                     name='pw' required />
            </Col>
            <Col sm={6} md={4}>
              验证码
            </Col>
            <Col sm={6} md={8}>
              <Input placeholder='验证码' type='text' amStyle='secondary'
                     name='captcha' />
            </Col>
            <Col sm={12}>
              <Button amStyle='success' block type='submit'>登录</Button>
              <Button amStyle='link' onClick={() => {
                $('#loginModal .am-close').click();
                hashHistory.push('/reset');
              }}>找回密码</Button>
            </Col>
          </Grid>
        </form>
      </Modal>
    );
  }

  validate() {
    var length = this.state.value.length;

    if (length < 10 && length > 4) {
      return 'success';
    } else {
      return 'error';
    }
  }

  handleChange() {
    this.setState({
      value: this.refs.field.getValue()
    });
  }

  render() {
    return (
      <span>
        <ModalTrigger modal={this.modal}>
          <Button amStyle='success' className='btn-response'>登录</Button>
        </ModalTrigger>
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: payload => dispatch(login(payload))
  };
};

LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButton);

export default LoginButton;
