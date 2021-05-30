import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';
var base64Img = require('base64-img');

Template.ProductEditPage.events({
    'change input.file-input':function (event) {
        event.preventDefault();
        console.log(event.target.files)
        var url = URL.createObjectURL(event.target.files[0]).slice(5);
        var id = Template.instance().data.product._id;
        base64Img.requestBase64(url, function(err, res, body) {
            if (err) {
                console.log(err);
            } else {
                Meteor.call('updateImage', id, body, function (err, res) {
                    if (!err) {
                        alert('image uploaded');
                    } else {
                        alert('image not uploaded')
                    }
                })
            }
        });
        
    },

    "submit form#editProductForm": function (event) {
        event.preventDefault();
        var product = {
            category: event.target.category.value,
            name: event.target.product_name.value,
            price: event.target.product_price.value,
            description: event.target.product_description.value
        }
        var id = Template.instance().data.product._id;
        Meteor.call('updateProduct', id, product, function (err, res) {
            if (!err) {
                toast({
                    message: TAPi18n.__('product_edeted'),
                    type: 'is-success',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                });
            } else {
                toast({
                    message: TAPi18n.__('product_not_edeted'),
                    type: 'is-danger',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                });
            }

        })
    }

});


Template.ProductEditPage.helpers({
    "isSelected": function (cat) {
        var cat2 = Template.instance().data.product.category;

        if (cat == cat2) {

            return "selected";

        } else {
            return "";
        }
    }

});

