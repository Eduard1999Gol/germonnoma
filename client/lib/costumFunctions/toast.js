export default function Toast(options) {
    Session.set("toastText", options.text);
    if(options.color = "danger"){
        options.color = "danger";
        $('#epicToast').addClass("bg-danger");
    }else{
        options.color = "success";
        $('#epicToast').addClass("bg-success");
    }
    console.log(options)
    var toastElement = new bootstrap.Toast($('#epicToast'),{
        animation: true,
        delay: options.duration 
    });

    toastElement.show()
}