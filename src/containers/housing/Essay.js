import React, {Component} from 'react';
import {Article} from 'amazeui-react';
import {connect} from 'react-redux';

class Essay extends Component {
  render() {
    return (
      <Article className='am-margin-bottom' title={this.props.essay.title}
               meta={this.props.essay.meta}>
        <div dangerouslySetInnerHTML={{__html: this.props.essay.content}}></div>
      </Article>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    type: state.listing.english,
    essay: state.essay
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

Essay = connect(mapStateToProps, mapDispatchToProps)(Essay);

export default Essay;
