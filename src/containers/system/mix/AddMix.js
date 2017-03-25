import React, {Component} from 'react';
import {Grid, Col, Icon, Button, Input} from 'amazeui-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import $ from 'jquery';

import {addMix} from '../../../action/fetch';

class AddMix extends Component {
  formSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#addMixForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.addMix(temp);
  }

  render() {
    return (
      <div>
        <div className='systemTitle'>
          新增试剂
        </div>
        <hr></hr>
        <form onSubmit={e => this.formSubmit(e)} id='addMixForm'>
          <Grid>
            <Col sm={12} md={2}>
              <div className='input-name'>
                试剂名&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input name='mix' required />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                试剂单位
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input name='standard' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                注意事项
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input type='textarea' name='attention' />
            </Col>
            <Col sm={12}>
              <small>
                <Icon icon='asterisk' className='am-text-danger'/>
                &nbsp;项不能空白
                {
                  this.props.linkto !== '' ?
                  <Link to='/system/mixDetail' className='am-fr'
                        style={{cursor: 'pointer'}}>
                          进入试剂 <strong>{this.props.linkto}</strong> 详细编辑页面
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
  linkto: state.addMix
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMix: form => dispatch(addMix(form))
  };
};

AddMix = connect(mapStateToProps, mapDispatchToProps)(AddMix);

export default AddMix;
