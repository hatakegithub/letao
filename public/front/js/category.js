$(function () {
  $.ajax({
    url: '/category/queryTopCategory',
    success: function (info) {
      $('.lt_category_left ul').html(template('leftTpl', info));
      renderSecondById(info.rows[0].id);
    }
  });
  $('.lt_category_left ul').on('click', 'a', function () {
    var id = $(this).data('id');
    renderSecondById(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });
  
  function renderSecondById(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function (info) {
        console.log(info);
        $('.lt_category_right ul').html(template('rightTpl', info));
      }
    })
  }
});