Template.Home.onCreated(function () {
    Tracker.autorun(function(){
        Meteor.subscribe("products");
        Meteor.subscribe("users")
        Meteor.subscribe("user_stores")
       })
})

Template.Home.events({
   
    'submit form.searchForm': function (event) {
        event.preventDefault();
        if (event.currentTarget.search.value) {
            Router.go("searchedProducts", {searchTerm: event.currentTarget.search.value});
        }  
    },
  

   
})


Template.Home.helpers({
    data: function () {
        var products = Products.find().fetch();
        return {
          products: products,
        };
      },
})