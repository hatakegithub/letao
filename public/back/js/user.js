$(function () {
  var pageSize = 5;
  var currentPage = 1;
  render();
  
  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        $('.table tbody').html(template('tmp', info));
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  $('.table tbody').on('click', '.btn', function () {
    $('#userModal').modal('show');
    var id = $(this).data('id');
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    
    $('.btnSure').off().click(function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: 'json',
        success: function (info) {
          if (info.success) {
            $('#userModal').modal('hide');
            render();
          }
        }
      })
    })
  })
});