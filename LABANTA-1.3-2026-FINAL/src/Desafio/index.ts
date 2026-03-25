function calculeValorPagoPeloVeiculo(){

    const dias = 30
    let parcela = 1 //primeira parcela
    let valorTotal = 0

    for (let i = 1; i <= dias; i++) {
        valorTotal += parcela
        parcela *= 2 //parcela dobra a cada dia

        console.log({
            dia: i,
            parcela: parcela,
            valorTotal: valorTotal
        })
    }

    return valorTotal
}


console.log(`valor total: ` + calculeValorPagoPeloVeiculo());