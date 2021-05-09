function closeModal() {
    $('.modal').removeClass('is-active');
    $('html').removeClass('is-clipped');
    var forms = $('form');
    for (let i = 0; i < forms.length; i++) {
            forms[i].reset();
    }
}
export default helper_functions = {
    closeModal: closeModal
}