var currentDate = function(){
    var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
    var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    var date = new Date();
    var day = date.getDay();
    var today = days[day];
    var curr_date = date.getDate();
    var month = date.getMonth();
    var curr_month = months[month];
    var curr_year = date.getFullYear();
    return today+', '+curr_month+''+curr_date+', '+curr_year ;
};

var T_API_URL = 'https://www.googleapis.com/youtube/v3/search'
var T_API_KEY = 'AIzaSyD4-c80_VrwBAZj3aGMOpgHzajxgQV9Vv4';
var HEADLINES = 'Top US-World headlines';

var fetchAndNavigateTrendingNews = function(query){
  var params = {
    part : 'snippet',
    key : T_API_KEY,
    q : query
  };
  var request = {
    url : T_API_URL,
    type : 'GET',
    data : params,
    dataType : 'json',
  }
  
  $.ajax(request).done(onTrendingSuccess).fail(onTrendingFailure);
};
var onTrendingSuccess = function(result){
      var videoList = result.items;
      $('#video').attr('src', 'https://www.youtube.com/embed/'+videoList[0].id.videoId+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"');
};
var onTrendingFailure = function(jqXHR, error){
    var errorElem = showError(error);
    $('.trending').append(errorElem);
};

  