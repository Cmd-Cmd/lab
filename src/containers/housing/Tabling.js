import React, {Component} from 'react';
import {Icon, Sticky, Button, Form, Input, DateTimePicker} from 'amazeui-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Table, Column, Cell} from 'fixed-data-table';

import './Tabling.css';
import {tablingTime} from '../../action';

class Tabling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 200
    };
  }

  componentWillMount() {
    this.props.setTime(0);
  }

  componentDidMount() {
    this.setState({
      tableWidth: parseInt(document.getElementById('tabling').offsetWidth, 10)
    });
  }

  render() {
    let {data, time, setTime} = this.props;
    const searchBtn = (
      <Button amStyle='secondary' type='submit'>
        <Icon icon='search'>
          &nbsp;<span className='am-hide-sm-only'>搜索</span>
        </Icon>
      </Button>
    );
    const dataBtn = (
      <div>
        <Button amStyle='primary' onClick={() => {
          const temp = document.getElementById('tablingDate');
          temp.setAttribute('class', 'am-datepicker active');
          document.body.onclick = function(e) {
            let temp = e.target;
            let flag = false;
            while (!flag) {
              if (temp.getAttribute('id') === 'tablingDate') {
                flag = true;
              } else {
                temp = temp.parentNode;
              }
              if (temp === document) {
                break;
              }
            }
            if (!flag) {
              const temp = document.getElementById('tablingDate');
              temp.setAttribute('class', 'am-datepicker');
              document.body.onclick = null;
            }
          };
        }}>
          <Icon icon='calendar'>
            &nbsp;<span className='am-hide-sm-only' id='dataShow'>
              {(time === 0) ? '选择日期' : time}
            </span>
          </Icon>
        </Button>
        <Button amStyle='danger' onClick={() => setTime(0)}>
          <Icon icon='close'></Icon>
        </Button>
        <DateTimePicker id='tablingDate' showTimePicker={false}
                        format='YYYY/M/D' caretDisplayed={false}
                        onSelect={time => {
                          setTime(time);
                          const temp = document.getElementById('tablingDate');
                          temp.setAttribute('class', 'am-datepicker');
                          document.body.onclick = null;
                        }} />
      </div>
    );
    return (
      <div id='tabling'>
        <Sticky>
          <Form>
            <Input btnBefore={searchBtn} btnAfter={dataBtn} />
          </Form>
        </Sticky>
        <Table rowHeight={40} headerHeight={50} height={700}
               rowsCount={data.length}
               width={this.state.tableWidth}>
          <Column width={120} header={<Cell>时间</Cell>} fixed
                  cell={props => (
                    <Link to={`/today/${data[props.rowIndex].id}`}>
                      <Cell>{data[props.rowIndex].time}</Cell>
                    </Link>
                  )}/>
          <Column width={80} header={<Cell>教室</Cell>} fixed
                  cell={props => (
                    <Link to={`/today/${data[props.rowIndex].id}`}>
                      <Cell>{data[props.rowIndex].room}</Cell>
                    </Link>
                  )}/>
          <Column width={200} header={<Cell>内容</Cell>} flexGrow={1}
                  cell={props => (
                    <Link to={`/today/${data[props.rowIndex].id}`}>
                      <Cell>{data[props.rowIndex].content}</Cell>
                    </Link>
                  )}/>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.tabling.data,
    time: state.tabling.time
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTime: time => dispatch(tablingTime(time))
  };
};

Tabling = connect(mapStateToProps, mapDispatchToProps)(Tabling);

export default Tabling;
