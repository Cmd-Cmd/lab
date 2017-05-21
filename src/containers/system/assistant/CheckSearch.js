import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Col, Popover, DateTimeInput,
        Table, PopoverTrigger} from 'amazeui-react';

import {changeCheckSearchTime, checkSearchFilter} from '../../../action';
import {getCheckInfoAll} from '../../../action/fetch';

class CheckSearch extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.getCheckInfoAll();
  }

  render() {
    const dateTime = 'date_time';
    return (
      <div>
        <div className='systemTitle'>
          签到查询
        </div>
        <hr></hr>
        <form id='checkSearchForm' style={{position: 'relative'}}
              onSubmit={e => this.handleSubmit(e)}>
          <Grid>
            <Col sm={12} md={5}>
              <PopoverTrigger placement='top' popover={(
                <Popover>
                  起始时间
                </Popover>
              )}>
                <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                               amStyle='success'
                               onInput={e =>
                                        e.target.value = this.props.startTime}
                               onSelect={time =>
                                         this.props.changeTime(time, 'start')}
                               maxDate={this.props.endTime}
                               dateTime={this.props.startTime} />
              </PopoverTrigger>
            </Col>
            <Col sm={12} md={5}>
              <PopoverTrigger placement='top' popover={(
                <Popover>
                  终止时间
                </Popover>
              )}>
                <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                               amStyle='success'
                               onInput={e =>
                                        e.target.value = this.props.endTime}
                               onSelect={time =>
                                         this.props.changeTime(time, 'end')}
                               minDate={this.props.startTime}
                               dateTime={this.props.endTime} />
              </PopoverTrigger>
            </Col>
            <Col sm={12} md={2}>
              <Button amStyle='success' block type='submit'>
                查询
              </Button>
            </Col>
            <Col sm={12}>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>
                      姓名
                      <input placeholder='筛选姓名' className='am-fr'
                             style={{fontWeight: 'normal'}}
                             value={this.props.nameFilter}
                             onChange={
                               e => this.props.filter(e.target.value, 'name')
                             } />
                    </th>
                    <th>
                      学号/工号
                      <input placeholder='筛选学号/工号' className='am-fr'
                             style={{fontWeight: 'normal'}}
                             value={this.props.idFilter}
                             onChange={
                               e => this.props.filter(e.target.value, 'id')
                             } />
                    </th>
                    <th>签到时间</th>
                    <th>签到状态</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.records.map((ele, inx) => {
                      return (
                        <tr key={inx}>
                          <td>{ele.name}</td>
                          <td>{ele.ID}</td>
                          <td>{ele[dateTime]}</td>
                          <td>{ele.state}</td>
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
  startTime: state.checkSearch.startTime,
  endTime: state.checkSearch.endTime,
  records: state.checkSearch.records
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTime: (time, type) => dispatch(changeCheckSearchTime(time, type)),
    getCheckInfoAll: () => dispatch(getCheckInfoAll()),
    filter: (val, key) => dispatch(checkSearchFilter(val, key))
  };
};

CheckSearch = connect(mapStateToProps, mapDispatchToProps)(CheckSearch);

export default CheckSearch;
