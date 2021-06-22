import { toast } from 'bulma-toast';
import helper_functions from './lib/helper_functions';
import category from './product_category.js';

Template.ProductEditPage.onCreated(function(){
    Session.set('selectedFile', "");
    this.newProduct = new ReactiveVar('test');
});


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
        console.log(product);
        var id = Template.instance().data.product._id;
        Meteor.call('updateProduct', id, product, function (err, res) {
            if (!err) {
                console.log(res);  //krieg da undefinde
              
                toast({
                    message: TAPi18n.__('product_edeted'),
                    type: 'is-success',
                    duration: 3000,
                    position: "bottom-right",
                    closeOnClick: true,
                    animate: { in: 'fadeIn', out: 'fadeOut' }
                });
                //7var prod = Products.findOne({_id: res});
                //console.log(prod);
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
        if (Template.instance().data.product) {
            var cat2 = Template.instance().data.product.category;
            if (cat == cat2) {
                return "selected";
            } else {
                return "";
            }
        }
    },
    'selectedFile':function () {
        if (Session.get('selectedFile')) {
            return Session.get('selectedFile');
        } else {
          return "choose_picture";
        }
    },

    'getNewProduct': function () {
        if (Template.instance().newProduct.get()) {
          var product = Template.instance().newProduct.get();
          if (product) {
            var image = ProductImages.findOne({"meta.product_id": product._id}).link();
            product["image"] = image;
          }
          return product;
        } else {
            return {};
        }
    },

});

