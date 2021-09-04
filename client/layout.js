
Template.Layout.onCreated(function(){

});

Template.Layout.onRendered(function(){
    
});

Template.Layout.events({
    'click a#Home': function (event) {
        event.preventDefault();
        Router.go('/');
        $( ".dropdown_user" ).show();
    },

    'click a#logout': function (event) {
        event.preventDefault();
        Meteor.logout(function (err, res) {
            if (!err) {
                Router.go("login");
                console.log("logout")
            } else {
                console.log(err)
            }
        })
    },

    'click a#loginButton': function (event) {
        event.preventDefault();
        Router.go('login');
    },

    'click a#myProfile': function (event) {
        event.preventDefault();
        Router.go('MyProfile',{_id:Meteor.userId()});
        $( ".dropdown_user" ).hide();
    },

    'click a#selectedProduct': function (event) {
        event.preventDefault();
        var products = Session.get("selectedProducts");
        var prove = window.confirm("Are you really sure to delete this elements?");
        if (prove) {
            for(let i = 0; i<products.length; i++){
                Meteor.call("deleteProduct", products[i]._id, function (err, res) {
                    if (!err) {         
                        console.log("sehr gut")
                    }else{
                        console.log("Scheisse")
                    }
                    
                })
            }
            
        } else {
            Toast({
                text: "Der Vorgang wurde abgebrochen", 
                duration: 3000, 
                color: "danger"
            })
        }
        
    }
});

Template.Layout.helpers({
    
});


