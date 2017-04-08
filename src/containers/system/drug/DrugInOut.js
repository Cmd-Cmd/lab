import React, {Component} from 'react';
import {Button, Icon, Input, Grid, Col,
        Sticky, DateTimeInput, Table} from 'amazeui-react';
import {connect} from 'react-redux';

import './DrugInOut.css';

import {getDrugInOut} from '../../../action/fetch';
import {changeInOutTime} from '../../../action';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class DrugInOut extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.getDrugInOut(e.target.drug.value);
  }

  render() {
    const drugName = 'drug_name';
    return (
      <div id='DrugInOut' style={{position: 'relative'}}>
        <div className='systemTitle'>
          药品出入库记录
        </div>
        <hr></hr>
        <form onSubmit={e => this.handleSubmit(e)}>
          <Sticky>
            <div>
              <Input amStyle='success' placeholder='搜索药品...' name='drug'
                btnAfter={searchBtn} />
            </div>
          </Sticky>
          <Grid className='am-margin-top'>
            <Col sm={12} md={6}>
              <span>起始时间</span>
              <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                             amStyle='success'
                             onInput={e =>
                                      e.target.value = this.props.startTime}
                             onSelect={time =>
                                       this.props.changeTime(time, 'start')}
                             maxDate={this.props.endTime}
                             dateTime={this.props.startTime} />
            </Col>
            <Col sm={12} md={6}>
              <span>终止时间</span>
              <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                             amStyle='success'
                             onInput={e =>
                                      e.target.value = this.props.endTime}
                             onSelect={time =>
                                       this.props.changeTime(time, 'end')}
                             minDate={this.props.startTime}
                             dateTime={this.props.endTime} />
            </Col>
            <Col sm={12}>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>操作时间</th>
                    <th>药品名</th>
                    <th>操作说明</th>
                    <th>药品位置</th>
                    <th>操作人</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.records.map((ele, inx) => {
                      return (
                        <tr key={inx}>
                          <td>{ele.time}</td>
                          <td>{ele[drugName]}</td>
                          <td>
                            <span className='am-text-primary'>{ele.type}</span>
                            <code> {ele.change}{ele.standard} </code>
                          </td>
                          <td>{ele.position}</td>
                          <td>{ele.people}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  startTime: state.drugInOut.startTime,
  endTime: state.drugInOut.endTime,
  records: state.drugInOut.records
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTime: (time, type) => dispatch(changeInOutTime(time, type)),
    getDrugInOut: drug => dispatch(getDrugInOut(drug))
  };
};

DrugInOut = connect(mapStateToProps, mapDispatchToProps)(DrugInOut);

export default DrugInOut;
