const axios = require('axios');
const { performance } = require('perf_hooks');

const API_URL = 'http://localhost:3000';

async function testPerformance(dbType, numRequests = 100) {
    console.log(`\nTestando performance com banco de dados: ${dbType}`);
    
    // Configurar o tipo de banco de dados
    process.env.DB_TYPE = dbType;
    
    // Aguardar um pouco para garantir que o banco está pronto
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const start = performance.now();
    const promises = [];
    
    // Criar dados de teste usando o mesmo formato do curl que funcionou
    const vendaData = {
        cliente_id: 1,
        data_venda: "2024-06-01T12:00:00Z",
        valor_total: 1000.00,
        desconto_aplicado: 5.00,
        itens: [
            {
                produto_id: 1,
                quantidade: 2,
                preco_unitario: 500.00
            }
        ]
    };
    
    // Simular requisições simultâneas
    for (let i = 0; i < numRequests; i++) {
        promises.push(
            axios.post(`${API_URL}/vendas`, vendaData)
                .catch(error => {
                    console.error(`Erro na requisição ${i + 1}:`, error.response?.data || error.message);
                })
        );
    }
    
    await Promise.all(promises);
    const end = performance.now();
    
    const totalTime = end - start;
    const avgTime = totalTime / numRequests;
    
    console.log(`Total de requisições: ${numRequests}`);
    console.log(`Tempo total: ${totalTime.toFixed(2)}ms`);
    console.log(`Tempo médio por requisição: ${avgTime.toFixed(2)}ms`);
    
    return {
        dbType,
        totalTime,
        avgTime,
        numRequests
    };
}

async function runTests() {
    console.log('Iniciando testes de performance...');
    
    // Testar com regras no backend
    const backendResults = await testPerformance('backend');
    
    // Aguardar um pouco entre os testes
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Testar com regras no banco de dados
    const dbRulesResults = await testPerformance('db_rules');
    
    // Comparar resultados
    console.log('\nComparação de resultados:');
    console.log('------------------------');
    console.log(`Backend Rules - Tempo médio: ${backendResults.avgTime.toFixed(2)}ms`);
    console.log(`DB Rules - Tempo médio: ${dbRulesResults.avgTime.toFixed(2)}ms`);
    
    const diff = ((dbRulesResults.avgTime - backendResults.avgTime) / backendResults.avgTime) * 100;
    console.log(`Diferença percentual: ${diff.toFixed(2)}%`);
}

// Executar testes
runTests().catch(console.error); 