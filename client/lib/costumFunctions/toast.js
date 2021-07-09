export default function Toast(options) {
    Session.set("toastText", options.text);
    if(options.color = "danger"){
        $('#epicToast').addClass("bg-danger");
    }else{
        $('#epicToast').addClass("bg-success");
    }
    var toastElement = new bootstrap.Toast($('#epicToast'),{
        animation: true,
        delay: options.duration
    });

    toastElement.show()
}