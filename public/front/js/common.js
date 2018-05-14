$(function () {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
});

function getSearch(key) {
  var search = location.search;
  search = decodeURI(search);
  search = search.slice(1);
  var arr = search.split('$');
  var obj = {};
  arr.forEach(function (item, index) {
    var k = item.split('=')[0];
    var v = item.split('=')[1];
    obj[k] = v;
  });
  return obj[key];
}