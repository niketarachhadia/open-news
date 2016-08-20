var API_URL = 'https://api.cognitive.microsoft.com/bing/v5.0/news/';
var API_KEY = '4352fa573200405eae5ee08db67d4f35';

$(document).ready( function() {
    $('.logo h5').html(currentDate);
    fetchAndNavigateTrendingNews(HEADLINES);
    fetchAndRenderCategoryFeeds('US');
    $('.search-button').click(onSearch);
    $('.navigation').click(onNavigation);
});

var onNavigation = function(event) {
    $('#list').empty();
    var category =  event.target.id;
    fetchAndRenderCategoryFeeds(category);
};

var fetchAndRenderCategoryFeeds = function(category) {
  var param = { 
    Category: category   
  };

  var request = {
    url: API_URL,
    type: 'GET',
    data: param,
    dataType: 'json',
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', API_KEY);
    }
  }
  
  $.ajax(request).done(onFeedSuccess).fail(onFeedFailure);
};

var onFeedSuccess = function(result) {
  var newsDataList = result.value;

  $.each(newsDataList, function(i, newsDataListItem) {
    var newsItemDOM = getNewsItemDOM(newsDataListItem);
    $('#list').append(newsItemDOM);
  });
};
var getNewsItemDOM = function(newsItemData) {
  var result = $('.templates .news').clone();

  var imageElem = result.find('.thumbnail');
  var thumbNail = newsItemData.image.thumbnail;
  imageElem.attr('src', thumbNail.contentUrl);
  
  var aElem = result.find('.name');
  aElem.attr('href', newsItemData.url);
  aElem.text(newsItemData.name);

  var descriptionElem = result.find('.description');
  descriptionElem.text(newsItemData.description);
  
  return result;
};
var onFeedFailure = function(jqXHR, error) {
   var errorElem = showError(error);
   $('#list').append(errorElem);
};

var showError = function(error){
  var errorElem = $('.templates .error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};

