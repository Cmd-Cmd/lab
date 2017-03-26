import React, {Component} from 'react';
import {Input, Icon, Button, Table, Sticky, Pagination,
        ModalTrigger, Modal} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import {getDrug, managerDeleteDrug} from '../../../action/fetch';
import {managerDrugPageTo, setDrugDetail} from '../../../action';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class ManagerDrug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDeleteInx: -1,
      tempDeleteName: ''
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.getDrug(e.target.drug.value);
  }

  handleEdit(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.props.setDrugDetail(e.currentTarget.name);
    hashHistory.push('/system/drugDetail');
  }

  handleDelete(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    const drugName = 'drug_name';
    this.setState({
      tempDeleteInx: Number(e.currentTarget.name),
      tempDeleteName: this.props.drugs[Number(e.currentTarget.name)][drugName]
    });
  }

  handleTest() {
    this.props.deleteDrug(this.state.tempDeleteInx);
  }

  render() {
    const drugName = 'drug_name';
    const drugAnotherName = 'drug_another_name';
    const fenZiShi = 'fen_zi_shi';
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='ManagerDrug' style={{position: 'relative'}}>
        <Sticky>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input amStyle='success' placeholder='搜索药品...' name='drug'
                   btnAfter={searchBtn} />
          </form>
        </Sticky>
        <Table hover responsive className='am-margin-top'>
          <thead>
            <tr>
              <th>药品名</th>
              <th>药品别名</th>
              <th>分子式</th>
              <th>剩余存量</th>
              <th>单位</th>
              <th style={{width: '150px'}}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.drugs.map((ele, inx) => {
                return (
                  <tr key={inx}>
                    <td>{ele[drugName]}</td>
                    <td>{ele[drugAnotherName]}</td>
                    <td>{ele[fenZiShi]}</td>
                    <td>{ele.counting}</td>
                    <td>{ele.standard}</td>
                    <td>
                      <Button amStyle='secondary' amSize='xs'
                              name={ele[drugName]}
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
  drugs: state.managerDrug.drugs,
  pageNow: state.managerDrug.pageNow,
  pageAll: state.managerDrug.pageAll
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDrug: drug => dispatch(getDrug(drug)),
    changePage: page => dispatch(managerDrugPageTo(page)),
    setDrugDetail: drug => dispatch(setDrugDetail(drug)),
    deleteDrug: drug => dispatch(managerDeleteDrug(drug))
  };
};

ManagerDrug = connect(mapStateToProps, mapDispatchToProps)(ManagerDrug);

export default ManagerDrug;
