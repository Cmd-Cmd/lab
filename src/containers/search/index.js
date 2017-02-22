import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {Breadcrumb, Container, UCheck, Article, Pagination,
        Form, Input, Button, Sticky, ScrollSpy, Icon} from 'amazeui-react';
import {connect} from 'react-redux';

import './Search.css';
import {searchPageTo} from '../../action';

class Search extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='Search'>
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item>
              <IndexLink to='/'>首页</IndexLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/search'>搜索</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Sticky>
            <Form id='searchInput' onSubmit={(e) => {
              e.preventDefault();
              alert('TODO');
            }}>
              <Input btnAfter={<Button amStyle='secondary'>搜索</Button>}
                     placeholder='搜索...' amStyle='secondary'></Input>
               <UCheck label='今日' amStyle='success' inline defaultChecked />
               <UCheck label='新闻' amStyle='success' inline defaultChecked />
               <UCheck label='公告' amStyle='success' inline defaultChecked />
            </Form>
          </Sticky>
          <ul className='am-list'>
            {
              this.props.data.map((ele, inx) => {
                return (
                  <ScrollSpy key={inx}>
                    <li>
                        <Link to={`/${ele.type}/${ele.id}`}
                              className='am-list-item-hd'>
                          <Article title={ele.title}>
                            <div className='am-article-bd'>
                              <p className='am-margin-0 am-article-lead'>
                                {ele.lead}
                              </p>
                            </div>
                          </Article>
                        </Link>
                        <span className='am-list-date'>{ele.date}</span>
                    </li>
                  </ScrollSpy>
                );
              })}
          </ul>
          <Pagination centered>
            <Pagination.Item disabled={(this.props.pageNow === 0)}>
              <Icon icon='angle-double-left'
                    onClick={
                      (e) => this.props.changePage(this.props.pageNow - 1)}>
              </Icon>
            </Pagination.Item>
            {pageArr.map((ele, inx) => {
              return (
                <Pagination.Item key={inx}
                                 active={this.props.pageNow === ele - 1}>
                  <Icon icon='blank'
                        onClick={(e) => this.props.changePage(ele - 1)}>
                    {ele}
                  </Icon>
                </Pagination.Item>
              );
            })}
            <Pagination.Item disabled={(this.props.pageNow ===
                                        this.props.pageAll)}>
              <Icon icon='angle-double-right'
                    onClick={(e) => {
                      this.props.changePage(this.props.pageNow + 1);
                    }}></Icon>
            </Pagination.Item>
          </Pagination>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.search.result,
    pageNow: state.search.pageNow,
    pageAll: state.search.pageAll
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: (page) => dispatch(searchPageTo(page))
  };
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
