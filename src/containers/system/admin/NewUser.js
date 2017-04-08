import React, {Component} from 'react';
import {Form, Input, Grid, Col, Button, Table, UCheck} from 'amazeui-react';
import {connect} from 'react-redux';
import $ from 'jquery';

import './NewUser.css';
import {newUser} from '../../../action/fetch';

class NewUser extends Component {
  handleSubmit(e) {
    e.preventDefault();
    let temp = {};
    $($('#newUserForm').serializeArray()).each((inx, ele) => {
      temp[ele.name] = ele.value;
    });
    this.props.newUser(temp);
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className='systemTitle'>
          创建新用户
        </div>
        <hr></hr>
        <Form id='newUserForm' onSubmit={e => this.handleSubmit(e)}>
          <Grid>
            <Col sm={12} md={2}>
              <div className='input-name'>
                姓名
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='name' required />
            </Col>
            <Col sm={12} md={2}>
              <div className='input-name'>
                学号/工号
              </div>
            </Col>
            <Col sm={12} md={4}>
              <Input name='find_id' required />
            </Col>
            <Col sm={12}>
              <Table bordered compact responsive id='newUserTable'>
                <thead>
                  <tr>
                    <th className='am-text-primary'>权限表</th>
                    <th>管理权限</th>
                    <th>一般权限</th>
                    <th>无权限</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>用户管理权限</th>
                    <td>
                      <UCheck name='rank_control' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_control' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_control' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>新闻管理权限</th>
                    <td>
                      <UCheck name='rank_news' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_news' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_news' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>药品管理权限</th>
                    <td>
                      <UCheck name='rank_drug' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_drug' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_drug' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>仪器管理权限</th>
                    <td>
                      <UCheck name='rank_equipment' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_equipment' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_equipment' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>实验管理权限</th>
                    <td>
                      <UCheck name='rank_experment' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_experment' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_experment' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>课程管理权限</th>
                    <td>
                      <UCheck name='rank_course' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_course' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_course' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>班级管理权限</th>
                    <td>
                      <UCheck name='rank_class' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_class' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_class' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>学生管理权限</th>
                    <td>
                      <UCheck name='rank_student' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_student' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_student' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                  <tr>
                    <th>开放性实验管理权限</th>
                    <td>
                      <UCheck name='rank_open' type='radio' value='管理权限'
                              amStyle='danger' />
                    </td>
                    <td>
                      <UCheck name='rank_open' type='radio' value='一般权限'
                              amStyle='warning' />
                    </td>
                    <td>
                      <UCheck name='rank_open' type='radio' value='无权限'
                              defaultChecked />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm={12}>
              <small className='am-text-danger'>
                用户名和初始密码均与学号/工号一致
              </small>
              <Button amStyle='success' type='submit' block>创建新用户</Button>
            </Col>
          </Grid>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  linkto: state.newUser
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newUser: form => dispatch(newUser(form))
  };
};

NewUser = connect(mapStateToProps, mapDispatchToProps)(NewUser);

export default NewUser;
