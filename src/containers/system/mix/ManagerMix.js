import React, {Component} from 'react';
import {Sticky, Button, Icon, Input, Table,
        ModalTrigger, Modal, Pagination} from 'amazeui-react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import {getMix, managerDeleteMix} from '../../../action/fetch';
import {setMixDetail, managerMixPageTo} from '../../../action';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class ManagerMix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDeleteInx: -1,
      tempDeleteName: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getMix(e.target.mix.value);
  }

  handleEdit(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.props.setMixDetail(e.currentTarget.name);
    hashHistory.push('/system/mixDetail');
  }

  handleDelete(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const drugMix = 'drug_mix';
    this.setState({
      tempDeleteInx: Number(e.currentTarget.name),
      tempDeleteName: this.props.mixs[Number(e.currentTarget.name)][drugMix]
    });
  }

  handleTest() {
    this.props.deleteMix(this.state.tempDeleteInx);
  }

  render() {
    const drugMix = 'drug_mix';
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='ManagerMix' style={{position: 'relative'}}>
        <div className='systemTitle'>
          试剂信息管理
        </div>
        <hr></hr>
        <Sticky>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input amStyle='success' placeholder='搜索试剂...' name='mix'
                   btnAfter={searchBtn} />
          </form>
        </Sticky>
        <Table hover responsive className='am-margin-top'>
          <thead>
            <tr>
              <th>试剂名</th>
              <th>单位</th>
              <th>注意事项</th>
              <th style={{width: '150px'}}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.mixs.map((ele, inx) => {
                return (
                  <tr key={inx}>
                    <td>{ele[drugMix]}</td>
                    <td>{ele.standard}</td>
                    <td>{ele.attention}</td>
                    <td>
                      <Button amStyle='secondary' amSize='xs'
                              name={ele[drugMix]}
                              onClick={e => this.handleEdit(e)}>
                        <Icon icon='edit'> 编辑</Icon>
                      </Button>
                      <ModalTrigger onConfirm={() => this.handleTest()} modal={
                        <Modal type='confirm' title='删除药品'>
                          确定删除药品 {this.state.tempDeleteName} 吗？
                        </Modal>
                      }>
                        <Button amStyle='danger' amSize='xs' name={inx}
                                onClick={e => this.handleDelete(e)}>
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
        <Pagination centered style={{
          display: this.props.pageAll <= 0 ? 'none' : 'block'
        }}>
          <Pagination.Item disabled={(this.props.pageNow === 0)}>
            <Icon icon='angle-double-left'
                  onClick={
                    (e) => this.props.changePage(this.props.pageNow - 1)}>
            </Icon>
          </Pagination.Item>
          {pageArr.map((ele, inx) => {
            return (
              <Pagination.Item key={inx}
                               active={this.props.pageNow === ele - 1}>
                <Icon icon='blank'
                      onClick={(e) => this.props.changePage(ele - 1)}>
                  {ele}
                </Icon>
              </Pagination.Item>
            );
          })}
          <Pagination.Item disabled={(this.props.pageNow ===
                                      this.props.pageAll)}>
            <Icon icon='angle-double-right'
                  onClick={(e) => this.props.changePage(this.props.pageNow + 1)}
                  ></Icon>
          </Pagination.Item>
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  mixs: state.managerMix.mixs,
  pageNow: state.managerMix.pageNow,
  pageAll: state.managerMix.pageAll
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMix: mix => dispatch(getMix(mix)),
    setMixDetail: mix => dispatch(setMixDetail(mix)),
    deleteMix: mix => dispatch(managerDeleteMix(mix)),
    changePage: page => dispatch(managerMixPageTo(page))
  };
};

ManagerMix = connect(mapStateToProps, mapDispatchToProps)(ManagerMix);

export default ManagerMix;
