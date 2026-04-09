# Aleksandra Cislowski Portfolio

Personal portfolio built with `Next.js`, `React`, `TypeScript`, and `MUI`.

This project is designed as both:
- a live portfolio website for recruiters and hiring managers
- a case-study-driven frontend project that shows how I think about UX, delivery, accessibility, and implementation quality

Live site: [aleksandracislowski.com](https://aleksandracislowski.com/)

## What This Project Shows

This portfolio is meant to present more than a visual interface.

It highlights how I work across:
- frontend engineering
- UX/UI thinking
- accessibility and responsive design
- performance-minded implementation
- structured product and delivery thinking

The site includes:
- a multilingual setup
- animated project presentation built around an interactive planets concept
- downloadable recruiter-facing materials
- project modal case studies
- responsive layouts for desktop, tablet, and mobile

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `MUI`
- `Emotion`
- `Framer Motion`

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
app/                  App Router entrypoints and metadata
components/           Main UI sections and shared presentation logic
components/projects/  Project planets, modal system, and project-specific UI
config/               Site config and project layout config
i18n/                 Translation dictionaries and language logic
public/               Static assets such as images, videos, and PDFs
theme/                Theme tokens and app theme setup
```

## Case Study

### FUNKOLOGI

**Project type:** Service website + content hub  
**Role:** UX/UI, frontend, delivery  
**Stack:** `Next.js`, `React`, `MUI`, `Firebase`  
**Live site:** [funcology.vercel.app](https://funcology.vercel.app/)

#### Context

The client had previously built her own WordPress website, but the result did not communicate enough trust, clarity, or professionalism. At the same time, she needed a setup that would allow her to publish and manage materials independently instead of relying on a developer for each content update.

#### Problem

The product challenge was not only visual.

The site needed to:
- feel more trustworthy and credible for families seeking specialist support
- communicate the offer more clearly
- improve usability and information structure
- create a practical content workflow for publishing PDFs and materials
- support future growth without turning content updates into technical bottlenecks

#### Approach

I approached the project as a mix of redesign, information architecture cleanup, and implementation work.

That meant:
- refining the visual direction to feel calm, clear, and professional
- simplifying the page structure and messaging
- designing a public materials library with search and category-based discovery
- building an admin flow with authentication and content management
- creating a publishing flow for PDF uploads with metadata and file handling

#### What Was Delivered

- redesigned frontend with stronger brand credibility
- clearer content hierarchy and improved page structure
- public materials library with search and category navigation
- Firebase-backed admin area
- PDF upload and publishing flow
- accessibility- and SEO-aware implementation
- scalable foundation for future content updates

#### Outcome

The final result is a modern website that better reflects the client’s expertise and gives her a more sustainable way to manage and publish resources on her own.

From a product and delivery perspective, the value was simple:
- stronger first impression
- clearer communication
- better maintainability
- more independence for the client

## Upcoming Case Studies

Additional project case studies will be added here over time.

The current structure already anticipates future additions, and the next entries will expand this README with:
- project context
- problem framing
- design and implementation decisions
- outcomes and learnings

## Why This README Is Written This Way

This repository is meant to be readable for both technical reviewers and non-technical recruiters.

That is why the README focuses on:
- business context
- delivery thinking
- concrete implementation scope
- project outcomes

instead of only listing libraries or generic setup steps.
