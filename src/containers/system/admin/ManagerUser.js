import React, {Component} from 'react';
import {Table, Input, Button, Sticky, Icon, Grid, Col,
        ModalTrigger, Modal} from 'amazeui-react';
import {connect} from 'react-redux';

import {getAllUsers, resetUser, deleteUser} from '../../../action/fetch';
import {changeUserFilter} from '../../../action';

class ManagerUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ID: '',
        name: '',
        idebtity: '',
        email: '',
        QQ: '',
        address: '',
        'phonenumber_long': '',
        'phonenumber_short': '',
        'creat_time': '',
        'last_time': ''
      },
      tempInx: -1,
      tempName: ''
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  changeUser(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const inx = parseInt(e.currentTarget.name, 10);
    this.setState((prevState, props) => ({
      user: props.users[inx],
      tempInx: prevState.tempInx,
      tempName: prevState.tempName
    }));
  }

  changeTemp(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const inx = parseInt(e.currentTarget.name, 10);
    this.setState((prevState, props) => ({
      user: prevState.user,
      tempInx: inx,
      tempName: props.users[inx].name
    }));
  }

  handleReset() {
    this.props.resetUser(this.state.tempInx);
  }

  handleDelete() {
    this.props.deleteUser(this.state.tempInx);
  }

  render() {
    let creatTime = 'creat_time';
    let lastTime = 'last_time';
    let phoneL = 'phonenumber_long';
    let phoneS = 'phonenumber_short';
    let infoModal = (
      <Modal type='alert'
             title={`${this.state.user.name} - ${this.state.user.ID}`}>
        <Grid>
          <Col sm={12} md={6}>
            <Input type='text' label='邮件' disabled
                   value={this.state.user.email} />
          </Col>
          <Col sm={12} md={6}>
            <Input type='text' label='长号' disabled
                   value={this.state.user[phoneL]} />
          </Col>
          <Col sm={12} md={6}>
            <Input type='text' label='短号' disabled
                   value={this.state.user[phoneS]} />
          </Col>
          <Col sm={12} md={6}>
            <Input type='text' label='QQ' disabled
                   value={this.state.user.QQ} />
          </Col>
          <Col sm={12} md={6}>
            <Input type='text' label='身份' disabled
                   value={this.state.user.idebtity} />
          </Col>
          <Col sm={12} md={6}>
            <Input type='text' label='地址' disabled
                   value={this.state.user.address} />
          </Col>
        </Grid>
      </Modal>
    );
    return (
      <div id='ManagerUser' style={{position: 'relative'}}>
        <div className='systemTitle'>
          用户信息管理
        </div>
        <hr></hr>
        <Sticky>
          <Input amStyle='success' placeholder='过滤姓名/学号...'
                 value={this.props.filter} name='searchUser'
                 onChange={e => this.props.changeFilter(e.target.value)} />
        </Sticky>
        <Table hover responsive>
          <thead>
            <tr>
              <th>姓名</th>
              <th>学号/工号</th>
              <th>创建时间</th>
              <th>上次登录时间</th>
              <th style={{width: '250px'}}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.users.map((ele, inx) => {
                return (
                  <tr key={ele.ID}>
                    <td>{ele.name}</td>
                    <td>{ele.ID}</td>
                    <td>{ele[creatTime]}</td>
                    <td>{ele[lastTime]}</td>
                    <td>
                      <ModalTrigger modal={infoModal}>
                        <Button amStyle='secondary' amSize='xs' name={inx}
                                onClick={e => this.changeUser(e)}>
                          <Icon icon='tags'> 查看信息</Icon>
                        </Button>
                      </ModalTrigger>
                      <ModalTrigger onConfirm={() => this.handleReset()} modal={
                        <Modal type='confirm' title='重置用户'>
                          确定重置用户 {this.state.tempName} 吗？
                        </Modal>
                      }>
                        <Button amStyle='warning' amSize='xs' name={inx}
                                onClick={e => this.changeTemp(e)}>
                          <Icon icon='refresh'> 重置</Icon>
                        </Button>
                      </ModalTrigger>
                      <ModalTrigger onConfirm={()=>this.handleDelete()} modal={
                        <Modal type='confirm' title='删除用户'>
                          确定删除用户 {this.state.tempName} 吗？
                        </Modal>
                      }>
                        <Button amStyle='danger' amSize='xs' name={inx}
                                onClick={e => this.changeTemp(e)}>
                          <Icon icon='trash'> 删除</Icon>
                        </Button>
                      </ModalTrigger>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: state.managerUser.users,
  filter: state.managerUser.filter
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    changeFilter: val => dispatch(changeUserFilter(val)),
    resetUser: inx => dispatch(resetUser(inx)),
    deleteUser: inx => dispatch(deleteUser(inx))
  };
};

ManagerUser = connect(mapStateToProps, mapDispatchToProps)(ManagerUser);

export default ManagerUser;
