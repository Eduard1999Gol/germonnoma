Template.Home.events({
    'keyup input#SearchProduct': function (event) {
        event.preventDefault();
        var key = event.currentTarget.value;
        Session.set('searchTerm',key);
        console.log(typeof Session.get('searchTerm'));
    }
    
})