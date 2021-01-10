$(document).ready(function () {
    //--- variáveis globais
    //--- funções globais
    $("#exampleInputBirthDate1").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy/mm/dd',
        yearRange: "-100:-18"
    });
    $("#exampleInputBirthDate2").datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy/mm/dd',
        yearRange: "-100:-18"
    });
    //--- viewmodel - métodos e dados
    function MyViewModel() {
        //--- variáveis do viewmodel
        var self = this;
        self.tmp = null;
        self.participants = ko.observableArray();
        self.hasParticipants = ko.computed(function () {
            var retVal = (self.participants().length > 0);
            console.log('hasParticipants: ' + retVal);
            return retVal;
        }, self);
        //--- métodos do viewmodel
        self.createParticipant = function () {
            var participant = { 'name': '', 'email': '', 'address': '', 'birthDate': '', 'sex': '', 'course': { 'id': '', 'name': '' } };
            console.log('createParticipant');
            //--- carrega um novo participante na lista
            participant.name = $("#exampleInputName1").val();
            participant.email = $("#exampleInputEmail1").val();
            participant.address = $("#exampleInputAddress1").val();
            participant.birthDate = $("#exampleInputBirthDate1").val();
            participant.sex = $("#createParticipantModal input[type=radio]:checked").val();
            participant.course.id = $('#exampleInputCourse1').val();
            participant.course.name = $('#exampleInputCourse1 :selected').text();
            //--- insere novo participante na lista
            self.participants.push(participant);
            console.log(participant);
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
                });
            $("#createParticipantModal").modal('toggle');
        };
        self.readParticipant = function (participant) {
            self.tmp = participant;
            console.log('readParticipant', "[" + participant.name + "]");
            $("#exampleInputName2").val(participant.name);
            $("#exampleInputEmail2").val(participant.email);
            $("#exampleInputAddress2").val(participant.address);
            $("#exampleInputBirthDate2").val(participant.birthDate);
            if (participant.sex != '') {
                $("#readParticipantModal [name = exampleInputSex2][value=" + participant.sex + "]").prop('checked', true);
            }
            else {
                $("#readParticipantModal [name = exampleInputSex2]").prop('checked', false);
            }
            $('#exampleInputCourse2').val(participant.course.id);
        };
        self.readParticipants = function () {
            console.log('init');
            //--- carrega a lista com um conjunto de participantes
            self.participants([
                { 'name': 'Noé Elisabete Ferreiro', 'email': '', 'address': '', 'birthDate': '', 'sex': 'Male', 'course': { 'id': '', 'name': '' } },
                { 'name': 'Marta Matias Lucas', 'email': 'marta.lucas@teste.com', 'address': '', 'birthDate': '', 'sex': '', 'course': { 'id': '', 'name': '' } },
                { 'name': 'Ezequiel Augusto Melo', 'email': '', 'address': 'Rua de Cima, n.º 8\nAveiro\nPORTUGAL', 'birthDate': '1998/11/17', 'sex': 'Male', 'course': { 'id': '', 'name': '' } },
                { 'name': 'Mariana Cravo', 'email': '', 'address': '', 'birthDate': '', 'sex': 'Female', 'course': { 'id': '', 'name': '' } },
                { 'name': 'Albino Nico Armando', 'email': '', 'address': '', 'birthDate': '', 'sex': '', 'course': { 'id': '', 'name': '' } },
                { 'name': 'Alexandra Eufêmia Torres', 'email': '', 'address': '', 'birthDate': '', 'sex': '', 'course': { 'id': '', 'name': '' } }
            ]);
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name === right.name ? 0 : (left.name < right.name ? -1 : 1)
                });
        };
        self.updateParticipant = function (participant) {
            console.log('updateParticipant', participant);
            //--- remove o item selecionado para edição da lista
            self.participants.remove(self.tmp);
            //--- altera o item temporário
            self.tmp.name = $("#exampleInputName2").val();
            self.tmp.email = $("#exampleInputEmail2").val();
            self.tmp.address = $("#exampleInputAddress2").val();
            self.tmp.birthDate = $("#exampleInputBirthDate2").val();
            self.tmp.sex = $("#readParticipantModal input[type=radio]:checked").val();
            self.tmp.course.id = $('#exampleInputCourse2').val();
            self.tmp.course.name = $('#exampleInputCourse2 :selected').text();
            //--- coloca novo elemento na lista
            self.participants.push(self.tmp);
            //--- limpa o objeto tmp
            self.tmp = null;
            //--- ordena a lista alfabeticamente pelo nome
            self.participants.sort(
                function (left, right) {
                    return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1)
                });
            //--- apaga a modal
            $("#readParticipantModal").modal('toggle');
            //--- debug
            console.log(self.participants());
        };
        self.deleteParticipants = function () {
            console.log('deleteParticipants');
            //--- apaga todos os participantes da lista
            self.participants.removeAll();
        };
        self.deleteParticipant = function (participant) {
            console.log('deleteParticipant');
            //--- apaga um participante da lista 
            self.participants.remove(participant);
        };
    }


    ko.applyBindings(new MyViewModel());
});