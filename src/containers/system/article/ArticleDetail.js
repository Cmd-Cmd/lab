import React, {Component} from 'react';
import {Grid, Col, Button, UCheck, Input} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import 'wangeditor';

import hint from '../../../hint';

import {changeArticleDetailType, changeArticleDetailTitle,
        changeArticleDetailContent, resetArticleDetail,
        changeArticleDetailText} from '../../../action';
import {updateArticle, getArticleDetail} from '../../../action/fetch';

let editor;

class ArticleDetail extends Component {
  componentDidMount() {
    window.wangEditor.config.printLog = false;
    editor = new window.wangEditor('articleDetailEditor');

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

    if (this.props.id === -1) {
      hint('请先选择文章');
      hashHistory.replace('/system/managerArticle');
    } else {
      this.props.getArticleDetail(this.props.id, editor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id === -1) {
      hashHistory.replace('/system/managerArticle');
    }
  }

  componentWillUnmount() {
    this.props.resetArticleDetail();
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
    this.props.updateArticle(editor);
  }

  render() {
    return (
      <div id='ArticleDetail' style={{position: 'relative'}}>
        <div className='systemTitle'>
          编辑文章
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
            <div id='articleDetailEditor' style={{height: '600px'}}></div>
          </Col>
          <Col sm={12}>
            <Button amStyle='success' block onClick={e => this.pubHandle(e)}>
              修改发布
            </Button>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  type: state.articleDetail.type,
  title: state.articleDetail.title,
  content: state.articleDetail.content,
  id: state.articleDetail.id
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getArticleDetail: (id, editor) => dispatch(getArticleDetail(id, editor)),
    changeType: type => dispatch(changeArticleDetailType(type)),
    changeTitle: title => dispatch(changeArticleDetailTitle(title)),
    changeContent: content => dispatch(changeArticleDetailContent(content)),
    changeText: text => dispatch(changeArticleDetailText(text)),
    updateArticle: editor => dispatch(updateArticle(editor)),
    resetArticleDetail: () => dispatch(resetArticleDetail())
  };
};

ArticleDetail = connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);

export default ArticleDetail;
