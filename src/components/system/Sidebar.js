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
          if (ele.level) {
            let temp = 'rank_' + ele.level.type;
            temp = this.props.infos[temp];
            for (let i = 0; i < ele.level.needs.length; i++) {
              if (temp === ele.level.needs[i]) {
                temp = true;
                break;
              }
            }
            if (temp !== true) {
              return null;
            }
          }
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
                  if (ele.level) {
                    let temp = 'rank_' + ele.level.type;
                    temp = this.props.infos[temp];
                    for (let i = 0; i < ele.level.needs.length; i++) {
                      if (temp === ele.level.needs[i]) {
                        temp = true;
                        break;
                      }
                    }
                    if (temp !== true) {
                      return null;
                    }
                  }
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
