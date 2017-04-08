import React, {Component} from 'react';
import {Grid, Col, Button, UCheck, Input} from 'amazeui-react';
import {connect} from 'react-redux';
import 'wangeditor';

import hint from '../../../hint';

import {changeArticleType, changeArticleTitle,
        changeArticleContent, changeArticleText} from '../../../action';
import {publishArticle} from '../../../action/fetch';

let editor;

class NewArticle extends Component {
  componentDidMount() {
    window.wangEditor.config.printLog = false;
    editor = new window.wangEditor('articleEditor');

    editor.config.menus = window.wangEditor.config.menus.map((ele, inx) => {
      if (ele === 'video' || ele === 'location' || ele === 'table' ||
          ele === 'insertcode' || ele === 'emotion') {
        return null;
      }
      return ele;
    });

    const url = './Ashx/upload.ashx';
    editor.config.uploadImgUrl = url;

    editor.create();
    editor.$txt.html(this.props.content);
  }

  pubHandle(e) {
    if (this.props.title.trim().length === 0) {
      hint('请输入标题');
      return;
    }
    const html = editor.$txt.html().replace(/"/g, '\\"');
    const text = editor.$txt.text().substr(0, 100).replace(/"/g, '\\"');
    this.props.changeContent(html);
    this.props.changeText(text);
    this.props.publishArticle(editor);
  }

  render() {
    return (
      <div id='NewArticle' style={{position: 'relative'}}>
        <div className='systemTitle'>
          发布文章
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <UCheck type='radio' name='articleType' label='新闻' value='news'
                    inline amStyle='success'
                    checked={this.props.type === 'news'}
                    onChange={() => this.props.changeType('news')} />
            <UCheck type='radio' name='articleType' label='公告' value='notice'
                    inline amStyle='success'
                    checked={this.props.type === 'notice'}
                    onChange={() => this.props.changeType('notice')} />
            <Input placeholder='请输入标题...' value={this.props.title}
                   onChange={e => this.props.changeTitle(e.target.value)} />
          </Col>
          <Col sm={12}>
            <div id='articleEditor' style={{height: '600px'}}></div>
          </Col>
          <Col sm={12}>
            <Button amStyle='success' block onClick={e => this.pubHandle(e)}>
              确认发布
            </Button>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  type: state.newArticle.type,
  title: state.newArticle.title,
  content: state.newArticle.content
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeType: type => dispatch(changeArticleType(type)),
    changeTitle: title => dispatch(changeArticleTitle(title)),
    changeContent: content => dispatch(changeArticleContent(content)),
    changeText: text => dispatch(changeArticleText(text)),
    publishArticle: editor => dispatch(publishArticle(editor))
  };
};

NewArticle = connect(mapStateToProps, mapDispatchToProps)(NewArticle);

export default NewArticle;
