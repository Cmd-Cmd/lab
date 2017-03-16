import React, {Component} from 'react';
import {Tabs, Input, Grid, Col, Button, Icon, ButtonGroup} from 'amazeui-react';

class DrugDetail extends Component {
  render() {
    return (
      <div>
        <div className='systemTitle'>
          药品详情
        </div>
        <hr></hr>
        <Grid>
          <Col sm={12}>
            <Tabs justify>
              <Tabs.Item eventKey='basic' title='基本信息'>
                <small>
                  用户 <strong>Cmd</strong> 于 <strong>2017-03-15</strong> 修改
                </small>
                <hr></hr>
                <form>
                  <Grid>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        药品名&nbsp;
                        <small>
                          <Icon icon='asterisk' className='am-text-danger'/>
                        </small>
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='drug' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        CAS号
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='counting' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        分子式&nbsp;
                        <small>
                          <Icon icon='asterisk' className='am-text-danger'/>
                        </small>
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='fen_zi_shi' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        分子量
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='fen_zi_liang' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        药品别名
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='drug_another_name' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        药品英文名
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='drug_Englishname' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        危险性
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='dangerous' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        单位
                      </div>
                    </Col>
                    <Col sm={12} md={4}>
                      <Input name='standard' />
                    </Col>
                    <Col sm={12} md={2}>
                      <div className='input-name'>
                        详细
                      </div>
                    </Col>
                    <Col sm={12} md={10}>
                      <Input type='textarea' name='details' />
                    </Col>
                    <Col sm={12}>
                      <small>
                        <Icon icon='asterisk' className='am-text-danger'/>
                        &nbsp;项不能空白
                      </small>
                      <Button amStyle='success' block>确认修改</Button>
                    </Col>
                  </Grid>
                </form>
              </Tabs.Item>
              <Tabs.Item eventKey='location' title='位置信息'>
                <form>
                  <Grid>
                    <Col sm={12} md={4}>
                      <Input addonBefore='剩余' addonAfter='瓶' />
                    </Col>
                    <Col sm={12} md={4}>
                      <Input addonBefore='零散' addonAfter='ml' />
                    </Col>
                    <Col sm={12} md={4}>
                      <Input addonBefore='容量' addonAfter='ml/瓶' />
                    </Col>
                    <Col sm={12}>
                      <Input addonBefore='存放位置' />
                    </Col>
                  </Grid>
                  <ButtonGroup>
                    <Button amStyle='warning' amSize='sm'>修改</Button>
                    <Button amStyle='danger' amSize='sm'>删除</Button>
                  </ButtonGroup>
                  <small className='am-fr'>
                    用户 <strong>Cmd</strong> 于 <strong>2017-03-15</strong> 修改
                  </small>
                  <hr></hr>
                </form>
                <form>
                  <Grid>
                    <Col sm={12} md={4}>
                      <Input addonBefore='剩余' addonAfter='瓶' />
                    </Col>
                    <Col sm={12} md={4}>
                      <Input addonBefore='零散' addonAfter='ml' />
                    </Col>
                    <Col sm={12} md={4}>
                      <Input addonBefore='容量' addonAfter='ml/瓶' />
                    </Col>
                    <Col sm={12}>
                      <Input addonBefore='存放位置' />
                    </Col>
                  </Grid>
                  <ButtonGroup>
                    <Button amStyle='warning' amSize='sm'>修改</Button>
                    <Button amStyle='danger' amSize='sm'>删除</Button>
                  </ButtonGroup>
                  <small className='am-fr'>
                    用户 <strong>Cmd</strong> 于 <strong>2017-03-15</strong> 修改
                  </small>
                  <hr></hr>
                </form>
              </Tabs.Item>
            </Tabs>
          </Col>
        </Grid>
      </div>
    );
  }
}

export default DrugDetail;
