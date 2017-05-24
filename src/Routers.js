import React, {Component} from 'react';
import {Router, Route, hashHistory,
        IndexRoute, IndexRedirect} from 'react-router';
import {connect} from 'react-redux';

import {navChangeTo, enterListing, changeSystemActive} from './action';
import {token} from './action/fetch';

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
import ManagerUser from './containers/system/admin/ManagerUser';
import ManagerRank from './containers/system/admin/ManagerRank';
import AddDrug from './containers/system/drug/AddDrug';
import DrugDetail from './containers/system/drug/DrugDetail';
import ManagerDrug from './containers/system/drug/ManagerDrug';
import DrugInOut from './containers/system/drug/DrugInOut';
import AddMix from './containers/system/mix/AddMix';
import MixDetail from './containers/system/mix/MixDetail';
import ManagerMix from './containers/system/mix/ManagerMix';
import NewArticle from './containers/system/article/NewArticle';
import ManagerArticle from './containers/system/article/ManagerArticle';
import ArticleDetail from './containers/system/article/ArticleDetail';
import AddDevice from './containers/system/device/AddDevice';
import ManagerDevice from './containers/system/device/ManagerDevice';
import DeviceDetail from './containers/system/device/DeviceDetail';
import CheckInfo from './containers/system/assistant/CheckInfo';
import FreeTime from './containers/system/assistant/FreeTime';
import WorkTimeAll from './containers/system/assistant/WorkTimeAll';
import WorkTimeMine from './containers/system/assistant/WorkTimeMine';
import CheckSearch from './containers/system/assistant/CheckSearch';
import Reset from './containers/Reset';
import NotFound from './components/notFound';

class Routers extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App} onEnter={(ns, rp, cb) => {
          if (!localStorage.id || !localStorage.token) {
            cb();
          } else {
            this.props.token(cb, {
              id: localStorage.id,
              pw: localStorage.token,
              No: 'token',
              str: 'token'
            });
          }
        }}>
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
          }}></Route>
          <Route path='/system' component={System} onEnter={(ns, rp) => {
            this.props.navEnter('系统');
          }}>
            <IndexRedirect to='/system/person'></IndexRedirect>
            <Route path='/system/person' component={Person}
                   onEnter={() => this.props.changeSystemActive(0)}></Route>
            <Route path='/system/changePassword' component={ChangePassword}
                   onEnter={() => this.props.changeSystemActive(0)}></Route>
            <Route path='/system/newUser' component={NewUser}
                  onEnter={() => this.props.changeSystemActive(1)}></Route>
            <Route path='/system/userInfoList' component={ManagerUser}
                   onEnter={() => this.props.changeSystemActive(1)}></Route>
            <Route path='/system/userRankList' component={ManagerRank}
                  onEnter={() => this.props.changeSystemActive(1)}></Route>
            <Route path='/system/addDrug' component={AddDrug}
                   onEnter={() => this.props.changeSystemActive(2)}></Route>
            <Route path='/system/drugDetail' component={DrugDetail}
                   onEnter={() => this.props.changeSystemActive(2)}></Route>
            <Route path='/system/managerDrug' component={ManagerDrug}
                   onEnter={() => this.props.changeSystemActive(2)}></Route>
            <Route path='/system/drugInOut' component={DrugInOut}
                   onEnter={() => this.props.changeSystemActive(2)}></Route>
            <Route path='/system/addMix' component={AddMix}
                   onEnter={() => this.props.changeSystemActive(3)}></Route>
            <Route path='/system/mixDetail' component={MixDetail}
                   onEnter={() => this.props.changeSystemActive(3)}></Route>
            <Route path='/system/managerMix' component={ManagerMix}
                   onEnter={() => this.props.changeSystemActive(3)}></Route>
            <Route path='/system/newArticle' component={NewArticle}
                   onEnter={() => this.props.changeSystemActive(4)}></Route>
            <Route path='/system/managerArticle' component={ManagerArticle}
                   onEnter={() => this.props.changeSystemActive(4)}></Route>
            <Route path='/system/articleDetail' component={ArticleDetail}
                   onEnter={() => this.props.changeSystemActive(4)}></Route>
            <Route path='/system/addDevice' component={AddDevice}
                   onEnter={() => this.props.changeSystemActive(5)}></Route>
            <Route path='/system/managerDevice' component={ManagerDevice}
                   onEnter={() => this.props.changeSystemActive(5)}></Route>
            <Route path='/system/deviceDetail' component={DeviceDetail}
                   onEnter={() => this.props.changeSystemActive(5)}></Route>
            <Route path='/system/checkInfo' component={CheckInfo}
                   onEnter={() => this.props.changeSystemActive(6)}></Route>
            <Route path='/system/checkSearch' component={CheckSearch}
                   onEnter={() => this.props.changeSystemActive(6)}></Route>
            <Route path='/system/freeTime' component={FreeTime}
                   onEnter={() => this.props.changeSystemActive(6)}></Route>
            <Route path='/system/workTimeAll' component={WorkTimeAll}
                   onEnter={() => this.props.changeSystemActive(6)}></Route>
            <Route path='/system/workTimeMine' component={WorkTimeMine}
                   onEnter={() => this.props.changeSystemActive(6)}></Route>
          </Route>ManagerAssistant
          <Route path='/reset' component={Reset} onEnter={() => {
            this.props.navEnter('重置');
          }}></Route>
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
    changeSystemActive: inx => dispatch(changeSystemActive(inx)),
    token: (cb, temp) => dispatch(token(cb, temp))
  };
};

Routers = connect(mapStateToProps, mapDispatchToProps)(Routers);

export default Routers;
