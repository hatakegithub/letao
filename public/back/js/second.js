$(function () {
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
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
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        $('.dropdown-menu').html(template('tpl', info));
      }
    })
  });
  
  $('.dropdown-menu').on('click', 'a', function () {
    $('#dropdownText').text($(this).text());
    $('[name=categoryId]').val($(this).data('id'));
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  });
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data);
      $('#imgBox img')[0].src = data.result.picAddr;
      $('[name=brandLogo]').val(data.result.picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  })
  
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      
      // brandName 品牌名称, 二级分类
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      
      // brandLogo 图片地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });
  
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');
          
          currentPage = 1;
          render();
          
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownText').text('请选择一级分类');
          $('#imgBox img').attr('src', './images/none.png');
        }
      }
    })
  });
  
  $('.btnCancel').click(function () {
    $('#form').data('bootstrapValidator').resetForm(true);
    $('#dropdownText').text('请选择一级分类');
    $('#imgBox img').attr('src', './images/none.png');
  })
});

