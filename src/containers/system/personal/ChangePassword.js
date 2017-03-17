import React, {Component} from 'react';
import {Form, Input, Grid, Col, Button, Icon} from 'amazeui-react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';

import {changePassword, changeQuestion} from '../../../action/fetch';
import {logout} from '../../../action';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPW: '',
      newPW: '',
      againPW: '',
      question: '',
      answer: '',
      hint: [
        {icon: 'close', style: 'danger', content: '请输入原密码'},
        {icon: 'check', style: 'success', content: '未更改密码'},
        {icon: 'check', style: 'success', content: '未更改问题'}
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logout) {
      this.props.logout();
      browserHistory.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.hint[0].icon !== '') {
      return;
    }
    let form = {};
    $($('#changePasswordForm').serializeArray()).each((inx, ele) => {
      form[ele.name] = ele.value;
    });
    if (this.state.hint[2].icon === '' && this.state.hint[1].icon !== 'close') {
      this.props.changeqa(form);
    }
    if (this.state.hint[1].icon === '' && this.state.hint[2].icon !== 'close') {
      this.props.changepw(form);
    }
  }

  getHint(temp) {
    let res = [];
    if (temp.oldPW.length === 0) {
      res.push({icon: 'close', style: 'danger', content: '请输入原密码'});
    } else {
      res.push({icon: '', style: '', content: ''});
    }
    if (temp.newPW.length === 0 && temp.againPW.length === 0) {
      res.push({icon: 'check', style: 'success', content: '未更改密码'});
    } else if (temp.againPW.length === 0) {
      res.push({icon: 'close', style: 'warning', content: '请重复新密码'});
    } else if (temp.newPW !== temp.againPW) {
      res.push({icon: 'close', style: 'warning', content: '两次输入不一致'});
    } else {
      res.push({icon: '', style: '', content: ''});
    }
    if (temp.question.length === 0 && temp.answer.length === 0) {
      res.push({icon: 'check', style: 'success', content: '未更改问题'});
    } else if (temp.answer.length === 0) {
      res.push({icon: 'close', style: 'warning', content: '请输入答案'});
    } else if (temp.question.length === 0) {
      res.push({icon: 'close', style: 'warning', content: '请输入问题'});
    } else {
      res.push({icon: '', style: '', content: ''});
    }
    return res;
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value.trim();
    this.setState((prevState, props) => {
      let temp = Object.assign({}, prevState);
      temp[name] = value;
      temp.hint = this.getHint(temp);
      return temp;
    });
  }

  render() {
    const {hint} = this.state;
    return (
      <div>
        <div className='systemTitle'>
          修改密码
        </div>
        <hr></hr>
        <Form id='changePasswordForm' onSubmit={(e) => this.handleSubmit(e)}>
          <Grid>
            <Col sm={12} md={3}>
              <div className='input-name'>
                输入原始密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='oldPW' value={this.state.oldPW} type='password'
                     onChange={(e) => this.handleChange(e)}/>
              <Icon icon={hint[0].icon} className={`am-text-${hint[0].style}`}>
                {hint[0].content}
              </Icon>
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                输入新密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='newPW' value={this.state.newPW} type='password'
                     onChange={(e) => this.handleChange(e)}/>
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                再次输入新密码
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='againPW' value={this.state.againPW} type='password'
                     onChange={(e) => this.handleChange(e)}/>
              <Icon icon={hint[1].icon} className={`am-text-${hint[1].style}`}>
                {hint[1].content}
              </Icon>
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                密码找回问题
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='question' value={this.state.question}
                     onChange={(e) => this.handleChange(e)}/>
            </Col>
            <Col sm={12} md={3}>
              <div className='input-name'>
                问题答案
              </div>
            </Col>
            <Col sm={12} md={9}>
              <Input name='answer' value={this.state.answer}
                     onChange={(e) => this.handleChange(e)}/>
              <Icon icon={hint[2].icon} className={`am-text-${hint[2].style}`}>
                {hint[2].content}
              </Icon>
            </Col>
            <Col sm={12}>
              <Button amStyle='success' block type='submit'>确认更改</Button>
            </Col>
          </Grid>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  logout: state.changePassword.logout
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changepw: form => dispatch(changePassword(form)),
    changeqa: form => dispatch(changeQuestion(form)),
    logout: form => dispatch(logout())
  };
};

ChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePassword;
