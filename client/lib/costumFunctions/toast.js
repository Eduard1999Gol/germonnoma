export default function Toast(options) {
    Session.set("toastText", options.text);
    if(options.color = "success"){
        $('#epicToast').addClass("bg-success");
    }else{
        $('#epicToast').addClass("bg-danger");
    }
    var toastElement = new bootstrap.Toast($('#epicToast'),{
        animation: true,
        delay: options.duration //TODO duration check
    });

    toastElement.show()
}