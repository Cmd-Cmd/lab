import React, {Component} from 'react';
import {Icon, List, ListItem, ScrollSpy} from 'amazeui-react';
import {Link} from 'react-router';

import './ListView.css';

class ListView extends Component {
  render() {
    let {title, english} = this.props;
    return (
      <div className='listView'>
        <Link to={`/${english}`}>
          <h3 className={'title'}>
            {title}<span className='subTitle'>{english}</span>
          </h3>
        </Link>
        <List static>
        {this.props.data.map((ele, inx) => {
          return (
          <ListItem key={inx} className='am-padding-0'>
            <ScrollSpy>
              <Link to={`/${english}/${ele.id}`} className='am-text-truncate'>
              {ele.title}
              </Link>
            </ScrollSpy>
          </ListItem>
          );
        })}
          <Link to={`/${english}`} className='am-text-sm am-fr'>
            <Icon icon='plus'> 更多</Icon>
          </Link>
        </List>
      </div>
    );
  }
}

export default ListView;
