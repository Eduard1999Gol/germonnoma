Template.ProductBasket.onCreated(function(){
});

Template.ProductBasket.events({
    'click button#addtowagen': function (params) {
        params.preventDefault();
        var product_id = params.target.dataset.id; 
        Meteor.call("addProductToBasket", product_id,function (err, res) {
            if (!err) {
                return res
            } else {
                return err
            }
        })
    },

    'click button#removefromwagen': function (params) {
        params.preventDefault();
        var product_id = params.target.dataset.id;   
        Meteor.call("removeProductFromBasket", product_id,function (err, res) {
            if (!err) {
                return res
            } else {
                return err
            }
        })
    }
    
});


Template.ProductBasket.helpers({
    
  });


