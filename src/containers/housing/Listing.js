import React, {Component} from 'react';
import {Titlebar, Icon, Sticky,
        ScrollSpy, Form, Input,
        Popover, PopoverTrigger,
        Button, ButtonGroup, Pagination} from 'amazeui-react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import './Listing.css';
import {listingPageTo} from '../../action';

class Listing extends Component {
  render() {
    const searchForm = (
      <Popover placement='right' amSize='sm' amStyle='secondary'>
        <Form inline onSubmit={(e) => {
          e.preventDefault();
          browserHistory.push('/search');
        }}>
          <Input placeholder={'搜索' + this.props.name + '...'}></Input>
        </Form>
      </Popover>
    );
    const props = {
      title: (
        <PopoverTrigger trigger='click' popover={searchForm}>
          <Icon icon='paperclip'> {this.props.name}</Icon>
        </PopoverTrigger>
      ),
      nav: [
        {title: (
          <span>
            <ButtonGroup>
              <Button amSize='sm' amStyle='link'
                      disabled={(this.props.pageNow === 0)}
                      onClick={() => {
                        this.props.changePage(this.props.pageNow - 1);
                      }}>
                <Icon icon='angle-double-left'></Icon> 上一页
              </Button>
              <Button amStyle='link' amSize='sm' disabled
                      className='am-padding-horizontal-0'>
                {this.props.pageNow + 1} / {this.props.pageAll + 1}
              </Button>
              <Button amSize='sm' amStyle='link'
                      disabled={(this.props.pageNow === this.props.pageAll)}
                      onClick={() => {
                        this.props.changePage(this.props.pageNow + 1);
                      }}>
                下一页 <Icon icon='angle-double-right'></Icon>
              </Button>
            </ButtonGroup>
          </span>
        )}]
    };
    let pageArr = [];
    let temp = (this.props.pageNow - 2 < 0) ? 0 : this.props.pageNow - 2;
    for (let i = temp; i < temp + 4 && i <= this.props.pageAll; i++) {
      pageArr.push(i + 1);
    }
    if (pageArr.length === 3 && pageArr[0] > 1) {
      pageArr.unshift(pageArr[0] - 1);
    }
    return (
      <div id='Listing'>
        <div className='titlebar-container'>
          <Sticky>
            <Titlebar {...props}></Titlebar>
          </Sticky>
        </div>
        <ul className='am-list'>
          {
            this.props.data.map((ele, inx) => {
              const temp = this.props.english.toLowerCase();
              return (
                <ScrollSpy key={inx}>
                <li className='am-list-item-dated'>
                    <Link to={`/${temp}/${ele.id}`}
                            className='am-list-item-hd'>{ele.title}</Link>
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
                  onClick={(e) => this.props.changePage(this.props.pageNow + 1)}
                  ></Icon>
          </Pagination.Item>
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.listing.name,
    english: state.listing.english,
    data: state.listing.listData,
    pageNow: state.listing.pageNow,
    pageAll: state.listing.pageAll
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: (page) => dispatch(listingPageTo(page))
  };
};

Listing = connect(mapStateToProps, mapDispatchToProps)(Listing);

export default Listing;
