import React, {Component} from 'react';
import {Input, Grid, Col, Button, Icon} from 'amazeui-react';

class AddDrug extends Component {
  render() {
    return (
      <div>
        <div className='systemTitle'>
          新增药品
        </div>
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
              <Input name='CAS' />
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
              <Button amStyle='success' block>新增药品</Button>
            </Col>
          </Grid>
        </form>
      </div>
    );
  }
}

export default AddDrug;
