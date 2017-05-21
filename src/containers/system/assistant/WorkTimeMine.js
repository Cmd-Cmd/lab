import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Form, Grid, Col, Icon, Button} from 'amazeui-react';

import './WorkTimeMine.css';

import {workTimeMineChange} from '../../../action';
import {getWorkTimeMine} from '../../../action/fetch';

function formatDate(temp = new Date(), joiner = '.') {
  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  return `${year}${joiner}${month}${joiner}${day}`;
}

const timeHeader = ['8:00 - 9:00', '9:00 - 10:00',
                    '10:00 - 11:00', '11:00 - 12:00',
                    '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
                    '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];

const dayHeader = ['一', '二', '三', '四', '五', '六', '日'];

class WorkTimeMine extends Component {
  componentDidMount() {
    this.props.getWorkTimeMine();
  }

  handleWeekClick(temp) {
    this.props.weekChange(temp);
    this.props.getWorkTimeMine();
  }

  render() {
    const {startTime, endTime} = this.props.weekData;
    const thisWeek = `${formatDate(startTime)} - ${formatDate(endTime)}`;
    return (
      <div>
        <div className='systemTitle'>
          我的排班表
        </div>
        <hr></hr>
        <Grid id='workTimeMineGrid'>
          <Col sm={12} md={6}>
            <Button amStyle='secondary' block
                    onClick={() => this.handleWeekClick(true)}>
              前一周
            </Button>
          </Col>
          <Col sm={12} md={6}>
            <Button amStyle='secondary' block
                    onClick={() => this.handleWeekClick(false)}>
              后一周
            </Button>
          </Col>
          <Col sm={12} className='am-margin-top-sm am-text-center'>
            {thisWeek}
          </Col>
          <Col sm={12}>
            <Form id='workTimeMineForm' onSubmit={e => this.handleSubmit(e)}>
              <Table responsive bordered id='workTimeMineTable'>
                <thead>
                  <tr>
                    <th className='am-text-primary'>排班表</th>
                    {
                      dayHeader.map((ele, inx) => (
                        <th key={inx}>星期{ele}</th>
                      ))
                    }
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
                            {
                              this.props.weekData[tempName] ?
                              <Icon icon='check' className='am-text-success' />
                              : null
                            }
                          </td>
                        );
                      }
                      return <tr key={ele}>{result}</tr>;
                    })
                  }
                </tbody>
              </Table>
            </Form>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  weekData: state.workTimeMine
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    weekChange: temp => dispatch(workTimeMineChange(temp)),
    getWorkTimeMine: () => dispatch(getWorkTimeMine())
  };
};

WorkTimeMine = connect(mapStateToProps, mapDispatchToProps)(WorkTimeMine);

export default WorkTimeMine;
