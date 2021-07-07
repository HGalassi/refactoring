
//Refactor Pag 24 - 29

/**
 * Refatoro o codigo entorno do Switch/Case (Extrair funcao)
 */

const plays = require('./plays');
const invoices = require('./invoices');

var res = statement(invoices,plays);
console.log(res);

function statement (invoice,plays){
    let totalAmount = 0;
    let volumeCredits = 0; 
    let result = `Statement for ${invoice.customer} \n`;
    const format = new Intl.NumberFormat("en-US",
                                        { style: "currency", currency:"USD",
                                          minimumFractionDigits: 2}).format;
    
    for (let perf of invoice.performances){
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf,play);
     
        //soma creditos por volume
        volumeCredits += Math.max(perf.audience - 30,0);
        // soma um credito extra para cada dez espectadores de comedia
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        //exibe a linha para esta requisicao
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

        result += `Amount owed is ${format(totalAmount/100)}\n`;
        result += `You earned ${volumeCredits} credits\n`;
        console.log(result);
        return result;
 }

 // Depois de fazer a - Extracao de Funcao, olhar no metodo extraido para ver se ha alguma melhoria rapida que pode ser feita
 // Depois ele refatora os argumentos para um nome mais simples de ser entendido.
 function amountFor(aPerformance,play){
    let result = 0; //Troco totalAmount para result (dica do Escritor)

    switch(play.type){
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30){
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy": 
        result = 30000;
            if (aPerformance.audience > 20){
                result += 1000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error (`unknown type:${play.type}`);
    }
    return result;

 }
 module.exports = statement;