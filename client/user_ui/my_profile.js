Template.MyProfile.onRendered(function () {
    console.log(Template.instance().data.user);
})




Template.MyProfile.events({
    'click button#return': function (event){
        event.preventDefault();
        Router.go('/');
        $( ".dropdown" ).show();
    },
})



Template.MyProfile.helpers({
    
});