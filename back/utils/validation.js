const e = require("cors")

function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function ageCalculator(year, month, day) {
    const d = new Date

    currentYear = d.getFullYear()
    currentMonth = d.getMonth() + 1
    currentDay = d.getDate()

    year = +year
    month = +month
    day = +day

    howManyYears = currentYear - year

    if (currentMonth < month || currentMonth == month && currentDay < day) {
        howManyYears--
    }

    return howManyYears < 0 ? 0 : howManyYears;
}

function validaNome(value, msg) {
    existsOrError(value, 'Por favor, digite um nome válido...')    
    if(value.length < 3) throw msg
}

function validaSexo(value, msg){
    
    const sexo = value.substr(0, 1).toUpperCase() ?? "";
    const sexAllowed = ['M', 'F', 'O'];

    if(!sexAllowed.includes(sexo)){
        throw "O sexo informado está inválido, informe 'Masculino, Feminino ou Outros'";
    }
}

function validaIdade(value, msg) {
    existsOrError(value, 'Por favor, digite uma idade válida...')
    
    if(value <= 0) throw msg
}

function validaData(value, age, msg) {
    existsOrError(value, 'Por favor, digite uma data de nascimento válida')

    const data = value.split('-')
    
    if(ageCalculator(data[0], data[1], data[2]) != age) throw msg
    
}

function validaHobby(value, msg) {
    existsOrError(value, 'Por favor, digite um hobby')
    
    if(value.length < 5) throw msg
}

module.exports = { validaNome, validaSexo, validaIdade, validaData, validaHobby }

