import React, {Component} from 'react';
import {Grid, Col} from 'amazeui-react';
import {connect} from 'react-redux';

import ListView from '../../components/home/ListView';

class ListViews extends Component {
  render() {
    return (
      <Grid>
        <Col md={12}>
          <ListView type='/today/' data={this.props.todayData} title='a'
                    rfClick={() => this.props.rfClick('TODAY')}></ListView>
        </Col>
        <Col md={6} sm={12}>
          <ListView type='/news/' data={this.props.newsData} title='b'
                    rfClick={() => this.props.rfClick('NEWS')}></ListView>
        </Col>
        <Col md={6} sm={12}>
          <ListView type='/notice/' data={this.props.noticeData} title='b'
                    rfClick={() => this.props.rfClick('NOTICE')}></ListView>
        </Col>
      </Grid>
    );
  }
}

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
