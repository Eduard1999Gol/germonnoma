

Template.StoreOrders.events({
    'click button#confirm': function (event) {
        event.preventDefault();
        $("#confirm").style.display = 'none';
    },
});