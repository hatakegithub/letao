$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户不能为空'
          },
          stringLength: {
            min: 2,
            max: 8,
            message: '用户名必须是2~6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6~12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });
  
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log($('#form').serialize());
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          location.href = 'index.html';
        } else if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        } else if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  });
  
  $('[type = reset]').click(function () {
    $('form').data('bootstrapValidator').resetForm();
  })
});