import React, {Component} from 'react';
import {Grid, Col} from 'amazeui-react';
import {connect} from 'react-redux';

import ListView from '../../components/home/ListView';
import TableView from '../../components/home/TableView';

class ListViews extends Component {
  render() {
    return (
      <Grid>
        <Col md={12}>
          <TableView title='今日' english='today'
                     data={this.props.todayData}></TableView>
        </Col>
        <Col md={6} sm={12}>
          <ListView title='新闻' english='news'
                    data={this.props.newsData}></ListView>
        </Col>
        <Col md={6} sm={12}>
          <ListView title='公告' english='notice'
                    data={this.props.noticeData}></ListView>
        </Col>
      </Grid>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    newsData: state.listView.newsData,
    noticeData: state.listView.noticeData,
    todayData: state.listView.todayData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

ListViews = connect(mapStateToProps, mapDispatchToProps)(ListViews);

export default ListViews;
