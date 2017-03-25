import $ from 'jquery';

import './hint.css';

function hint(text = '这是一条提示', time = 2000, icon = 'exclamation-triangle') {
  if (time < 1000) {
    time = 2000;
  }
  const temp = $('<div>').addClass('hint am-animation-slide-top')
                       .append($('<span>')
                       .addClass(`am-icon-${icon} hint-icon am-fl`))
                       .append($('<div>')
                       .addClass('hint-text')
                       .append(text));
  $('body').append(temp);
  setTimeout(() => {
    temp.removeClass('am-animation-slide-top');
  }, 1000);
  setTimeout(() => {
    temp.addClass('am-animation-slide-top am-animation-reverse');
  }, time);
}

export default hint;
