if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
      if (info.error === 400) {
        location.href = 'login.html';
        return false;
      }
    }
  })
}

$(function () {
  NProgress.configure({showSpinner: false});
  $(document).ajaxStart(function () {
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    NProgress.done();
  });
  $('.lt_aside .category').click(function () {
    $('.lt_aside .child').stop().slideToggle();
  });
  $('.icon_menu').click(function () {
    $('.lt_aside,.lt_main,.lt_topbar').toggleClass('hidemenu');
  });
  
  $('.icon_logout').click(function () {
    $('#logoutModal').modal('show');
  });
  
  $('.btnLogout').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = 'login.html';
        }
      }
    })
  })
});