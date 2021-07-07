
const plays = {
    "hamlet" : {"name" : "Hamlet", "type": "tragedy"},
    "as-like" : {"name" : "As You Like It", "type": "comedy"},
    "othello" : {"name" : "Othello", "type": "tragedy"}
};

const invoices = 
    {
        "customer": "BigCo",
        "performances": [
            { 
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID" : "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            }
        ]
    };

var res = statement(invoices,plays);
//console.log(res);

function statement (invoice,plays){
    let totalAmount = 0; //Variavel transitoria, existe apenas para armazenar o valor a cada iteracao do loop
    let volumeCredits = 0; //Declarada fora do loop, utilizada no loop e depois no objeto de retorno para informar o total de creditos
    let result = `Statement for ${invoice.customer} \n`;
    const format = new Intl.NumberFormat("en-US",
                                        { style: "currency", currency:"USD",
                                          minimumFractionDigits: 2}).format;
    
    for (let perf of invoice.performances){
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch(play.type){
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30){
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy": 
                thisAmount = 30000;
                if (perf.audience > 20){
                    thisAmount += 1000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error (`unknown type:${play.type}`);
        }

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
 module.exports = statement;