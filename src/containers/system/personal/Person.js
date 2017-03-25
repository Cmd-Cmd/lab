import React, {Component} from 'react';
import {Input, Grid, Col, Button} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import {personForm, personChange, logout} from '../../../action';
import {getPerson, personUpdate} from '../../../action/fetch';

class Person extends Component {
  componentDidMount() {
    this.props.getPerson(this.props.userid);
  }

  changeInfo(e) {
    e.preventDefault();
    if (!this.props.change) {
      this.props.toggleChange(true);
    } else {
      this.props.personUpdate();
    }
  }

  render() {
    let {email, address, QQ} = this.props.detail;
    let phonenumberLong = 'phonenumber_long';
    phonenumberLong = this.props.detail[phonenumberLong];
    let phonenumberShort = 'phonenumber_short';
    phonenumberShort = this.props.detail[phonenumberShort];
    let {idebtity, name, ID} = this.props.detail;
    let creatTime = 'creat_time';
    creatTime = this.props.detail[creatTime];
    let lastTime = 'last_time';
    lastTime = this.props.detail[lastTime];
    return (
      <div>
        <div className='systemTitle'>
          个人信息
        </div>
        <hr></hr>
        <form id='personForm' style={{position: 'relative'}}>
          <Grid>
            <Col sm={12} md={8}>
              <Grid>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    邮件
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={email} name='email' type='email'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    长号
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={phonenumberLong} name='phonenumber_long'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    短号
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={phonenumberShort} name='phonenumber_short'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    QQ
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={QQ} name='QQ'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    身份
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={idebtity} name='idebtity'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12} md={2}>
                  <div className='input-name'>
                    地址
                  </div>
                </Col>
                <Col sm={12} md={10}>
                  <Input value={address} name='address'
                         disabled={(this.props.change) ? false : true}
                         onChange={(e) => this.props.formChange(e)} />
                </Col>
                <Col sm={12}>
                  <Button amStyle='success' block
                          onClick={(e) => this.changeInfo(e)}>
                    {(this.props.change) ? '确认修改' : '修改信息'}
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
                  <Input value={name} disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    学号/工号
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input value={ID} disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    上次登录
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input value={lastTime} disabled></Input>
                </Col>
                <Col sm={12} md={4}>
                  <div className='input-name'>
                    创建时间
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <Input value={creatTime} disabled></Input>
                </Col>
                <Col sm={12}>
                  <Button amStyle='danger' block onClick={() => {
                    this.props.logout();
                    hashHistory.push('/');
                  }}>
                    注销
                  </Button>
                </Col>
              </Grid>
            </Col>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  change: state.login.change,
  userid: state.login.infos.ID,
  detail: state.login.detail
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPerson: id => dispatch(getPerson(id)),
    formChange: e => dispatch(personForm(e)),
    toggleChange: payload => dispatch(personChange(payload)),
    personUpdate: () => dispatch(personUpdate()),
    logout: () => dispatch(logout())
  };
};

Person = connect(mapStateToProps, mapDispatchToProps)(Person);

export default Person;
