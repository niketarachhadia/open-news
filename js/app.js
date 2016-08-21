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
    return today+', '+curr_month+' '+curr_date+', '+curr_year ;
};

$(document).ready( function() {
    $('.logo h5').html(currentDate);
    fetchAndNavigateTrendingNews(HEADLINES);
    fetchAndRenderCategoryFeeds('US');
    $('.search-button').click(onSearch);
    $('.navigation').click(onNavigation);
});