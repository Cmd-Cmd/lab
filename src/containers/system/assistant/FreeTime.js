import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, UCheck, Form, Grid, Col, Button} from 'amazeui-react';

import './FreeTime.css';

import {freeTimeChange} from '../../../action';
import {getFreeTime, saveFreeTime} from '../../../action/fetch';

class FreeTime extends Component {
  componentDidMount() {
    this.props.getFreeTime();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.saveFreeTime();
  }

  render() {
    const timeHeader = ['8:00 - 9:00', '9:00 - 10:00',
                        '10:00 - 11:00', '11:00 - 12:00',
                        '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
                        '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];
    return (
      <div>
        <div className='systemTitle'>
          空闲时间表
        </div>
        <hr></hr>
        <Form id='freeTimeForm' onSubmit={e => this.handleSubmit(e)}>
          <Grid>
            <Col sm={12}>
              <Table responsive striped bordered id='freeTimeTable'>
                <thead>
                  <tr>
                    <th className='am-text-primary'>空闲时间表</th>
                    <th>星期一</th>
                    <th>星期二</th>
                    <th>星期三</th>
                    <th>星期四</th>
                    <th>星期五</th>
                    <th>星期六</th>
                    <th>星期日</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    timeHeader.map((ele, inx) => {
                      let result = [
                        <th key={ele + 'th'}>{ele}</th>
                      ];
                      for (let i = 1 ; i <= 7; i++) {
                        let tempName = i + '' + (inx + 1);
                        result.push(
                          <td key={tempName}>
                            <UCheck type='checkbox' name={tempName}
                                    checked={this.props.timeData[tempName]}
                                    onChange={
                                      e =>
                                      this.props.checkboxChange(e.target.name)
                                    } />
                          </td>
                        );
                      }
                      return <tr key={ele}>{result}</tr>;
                    })
                  }
                </tbody>
              </Table>
            </Col>
            <Col sm={12}>
              <small className='am-text-danger'>
                <UCheck type='checkbox' label='空闲' inline
                        disabled defaultChecked />
                <UCheck type='checkbox' label='非空闲' inline
                        disabled />
              </small>
              <Button amStyle='success' type='submit' block>保存</Button>
            </Col>
          </Grid>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  timeData: state.freeTime
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkboxChange: type => dispatch(freeTimeChange(type)),
    getFreeTime: () => dispatch(getFreeTime()),
    saveFreeTime: () => dispatch(saveFreeTime())
  };
};

FreeTime = connect(mapStateToProps, mapDispatchToProps)(FreeTime);

export default FreeTime;
