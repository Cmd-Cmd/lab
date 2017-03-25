import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {ModalTrigger, Modal, Icon, Grid, Col, Tabs,
        Input, Button} from 'amazeui-react';
import $ from 'jquery';

import hint from '../../../hint';

import {setMixDetail, mixDetailChange} from '../../../action';
import {getMixDetail, getMixStruct, mixUpdate} from '../../../action/fetch';

class MixDetail extends Component {
  componentDidMount() {
    if (this.props.mixName === '') {
      hint('请先选择试剂');
      hashHistory.replace('/system/managerMix');
    } else {
      this.props.getMixDetail(this.props.mixName);
      this.props.getMixStruct(this.props.mixName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mixName === '') {
      hashHistory.replace('/system/managerMix');
    }
  }

  componentWillUnmount() {
    this.props.setMixDetail('');
  }

  handleDetailSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#mixDetailForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.mixUpdate(temp);
  }

  render() {
    let {attention, standard} = this.props.detail;
    let drugMix = 'drug_mix';
    drugMix = this.props.detail[drugMix];
    return (
      <div>
        <div className='systemTitle'>
          试剂详情<br />
          <small>{this.props.mixName}</small>
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <Tabs justify id='DrugDetail' style={{position: 'relative'}}>
              <Tabs.Item eventKey='basic' title='基本信息'>
                <ModalTrigger modal={
                  <Modal type='confirm' title='删除试剂'>
                    确定删除此试剂吗？
                  </Modal>
                } onConfirm={() => this.props.deleteMix(this.props.mixName)}>
                  <Icon size='sm' style={{cursor: 'pointer'}} button
                        amStyle='danger' icon='trash' className='am-fr' />
                </ModalTrigger>
                <hr></hr>
                <form id='mixDetailForm'
                      onSubmit={(e) => this.handleDetailSubmit(e)}>
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
                      <Input onChange={e => this.props.mixDetailChange(e)}
                             value={drugMix} required name='drug_mix' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        试剂单位
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input onChange={e => this.props.mixDetailChange(e)}
                             value={standard} name='standard' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        注意事项
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input  onChange={e => this.props.mixDetailChange(e)}
                              value={attention} type='textarea'
                              name='attention' />
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
              <Tabs.Item eventKey='struct' title='配方信息'>
              </Tabs.Item>
            </Tabs>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  mixName: state.mixDetail.mix,
  disableBtn: state.mixDetail.disableBtn,
  detail: state.mixDetail.detail
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMixDetail: mix => dispatch(setMixDetail(mix)),
    getMixDetail: mix => dispatch(getMixDetail(mix)),
    mixDetailChange: e => dispatch(mixDetailChange(e)),
    mixUpdate: form => dispatch(mixUpdate(form)),
    getMixStruct: mix => dispatch(getMixStruct(mix))
  };
};

MixDetail = connect(mapStateToProps, mapDispatchToProps)(MixDetail);

export default MixDetail;
