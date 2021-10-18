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




 

Template.registerHelper("getUserEmail", function (user) {
    return user.emails[0].address;
});

