import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'amazeui-react';

import './Sidebar.css';
import {sidebarData} from './sidebarData';

class Sidebar extends Component {
  render() {
    return (
      <ul id='Sidebar'>
        {sidebarData.map((ele, inx) => {
          return (
            <li key={inx}
                className={(this.props.active === inx) ? 'active' : ''}>
              <span onClick={() => {
                this.props.activeTo((this.props.active === inx) ? '-1' : inx);
              }}>
                {ele.name + ' '}
                <Icon icon={(this.props.active === inx) ?
                             'minus-square-o' :
                             'plus-square-o'}>
                </Icon>
              </span>
              <ul>
                {ele.links.map((ele, inx) => {
                  return (
                    <li key={inx}>
                      <Link to={ele.to}>{ele.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Sidebar;
