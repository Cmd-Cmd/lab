import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {connect} from 'react-redux';

import {navChangeTo, enterListing, getEssay, enterSearch} from './action';
import App from './components/App';
import Home from './components/home';
import Housing from './containers/housing';
import Listing from './containers/housing/Listing';
import Tabling from './containers/housing/Tabling';
import Essay from './containers/housing/Essay';
import Search from './containers/search';
import System from './components/system';
import NotFound from './components/notFound';

class Routers extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}
                      onEnter={() => this.props.navEnter('首页')}></IndexRoute>
          <Route path='/news' component={Housing} onEnter={() => {
            this.props.navEnter('新闻');
            this.props.onListing('NEWS');
          }}>
            <IndexRoute component={Listing}></IndexRoute>
            <Route path='/news/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('NEWS', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/notice' component={Housing} onEnter={() => {
            this.props.navEnter('公告');
            this.props.onListing('NOTICE');
          }}>
            <IndexRoute component={Listing}></IndexRoute>
            <Route path='/notice/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('NOTICE', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/today' component={Housing} onEnter={() => {
            this.props.navEnter('今日');
            this.props.onListing('TODAY');
          }}>
            <IndexRoute component={Tabling}></IndexRoute>
            <Route path='/today/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('TODAY', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/search' component={Search} onEnter={() => {
            this.props.navEnter('搜索');
            this.props.onSearch();
          }}></Route>
          <Route path='/system' component={System}
                 onEnter={() => this.props.navEnter('系统')}></Route>
          <Route path='*' component={NotFound}></Route>
          <Route path='/notFound'></Route>
        </Route>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navEnter: (text) => dispatch(navChangeTo(text)),
    onListing: (text) => dispatch(enterListing(text)),
    getEssay: (housing, id) => dispatch(getEssay(housing, id)),
    onSearch: () => dispatch(enterSearch())
  };
};

Routers = connect(mapStateToProps, mapDispatchToProps)(Routers);

export default Routers;
