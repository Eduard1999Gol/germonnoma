import moment from 'moment';
import category from './product_ui/product_category.js';
import  { countBy } from 'meteor/underscore'

Template.registerHelper("getCategories", function () {
    var codes = [];
    for (var k in category) {
        if (k) {
            codes.push({ value: k, display: category[k] });
        }
    }
    return codes;
});

Template.registerHelper("getCategoryName", function (key) {
    return category[key]
});

Template.registerHelper("getToastText", function () {
    return Session.get("toastText");
});


Template.registerHelper("berechneMenge", function (wagen) {
    var count = 0;
    if (wagen) {
        wagen.forEach(element => {
            count+=element.count;
        });
    }
    return count
});


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




 

Template.registerHelper("myProfile", function () {
    if (Meteor.user().profile)  {
        TAPi18n.setLanguage(Meteor.user().profile.language);
        return {
            basket: Meteor.user().profile.basket.length,
            first_name: Meteor.user().profile.first_name,
            last_name: Meteor.user().profile.last_name,
            street: Meteor.user().profile.street,
            haus_number: Meteor.user().profile.haus_number,
            state: Meteor.user().profile.state,
            post_code: Meteor.user().profile.post_code,
            city: Meteor.user().profile.city,
            language: Meteor.user().profile.language,
        }
    } else {
        return {
            basket: [],
            first_name: "",
            last_name: "",
            street: "",
            haus_number: "",
            state: "",
            post_code: "",
            city: "",
            language: "",
        }
        
    }
});

