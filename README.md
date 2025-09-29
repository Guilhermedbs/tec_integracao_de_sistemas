# 🌊 Monitor de Qualidade da Água das Praias

Sabe quando você quer ir à praia mas fica naquela dúvida se a água está boa pra banho? Pois é, criei este sisteminha pra ajudar com isso! É uma aplicação web que monitora a qualidade da água das praias e ainda mostra as condições meteorológicas.

## 🏖️ O que ele faz?

Basicamente, você pode:
- 📢 Criar alertas sobre a qualidade da água (tipo "Ó, a água da Copacabana tá ruim hoje!")
- 📋 Ver todos os alertas que foram criados
- 🌤️ Consultar o tempo de qualquer cidade (integrado com a OpenWeather)
- 📱 Usar uma interface web bem bonitinha e que funciona no celular
- ⚠️ Receber indicadores automáticos baseados nas condições climáticas

## 🚀 Como rodar na sua máquina

### O que você precisa ter instalado

- Node.js (versão 18 ou mais nova)
- npm (já vem junto com o Node) ou yarn se preferir

### Colocando pra funcionar

1. **Primeiro, instale as dependências:**

```bash
npm install
```

2. **Quer dados meteorológicos reais? (opcional)**

Se quiser usar dados reais do tempo, é só criar uma conta gratuita no [OpenWeather](https://openweathermap.org/api) e pegar sua chave da API. Depois, configure assim:
### No Windows
```bash

set OPENWEATHER_API_KEY=sua_chave_aqui
```

### No Linux/Mac
```bash
export OPENWEATHER_API_KEY=sua_chave_aqui
```

⚠️ **Relaxa:** Se não fizer isso, o sistema vai funcionar normalmente com dados simulados do tempo.

3. **Agora é só rodar:**

```bash
npm run dev
```

4. **Pronto! Acesse em:**
   - Interface: http://localhost:3000
   - API: http://localhost:3000/api

### Outros comandos úteis

```bash
# Rodar em modo desenvolvimento (com recarga automática)
npm run dev

# Gerar build pra produção
npm run build

# Rodar a versão de produção
npm start

# Rodar os testes
npm test
```

## 🧪 Testando se tá tudo funcionando

### Testes automatizados
Pra ter certeza que não quebrei nada:

```bash
npm test
```

Os testes verificam se:
- ✅ Consegue criar alertas com dados corretos
- ✅ Reclama quando falta informação obrigatória
- ✅ Lista os alertas direitinho
- ✅ Ordena por data (mais recente primeiro)

### 📮 Testando com Postman (pra quem gosta)
Se você curte testar APIs no Postman, deixei uma coleção pronta na pasta `postman/`:

1. **Importa a coleção**: `postman/Beach-Water-Quality-Monitor.postman_collection.json`
2. **Configura a variável**: `baseUrl = http://localhost:3000/api`
3. **Manda bala**: Todos os endpoints já com validações prontas

**O que tem lá:**
- ✅ Testes de todas as rotas (alertas e tempo)
- ✅ Validações pra quando dá erro e quando dá certo
- ✅ Testes de integração completos
- ✅ Exemplos de como usar
- ✅ Documentação interativa bonitinha

## 📡 Como usar a API

### Criar um alerta - POST /api/alerts
Pra criar um alerta sobre alguma praia:

**Manda assim:**
```json
{
  "beachName": "Copacabana",
  "alert": "Água imprópria para banho"
}
```

**Volta assim (201):**
```json
{
  "id": "abc123def",
  "beachName": "Copacabana",
  "alert": "Água imprópria para banho",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Ver todos os alertas - GET /api/alerts
Pega todos os alertas, com os mais novos primeiro:

**Volta assim (200):**
```json
[
  {
    "id": "abc123def",
    "beachName": "Copacabana",
    "alert": "Água imprópria para banho",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Ver o tempo - GET /api/weather
Pra consultar o tempo de qualquer cidade:

**O que você pode passar:**
- `city` (obrigatório) - Nome da cidade
- `state` (opcional) - Estado
- `country` (opcional) - País (se não passar, assume BR)

**Exemplo de uso:**
```
GET /api/weather?city=Rio de Janeiro&country=BR
```

**Volta assim (200):**
```json
{
  "weather": {
    "location": "Rio de Janeiro, BR",
    "temperature": 28,
    "humidity": 75,
    "windSpeed": 12.5,
    "windDirection": 180,
    "visibility": 10.0,
    "uvIndex": 8.2,
    "description": "céu limpo",
    "icon": "01d",
    "pressure": 1013,
    "feelsLike": 31
  },
  "qualityIndicators": [
    {
      "type": "warning",
      "message": "Índice UV muito alto (8.2). Evite exposição prolongada."
    }
  ]
}
```

## 🏗️ Como tá organizado

```
src/
├── controllers/     # Onde ficam os endpoints
├── services/        # A lógica principal do negócio
├── routes/          # Definição das rotas da API
├── tests/          # Testes automatizados
├── types.ts        # Tipos do TypeScript
└── server.ts       # O servidor Express

public/
└── index.html      # A interface web

postman/
├── Beach-Water-Quality-Monitor.postman_collection.json  # Coleção do Postman
└── README.md       # Como usar a coleção
```

## 🎨 A interface web

Fiz uma interface bem simples mas funcional, com:

- 📝 **Formulário** pra criar alertas novos
- 📊 **Dashboard** mostrando o status geral
- 🌤️ **Seção do tempo** com dados atualizados
- 📈 **Indicadores automáticos** baseados no clima
- 📋 **Lista dos alertas** em tempo real
- 🔄 **Atualização automática** dos dados
- 📱 **Funciona no celular** também

### O que mostra sobre o tempo:
- 🌡️ **Temperatura** atual e sensação térmica
- 💨 **Vento** (velocidade e direção)
- 👁️ **Visibilidade** 
- ☀️ **Índice UV** (com avisos automáticos quando tá perigoso)
- 💧 **Umidade** do ar
- 📊 **Pressão** atmosférica
- ⚠️ **Alertas automáticos** quando o tempo tá ruim pra praia

## 🛠️ Tecnologias que usei

- **Backend:** Node.js com Express e TypeScript
- **Frontend:** HTML5, CSS3 e JavaScript puro (sem framework)
- **API Externa:** OpenWeather pra pegar dados do tempo
- **HTTP Client:** Axios pras requisições
- **Testes:** Vitest e Supertest
- **Build:** TypeScript Compiler e TSX

## 📝 Algumas observações

- Os dados ficam salvos na memória (pra simplificar mesmo)
- Tem validação básica dos campos obrigatórios
- Os alertas são ordenados automaticamente por data
- A interface é responsiva e funciona bem no mobile
- Os testes cobrem os cenários principais


