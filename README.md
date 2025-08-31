# Farcaster Mini App Template w/ Base MiniKit

<img width="229" height="50" alt="image" src="https://github.com/user-attachments/assets/f009e582-db39-43dc-bbc4-cf70db70e916" />



This is a [Next.js](https://nextjs.org) starter kit bootstrapped from [Mini App Next Template](https://github.com/builders-garden/miniapp-next-template)
This is a project that promotes the use of decentralized electrical energy and, through tokens, generates a fully sustainable ecosystem.
The future is now.

Our project is built on a tokenized energy platform, powered by our token ENERGYBASE. This innovation transforms energy into a transparent and tradable digital asset, paving the way for a more efficient and modern ecosystem.

We integrate a ranking system that encourages the purchase of energy generators, while also leveraging Artificial Intelligence for automated energy management. This enables real-time optimization of distribution, consumption, and efficiency, creating a smarter and more sustainable ecosystem.

With this approach, we not only promote the use of renewable energy but also deliver a highly attractive solution for large companies, helping them reduce costs, enhance their environmental footprint, and participate in a decentralized, next-generation energy market.


Este es un proyecto que promueve el uso de energía eléctrica descentralizada y, mediante tokens, genera un ecosistema totalmente sostenible.
El futuro es ahora.


Nuestro proyecto se basa en una plataforma de energía tokenizada, impulsada por nuestro token ENERGYBASE. Esta innovación convierte la energía en un activo digital transparente e intercambiable, abriendo la puerta a un ecosistema más eficiente y moderno.

Integramos un sistema de ranking que incentiva la compra de generadores de energía y, al mismo tiempo, utilizamos Inteligencia Artificial para la automatización de la gestión energética. Esto permite optimizar la distribución, el consumo y la eficiencia en tiempo real, garantizando un ecosistema más inteligente y sostenible.

Con esta propuesta, no solo fomentamos el uso de energías renovables, sino que también ofrecemos una solución altamente atractiva para grandes empresas, ayudándolas a reducir costos, mejorar su huella ambiental y participar en un mercado energético descentralizado y de próxima generación.

DONIQUIAN PEDRO - REBOLLEDO SANTIAGO - PABLO ROLDAN GARCIA

To open the application you need Base and its mini-applications

- [MiniKit](https://docs.base.org/builderkits/minikit/overview)
- [Farcaster Mini Apps](https://miniapps.xyz)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [Tailwind CSS](https://tailwindcss.com)
- [Next.js](https://nextjs.org/docs)
- [Neynar](https://neynar.com)

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Verify environment variables:

The environment variables enable the following features:

- Frame metadata - Sets up the Frame Embed that will be shown when you cast your frame
- Account assocation - Allows users to add your frame to their account, enables notifications
- Redis API keys - Enable Webhooks and background notifications for your application by storing users notification details

```bash
# Required for Frame metadata
NEXT_PUBLIC_URL=
NEXT_PUBLIC_MINIKIT_PROJECT_ID=

# Required to allow users to add your frame
NEXT_PUBLIC_FARCASTER_HEADER=
NEXT_PUBLIC_FARCASTER_PAYLOAD=
NEXT_PUBLIC_FARCASTER_SIGNATURE=

# Required for user authentication
NEYNAR_API_KEY=
JWT_SECRET=

# Required for webhooks and background notifications
REDIS_URL=
REDIS_TOKEN=
```

3. Start the development server:

```bash
npm run dev
```

4. Run a local tunneling server

- [NGROK](https://ngrok.com)
- [Local Tunnel](https://theboroer.github.io/localtunnel-www/)

5. Generate your Farcaster Manifest variables

- Follow these [instructions](https://miniapps.farcaster.xyz/docs/guides/publishing)
- Visit [Manifest Tool](https://warpcast.com/~/developers/mini-apps/manifest)
- Paste your tunnel domain

## Template Features

### Frame Configuration

- `.well-known/farcaster.json` endpoint configured for Frame metadata and account association
- Frame metadata automatically added to page headers in `layout.tsx`

### Background Notifications

- Redis-backed notification system using Upstash
- Ready-to-use notification endpoints in `api/notify` and `api/webhook`
- Notification client utilities in `lib/notification-client.ts`

### MiniKit Provider

The app is wrapped with `MiniKitProvider` in `providers.tsx`, configured with:

- OnchainKit integration
- Access to Frames context
- Sets up Wagmi Connectors
- Sets up Frame SDK listeners
- Applies Safe Area Insets

### Dynamic Preview Images

- `dynamic-image-example/[id]/page.tsx` show how to create a Mini App URL resolving to a custom preview image
- `api/og/example/[id]/route.ts` shows how to generate a custom preview image

## Learn More

- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [Farcaster Mini Apps](https://miniapps.xyz)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Neynar](https://neynar.com)
