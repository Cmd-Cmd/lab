import React, {Component} from 'react';
import {Grid, Col, Input, Table, DateTimeInput,
        PopoverTrigger, Popover, Button} from 'amazeui-react';
import {connect} from 'react-redux';

import {changeCheckInfoTime} from '../../../action';
import {getCheckInfo, getCheckInfoMine} from '../../../action/fetch';

class CheckInfo extends Component {
  componentDidMount() {
    this.props.getCheckInfo();
  }

  render() {
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
          <Col sm={12} className='am-margin-top-lg'>
            <div className='systemTitle'>
              个人签到查询
            </div>
            <hr></hr>
          </Col>
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
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  detail: state.checkInfo,
  startTime: state.checkInfo.startTime,
  endTime: state.checkInfo.endTime,
  records: state.checkInfo.records
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCheckInfo: () => dispatch(getCheckInfo()),
    changeTime: (time, type) => dispatch(changeCheckInfoTime(time, type)),
    getCheckInfoMine: () => dispatch(getCheckInfoMine())
  };
};

CheckInfo = connect(mapStateToProps, mapDispatchToProps)(CheckInfo);

export default CheckInfo;
