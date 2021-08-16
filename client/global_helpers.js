import category from './product_ui/product_category.js';



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

Template.registerHelper("userLoggedIn", function () {
    if (Meteor.userId()) {
        return true;
    } else {
        return false;
    }
});



Template.registerHelper("myProfile", function () {
    if (Meteor.user().profile)  {
        return {
            first_name: Meteor.user().profile.first_name,
            last_name: Meteor.user().profile.last_name,
            street: Meteor.user().profile.street,
            haus_number: Meteor.user().profile.haus_number,
            state: Meteor.user().profile.state,
            post_code: Meteor.user().profile.post_code,
            city: Meteor.user().profile.city,
        }
    } else {
        return {
            first_name: "",
            last_name: "",
            street: "",
            haus_number: "",
            state: "",
            post_code: "",
            city: ""
        }
        
    }
})