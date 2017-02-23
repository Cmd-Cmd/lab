import React, {Component} from 'react';
import {Button, Modal, ModalTrigger,
        Form, Input, Icon} from 'amazeui-react';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.modal = (
      <Modal title='登录' closeViaDimmer>
        <Form>
          <Input addonBefore={<Icon icon='user'></Icon>}
                 placeholder='用户名'
                 amStyle='primary'></Input>
          <Input addonBefore={<Icon icon='lock'></Icon>}
                 placeholder='密码'
                 type='password'
                 amStyle='primary'></Input>
          <Button amStyle='success' block>登录</Button>
          <Button amStyle='link'>找回密码</Button>
        </Form>
      </Modal>
    );
  }

  render() {
    return (
      <ModalTrigger modal={this.modal}>
        <Button amStyle='success' className='btn-response'>登录</Button>
      </ModalTrigger>
    );
  }
}

export default LoginButton;
