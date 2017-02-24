import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Topbar, CollapsibleNav, Nav,
        Input, Button, Icon, Form} from 'amazeui-react';
import {IndexLink, Link, browserHistory} from 'react-router';

import LoginButton from './LoginButton';
import './Header.css';

const logined = true;

const navArr = [
  {name: '首页', link: '/'},
  {name: '平台概况', link: '/'},
  {name: '信息中心', link: '/'},
  {name: '教师中心', link: '/'},
  {name: '教师风采', link: '/'},
  {name: '教学资源', link: '/'},
  {name: '开放实验', link: '/'},
  {name: '平台系统', link: '/'},
];
const btnSearch = <Button type='submit'><Icon icon='search'></Icon></Button>;

class Header extends Component {
  render() {
    const navClick = this.props.navClick;
    return (
      <Topbar className='am-margin-0' inverse id='Topbar' toggleNavKey='nav'>
        <IndexLink to='/' onClick={() => navClick('首页')}>
          <img alt='logo' className='logo'
               src={process.env.PUBLIC_URL + '/img/logo.png'}></img>
        </IndexLink>
        <div className='am-fr am-margin-top-lg'>
          <Form inline onSubmit={(e) => {
            e.preventDefault();
            browserHistory.push('/search');
          }}>
            <Input type='text' btnBefore={btnSearch} placeholder='搜索'></Input>
          </Form>
          {(logined) ?
            <Link to='/system'>
              <Button amStyle='secondary' className='btn-response'>
                <Icon icon='user'> 个人中心</Icon>
              </Button>
            </Link> :
            <span>
              <LoginButton></LoginButton>
              <Button amStyle='secondary' className='btn-response'>注册</Button>
            </span>
          }
        </div>
        <CollapsibleNav eventKey='nav'>
          <Nav topbar justify>
            {navArr.map((ele, inx) => {
              const temp = <Link to={ele.link}>{ele.name}</Link>;
              return (this.props.nowNav === ele.name) ?
                      <li className='am-active' key={inx}>{temp}</li> :
                      <li key={inx}>{temp}</li>;
            })}
          </Nav>
        </CollapsibleNav>
      </Topbar>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({nowNav: state.navTab});

const mapDispatchToProps = (dispatch, ownProps) => ({});

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
