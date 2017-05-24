import React, {Component} from 'react';
import {Grid, Col, Input, Table, DateTimeInput,
        PopoverTrigger, Popover, Button} from 'amazeui-react';
import {connect} from 'react-redux';

import {changeCheckInfoTime} from '../../../action';
import {getCheckInfo, getCheckInfoMine,
        getManHours} from '../../../action/fetch';

const timeHeader = ['8:00 - 9:00', '9:00 - 10:00',
                    '10:00 - 11:00', '11:00 - 12:00',
                    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
                    '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];

const dayHeader = ['一', '二', '三', '四', '五', '六', '日'];

class CheckInfo extends Component {
  componentDidMount() {
    this.props.getCheckInfo();
  }

  render() {
    const timeType = 'time_type';
    const dateTime = 'date_time';
    let lastTime = 'last_time';
    lastTime = this.props.detail[lastTime];
    let checkState = this.props.detail.state;
    return (
      <div>
        <div className='systemTitle'>
          签到信息
        </div>
        <hr></hr>
        <Grid id='checkInfoForm' style={{position: 'relative'}}>
          <Col sm={12} md={2}>
            <div className='input-name'>
              上次签到时间
            </div>
          </Col>
          <Col sm={12} md={10}>
            <Input value={lastTime} disabled />
          </Col>
          <Col sm={12} md={2}>
            <div className='input-name'>
              当前签到状态
            </div>
          </Col>
          <Col sm={12} md={10}>
            <Input value={checkState} disabled />
          </Col>
          <Col sm={12} md={6}>
            <Col sm={12} className='am-margin-top-lg'>
              <div className='systemTitle'>
                个人签到查询
              </div>
              <hr></hr>
            </Col>
            <Col sm={12} md={6}>
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
            <Col sm={12} md={6}>
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
            <Col sm={12}>
              <Button amStyle='success' block
                      onClick={() => this.props.getCheckInfoMine()}>
                查询
              </Button>
            </Col>
            <Col sm={12}>
              <Table responsive striped compact>
                <thead>
                  <tr>
                    <th>签到时间</th>
                    <th>签到状态</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.records.map((ele, inx) => {
                      return (
                        <tr key={inx}>
                          <td>{ele[dateTime]}</td>
                          <td>{ele.state}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Col>
          <Col sm={12} md={6}>
            <Col sm={12} className='am-margin-top-lg'>
              <div className='systemTitle'>
                工时查询
              </div>
              <hr></hr>
            </Col>
            <Col sm={12} md={12}>
              <PopoverTrigger placement='top' popover={(
                <Popover>
                  查询月份
                </Popover>
              )}>
                <DateTimeInput showTimePicker={false} format='YYYY-M'
                               minViewMode='months' viewMode='months'
                               amStyle='success'
                               onInput={e =>
                                        e.target.value = this.props.hourMonth}
                               onSelect={time =>
                                         this.props.changeTime(time, 'month')}
                               dateTime={this.props.hourMonth} />
              </PopoverTrigger>
            </Col>
            <Col sm={12}>
              <Button amStyle='success' block
                      onClick={() => this.props.getManHours()}>
                查询
              </Button>
            </Col>
            <Col sm={12}>
              <Table responsive striped compact>
                <thead>
                  <tr>
                    <th colSpan='2'>工时统计: {this.props.hours.length} 小时</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.hours.map((ele, inx) => {
                      return (
                        <tr key={inx}>
                          <td>
                            星期{dayHeader[parseInt(ele[timeType][0], 10) - 1]}
                            &nbsp;
                            {timeHeader[
                              parseInt(ele[timeType].substr(1), 10) - 1
                            ]}
                          </td>
                          <td>{ele.date}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  detail: state.checkInfo,
  startTime: state.checkInfo.startTime,
  endTime: state.checkInfo.endTime,
  hourMonth: state.checkInfo.hourMonth,
  records: state.checkInfo.records,
  hours: state.checkInfo.hours
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCheckInfo: () => dispatch(getCheckInfo()),
    changeTime: (time, type) => dispatch(changeCheckInfoTime(time, type)),
    getCheckInfoMine: () => dispatch(getCheckInfoMine()),
    getManHours: () => dispatch(getManHours())
  };
};

CheckInfo = connect(mapStateToProps, mapDispatchToProps)(CheckInfo);

export default CheckInfo;
