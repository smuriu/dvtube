# dvtube - Deezer app for DVT assessment

## Requirements

Deezer is an internet-based music streaming service. You are required to implement an app to explore its database:

1.  Users should be able to search for artists. For every artist found show the artist's picture and the number of fans they have. On bigger screens, with more available space, also include the total number of albums.

1.  Clicking/tapping the artist must allow users to see basic information about them, like its total number of fans. Also show its top 5 tracks along with a list of all their albums. For every album include the year in which it was released.

## The app

A full-stack Node/Vue app built with [Nuxt 3](https://nuxt.com/docs/getting-started/introduction).

API calls to Deezer all happen server-side for a couple of reasons:

1. Mitigate CORS issues

1. Protect any API secrets

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

### Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
