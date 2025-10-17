# Deployment Guide for Elk Scooters

## The Problem

This is a Single Page Application (SPA) built with React Router. When deployed, direct navigation to routes like `/scooter/elk-thunderbolt` or clicking "View Details" buttons may fail because the server doesn't know how to handle these routes.

## The Solution

Configure your server to redirect all non-file requests to `index.html`, allowing React Router to handle the routing.

---

## Railway Deployment

Railway typically serves static files directly. To enable client-side routing on Railway:

### Option 1: Using a Static Server (Recommended)

1. Install `serve` as a dependency:
