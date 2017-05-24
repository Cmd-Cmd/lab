import React, {Component} from 'react';
import {Sticky, Button, Input, Icon, Modal, ModalTrigger,
        Grid, Col, Table, DateTimeInput} from 'amazeui-react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import './ManagerArticle.css';

import {changeManagerArticleTime, changeArticleDetailId,
        changeManagerArticleTitle} from '../../../action';
import {getArticle, deleteArticle} from '../../../action/fetch';

const searchBtn = (
  <Button amStyle='success' type='submit'>
    <Icon icon='search'> 搜索</Icon>
  </Button>
);

class ManagerArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDeleteId: '',
      tempDeleteTitle: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getArticle(e.target.title.value);
  }

  handleEdit(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.props.changeArticleDetailId(e.currentTarget.name);
    hashHistory.push('/system/articleDetail');
  }

  handleDelete(e) {
    if (e.currentTarget.tagName.toLowerCase() !== 'button') {
      return;
    }
    this.setState({
      tempDeleteId: e.currentTarget.name,
      tempDeleteTitle: e.currentTarget.dataset.title
    });
  }

  handleModal() {
    this.props.deleteArticle(this.state.tempDeleteId);
  }

  render() {
    const memberName = 'Member_Name';
    return (
      <div id='ManagerArticle' style={{position: 'relative'}}>
        <div className='systemTitle'>
          文章管理
        </div>
        <hr></hr>
        <Sticky>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input amStyle='success' placeholder='搜索新闻/公告...' name='title'
                   value={this.props.title}
                   onChange={e => this.props.changeTitle(e.target.value)}
                   btnAfter={searchBtn} />
          </form>
        </Sticky>
        <Grid className='am-margin-top'>
          <Col sm={12} md={6}>
            <span>起始时间</span>
            <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                           amStyle='success'
                           onInput={e =>
                                    e.target.value = this.props.startTime}
                           onSelect={time =>
                                     this.props.changeTime(time, 'start')}
                           maxDate={this.props.endTime}
                           dateTime={this.props.startTime} />
          </Col>
          <Col sm={12} md={6}>
            <span>终止时间</span>
            <DateTimeInput showTimePicker={false} format='YYYY-M-D'
                           amStyle='success'
                           onInput={e =>
                                    e.target.value = this.props.endTime}
                           onSelect={time =>
                                     this.props.changeTime(time, 'end')}
                           minDate={this.props.startTime}
                           dateTime={this.props.endTime} />
          </Col>
          <Col sm={12}>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>标题</th>
                  <th>发布时间</th>
                  <th>发布人</th>
                  <th>点击量</th>
                  <th style={{width: '150px'}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.articles.map((ele, inx) => (
                    <tr key={inx}>
                      <td>
                        <span className='am-text-primary'>
                          {`[${ele.type === '1' ? '新闻' : '公告'}]`}
                        </span>
                        {ele.Title}
                      </td>
                      <td>{ele.DateTime}</td>
                      <td>{ele[memberName]}</td>
                      <td>{ele.Hits}</td>
                      <td>
                        <Button amStyle='secondary' amSize='xs'
                                name={ele.ArticleID}
                                onClick={e => this.handleEdit(e)}>
                          <Icon icon='edit'> 编辑</Icon>
                        </Button>
                        <ModalTrigger onConfirm={()=>this.handleModal()} modal={
                          <Modal type='confirm' title='删除文章'>
                            确定删除文章 {this.state.tempDeleteTitle} 吗？
                          </Modal>
                        }>
                          <Button amStyle='danger' amSize='xs'
                                  name={ele.ArticleID} data-title={ele.Title}
                                  onClick={e => this.handleDelete(e)}>
                            <Icon icon='trash'> 删除</Icon>
                          </Button>
                        </ModalTrigger>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  startTime: state.managerArticle.startTime,
  endTime: state.managerArticle.endTime,
  articles: state.managerArticle.articles,
  title: state.managerArticle.title
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTime: (time, type) => dispatch(changeManagerArticleTime(time, type)),
    getArticle: title => dispatch(getArticle(title)),
    deleteArticle: id => dispatch(deleteArticle(id)),
    changeArticleDetailId: id => dispatch(changeArticleDetailId(id)),
    changeTitle: title => dispatch(changeManagerArticleTitle(title))
  };
};

ManagerArticle = connect(mapStateToProps, mapDispatchToProps)(ManagerArticle);

export default ManagerArticle;
