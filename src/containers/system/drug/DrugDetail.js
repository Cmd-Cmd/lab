import React, {Component} from 'react';
import {Tabs, Input, Grid, Col, Button, Icon, ButtonGroup,
        Modal, ModalTrigger} from 'amazeui-react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';

import {setDrugDetail, drugDetailChange, drugLocChange,
        newDrugLoc, deleteNewDrugLoc} from '../../../action';
import {getDrugDetail, drugUpdate, deleteDrug,
        getDrugLoc, drugLocUpdate, deleteDrugLoc} from '../../../action/fetch';

class DrugDetail extends Component {
  componentDidMount() {
    if (this.props.drugName === '') {
      alert('请先选择药品');
      browserHistory.replace('/');
    } else {
      this.props.getDrugDetail(this.props.drugName);
      this.props.getDrugLoc(this.props.drugName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.drugName === '') {
      browserHistory.replace('/');
    }
  }

  componentWillUnmount() {
    this.props.setDrugDetail('');
  }

  handleDetailSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#drugDetailForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.drugUpdate(temp);
  }

  handleLocSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($(e.target).serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    temp.drug = this.props.drugName;
    temp.loc = e.target.name;
    this.props.drugLocUpdate(temp);
  }

  handleDelete(e) {
    if (e.target.tagName.toLowerCase() !== 'button' ||
        e.target.name !== 'deleteLoc') {
      console.log(false);
      return;
    }
    if (e.currentTarget.name === '-1') {
      this.props.deleteNewDrugLoc();
    } else {
      this.props.deleteDrugLoc(e.currentTarget.name);
    }
  }

  render() {
    const strEditTime = 'edit_time';
    let {CAS, counting, dangerous,
         details, people, standard} = this.props.detail;
    let drugEnglishname = 'drug_Englishname';
    drugEnglishname = this.props.detail[drugEnglishname];
    let drugAnotherName = 'drug_another_name';
    drugAnotherName = this.props.detail[drugAnotherName];
    let drugName = 'drug_name';
    drugName = this.props.detail[drugName];
    let editTime = 'edit_time';
    editTime = this.props.detail[editTime];
    let fenZiLiang = 'fen_zi_liang';
    fenZiLiang = this.props.detail[fenZiLiang];
    let fenZiShi = 'fen_zi_shi';
    fenZiShi = this.props.detail[fenZiShi];
    let sum = 0;
    for (let i = 0; i < this.props.locs.length; i++) {
      let temp = this.props.locs[i];
      sum += Number(temp.counting) * Number(temp.each) + Number(temp.remain);
    }
    return (
      <div>
        <div className='systemTitle'>
          药品详情 - {this.props.drugName}
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <Tabs justify id='DrugDetail' style={{position: 'relative'}}>
              <Tabs.Item eventKey='basic' title='基本信息'>
                <small>
                  用户<strong> {people} </strong>
                  于<strong> {editTime} </strong>修改
                </small>
                <ModalTrigger modal={
                  <Modal type='confirm' title='删除药品'>
                    确定删除此药品吗？
                  </Modal>
                } onConfirm={() => this.props.deleteDrug(this.props.drugName)}>
                  <Icon size='sm' style={{cursor: 'pointer'}} button
                        amStyle='danger' icon='trash' className='am-fr' />
                </ModalTrigger>
                <hr></hr>
                <form id='drugDetailForm'
                      onSubmit={(e) => this.handleDetailSubmit(e)}>
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
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={drugName} name='drug_name' required />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        CAS号
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={CAS} name='CAS' />
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
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={fenZiShi} name='fen_zi_shi' required />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        分子量
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={fenZiLiang} name='fen_zi_liang' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        药品别名
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={drugAnotherName} name='drug_another_name' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        药品英文名
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={drugEnglishname} name='drug_Englishname' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        危险性
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={dangerous} name='dangerous' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        单位
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={standard} name='standard' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        详细
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input onChange={e => this.props.drugDetailChange(e)}
                             value={details} type='textarea' name='details' />
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
                {
                  this.props.locs.length > 0 ?
                    <div className='am-text-center'>
                      原始总存量:<code>{counting}{standard}</code> =>
                      修改后总存量:<code>{sum}{standard}</code>
                    </div> : ''
                }
                <hr></hr>
                <div id='drugLocForms'>
                  {this.props.locs.map((ele, inx) =>
                    <form name={ele.id} key={inx} data-key={inx}
                          onChange={e => this.props.drugLocChange(e)}
                          onSubmit={e => this.handleLocSubmit(e)}
                          onClick={e => this.handleDelete(e)}>
                      <Grid>
                        <Col sm={12} md={4}>
                          <Input addonBefore='剩余' addonAfter='瓶' type='number'
                                 value={ele.counting} name='counting' required
                                 onChange={() => {return; }}/>
                        </Col>
                        <Col sm={12} md={4}>
                          <Input addonBefore='零散' addonAfter='ml' type='number'
                                 value={ele.remain} name='remain'
                                 onChange={() => {return; }}/>
                        </Col>
                        <Col sm={12} md={4}>
                          <Input addonBefore='容量' type='number' required
                                 addonAfter={`${ele.standard}/瓶`}
                                 value={ele.each} name='each'
                                 onChange={() => {return; }}/>
                        </Col>
                        <Col sm={12}>
                          <Input addonBefore='存放位置' required
                                 value={ele.position} name='position'
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
                  () => this.props.newDrugLoc()
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
  drugName: state.drugDetail.drug,
  detail: state.drugDetail.detail,
  disableBtn: state.drugDetail.disableBtn,
  locs: state.drugDetail.locs
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDrugDetail: drug => dispatch(setDrugDetail(drug)),
    getDrugDetail: drug => dispatch(getDrugDetail(drug)),
    drugDetailChange: e => dispatch(drugDetailChange(e)),
    drugUpdate: form => dispatch(drugUpdate(form)),
    getDrugLoc: drug => dispatch(getDrugLoc(drug)),
    drugLocChange: e => dispatch(drugLocChange(e)),
    drugLocUpdate: form => dispatch(drugLocUpdate(form)),
    deleteDrug: drug => dispatch(deleteDrug(drug)),
    newDrugLoc: () => dispatch(newDrugLoc()),
    deleteDrugLoc: loc => dispatch(deleteDrugLoc(loc)),
    deleteNewDrugLoc: () => dispatch(deleteNewDrugLoc())
  };
};

DrugDetail = connect(mapStateToProps, mapDispatchToProps)(DrugDetail);

export default DrugDetail;
