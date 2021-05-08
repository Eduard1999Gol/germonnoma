Template.Layout.onCreated(function(){
});

Template.Layout.onRendered(function(){
});

Template.Layout.events({
    'change select#language':function (event) {
        event.preventDefault();
        TAPi18n.setLanguage(event.target.value);
    },
    'click button#addItem': function (event) {
        event.preventDefault();
        $('.modal#addItemModal').addClass('is-active');
        $('html').addClass('is-clipped');
        
    },
    'click .modal-close': function (event) {
        event.preventDefault();
        $('.modal').removeClass('is-active');
        $('html').removeClass('is-clipped');

    }
});

Template.Layout.helpers({
    
});


