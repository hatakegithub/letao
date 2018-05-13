$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  render();
  
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        $('.table tbody').html(template('tmp', info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          itemTexts: function (type, page, current) {
            // itemTexts 可以控制按钮文本
            // 一旦配置了 itemTexts, 每个按钮都会去调用这个 itemTexts
            // 会将这个方法的返回值, 作为按钮的文本
            // type 用于标记按钮的功能类型, page 普通页码, first prev next last
            // page 指的是按钮点击后跳转到那一页
            // current 表示当前页
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return "前往第" + page + "页";
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }
  
  $('.btnAdd').click(function () {
    $('#addModal').modal('show');
    $.ajax({
      url: '/category/querySecondCategoryPaging',
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
    $('[name=brandId]').val($(this).data('id'));
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  });
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var picUrl = data.result.picAddr;
      var picObj = data.result;
      $('#imgBox').prepend('<img src="' + picUrl + '" alt="" width="100"> ');
      picArr.unshift(picObj);
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }
    }
  });
  
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存要求必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品库存要求, 两位数字-两位数字, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入现价"
          }
        }
      },
      
      // 图片是否上传满三张的校验
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });
  
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    var params = $('#form').serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: params,
      success: function (info) {
        if (info.success) {
          $('#addModal').modal("hide");
          $('#form').data("bootstrapValidator").resetForm(true);
          currentPage = 1;
          render();
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })
});