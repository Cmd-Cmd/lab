import React, {Component} from 'react';
import {Table, Input, Button, Sticky, Icon, Grid, Col,
        ModalTrigger, Modal} from 'amazeui-react';
import {connect} from 'react-redux';

import {getAllRanks, updateRank} from '../../../action/fetch';
import {changeRankFilter} from '../../../action';

const nameMap = ['rank_control', 'rank_news', 'rank_drug',
                 'rank_equipment', 'rank_experment', 'rank_course',
                 'rank_class', 'rank_student', 'rank_open'];
const rankMap = {
  '管理权限': <Icon icon='check' className='am-text-success' />,
  '一般权限': <Icon icon='minus' className='am-text-primary' />,
  '无权限': <Icon icon='close' className='am-text-danger' />
};

class ManagerRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        ID: '',
        'rank_control': '',
        'rank_news': '',
        'rank_drug': '',
        'rank_equipment': '',
        'rank_experment': '',
        'rank_course': '',
        'rank_class': '',
        'rank_student': '',
        'rank_open': ''
      },
      oriName: '',
      oriID: ''
    };
  }

  componentDidMount() {
    this.props.getAllRanks();
  }

  changeUser(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const inx = parseInt(e.currentTarget.name, 10);
    this.setState((prevState, props) => ({
      user: Object.assign({}, props.ranks[inx]),
      oriName: props.ranks[inx].name,
      oriID: props.ranks[inx].ID
    }));
  }

  changeForm(e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.user[target.name] = target.value;
      return nextState;
    });
  }

  handleSubmit() {
    let temp = {
      'find_id': this.state.user.ID,
      ...this.state.user
    };
    this.props.updateRank(temp);
  }

  render() {
    let rankModal = (
      <Modal type='confirm'
             title={`${this.state.oriName} - ${this.state.oriID}`}>
        <form onChange={e => this.changeForm(e)} id='rankForm'>
          <Grid>
            <Col sm={12}>
              <Input placeholder='请输入姓名' value={this.state.user.name}
                     addonBefore='姓名' name='name' onChange={e => {return; }} />
            </Col>
            <Col sm={4}>
              <Input type='select' label='用户管理权限' onChange={e => {return; }}
                     name={nameMap[0]} value={this.state.user[nameMap[0]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='新闻管理权限' onChange={e => {return; }}
                     name={nameMap[1]} value={this.state.user[nameMap[1]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='药品管理权限' onChange={e => {return; }}
                     name={nameMap[2]} value={this.state.user[nameMap[2]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='仪器管理权限' onChange={e => {return; }}
                     name={nameMap[3]} value={this.state.user[nameMap[3]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='实验管理权限' onChange={e => {return; }}
                     name={nameMap[4]} value={this.state.user[nameMap[4]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='课程管理权限' onChange={e => {return; }}
                     name={nameMap[5]} value={this.state.user[nameMap[5]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='班级管理权限' onChange={e => {return; }}
                     name={nameMap[6]} value={this.state.user[nameMap[6]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='学生管理权限' onChange={e => {return; }}
                     name={nameMap[7]} value={this.state.user[nameMap[7]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input type='select' label='开放性实验权限' onChange={e => {return; }}
                     name={nameMap[8]} value={this.state.user[nameMap[8]]}>
                <option value='管理权限'>管理权限</option>
                <option value='一般权限'>一般权限</option>
                <option value='无权限'>无权限</option>
              </Input>
            </Col>
          </Grid>
        </form>
      </Modal>
    );
    return (
      <div id='ManagerRank' style={{position: 'relative'}}>
        <Sticky>
          <Input amStyle='success' placeholder='过滤姓名/学号...'
                 value={this.props.filter} name='searchRank'
                 onChange={e => this.props.changeFilter(e.target.value)} />
        </Sticky>
        <small>
          权限表图例&nbsp;&nbsp;&nbsp;&nbsp;
          {rankMap.管理权限} <code>管理权限</code>&nbsp;&nbsp;&nbsp;&nbsp;
          {rankMap.一般权限} <code>一般权限</code>&nbsp;&nbsp;&nbsp;&nbsp;
          {rankMap.无权限} <code>无权限</code>&nbsp;&nbsp;&nbsp;&nbsp;
        </small>
        <Table hover responsive>
          <thead>
            <tr>
              <th>姓名</th>
              <th>学号/工号</th>
              <th>用户管理</th>
              <th>新闻管理</th>
              <th>药品管理</th>
              <th>仪器管理</th>
              <th>实验管理</th>
              <th>课程管理</th>
              <th>班级管理</th>
              <th>学生管理</th>
              <th>开放性实验</th>
              <th>修改</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.ranks.map((ele, inx) => {
                return (
                  <tr key={ele.ID}>
                    <td>{ele.name}</td>
                    <td>{ele.ID}</td>
                    <td>{rankMap[ele[nameMap[0]]]}</td>
                    <td>{rankMap[ele[nameMap[1]]]}</td>
                    <td>{rankMap[ele[nameMap[2]]]}</td>
                    <td>{rankMap[ele[nameMap[3]]]}</td>
                    <td>{rankMap[ele[nameMap[4]]]}</td>
                    <td>{rankMap[ele[nameMap[5]]]}</td>
                    <td>{rankMap[ele[nameMap[6]]]}</td>
                    <td>{rankMap[ele[nameMap[7]]]}</td>
                    <td>{rankMap[ele[nameMap[8]]]}</td>
                    <td>
                      <ModalTrigger modal={rankModal}
                                    onConfirm={() => this.handleSubmit()}>
                        <Button amStyle='secondary' amSize='xs' name={inx}
                                onClick={e => this.changeUser(e)}>
                          <Icon icon='cogs'> 修改权限</Icon>
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
  ranks: state.managerRank.ranks
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllRanks: () => dispatch(getAllRanks()),
    changeFilter: val => dispatch(changeRankFilter(val)),
    updateRank: form => dispatch(updateRank(form))
  };
};

ManagerRank = connect(mapStateToProps, mapDispatchToProps)(ManagerRank);

export default ManagerRank;
