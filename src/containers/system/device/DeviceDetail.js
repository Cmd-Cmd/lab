import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {ModalTrigger, Modal, Icon, Grid, Col, Tabs,
        Input, Button, ButtonGroup} from 'amazeui-react';
import $ from 'jquery';

import hint from '../../../hint';
import './DeviceDetail.css';

import {setDeviceDetail, deviceDetailChange, deviceLocChange,
        newDeviceLoc, deleteNewDeviceLoc} from '../../../action';
import {getDeviceDetail, deviceUpdate, deleteDevice, getDeviceLoc,
        deviceLocUpdate, deleteDeviceLoc} from '../../../action/fetch';

class DeviceDetail extends Component {
  componentDidMount() {
    if (this.props.deviceName === '') {
      hint('请先选择设备');
      hashHistory.replace('/system/managerDevice');
    } else {
      this.props.getDeviceDetail(this.props.deviceName);
      this.props.getDeviceLoc(this.props.deviceName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deviceName === '') {
      hashHistory.replace('/system/managerDevice');
    }
  }

  componentWillUnmount() {
    this.props.setDeviceDetail('');
  }

  handleDetailSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#deviceDetailForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.deviceUpdate(temp);
  }

  handleLocSubmit(e) {
    e.preventDefault();
    let temp = {
      'old_fixed_assets_NO': e.target.name,
      'equip_name': this.props.deviceName
    };
    $($(e.target).serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.deviceLocUpdate(temp);
  }

  handleDelete(e) {
    if (e.target.tagName.toLowerCase() !== 'button' ||
        e.target.name !== 'deleteLoc') {
      return;
    }
    if (e.currentTarget.name === '-1') {
      this.props.deleteNewDeviceLoc();
    } else {
      this.props.deleteDeviceLoc(e.currentTarget.name);
    }
  }

  render() {
    let {model, factory, detail, price} = this.props.detail;
    let equipName = 'equip_name';
    equipName = this.props.detail[equipName];
    const strEditTime = 'edit_time';
    const timeBuying = 'time_buying';
    const fixedSAssetsNO = 'fixed_assets_NO';
    const factoryNO = 'factory_NO';
    const stateExplane = 'state_explane';
    return (
      <div>
        <div className='systemTitle'>
          设备详情<br />
          <small>{this.props.deviceName}</small>
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <Tabs justify id='DeviceDetail' style={{position: 'relative'}}>
              <Tabs.Item eventKey='basic' title='基本信息'>
                <ModalTrigger modal={
                  <Modal type='confirm' title='删除设备'>
                    确定删除此药品吗？
                  </Modal>
                } onConfirm={
                  () => this.props.deleteDevice(this.props.deviceName)
                }>
                  <Icon size='sm' style={{cursor: 'pointer'}} button
                        amStyle='danger' icon='trash' className='am-fr' />
                </ModalTrigger>
                <hr></hr>
                <form id='deviceDetailForm'
                      onSubmit={(e) => this.handleDetailSubmit(e)}>
                  <Grid>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        仪器名&nbsp;
                        <small>
                          <Icon icon='asterisk' className='am-text-danger'/>
                        </small>
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input onChange={e => this.props.deviceDetailChange(e)}
                             value={equipName} name='equip_name' required />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        型号
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input onChange={e => this.props.deviceDetailChange(e)}
                             value={model} name='model'  />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        公司
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.deviceDetailChange(e)}
                             value={factory} name='factory'  />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        价格
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.deviceDetailChange(e)}
                             value={price} name='price'  />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        具体情况
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input onChange={e => this.props.deviceDetailChange(e)}
                             value={detail} name='detail' type='textarea' />
                    </Col>
                    <Col sm={12}>
                      <small>
                        <Icon icon='asterisk' className='am-text-danger'/>
                        &nbsp;项不能空白
                      </small>
                      <Button amStyle='success' block type='submit'
                              disabled={this.props.disableBtn}>
                        保存修改
                      </Button>
                    </Col>
                  </Grid>
                </form>
              </Tabs.Item>
              <Tabs.Item eventKey='location' title='位置信息'>
                <div id='deviceLocForms'>
                  {this.props.locs.map((ele, inx) =>
                    <form name={ele.old} key={inx} data-key={inx}
                          onChange={e => this.props.deviceLocChange(e)}
                          onSubmit={e => this.handleLocSubmit(e)}
                          onClick={e => this.handleDelete(e)}>
                      <Grid>
                        <Col sm={12} md={6}>
                          <Input addonBefore='固定资产号' name='fixed_assets_NO'
                                 value={ele[fixedSAssetsNO]} required
                                 onChange={() => {return; }}/>
                        </Col>
                        <Col sm={12} md={6}>
                          <Input addonBefore='公司编号' name='factory_NO'
                                 value={ele[factoryNO]} required
                                 onChange={() => {return; }} />
                        </Col>
                        <Col sm={12} md={6}>
                          <Input addonBefore='状态' type='select' name='state'
                                 value={ele.state}
                                 onChange={() => {return; }}>
                            <option value='在用'>在用</option>
                            <option value='闲置'>闲置</option>
                            <option value='损坏'>损坏</option>
                            <option value='报废'>报废</option>
                          </Input>
                        </Col>
                        <Col sm={12} md={6} style={{position: 'relative'}}>
                          <Input addonBefore='购买时间' name='time_buying'
                                 value={ele[timeBuying]} required
                                 onChange={() => {return; }} />
                        </Col>
                        <Col sm={12}>
                          <Input addonBefore='状态说明' name='state_explane'
                                 value={ele[stateExplane]} required
                                 onChange={() => {return; }}/>
                        </Col>
                        <Col sm={12}>
                          <Input addonBefore='位置' name='position'
                                 value={ele.position} required
                                 onChange={() => {return; }}/>
                        </Col>
                      </Grid>
                      <ButtonGroup>
                        <Button amStyle='warning' amSize='sm' type='submit'>
                          保存
                        </Button>
                        <Button amStyle='danger' amSize='sm' name='deleteLoc'>
                          删除
                        </Button>
                      </ButtonGroup>
                      <small className='am-fr'>
                        用户<strong> {ele.people} </strong>于
                        <strong> {ele[strEditTime]} </strong>修改
                      </small>
                      <hr></hr>
                    </form>
                  )}
                </div>
                <Button amStyle='success' block onClick={
                  () => this.props.newDeviceLoc()
                }>
                  新增位置
                </Button>
              </Tabs.Item>
            </Tabs>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  deviceName: state.deviceDetail.device,
  detail: state.deviceDetail.detail,
  disableBtn: state.deviceDetail.disableBtn,
  locs: state.deviceDetail.locs
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDeviceDetail: device => dispatch(setDeviceDetail(device)),
    getDeviceDetail: device => dispatch(getDeviceDetail(device)),
    deviceDetailChange: e => dispatch(deviceDetailChange(e)),
    deviceUpdate: form => dispatch(deviceUpdate(form)),
    getDeviceLoc: device => dispatch(getDeviceLoc(device)),
    deviceLocChange: e => dispatch(deviceLocChange(e)),
    deviceLocUpdate: form => dispatch(deviceLocUpdate(form)),
    deleteDevice: device => dispatch(deleteDevice(device)),
    newDeviceLoc: () => dispatch(newDeviceLoc()),
    deleteDeviceLoc: no => dispatch(deleteDeviceLoc(no)),
    deleteNewDeviceLoc: () => dispatch(deleteNewDeviceLoc())
  };
};

DeviceDetail = connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);

export default DeviceDetail;
