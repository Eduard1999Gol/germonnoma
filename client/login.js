Template.Signin.events({
    'click a#forgot-password':function(event){
        event.preventDefault();
        console.log(event);
    },
    'submit form#login':function(event){
        event.preventDefault();
        console.log(event);
    },
    'click a#create-account':function(event){
        event.preventDefault();
        console.log(event);
    },
});