Template.Home.events({
    'submit form.searchForm': function (event) {
        event.preventDefault();
        if (event.currentTarget.search.value) {
            Router.go("searchedProducts", {searchTerm: event.currentTarget.search.value});
        }  
    }
})