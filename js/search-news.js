	var SEARCH_API_URL='https://api.cognitive.microsoft.com/bing/v5.0/news/search';
var onSearch = function(event){
	$('#list').empty();
	var searchTerm = $('#search').val();
	fetchAndRenderSearchNews(searchTerm);
};

var fetchAndRenderSearchNews = function(searchTerm){
	var param = {
		q : searchTerm
	};
	var request = {
		url : SEARCH_API_URL,
		data : param,
		type : 'GET',
		dataType : 'json',
		beforeSend: function(xhrObj) {
      	xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', API_KEY);
    	}
    };
	$.ajax(request).done(onSearchSuccess).fail(onSearchFailure);	
};
var onSearchSuccess = function(result){
		var searchNewsList = result.value;
		$.each(searchNewsList,function(i,searchNewsListItem){
			var searchNewsDOM = getNewsItemDOM(searchNewsListItem);
			$('#list').append(searchNewsDOM);
		});
};
var onSearchFailure = function(jqXHR, error) {
 	var errorElem = showError(error);
  	$('#list').append(errorElem);
};
