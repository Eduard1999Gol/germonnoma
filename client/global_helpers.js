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

Template.registerHelper("getProductDetails", function () {
    var project_id = Router.current().params._id;
    if (project_id) {
        Session.set("id",project_id);
        var product = Products.findOne({ _id: project_id });
    }
    if (product) {
        var image = ProductImages.findOne({
            product_id: product._id,
        });
    }
    if (product && image) {
        product["image"] = image.image;
        Session.set("product", product)
        return product;
    }
    

});

 
Template.registerHelper("myProfile", function () {
    if (Meteor.user().profile)  {
        TAPi18n.setLanguage(Meteor.user().profile.language);
        return {
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

