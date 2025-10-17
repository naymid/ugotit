# Deployment Guide for Elk Scooters

## The Issue
When deploying this React SPA with client-side routing, the "View Details" buttons and direct URL access to routes like `/scooter/elk-thunderbolt` may not work. This is because your web server needs to be configured to serve `index.html` for all routes.

## Solutions by Server Type

### Netlify
A `_redirects` file has been added to the `public/` directory. No additional configuration needed.

### Vercel
Add a `vercel.json` file to your project root:
