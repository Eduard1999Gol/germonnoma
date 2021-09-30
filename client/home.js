Template.Home.events({
    'submit form.searchForm': function (event) {
        event.preventDefault();
        console.log(event.target.search.value)
        var key = event.currentTarget.search.value;
        Session.set('searchTerm',key);
    }
})