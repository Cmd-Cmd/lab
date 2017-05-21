import React, {Component} from 'react';
import {Button, Modal, ModalTrigger, Image,
        Grid, Col, Input, Icon} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import {imgNumRefresh} from '../../action';
import {login} from '../../action/fetch';

const CAPTCHA = 'http://bxw2359770225.my3w.com/CheckImage.aspx';

class LoginButton extends Component {
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
    const renderModal = (
      <Modal id='loginModal' title='登录' closeViaDimmer>
        <form id='loginForm' onSubmit={(e) => {
          e.preventDefault();
          let form = {};
          $($('#loginForm').serializeArray()).each((inx, ele) => {
            form[ele.name] = ele.value;
          });
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
              <Image src={`${CAPTCHA}?a=${this.props.imgNum}`}
                     style={{width: '100%', height: '37px', cursor: 'pointer'}}
                     onClick={() => this.props.imgNumRefresh()} responsive />
            </Col>
            <Col sm={6} md={8}>
              <Input placeholder='验证码' type='text' amStyle='secondary'
                     name='str' />
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

    return (
      <span>
        <ModalTrigger modal={renderModal}>
          <Button amStyle='success' className='btn-response'
                  onClick={() => this.props.imgNumRefresh()}>
            登录
          </Button>
        </ModalTrigger>
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  imgNum: state.login.imgNum
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: payload => dispatch(login(payload)),
    imgNumRefresh: () => dispatch(imgNumRefresh())
  };
};

LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButton);

export default LoginButton;
