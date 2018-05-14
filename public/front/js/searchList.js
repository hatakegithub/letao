$(function () {
  var key = getSearch('key');
  $('.lt_search input').val(key);
  render();
  
  function render() {
    // 在每次需要更新新数据时, 先将 lt_product 置成 loading 状态
    $('.lt_product').html('<div class="loading"></div>');
    
    var params = {};
    params.proName = $('.lt_search input').val();
    params.page = 1;
    params.pageSize = 100;
    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      params[sortName] = sortValue;
    }
    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        data: params,
        dataType: 'json',
        success: function (info) {
          $('.lt_product').html(template('productTpl', info));
        }
      })
    }, 500)
  }
  
  $('.lt_search button').click(function () {
    render();
    var key = $('.lt_search input').val();
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    if (arr.indexOf(key) > -1) {
      arr.splice(arr.indexOf(key), 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list', JSON.stringify(arr));
  });
  
  $('.lt_sort a[data-type]').click(function () {
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $(this).addClass('current').siblings().removeClass('current');
      $(this).siblings().find('i').removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();
  })
});