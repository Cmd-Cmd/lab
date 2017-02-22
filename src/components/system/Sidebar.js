import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'amazeui-react';

import './Sidebar.css';
import {sidebarData} from './sidebarData';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: -1
    };
  }

  toggleUl(inx) {
    this.setState((prevState, props) => {
      return {
        active: (prevState.active === inx) ? -1 : inx
      };
    });
  }

  render() {
    return (
      <ul id='Sidebar'>
        {sidebarData.map((ele, inx) => {
          return (
            <li key={inx}
                className={(this.state.active === inx) ? 'active' : ''}>
              <span onClick={() => this.toggleUl(inx)}>
                {ele.name + ' '}
                <Icon icon={(this.state.active === inx) ?
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
