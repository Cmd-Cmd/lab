import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {ModalTrigger, Modal, Icon, Grid, Col, Tabs,
        Input, Button, Table} from 'amazeui-react';
import $ from 'jquery';

import hint from '../../../hint';
import './DeviceDetail.css';

class DeviceDetail extends Component {
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

DeviceDetail = connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);

export default DeviceDetail;
