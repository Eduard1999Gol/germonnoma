Template.MyProfile.onRendered(function () {
    console.log(Template.instance()).data.user;
})


Template.MyProfile.events({
    'click button#return': function (event){
        event.preventDefault();
        Router.go('/');
        $( ".dropdown_user" ).show();
    },

    'submit form.profile': function (event) {
        event.preventDefault();
        var language = event.currentTarget.selectLanguage.value;
        TAPi18n.setLanguage(language);
        var profile = {
            language: event.currentTarget.selectLanguage.value,
            first_name: event.currentTarget.first_name.value,
            last_name: event.currentTarget.last_name.value,
            street: event.currentTarget.street.value,
            haus_number: event.currentTarget.haus_number.value,
            post_code: event.currentTarget.post_code.value,
            state: event.currentTarget.state.value,
            city: event.currentTarget.city.value
        }
        Meteor.call("updateProfile", profile, function (err, res) {
            if (!err) {
                $('div.inputs').addClass('invisible');
                return res
            } else {
                return err
            }
            
        })
    },
    'click button.edit': function (event) {
        event.preventDefault();
        $('div.inputs').removeClass('invisible');
    }
})

Template.MyProfile.helpers({
    
});