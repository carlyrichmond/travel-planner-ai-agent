# Travel Planner AI Agent

Example Travel Planner Application Showing AI Agents Built Using AI SDK by Vercel and Elasticsearch.

[TODO Screenshot]

## Prerequisites

To run this example, please ensure the following prerequisites are performed:

1. Please ensure you have the following tools installed:
- Node.js
- npm

To check you have Node.js and npm installed, run the following commands:

node -v
npm -v

*Please ensure that you are running Node v20.13.1 or higher*

2. Register for an OpenAI key via [their site](https://chatgpt.com/).

## Install & Run

Pull the required code from the accompanying content repository and start the project:

```
git clone https://github.com/carlyrichmond/travel-planner-ai-agent.git
```

Populate the `.env` file with your OpenAI key, Weather API key, Elasticsearch endpoint and Elasticsearch API key as per the below example:

```zsh
OPENAI_API_KEY=ARandomOpenAIKey?
WEATHER_API_KEY=MyWeatherKey!
ELASTIC_DEPLOYMENT=https://my-random-elastic-deployment:123
ELASTIC_API_KEY=ARandomKey!
```

Once these keys have been populated, you can use [`direnv`](https://direnv.net/) or an equivalent tool to load them.

Load the sample flight data using [`tsx`](https://www.npmjs.com/package/tsx) or [`ts-node`](https://www.npmjs.com/package/ts-node):

```zsh
direnv allow
cd src/app/scripts
tsx ingestion.ts
```

Initialize and start the application:

```zsh
npm install # key dependencies: ai @ai-sdk/openai zod @elastic/elasticsearch
npm run dev
```