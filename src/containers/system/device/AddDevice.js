import React, {Component} from 'react';
import {Grid, Col, Icon, Button, Input} from 'amazeui-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import $ from 'jquery';

import {addDevice} from '../../../action/fetch';

class AddDevice extends Component {
  formSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#addDeviceForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.addDevice(temp);
  }

  render() {
    return (
      <div>
        <div className='systemTitle'>
          新增仪器
        </div>
        <hr></hr>
        <form onSubmit={e => this.formSubmit(e)} id='addDeviceForm'>
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
              <Input name='equip_name' required />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                型号
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input name='model' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                公司
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='factory' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                价格
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='price' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                具体情况
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input type='textarea' name='detail' />
            </Col>
            <Col sm={12}>
              <small>
                <Icon icon='asterisk' className='am-text-danger'/>
                &nbsp;项不能空白
                {
                  this.props.linkto !== '' ?
                  <Link to='/system/deviceDetail' className='am-fr'
                        style={{cursor: 'pointer'}}>
                          进入设备 <strong>{this.props.linkto}</strong> 详细编辑页面
                  </Link> : ''
                }
              </small>
              <Button amStyle='success' block type='submit'>新增药品</Button>
            </Col>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  linkto: state.addDevice
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDevice: form => dispatch(addDevice(form))
  };
};

AddDevice = connect(mapStateToProps, mapDispatchToProps)(AddDevice);

export default AddDevice;
