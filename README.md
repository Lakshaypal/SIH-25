# Blue Carbon Registry — Hobby Prototype (SIH 2025)

A hobby/hackathon prototype exploring how blue-carbon projects, carbon-credit pools and project verification could be presented in a web interface.

## What's included

- `blue-carbon-registry/`: React 19 + Vite application with a public landing page, carbon-pool dashboard, wallet connection and a demonstration admin review flow.
- `web_application/`: an earlier HTML/CSS/JavaScript prototype with project registration, project lists and account screens.

The React dashboard uses sample pool/project figures. Several navigation destinations are placeholders, and the admin flow uses browser-local demo state rather than server-side authentication. Contract deployment, credit issuance and verified measurement/reporting are not implemented by this repository. Do not use the KYC prototype with real identity documents.

## Run the React prototype

Use Node.js 20.19+ or 22.12+ and npm:

```sh
git clone https://github.com/Lakshaypal/hobby-blue-carbon-registry.git
cd hobby-blue-carbon-registry/blue-carbon-registry
npm ci
npm run dev
```

Use the local URL printed by Vite. An injected Ethereum wallet is optional for viewing the interface; the Connect Wallet button requests an account connection. Connecting a wallet does not issue or transfer credits.

```sh
npm run build
npm run preview
```

Build output is placed in `blue-carbon-registry/dist/`. The root-level package file is not the React app's entry point.

## Earlier static prototype

From the repository root:

```sh
python3 -m http.server 8000 --directory web_application
```

Open `http://localhost:8000`. The static prototype and React application are separate implementations; they do not share a production backend.

## Stack

React, Vite, React Router, Tailwind CSS, Recharts, React Three Fiber and ethers v6.
