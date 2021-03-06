(function () {
    var $formulario = $('#notifEntrevista');
    var $wizard = $('#fuelux-wizard');
    var $btnPrev = $('#btn-prev');
    var $btnNext = $('#btn-next');
    var $btnFinish = $("#btn-finish");
    var $divDoacaoAutorizada = $('#divDoacaoAutorizada');
    var $divDoacaoNaoAutorizada = $('#divDoacaoNaoAutorizada');
    var $divEntrevistaRealizada = $('#divEntrevistaRealizada');
    var $divEntrevistaNaoRealizada = $('#divEntrevistaNaoRealizada');

    var getElement = function (id) {
        return document.getElementById(id);
    };

    var verifyWizardButtons = function () {
        var step = $wizard.wizard("selectedItem");

        if (step.step === 1) {
            $btnPrev.hide();
        } else if (step.step === 3) {
            $btnNext.hide();
            $btnFinish.show();
        }
    };

    // O wizard é inicializado aqui.
    verifyWizardButtons();

    $wizard.wizard().on('finished', function (e) {
        // wizard complete code
    }).on("changed", function () {
        // reset states
        $btnNext.removeAttr("disabled");
        $btnPrev.show();
        $btnNext.show();
        $btnFinish.hide();

        verifyWizardButtons();
    });

    $btnPrev.on('click', function () {
        $wizard.wizard('previous');
    });
    $btnNext.on('click', function () {
        if ($formulario.valid()) {
            $wizard.wizard('next');
        }
    });

    // Acerta a visualização inicial da página.
    if (getElement("entrevistaRealizada:1").checked) {
        $divEntrevistaRealizada.hide();
        $btnFinish.show();
        $btnNext.hide();
    } else {
        $divEntrevistaNaoRealizada.hide();
    }

    if (getElement("doacaoAutorizada:1").checked) {
        $divDoacaoAutorizada.hide();
    } else {
        $divDoacaoNaoAutorizada.hide();
    }

    $('#entrevistaRealizada\\:0').change(function () {
        $divEntrevistaRealizada.fadeIn();
        $divEntrevistaNaoRealizada.fadeOut();
        $btnFinish.hide();
        $btnNext.show();
    });
    $('#entrevistaRealizada\\:1').change(function () {
        $divEntrevistaNaoRealizada.fadeIn();
        $divEntrevistaRealizada.fadeOut();
        $btnFinish.show();
        $btnNext.hide();
    });

    $('#doacaoAutorizada\\:0').change(function () {
        $divDoacaoAutorizada.fadeIn();
        $divDoacaoNaoAutorizada.fadeOut();
    });

    $('#doacaoAutorizada\\:1').change(function () {
        $divDoacaoNaoAutorizada.fadeIn();
        $divDoacaoAutorizada.fadeOut();
    });

    $('.data').inputmask("dd/mm/yyyy", {placeholder: "_"});
    $('.hora').inputmask('hh:mm');
    $('.cep').inputmask('99999-999');
    $('.tel').inputmask({
        mask: ["(99)9999-9999", "(99)99999-9999"]
    });
    $('.cpf').inputmask('999.999.999-99');

}());
