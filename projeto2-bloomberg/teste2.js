const axios = require("axios");

const calculaLucro = (ticker, preco_comprado, volume_comprado) =>{
axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol="+ticker+"&apikey=MNPK2NIL3UAS75LJ").
then(response =>{
    const data = response.data;
  
    var texto = JSON.stringify(data), i = 0, pos = -1;
    do {
        pos = texto.indexOf('close', pos + 1);
        i++;
    } while (pos !== -1 && i < 2)
    
    var valor_atual = parseFloat(texto.substring(pos+8,pos+15));

    var lucro = (valor_atual - preco_comprado) * volume_comprado;
    console.log(lucro);

}).catch(err => console.log(err));
}

calculaLucro("MRFG3.SAO", 0, 1);
