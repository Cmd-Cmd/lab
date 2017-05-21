import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Form, Grid, Col, UCheck, ModalTrigger,
        Button, Icon, Badge, Modal} from 'amazeui-react';

import './WorkTimeAll.css';

import {workTimeAllChange, workTimeAllModalChange} from '../../../action';
import {getWorkTimeAll, getFreeTimeByType, delDay,
        workTimeInsert, delWorkTime} from '../../../action/fetch';

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

class WorkTimeAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '',
      type: ''
    };
  }

  componentDidMount() {
    this.props.getWorkTimeAll();
  }

  handleWeekClick(temp) {
    this.props.weekChange(temp);
    this.props.getWorkTimeAll();
  }

  modalConfirm() {
    let tempData = new Date(this.props.weekData.startTime);
    const tempDay = parseInt(this.state.type[0], 10) - 1;
    tempData.setTime(tempData.getTime() + 86400000 * tempDay);
    const data = this.props.weekData.tempModalData;
    let worktime = [];
    for (let i = 0 ; i < data.length ; i++) {
      if (data[i].checked) {
        worktime.push({
          ID: data[i].id,
          name: data[i].name,
          'time_type': this.state.type,
          'date_time': formatDate(tempData, '-')
        });
      }
    }
    if (worktime.length > 0) {
      this.props.workTimeInsert(worktime);
    }
  }

  addWorkTime(e) {
    const name = e.currentTarget.name;
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.modalTitle = `星期${dayHeader[parseInt(name[0], 10) - 1]}`;
      nextState.modalTitle += timeHeader[parseInt(name.substr(1), 10) - 1];
      nextState.type = name;
      return nextState;
    });
    this.props.getFreeTime(name);
  }

  delDay(inx) {
    let tempData = new Date(this.props.weekData.startTime);
    tempData.setTime(tempData.getTime() + 86400000 * inx);
    this.props.delDay(formatDate(tempData, '-'));
  }

  render() {
    const {startTime, endTime, tempModalData} = this.props.weekData;
    const thisWeek = `${formatDate(startTime)} - ${formatDate(endTime)}`;
    let addWorkTimeModal = (
      <Modal type='confirm' title={this.state.modalTitle}>
        {
          tempModalData.map((ele, inx) => (
            <div key={inx}>
              <UCheck type='checkbox' inline name={ele.id}
                      label={ele.name} checked={ele.checked}
                      onChange={e => this.props.modalChange(e.target.name)} />
            </div>
          ))
        }
      </Modal>
    );
    return (
      <div>
        <div className='systemTitle'>
          排班表
        </div>
        <hr></hr>
        <Grid id='workTimeAllGrid'>
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
            <Form id='workTimeAllForm' onSubmit={e => this.handleSubmit(e)}>
              <Table responsive bordered id='workTimeAllTable'>
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
                              this.props.weekData[tempName]
                                  .map((element, index) => (
                                    <Badge amStyle='success' round
                                           key={tempName + '-' + index}>
                                      {element.name}
                                      <ModalTrigger modal={(
                                        <Modal type='confirm'>
                                          确定删除此排班吗？
                                        </Modal>
                                      )} onConfirm={
                                        () => this.props
                                                  .delWorkTime(element.timeId)
                                      }>
                                        <Icon className='am-fr' icon='minus'
                                          name={element.timeId} />
                                      </ModalTrigger>
                                    </Badge>
                                  ))
                            }
                            <ModalTrigger modal={addWorkTimeModal}
                                          onConfirm={() => this.modalConfirm()}>
                              <Button block amStyle='default' amSize='xs'
                                      name={tempName}
                                      onClick={(e) => this.addWorkTime(e)}>
                                <Icon icon='plus' />
                              </Button>
                            </ModalTrigger>
                          </td>
                        );
                      }
                      return <tr key={ele}>{result}</tr>;
                    })
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th className='am-text-danger'>删除整天</th>
                    {
                      dayHeader.map((ele, inx) => (
                        <td key={inx}>
                          <ModalTrigger onConfirm={() => this.delDay(inx)}
                                        modal={(
                                          <Modal type='confirm'>
                                            确定删除整天排班吗？
                                          </Modal>
                                        )} >
                            <Button block amStyle='danger' amSize='xs'>
                              <Icon icon='trash' />
                            </Button>
                          </ModalTrigger>
                        </td>
                      ))
                    }
                  </tr>
                </tfoot>
              </Table>
            </Form>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  weekData: state.workTimeAll
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getWorkTimeAll: () => dispatch(getWorkTimeAll()),
    weekChange: temp => dispatch(workTimeAllChange(temp)),
    getFreeTime: type => dispatch(getFreeTimeByType(type)),
    modalChange: id => dispatch(workTimeAllModalChange(id)),
    workTimeInsert: worktime => dispatch(workTimeInsert(worktime)),
    delWorkTime: id => dispatch(delWorkTime(id)),
    delDay: inx => dispatch(delDay(inx))
  };
};

WorkTimeAll = connect(mapStateToProps, mapDispatchToProps)(WorkTimeAll);

export default WorkTimeAll;
