function ajaxHideElement() {

    var val = $("#username").val();

    $.ajax({
        type: "post",
//		url: "http://localhost:8080/sincap/getHospitais",
        url: "http://" + location.host + "/sincap/getHospitais",
        cache: false,
        data: val,
        Accept: "application/json",
        contentType: "application/json",
        success: function(response) {

            $('#hospital').find('option').remove().end(); //limpa o combobox 'hospital'
            var id;
            var valor;

            /*'response' eh o retorno da funcao do controller*/
            $.each(response, function(idx, obj) {
                $.each(obj, function(key, value) { //key eh o nome do campo, value eh o valor que o campo possui
                    if (key == "id")
                        id = value;
                    else
                        valor = value;
                });
                $("#hospital").append("<option value='" + id + "'>" + valor /*aparece para o usuario*/ + "</option>");
            });

        },
        error: function(response, status, error) {
            $('#result').html("");
            $('#result').html('Status' + status + "Error: " + error);
        }
    });
}

function ajaxGetHospitais() {

    var val = $("#username").val();
    $('#hospital').find('option').remove().end(); //limpa o combobox 'hospital'

    $.ajax({
        type: "post",
//		url: "http://localhost:8080/sincap/getHospitais",
        url: "http://" + location.host + "/sincap/getHospitais",
        cache: false,
        data: val,
        Accept: "application/json",
        contentType: "application/json",
        success: function(response) {

            $('#hospital').find('option').remove().end(); //limpa o combobox 'hospital'
            var id;
            var valor;

            /*'response' eh o retorno da funcao do controller*/
            $.each(response, function(idx, obj) {
                $.each(obj, function(key, value) { //key eh o nome do campo, value eh o valor que o campo possui
                    if (key == "id")
                        id = value;
                    else
                        valor = value;
                });
                $("#hospital").append("<option value='" + id + "'>" + valor /*aparece para o usuario*/ + "</option>");
            });

        },
        error: function(response, status, error) {
            $('#result').html("");
            $('#result').html('Status' + status + "Error: " + error);
        }
    });
}

function ajaxGetMunicipios(estado, municipio) {

    var val = $(estado).val();
    $(municipio).find('option').remove().end(); //limpa o combobox 'municipio'
    $.ajax({
        type: "post",
//		url: "http://localhost:8080/sincap/notificacao/getMunicipios",
        url: "http://" + location.host + "/sincap/notificacao/getMunicipios",
        cache: false,
        data: val,
        Accept: "application/json",
        contentType: "application/json",
        success: function(response) {

            $(municipio).find('option').remove().end(); //limpa o combobox 'municipio'
            var id;
            var valor;

            /*'response' eh o retorno da funcao do controller*/
            $.each(response, function(idx, obj) {
                $.each(obj, function(key, value) { //key eh o nome do campo, value eh o valor que o campo possui
                    if (key == "id")
                        id = value;
                    else
                        valor = value;
                });
                $(municipio).append("<option value='" + id + "'>" + valor /*aparece para o usuario*/ + "</option>");
            });

        },
        error: function(response, status, error) {
            $('#result').html("");
            $('#result').html('Status' + status + "Error: " + error);
        }
    });
}

function ajaxGetBairros(idMunicipio, idBairro) {

    var val = $(idMunicipio).val();
    $(idBairro).find('option').remove().end(); //limpa o combobox 'bairro'
    $.ajax({
        type: "post",
//		url: "http://localhost:8080/sincap/notificacao/getBairros",
        url: "http://" + location.host + "/sincap/notificacao/getBairros",
        cache: false,
        data: val,
        Accept: "application/json",
        contentType: "application/json",
        success: function(response) {

            $(idBairro).find('option').remove().end(); //limpa o combobox 'bairro'
            var id;
            var valor;

            /*'response' eh o retorno da funcao do controller*/
            $.each(response, function(idx, obj) {
                $.each(obj, function(key, value) { //key eh o nome do campo, value eh o valor que o campo possui
                    if (key == "id")
                        id = value;
                    else
                        valor = value;
                });
                $(idBairro).append("<option value='" + id + "'>" + valor /*aparece para o usuario*/ + "</option>");
            });

        },
        error: function(response, status, error) {
            $('#result').html("");
            $('#result').html('Status' + status + "Error: " + error);
        }
    });
}

function mascaraData(id) {
    var data = document.getElementById(id).value;
    if (data.length == 2) {
        data = data + '/';
        document.getElementById(id).value = data;
        return true;
    }
    if (data.length == 5) {
        data = data + '/';
        document.getElementById(id).value = data;
        return true;
    }
}

function validarData(id) {
    var data = document.getElementById(id).value;
    var dia = data.substring(0, 2);
    var mes = data.substring(3, 5);
    var ano = data.substring(6, 10);
    if (data == '' || (data.length == 10 && dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12 && ano >= 0 && ano <= 9999)) {
        return true;
    } else {
        alert("Data inválida!");
        document.getElementById(id).value = '';
        return false;
    }
}

function mascaraHora(id) {
    var data = document.getElementById(id).value;
    if (data.length == 2) {
        data = data + ':';
        document.getElementById(id).value = data;
        return true;
    }
}

function validarHora(id) {
    var data = document.getElementById(id).value;
    var hora = data.substring(0, 2);
    var minuto = data.substring(3, 5);
    if (data == '' || (data.length == 5 && hora >= 0 && hora <= 24 && minuto >= 0 && minuto <= 59)) {
        return true;
    } else {
        alert("Hora inválida!");
        document.getElementById(id).value = '';
        return false;
    }
}

function mascaraTelefone(id) {
    var data = document.getElementById(id).value;
    if (data.length == 2) {
        data = '(' + data + ')';
        document.getElementById(id).value = data;
        return true;
    }
    if (data.length == 8) {
        data = data + '-';
        document.getElementById(id).value = data;
        return true;
    }
}

function botaoDesabilitado() {
    var login = document.getElementById('username').value;
    var senha = document.getElementById('password').value;
    var hospital = document.getElementById('hospital').value;
    var botao = document.getElementById('botaoLogin');
    if (login != '' && senha != '' && hospital != '')
        botao.disabled = false;
    else
        botao.disabled = true;
}