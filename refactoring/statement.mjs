import createStatementData from './createStatementData.mjs';
import plays from './plays.mjs';
import invoices from './invoices.mjs';

statement(invoices(),plays());

export function statement (invoices,plays){  
    return renderPlainText(createStatementData(invoices,plays));
}

 function renderPlainText(data,plays){
    let result = `Statement for ${data.customer} \n`;

    for (let perf of data.performances){
        result += ` ${perf.play.name}: ${usd(perf.amount/100)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount/100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    console.log("Compiled");
    return result;
    
    function usd(aNumber){
        return new Intl.NumberFormat("en-US",
                                    { style: "currency", currency:"USD",
                                        minimumFractionDigits: 2}).format(aNumber);
    }
    console.log("compiled");
 }

