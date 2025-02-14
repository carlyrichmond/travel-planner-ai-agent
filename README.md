# Travel Planner AI Agent

Example Travel Planner Application Showing AI Agents Built Using AI SDK by Vercel

[TODO Screenshot]

## Prerequisites

To run this example, please ensure the following prerequisites are performed:

1. Please ensure you have the following tools installed:
- Node.js
- npm

To check you have Node.js and npm installed, run the following commands:

node -v
npm -v

2. Download and install [Ollama](https://ollama.com/) for managing and running models locally. Once installed, download the manifest for the [llama3.3](https://ollama.com/library/llama3.3) model:

```zsh
ollama pull llama3
ollama list

ollama run llama3
>>> Why is the sky blue?
```

3. Register for an OpenAI key via [their site](https://chatgpt.com/).

## Install & Run

Pull the required code from the accompanying content repository and start the project:

```
git clone [TODO]
```

Populate the `.env` file with your OpenAI key, Elasticsearch endpoint and Elasticsearch API key as per the below example:

```zsh
OPEN_AI_KEY=ARandomOpenAIKey?
ELASTIC_DEPLOYMENT=https://my-random-elastic-deployment:123
ELASTIC_API_KEY=ARandomKey!
```

The application makes use of [dotenv](https://www.npmjs.com/package/dotenv) to load the variables from the `.env` file.

Initialize and start the application:

```zsh
cd [TODO-folder]
npm install
npm run start
```