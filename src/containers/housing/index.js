import React, {Component} from 'react';
import {Container, Breadcrumb} from 'amazeui-react';
import {IndexLink} from 'react-router';
import {connect} from 'react-redux';

import './Housing.css';

class Housing extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let height = parseInt(document.documentElement.clientHeight, 10);
    return (
      <div id='Housing'>
        <Container style={{minHeight: height - 255 + 'px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <IndexLink to='/'>首页</IndexLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <IndexLink to={'/' + this.props.english.toLowerCase()}>
                {this.props.name}
              </IndexLink>
            </Breadcrumb.Item>
          </Breadcrumb>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.listing.name,
    english: state.listing.english
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

Housing = connect(mapStateToProps, mapDispatchToProps)(Housing);

export default Housing;
