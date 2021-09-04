Template.Home.events({
    'click a#selectedProduct': function (event) {
        event.preventDefault();
        var prove = window.confirm("Are you really sure to delete this elements?");
        if (prove) {
            Meteor.call('removeSelectedProducts', function (err, res) {
                if(!err){
                
                }
                else{
                    console.log(err);
                }
            })
                    
        } else {
            Toast({
                text: "Der Vorgang wurde abgebrochen", 
                duration: 3000, 
                color: "danger"
            })
        }
        
    }
})