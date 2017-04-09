import React, {Component} from 'react';
import {Sticky, Button, Icon, Input, Table,
        ModalTrigger, Modal, Pagination} from 'amazeui-react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

import {getDevice, managerDeleteDevice} from '../../../action/fetch';
import {setDeviceDetail, managerDevicePageTo} from '../../../action';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class ManagerDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDeleteInx: -1,
      tempDeleteName: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getDevice(e.target.device.value);
  }

  handleEdit(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.props.setDeviceDetail(e.currentTarget.name);
    hashHistory.push('/system/deviceDetail');
  }

  handleDelete(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const eqName = 'equip_name';
    this.setState({
      tempDeleteInx: Number(e.currentTarget.name),
      tempDeleteName: this.props.devices[Number(e.currentTarget.name)][eqName]
    });
  }

  handleModal() {
    this.props.deleteDevice(this.state.tempDeleteInx);
  }

  render() {
    const equipName = 'equip_name';
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='ManagerDevice' style={{position: 'relative'}}>
        <div className='systemTitle'>
          仪器信息管理
        </div>
        <hr></hr>
        <Sticky>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input amStyle='success' placeholder='搜索仪器...' name='device'
                   btnAfter={searchBtn} />
          </form>
        </Sticky>
        <Table hover responsive className='am-margin-top'>
          <thead>
            <tr>
              <th>仪器名</th>
              <th>型号</th>
              <th>公司</th>
              <th>具体情况</th>
              <th>价格</th>
              <th style={{width: '150px'}}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.devices.map((ele, inx) => {
                return (
                  <tr key={inx}>
                    <td>{ele[equipName]}</td>
                    <td>{ele.model}</td>
                    <td>{ele.factory}</td>
                    <td>{ele.detail}</td>
                    <td>{ele.price}</td>
                    <td>
                      <Button amStyle='secondary' amSize='xs'
                              name={ele[equipName]}
                              onClick={e => this.handleEdit(e)}>
                        <Icon icon='edit'> 编辑</Icon>
                      </Button>
                      <ModalTrigger onConfirm={() => this.handleModal()} modal={
                        <Modal type='confirm' title='删除药品'>
                          确定删除设备 {this.state.tempDeleteName} 吗？
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
  devices: state.managerDevice.devices,
  pageNow: state.managerDevice.pageNow,
  pageAll: state.managerDevice.pageAll
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDevice: device => dispatch(getDevice(device)),
    setDeviceDetail: device => dispatch(setDeviceDetail(device)),
    deleteDevice: device => dispatch(managerDeleteDevice(device)),
    changePage: page => dispatch(managerDevicePageTo(page))
  };
};

ManagerDevice = connect(mapStateToProps, mapDispatchToProps)(ManagerDevice);

export default ManagerDevice;
