$(document).ready(function () {
    $('#datMes').inputmask("mm/yyyy", {placeholder: "_"});


    $('.listas').click(function () {
        $(this).toggleClass("open");
        $(this).next().toggle("slow");
    });

    $('.sub').click(function () {
        $(this).toggleClass("open");
        $(this).next().toggle("slow");
    });
});

$(".select2").select2({
    placeholder: "Escolha as Instituições"
});

$('.datepicker').datepicker( {language: "pt-BR", format: "mm/yyyy"} ).on('changeDate', function (ev) {
    $(this).datepicker('hide');
});

$("#rel-atividade-mensal").validate({
    rules: {
        'datMes': {
            required: true
        }
    },
    messages: {
        'datMes': {
            required: "Por favor, insira a data inicial."
        }
    },
    submitHandler: function (form) {
        form.submit();
    }
});



