# 📮 Coleção Postman - Beach Water Quality Monitor

Esta pasta contém a coleção do Postman para testar todos os endpoints da API de Monitoramento de Qualidade da Água nas Praias.

## 📁 Arquivos

- `Beach-Water-Quality-Monitor.postman_collection.json` - Coleção completa com todos os testes

## 🚀 Como Importar no Postman

### Método 1: Importação Direta
1. Abra o Postman
2. Clique em **Import** (botão no canto superior esquerdo)
3. Arraste o arquivo `Beach-Water-Quality-Monitor.postman_collection.json` ou clique em **Upload Files**
4. Selecione o arquivo e clique em **Import**

### Método 2: Via URL (se hospedado)
1. No Postman, clique em **Import**
2. Cole a URL do arquivo raw do GitHub/repositório
3. Clique em **Continue** → **Import**

## 📋 Estrutura da Coleção

### 🚨 Alertas
- **POST** `/api/alerts` - Criar Alerta (Copacabana)
- **POST** `/api/alerts` - Criar Alerta (Ipanema) 
- **POST** `/api/alerts` - Criar Alerta (Dados Inválidos) - Teste de validação
- **GET** `/api/alerts` - Listar Todos os Alertas

### 🌤️ Meteorologia
- **GET** `/api/weather` - Buscar Clima (Rio de Janeiro)
- **GET** `/api/weather` - Buscar Clima (Florianópolis)
- **GET** `/api/weather` - Buscar Clima (Cidade Inválida) - Teste de fallback
- **GET** `/api/weather` - Buscar Clima (Sem Parâmetro) - Teste de validação

### 🔗 Testes de Integração
- **POST** `/api/alerts` - Fluxo Completo (Criar e Listar)

## ⚙️ Configuração

### Variáveis da Coleção
- `baseUrl`: `http://localhost:3000/api` (URL base da API)

### Variáveis de Ambiente (Opcional)
Para usar dados meteorológicos reais, configure:
- `OPENWEATHER_API_KEY`: Sua chave da API OpenWeather

## 🧪 Testes Automatizados

Cada requisição inclui testes automatizados que verificam:

### Para Alertas:
- ✅ Status code correto (201 para criação, 200 para listagem)
- ✅ Estrutura da resposta JSON
- ✅ Validação de campos obrigatórios
- ✅ Ordenação por data de criação
- ✅ Presença de todos os campos necessários

### Para Meteorologia:
- ✅ Status code 200 para requisições válidas
- ✅ Status code 400 para parâmetros inválidos
- ✅ Estrutura completa dos dados meteorológicos
- ✅ Presença de indicadores de qualidade
- ✅ Fallback para dados mockados

## 🏃‍♂️ Como Executar os Testes

### Execução Individual
1. Certifique-se de que o servidor está rodando (`npm run dev`)
2. Clique em qualquer requisição
3. Clique em **Send**
4. Veja os resultados dos testes na aba **Test Results**

### Execução em Lote
1. Clique com o botão direito na coleção
2. Selecione **Run collection**
3. Configure as opções desejadas
4. Clique em **Run Beach Water Quality Monitor API**
5. Veja o relatório completo dos testes

## 📊 Exemplos de Resposta

### Criar Alerta (201)
```json
{
  "id": "abc123def",
  "beachName": "Copacabana",
  "alert": "Água imprópria para banho devido à poluição",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Listar Alertas (200)
```json
[
  {
    "id": "def456ghi",
    "beachName": "Ipanema",
    "alert": "Água própria para banho - condições excelentes",
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
]
```

### Dados Meteorológicos (200)
```json
{
  "weather": {
    "location": "Rio de Janeiro, BR",
    "temperature": 28,
    "humidity": 75,
    "windSpeed": 12.5,
    "uvIndex": 8.2,
    "description": "céu limpo"
  },
  "qualityIndicators": [
    {
      "type": "warning",
      "message": "Índice UV muito alto (8.2). Evite exposição prolongada."
    }
  ]
}
```

## 🐛 Solução de Problemas

### Servidor não está rodando
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solução**: Execute `npm run dev` no terminal do projeto

### Testes falhando
1. Verifique se a variável `baseUrl` está configurada corretamente
2. Certifique-se de que o servidor está na porta 3000
3. Execute as requisições na ordem sugerida

### API do OpenWeather
- Se não configurar a `OPENWEATHER_API_KEY`, a API retornará dados simulados
- Isso é normal e esperado para o funcionamento básico

## 📝 Notas Importantes

- ⚠️ **Dados em Memória**: Os alertas são armazenados em memória, reiniciar o servidor limpa os dados
- 🔄 **Cache**: Dados meteorológicos são cacheados por 10 minutos
- 🧪 **Testes**: Todos os endpoints possuem testes automatizados
- 📱 **CORS**: API configurada para aceitar requisições do frontend

## 🎯 Casos de Uso

### Para Desenvolvedores
- Teste rápido de todos os endpoints
- Validação de mudanças na API
- Documentação interativa dos endpoints

### Para QA/Testes
- Suite completa de testes automatizados
- Validação de cenários de erro
- Testes de integração entre endpoints

### Para Demonstração
- Exemplos práticos de uso da API
- Dados de exemplo para apresentação
- Validação do funcionamento completo
