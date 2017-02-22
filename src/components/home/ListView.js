import React, {Component} from 'react';
import {Icon, List, ListItem, ScrollSpy} from 'amazeui-react';
import {Link} from 'react-router';

import './ListView.css';

class ListView extends Component {
  render() {
    let title;
    let english = this.props.type.substr(1);
    english = english.substr(0, english.length - 1);
    switch (english) {
      case 'news':
        title = '新闻';
        break;
      case 'notice':
        title = '公告';
        break;
      case 'today':
        title = '今日';
        break;
      default:
        break;
    }
    return (
      <div className='listView'>
        <Link to={'/' + english}>
          <h3 className={'title ' + this.props.title}>
            {title}<span className='subTitle'>{english}</span>
          </h3>
        </Link>
        <List static>
        {this.props.data.map((ele, inx) => {
          return (
          <ListItem key={inx} className='am-padding-0'>
            <ScrollSpy>
              <Link to={this.props.type +  ele.id} className='am-text-truncate'>
              {ele.title}
              </Link>
            </ScrollSpy>
          </ListItem>
          );
        })}
          <Link to={'/' + english} className='am-text-sm am-fr'>
            <Icon icon='plus'> 更多</Icon>
          </Link>
        </List>
      </div>
    );
  }
}

export default ListView;
