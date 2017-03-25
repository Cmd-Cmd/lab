import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Container, Progress, Input, Button} from 'amazeui-react';
import $ from 'jquery';

import hint from '../hint';

import {initReset} from '../action';
import {getQA, resetByQA} from '../action/fetch';

class Reset extends Component {
  componentWillMount() {
    if (this.props.logined) {
      hint('您已登录');
      hashHistory.replace('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logined) {
      hashHistory.replace('/');
    }
  }

  nextStep(e) {
    e.preventDefault();
    switch (this.props.step) {
      case 0:
        this.props.getQA($('input[name=id]').val());
        break;
      case 1:
        this.props.resetByQA($('input[name=id]').val(),
                             $('input[name=answer]').val());
        break;
      case 2:
        this.props.initReset();
        hashHistory.replace('/');
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <form id='Reset' onSubmit={e => this.nextStep(e)}>
        <Container>
          <Progress amSize='sm' active
                    now={parseInt(this.props.step / 2 * 100, 10)} />
          {this.props.step >= 0 ?
            <div>
              <h2 style={{marginTop: 0}}>第一步：请输入用户名(学号/工号)</h2>
              <Input name='id' disabled={this.props.step !== 0} required
                icon={this.props.step === 0 ? 'question' : 'check'} />
            </div> : ''
          } {this.props.step >= 1 ?
            <div>
              <h2 style={{marginTop: 0}}>第二步：请回答设置问题</h2>
              <Input disabled value={this.props.question} />
              <Input name='answer' disabled={this.props.step !== 1} required
                     icon={this.props.step === 1 ? 'question' : 'check'} />
            </div> : ''
          } {this.props.step >= 2 ?
            <div>
              <h2 style={{marginTop: 0}}>第三步：密码已重置</h2>
              <Input disabled value={this.props.result} />
            </div> : ''
          }
          <Button amStyle='success' block type='submit'>
            {this.props.step < 2 ? '下一步' : '返回首页'}
          </Button>
        </Container>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  logined: state.login.logined,
  step: state.reset.step,
  question: state.reset.question,
  result: state.reset.result
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getQA: (id) => dispatch(getQA(id)),
    resetByQA: (id, answer) => dispatch(resetByQA(id, answer)),
    initReset: () => dispatch(initReset())
  };
};

Reset = connect(mapStateToProps, mapDispatchToProps)(Reset);

export default Reset;
