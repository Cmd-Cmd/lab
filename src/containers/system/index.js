import React, {Component} from 'react';
import {Grid, Sticky} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import Sidebar from '../../components/system/Sidebar';
import './System.css';
import hint from '../../hint';

import {changeSystemActive} from '../../action';

class System extends Component {
  componentWillMount() {
    if (!this.props.logined) {
      hint('请先登录');
      hashHistory.replace('/');
    }
  }

  render() {
    const width = parseInt(document.documentElement.clientWidth, 10);
    return (
      <Grid id='System'>
        {(width > 640) ? (
            <Sticky>
              <div id='System-menu'>
                <Sidebar active={this.props.active}
                         infos={this.props.infos}
                         activeTo={this.props.activeTo}></Sidebar>
              </div>
            </Sticky>
          ) : (
            <div id='System-menu'>
              <Sidebar active={this.props.active}
                       infos={this.props.infos}
                       activeTo={this.props.activeTo}></Sidebar>
            </div>
          )}
        <div id='System-content'>
            {this.props.children}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    logined: state.login.logined,
    active: state.system.active,
    infos: state.login.infos
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    activeTo: inx => dispatch(changeSystemActive(inx))
  };
};

System = connect(mapStateToProps, mapDispatchToProps)(System);

export default System;
