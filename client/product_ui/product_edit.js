import { ReactiveVar } from 'meteor/reactive-var'
import Toast from '../lib/costumFunctions/toast';

Template.ProductEditPage.onCreated(function(){
    Session.set('selectedFile', "");
    var product = Template.instance();
    this.newProduct = new ReactiveVar({
        name: Template.instance().data.product.name,
        price: Template.instance().data.product.price,
        description: Template.instance().data.product.description,
        image: Template.instance().data.product.image
    });
    console.log(this.newProduct)

    this.newProductImage = new ReactiveVar();
});

Template.ProductEditPage.events({
    'change textarea#product_description_textarea': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: product.name,
            price: product.price,
            description: event.currentTarget.value,
            image:  Template.instance().data.product.image
        });
                
    },

    'change select#product_category_select': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        console.log(event.currentTarget.value)
        Template.instance().newProduct.set({
            category: event.currentTarget.value,
            name: product.name,
            price: product.price,
            description: product.description,
            image: Template.instance().data.product.image
        });
                
    },
    'keyup input#product_name_input': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: event.currentTarget.value,
            price: product.price,
            description: product.description,
            image: Template.instance().data.product.image
        });
        
                
    },

    'keyup input#product_price_input': function (event) {
        event.preventDefault();
        var product = Template.instance().newProduct.get();
        Template.instance().newProduct.set({
            category: product.category,
            name: product.name,
            price: event.currentTarget.value,
            description: product.description,
            image: Template.instance().data.product.image
        })
    },


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

    "click button#editProductForm": function (event) {
        event.preventDefault();  
        var template =  Template.instance();
        var newProduct = template.newProduct.get();
        var product = {
            category: template.newProduct.get().category,
            name: template.newProduct.get().name,
            price: template.newProduct.get().price,
            description: template.newProduct.get().description
        }
        var id = Template.instance().data.product._id;
        Meteor.call('updateProduct', id, product, function (err, res) {
            if (!err) {
                Toast({
                    text: "Product is edited", 
                    duration: 3000, 
                    color: "success"
                });

            }
             else {
                Toast({
                    text: "Product is not edited", 
                    duration: 3000, 
                    color: "danger"
                });
                
            }

        })
    },
    'click a#returnToProducts': function (event) {
        event.preventDefault();
        Router.go('/');
    },

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

    'product': function () {
        return Template.instance().newProduct.get();
      }
          

});

