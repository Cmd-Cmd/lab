import React, {Component} from 'react';
import {Panel, Form, Input, Button, ScrollSpy} from 'amazeui-react';

class Searches extends Component {
  render() {
    return (
      <div>
        <ScrollSpy animation='slide-bottom'>
          <Panel amStyle='secondary' header='药品查询'>
            <Form horizontal onSubmit={(e) => {
              e.preventDefault();
              alert('TODO');
            }}>
              <Input type='text' label='药品名称' placeholder='药品名称'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'></Input>
              <Input type='text' label='药品化学式' placeholder='药品化学式'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'></Input>
              <Input type='select' label='药品类型' defaultValue='普通'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'>
                <option value='普通'>普通</option>
                <option value='危险'>危险</option>
                <option value='剧毒'>剧毒</option>
              </Input>
              <Button amStyle='secondary' block type='submit'>查询</Button>
            </Form>
          </Panel>
        </ScrollSpy>
        <ScrollSpy animation='slide-bottom'>
          <Panel amStyle='success' header='仪器查询'>
            <Form horizontal onSubmit={(e) => {
              e.preventDefault();
              alert('TODO');
            }}>
              <Input type='text' label='仪器名称' placeholder='仪器名称'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'></Input>
              <Input type='text' label='固定资产号' placeholder='固定资产号'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'></Input>
              <Button amStyle='success' block type='submit'>查询</Button>
            </Form>
          </Panel>
        </ScrollSpy>
        <ScrollSpy animation='slide-bottom'>
          <Panel amStyle='warning' header='课程查询'>
            <Form horizontal onSubmit={(e) => {
              e.preventDefault();
              alert('TODO');
            }}>
              <Input type='select' label='学院名称' defaultValue='海洋学院'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'>
                <option value='海洋学院'>海洋学院</option>
                <option value='地理规划学院'>地理规划学院</option>
                <option value='中法核'>中法核</option>
              </Input>
              <Input type='select' label='年级' defaultValue='大一'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'>
                <option value='大一'>大一</option>
                <option value='大二'>大二</option>
                <option value='大三'>大三</option>
                <option value='大四'>大四</option>
              </Input>
              <Input type='text' label='课程名称' placeholder='课程名称'
                labelClassName='am-u-sm-3 am-show-sm-only am-padding-left-0'
                wrapperClassName='am-u-sm-9 am-u-md-12 am-padding-0'></Input>
                <Button amStyle='warning' block type='submit'>查询</Button>
            </Form>
          </Panel>
        </ScrollSpy>
      </div>
    );
  }
}

export default Searches;
