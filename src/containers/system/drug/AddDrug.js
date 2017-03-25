import React, {Component} from 'react';
import {Input, Grid, Col, Button, Icon} from 'amazeui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';

import {addDrug} from '../../../action/fetch';

class AddDrug extends Component {
  formSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#addDrugForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.addDrug(temp);
  }

  render() {
    return (
      <div>
        <div className='systemTitle'>
          新增药品
        </div>
        <hr></hr>
        <form onSubmit={e => this.formSubmit(e)} id='addDrugForm'>
          <Grid>
            <Col sm={12} md={2}>
              <div className='input-name'>
                药品名&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='drug' required />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                CAS号
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='CAS' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                分子式&nbsp;
                <small>
                  <Icon icon='asterisk' className='am-text-danger'/>
                </small>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='fen_zi_shi' required />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                分子量
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='fen_zi_liang' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                药品别名
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='drug_another_name' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                药品英文名
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='drug_Englishname' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                危险性
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='dangerous' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                单位
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='standard' />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                详细
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Input type='textarea' name='details' />
            </Col>
            <Col sm={12}>
              <small>
                <Icon icon='asterisk' className='am-text-danger'/>
                &nbsp;项不能空白
                {
                  this.props.linkto !== '' ?
                  <Link to='/system/drugDetail' className='am-fr'
                        style={{cursor: 'pointer'}}>
                          进入药品 <strong>{this.props.linkto}</strong> 详细编辑页面
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
  linkto: state.addDrug
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDrug: form => dispatch(addDrug(form))
  };
};

AddDrug = connect(mapStateToProps, mapDispatchToProps)(AddDrug);

export default AddDrug;
