import { toast } from "bulma-toast";

Template.Product.events({
    'click button.delete-product': function (event) {
        event.preventDefault();
        console.log(event);
        var id = event.target.id;
        var name = event.target.dataset.name;
        var prove = window.confirm(TAPi18n.__('confirm_delete_product')+" :"+ name );
        if (prove) {
            Meteor.call("deleteProduct", id, function (err, res) {
                if (!err) {
                    toast({
                        message: TAPi18n.__('product_deleted'),
                        type: 'is-success',
                        duration: 1000,
                        position: "bottom-right",
                        closeOnClick: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    });
                }else{
                    toast({
                        message: TAPi18n.__('product_not_deleted'),
                        type: 'is-danger',
                        duration: 1000,
                        position: "bottom-right",
                        closeOnClick: true,
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    });
                }
                
            })
        } else {
            toast({
                message: TAPi18n.__('product_not_deleted'),
                type: 'is-danger',
                duration: 1000,
                position: "bottom-right",
                closeOnClick: true,
                animate: { in: 'fadeIn', out: 'fadeOut' }
            });
        }
        
        
    },
    'click button.edit-product': function (event){
        event.preventDefault();
        Session.set('product_id', event.target.id);
        $('.modal#addProductModal').addClass('is-active');
        $('html').addClass('is-clipped');
    }

        
});

Template.Product.helpers({
    'getProductDetails': function () {
        return Products.findOne({_id: Session.get('product_id')});
    }
});