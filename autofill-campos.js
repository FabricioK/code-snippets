(function autoFill(angular, start) {
    clear();
    window.autoFill = autoFill;

function randomiza(n) {
    var ranNum = Math.round(Math.random() * n);
    return ranNum;
}
function mod(dividendo, divisor) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
}

function email() {
    var n = 9;
    var n1 = randomiza(n);
    var n2 = randomiza(n);
    var n3 = randomiza(n);
    var n4 = randomiza(n);
    var n5 = randomiza(n);
    var n6 = randomiza(n);
    var n7 = randomiza(n);
    var n8 = randomiza(n);
    var n9 = randomiza(n);
    var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10)
        d1 = 0;
    var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10)
        d2 = 0;
    retorno = '' + n1 + n2 + n3 + n4 + n5 +'@'+ n6 + n7 + n8 +'.'+ n9 + d1 + d2;
    return retorno;
}

function cpf(comPontos) {
    var n = 9;
    var n1 = randomiza(n);
    var n2 = randomiza(n);
    var n3 = randomiza(n);
    var n4 = randomiza(n);
    var n5 = randomiza(n);
    var n6 = randomiza(n);
    var n7 = randomiza(n);
    var n8 = randomiza(n);
    var n9 = randomiza(n);
    var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10)
        d1 = 0;
    var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10)
        d2 = 0;
    retorno = '';
    if (comPontos)
        retorno = '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
    else
        retorno = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
    return retorno;
}

function putObject(path, object, value) {
    var modelPath = path.split(".");

    function fill(object, elements, depth, value) {
        var hasNext = ((depth + 1) < elements.length);
        if (depth < elements.length && hasNext) {
            if (!object.hasOwnProperty(modelPath[depth])) {
                object[modelPath[depth]] = {};
            }
            fill(object[modelPath[depth]], elements, ++depth, value);
        } else {
            object[modelPath[depth]] = value;
        }
    }
    //usa o Parent porque o dapicker cria um scopo próprio. ...
    fill(object, modelPath, 0, value);
}

var appElement = document.querySelector('[ng-show="tabInfo"]');
var appScope = angular.element(appElement).scope();


var novocpf = cpf(true);
var novoemail = email();

console.log('===== Cpf ==========');
console.log(novocpf);
console.log('===== Email ==========');
console.log(novoemail);

var lista = {
    'usuario.Nome' : 'autofill3',
    'usuario.DataDeNascimento' : '10/05/1992',    
    'usuario.Nr': 123,    
    'usuario.Sexo': 1,    
    'usuario.NomeMae':'autofill mae' ,
    'usuario.Cpf': novocpf,
    'usuario.Rg':12654789 ,
    'usuario.OrgaoEmissor': 'sspsc',
    'usuario.Endereco' : 'Rua autoFill',
    'usuario.Cep' :12345678 ,
    'usuario.Bairro' : 'Bairro autofill' ,
    'usuario.DddResidencial' : 48,
    'usuario.NumeroResidencial' : 12345678,
    'usuario.DddCelular' : 48,
    'usuario.NumeroCelular' : 12345678,
    'usuario.Complemento':'Complemento autoFill',
    'usuario.NrCnh' : 123456789,
    'usuario.CategoriaDaCnh' : 1,
    'usuario.Email' : novoemail,
    'ConfirmacaoEmail': novoemail,
    'Senha' : 12345678,
    'ConfirmacaoSenha' : 12345678 
}

if(appScope){
    _.forEach(lista, function(value, key) {
       appScope.$apply(putObject(key, appScope, value))
    });
}
}(window.angular));
