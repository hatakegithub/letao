$(function () {
  var pageSize = 5;
  var currentPage = 1;
  render();
  
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
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
  
  $('.btnAdd').click(function () {
    $('#addModal').modal('show');
  });
  
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  });
  
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          
          currentPage = 1;
          render();
          
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  });
  
  $('.btnCancel').click(function () {
    $('#form').data('bootstrapValidator').resetForm(true);
  })
});