import React, {Component} from 'react';
import {Slider} from 'amazeui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import './Carousel.css';

class Carousel extends Component {
  render() {
    return (
      <Slider theme={'c1'} autoPlay id='Carousel'>
        {this.props.data.map(function(ele, inx) {
          let imgLink;
          let titleLink;
          if (ele.link.type === 'NEWS') {
            imgLink = <Link to={'/news/' + ele.link.id}>
                        <img src={ele.img} alt='inx'></img>
                      </Link>;
            titleLink = <Link to={'/news/' + ele.link.id}>{ele.title}</Link>;
          } else if (ele.link.type === 'NOTICE') {
            imgLink = <Link to={'/notice/' + ele.link.id}>
                        <img src={ele.img} alt='inx'></img>
                      </Link>;
            titleLink = <Link to={'/notice/' + ele.link.id}>{ele.title}</Link>;
          } else if (ele.link.type === 'TODAY') {
            imgLink = <Link to={'/today/' + ele.link.id}>
                        <img src={ele.img} alt='inx'></img>
                      </Link>;
            titleLink = <Link to={'/today/' + ele.link.id}>{ele.title}</Link>;
          }
          return (
            <Slider.Item key={inx}>
              {imgLink}
              <div className='am-slider-desc am-text-center'>{titleLink}</div>
            </Slider.Item>
          );
        })}
      </Slider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({data: state.carousel.crsData});

const mapDispatchToProps = (dispatch, ownProps) => ({});

Carousel = connect(mapStateToProps, mapDispatchToProps)(Carousel);

export default Carousel;
