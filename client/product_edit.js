import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';

Template.ProductEditPage.events({
    'change input.file-input':function (event) {
        event.preventDefault();
        var id = Template.instance().data.product._id;
        Meteor.call('removeImage', id, function(err, res){
            if(!err){
                const upload = ProductImages.insert({
                    file: event.target.files[0],
                    chunkSize: 'dynamic',
                    meta: {
                        product_id: id
                    }
                  }, false);
                  upload.on('end', function (error, fileObj) {
                    if (error) {
                      return error;
                    } else {
                      return true;
                    }
                  });
                  upload.start();
            }else{
                console.log(err);
            }
        })
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

