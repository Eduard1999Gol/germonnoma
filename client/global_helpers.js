import moment from 'moment';
  
Template.registerHelper("getCategorie", function (category_id) {
    var  category = Categories.findOne({_id: category_id});
    return category.name
});


Template.registerHelper("isVerkaufer", function () {
    var shops = Stores.findOne({user_id: Meteor.userId()});
    if (shops) {
        return true
    }
});

Template.registerHelper("isYourProduct", function (user_id) {
    if (user_id===Meteor.userId()) {
        return true
    }
}),


Template.registerHelper("getUserStore", function () {
    var store = Stores.findOne({user_id: Meteor.userId()});
    return store
})



Template.registerHelper("berechneMenge", function (wagen) {
    var count = 0;
    if (wagen) {
        wagen.forEach(element => {
            count+=element.count;
        });
    }
    return count
});

Template.registerHelper("language", function () {
     if (Meteor.user().profile) {
        TAPi18n.setLanguage(Meteor.user().profile.language);
    } 
})

Template.registerHelper("getCount", function () {
    if (Meteor.user().profile) {
       return Meteor.user().profile.basket.length;
   } 
})


Template.registerHelper("formatDateTime", function (date) {
    return moment(date).format('DD.MM.YYYY HH:mm');
});


Template.registerHelper("getAmount", function (amount) {
    var formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    })
    return formatter.format(amount)
});
 

Template.registerHelper("getUserEmail", function (user) {
    return user.emails[0].address;
});

