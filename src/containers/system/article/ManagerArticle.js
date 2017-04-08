import React, {Component} from 'react';
import {Sticky, Button, Input, Icon,
        Grid, Col, Table, DateTimeInput} from 'amazeui-react';
import {connect} from 'react-redux';

import './ManagerArticle.css';

import {changeManagerArticleTime} from '../../../action';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class ManagerArticle extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.getArticle(e.target.title.value);
  }

  render() {
    return (
      <div id='ManagerArticle' style={{position: 'relative'}}>
        <div className='systemTitle'>
          文章管理
        </div>
        <hr></hr>
        <Sticky>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input amStyle='success' placeholder='搜索新闻/公告...' name='title'
                   btnAfter={searchBtn} />
          </form>
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
            <Table hover responsive>
              <thead>
                <tr>
                  <th>新闻标题</th>
                  <th>发布时间</th>
                  <th>发布人</th>
                  <th>点击量</th>
                  <th style={{width: '150px'}}>操作</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  startTime: state.managerArticle.startTime,
  endTime: state.managerArticle.endTime
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTime: (time, type) => dispatch(changeManagerArticleTime(time, type))
  };
};

ManagerArticle = connect(mapStateToProps, mapDispatchToProps)(ManagerArticle);

export default ManagerArticle;
