import React, {Component} from 'react';
import {Router, Route, browserHistory,
        IndexRoute, IndexRedirect} from 'react-router';
import {connect} from 'react-redux';

import {navChangeTo, enterListing, enterSearch,
        changeSystemActive} from './action';

import {getEssay} from './action/fetch';
import App from './components/App';
import Home from './components/home';
import Housing from './containers/housing';
import Listing from './containers/housing/Listing';
import Tabling from './containers/housing/Tabling';
import Essay from './containers/housing/Essay';
import Search from './containers/search';
import System from './containers/system';
import Person from './containers/system/personal/Person';
import ChangePassword from './containers/system/personal/ChangePassword';
import NewUser from './containers/system/admin/NewUser';
import AddDrug from './containers/system/drug/AddDrug';
import DrugDetail from './containers/system/drug/DrugDetail';
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
          }}>
            <IndexRoute component={Listing} onEnter={() => {
              this.props.onListing('NEWS');
            }}></IndexRoute>
            <Route path='/news/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('NEWS', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/notice' component={Housing} onEnter={() => {
            this.props.navEnter('公告');
          }}>
            <IndexRoute component={Listing} onEnter={() => {
              this.props.onListing('NOTICE');
            }}></IndexRoute>
            <Route path='/notice/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('NOTICE', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/today' component={Housing} onEnter={() => {
            this.props.navEnter('今日');
          }}>
            <IndexRoute component={Tabling} onEnter={() => {
              this.props.onListing('TODAY');
            }}></IndexRoute>
            <Route path='/today/:id' component={Essay} onEnter={({params}) => {
              this.props.getEssay('TODAY', parseInt(params.id, 10));
            }}></Route>
          </Route>
          <Route path='/search' component={Search} onEnter={() => {
            this.props.navEnter('搜索');
            this.props.onSearch();
          }}></Route>
          <Route path='/system' component={System}
                 onEnter={() => this.props.navEnter('系统')}>
            <IndexRedirect to='/system/person'></IndexRedirect>
            <Route path='/system/person' component={Person} onEnter={() => {
              this.props.changeSystemActive(0);
            }}></Route>
            <Route path='/system/changePassword' component={ChangePassword}
                   onEnter={() => this.props.changeSystemActive(0)}></Route>
            <Route path='/system/newUser' component={NewUser} onEnter={() => {
              this.props.changeSystemActive(1);
            }}></Route>
            <Route path='/system/addDrug' component={AddDrug}
                   onenter={() => this.props.changeSystemActive(2)}></Route>
            <Route path='/system/drugDetail' component={DrugDetail}
                   onenter={() => this.props.changeSystemActive(2)}></Route>
          </Route>
          <Route path='/notFound' component={NotFound}></Route>
          <Route path='*' component={NotFound}></Route>
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
    onSearch: () => dispatch(enterSearch()),
    changeSystemActive: inx => dispatch(changeSystemActive(inx))
  };
};

Routers = connect(mapStateToProps, mapDispatchToProps)(Routers);

export default Routers;
