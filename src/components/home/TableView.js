import React, {Component} from 'react';
import {Icon, DateTimePicker, Button} from 'amazeui-react';
import {Link} from 'react-router';
import {Table, Column, Cell} from 'fixed-data-table';

import './TableView.css';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 50
    };
  }

  componentWillMount() {
    this.props.setTime(0);
  }

  componentDidMount() {
    this.setState({
      tableWidth: parseInt(document.getElementById('tableView').offsetWidth, 10)
    });
  }

  render() {
    let {data, title, english, time} = this.props;
    return (
      <div id='tableView'>
        <Link to={`/${english}`}>
          <h3 className={'title'}>
            {title}<span className='subTitle'>{english}</span>
          </h3>
        </Link>
        <Table rowHeight={40} headerHeight={50} height={340}
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
        <div id='timePickerContainer'>
          <Button id='pickerBtn' amStyle='primary' amSize='xs'
                  onClick={() => {
                    const temp = document.getElementById('timePicker');
                    temp.setAttribute('class', 'am-datepicker active');
                    document.body.onclick = function(e) {
                      let temp = e.target;
                      let flag = false;
                      while (!flag) {
                        if (temp.getAttribute('id') === 'timePicker') {
                          flag = true;
                        } else {
                          temp = temp.parentNode;
                        }
                        if (temp === document) {
                          break;
                        }
                      }
                      if (!flag) {
                        const temp = document.getElementById('timePicker');
                        temp.setAttribute('class', 'am-datepicker');
                        document.body.onclick = null;
                      }
                    };
                  }}>
            {(time === 0) ? '选择日期' : time}
          </Button>
          <DateTimePicker id='timePicker' showTimePicker={false}
                          format='YYYY/M/D'
                          onSelect={time => {
                            this.props.setTime(time);
                            const temp = document.getElementById('timePicker');
                            temp.setAttribute('class', 'am-datepicker');
                            document.body.onclick = null;
                          }} />
          <Link to={`/${english}`} className='am-text-sm am-fr'>
            <Icon icon='plus'> 更多</Icon>
          </Link>
        </div>
      </div>
    );
  }
}

export default TableView;
