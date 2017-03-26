import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {ModalTrigger, Modal, Icon, Grid, Col, Tabs,
        Input, Button, Table} from 'amazeui-react';
import $ from 'jquery';

import hint from '../../../hint';
import './MixDetail.css';

import {setMixDetail, mixDetailChange,
        addToStruct, deleteStruct} from '../../../action';
import {getMixDetail, getMixStruct, mixUpdate, deleteMix,
        mixDrugSearch, mixMixSearch, updateStruct} from '../../../action/fetch';

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

  mixDrugSearch(e) {
    e.preventDefault();
    this.props.mixDrugSearch($('#mixDrugSearch input').val());
  }

  updateStruct(e) {
    e.preventDefault();
    this.props.updateStruct();
  }

  addToStruct(type, e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const input = $(e.currentTarget).closest('tr').find('input').get(0);
    const temp = {
      num: input.value,
      standard: input.dataset.standard
    };
    if (type) {
      temp.drug = input.dataset.drugname;
    } else {
      temp.mix = input.dataset.mixname;
    }
    if (isNaN(Number(temp.num)) || Number(temp.num) <= 0) {
      hint('请输入有效的正数');
      return;
    }
    input.value = '';
    this.props.addToStruct(type, temp);
  }

  deleteStruct(type, e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.props.deleteStruct(type, parseInt(e.currentTarget.name, 10));
  }

  mixMixSearch(e) {
    e.preventDefault();
    this.props.mixMixSearch($('#mixMixSearch input').val());
  }

  render() {
    const drugName = 'drug_name';
    const mixAdd = 'mix_add';
    const drugMix = 'drug_mix';
    let {attention, standard} = this.props.detail;
    return (
      <div>
        <div className='systemTitle'>
          试剂详情<br />
          <small>{this.props.mixName}</small>
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <Tabs justify id='MixDetail' style={{position: 'relative'}}>
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
                             value={this.props.detail[drugMix]}
                             required name='drug_mix' />
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
                <Grid id='mixStructGrid'>
                  <Col sm={12}>
                    <form id='mixStructForm' onSubmit={e=>this.updateStruct(e)}>
                      <Table responsive compact>
                        <thead>
                          <tr>
                            <th>药品名/试剂名</th>
                            <th>数量</th>
                            <th>单位</th>
                            <th style={{width: '60px'}}>删除</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                              this.props.struct.drug.map((ele, inx) => {
                                return (
                                  <tr key={inx}>
                                    <td>{ele.drug}</td>
                                    <td>{ele.num}</td>
                                    <td>{ele.standard}</td>
                                    <td>
                                      <Button amStyle='link' amSize='sm'
                                              name={inx} onClick={e =>
                                                this.deleteStruct(true, e)
                                              }>
                                        <Icon icon='close'
                                              className='am-text-danger' />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                            }
                            {
                              this.props.struct[mixAdd].map((ele, inx) => {
                                return (
                                  <tr key={inx}  className='am-active'>
                                    <td>{ele.mix}</td>
                                    <td>{ele.num}</td>
                                    <td>{ele.standard}</td>
                                    <td>
                                      <Button amStyle='link' amSize='sm'
                                              name={inx}  onClick={e =>
                                                this.deleteStruct(false, e)
                                              }>
                                        <Icon icon='close'
                                              className='am-text-danger' />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                            }
                        </tbody>
                      </Table>
                      <Button block amStyle='success' type='submit'
                              className='am-margin-bottom'>
                        保存修改
                      </Button>
                    </form>
                  </Col>
                  <Col sm={12} md={6}>
                    <form id='mixDrugSearch'
                          onSubmit={e => this.mixDrugSearch(e)}>
                      <Input amStyle='secondary' btnBefore={
                        <Button amStyle='secondary' type='submit'>
                          <Icon icon='search'> 搜索药品</Icon>
                        </Button>
                      } />
                    </form>
                    <Table hover responsive compact>
                      <thead>
                        <tr>
                          <th>药品信息</th>
                          <th style={{width: '60px'}}>添加</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.drugSearch.map((ele, inx) => {
                            return (
                              <tr key={inx}>
                                <td>
                                  <Input amSize='sm' amStyle='primary' min='0'
                                         type='number'
                                         data-drugname={ele[drugName]}
                                         data-standard={ele.standard}
                                         addonBefore={ele[drugName]}
                                         addonAfter={ele.standard} />
                                </td>
                                <td>
                                  <Button amStyle='link' amSize='sm'
                                          onClick={e =>
                                            this.addToStruct(true, e)
                                          }>
                                    <Icon icon='plus'
                                          className='am-text-success' />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </Table>
                  </Col>
                  <Col sm={12} md={6}>
                    <form id='mixMixSearch'
                          onSubmit={e => this.mixMixSearch(e)}>
                      <Input amStyle='primary' btnAfter={
                        <Button amStyle='primary' type='submit'>
                          <Icon icon='search'> 搜索试剂</Icon>
                        </Button>
                      } />
                    </form>
                    <Table hover responsive compact>
                      <thead>
                        <tr>
                          <th style={{width: '60px'}}>添加</th>
                          <th>试剂信息</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.mixSearch.map((ele, inx) => {
                            return (
                              <tr key={inx}>
                                <td>
                                  <Button amStyle='link' amSize='sm'
                                          onClick={e =>
                                            this.addToStruct(false, e)
                                          }>
                                    <Icon icon='plus'
                                          className='am-text-success' />
                                  </Button>
                                </td>
                                <td>
                                  <Input amSize='sm' amStyle='secondary' min='0'
                                         type='number'
                                         data-mixname={ele[drugMix]}
                                         data-standard={ele.standard}
                                         addonBefore={ele[drugMix]}
                                         addonAfter={ele.standard} />
                                </td>
                              </tr>
                            );
                          })
                        }
                      </tbody>
                    </Table>
                  </Col>
                </Grid>
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
  detail: state.mixDetail.detail,
  struct: state.mixDetail.struct,
  drugSearch: state.mixDetail.drugSearch,
  mixSearch: state.mixDetail.mixSearch
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMixDetail: mix => dispatch(setMixDetail(mix)),
    getMixDetail: mix => dispatch(getMixDetail(mix)),
    mixDetailChange: e => dispatch(mixDetailChange(e)),
    mixUpdate: form => dispatch(mixUpdate(form)),
    getMixStruct: mix => dispatch(getMixStruct(mix)),
    deleteMix: mix => dispatch(deleteMix(mix)),
    mixDrugSearch: drug => dispatch(mixDrugSearch(drug)),
    mixMixSearch: mix => dispatch(mixMixSearch(mix)),
    addToStruct: (type, temp) => dispatch(addToStruct(type, temp)),
    deleteStruct: (type, temp) => dispatch(deleteStruct(type, temp)),
    updateStruct: () => dispatch(updateStruct())
  };
};

MixDetail = connect(mapStateToProps, mapDispatchToProps)(MixDetail);

export default MixDetail;
