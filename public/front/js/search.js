$(function () {
  render();
  
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    return arr;
  }
  
  function render() {
    var arr = getHistory();
    $('.lt_history').html(template('historyTpl', {arr: arr}));
  }
  
  $('.lt_history').on('click', '.btn_empty', function () {
    mui.confirm('你确认要删除所有历史记录吗？', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  });
  
  $('.lt_history').on('click', '.btn_delete', function () {
    var that = $(this);
    mui.confirm('你确认要删除此条历史记录吗？', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var arr = getHistory();
        arr.splice(that.data('index'), 1);
        localStorage.setItem('search_list', JSON.stringify(arr));
        render();
      }
    })
  });
  
  $('.lt_search button').on('click', function () {
    var key = $('.lt_search input').val().trim();
    if (key === '') {
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = getHistory();
    if (arr.indexOf(key) > -1) {
      arr.splice(arr.indexOf(key), 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();
    $('.lt_search input').val('');
    location.href = 'searchList.html?key=' + key;
  })
});