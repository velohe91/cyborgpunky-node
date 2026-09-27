# AGENTS.md

This repository contains the CyborgPunks Club web application and its
existing website, Cryogenic Room, Arcade, blockchain environment, wallet
connectivity, tickers, and NFT-related functionality.

Keep the existing architecture and working functionality unless the
developer explicitly requests a change.

## Working Rules

### Scope of Changes

- Work on one specific task or page at a time.
- Make the smallest change that fully satisfies the requested task.
- Do not make unrelated changes.
- Do not refactor, restructure, rename, remove, or rewrite working code
  unless explicitly requested.
- Preserve existing functionality outside the requested change.
- Do not use a requested change as an opportunity to clean up, modernize,
  optimize, or redesign unrelated code.
- If additional improvements are discovered, report them separately and
  wait for explicit approval.

## Protected Systems

The following systems are protected and must NOT be modified unless the
developer explicitly requests a change.

### Tickers

Do not modify:

- ticker content
- ticker behavior
- ticker animations
- ticker positioning
- ticker styling
- ticker timing
- ticker components

unless explicitly requested.

### Blockchain Environment

Do not modify the blockchain environment, configuration, network settings,
contract configuration, providers, chain configuration, transaction logic,
or blockchain-related infrastructure unless explicitly requested.

### Wallet Connection

Do not modify:

- wallet connection logic
- wallet providers
- wallet authentication
- wallet modals
- wallet state management
- connection/disconnection behavior
- wallet-related configuration

unless explicitly requested.

### Arcade

Do not modify the Arcade system, game logic, components, assets, routes,
or configuration unless explicitly requested.

## Shared Components

Before modifying a shared component, determine which pages or systems
depend on it.

Do not modify a shared component solely to achieve a page-specific visual
change if the modification could affect unrelated pages or protected
systems.

Prefer page-specific styling or composition when appropriate.

## Navigation and Routes

The current primary navigation order is:

Home → Cryogenic Room → Transmissions → About

- Home primary CTA: **ENTER THE ROOM** → /cryogenic-room
- /cryogenic-room reuses the existing NFT gallery functionality with
  CyborgPunks data.

Do not rename, move, delete, restructure, or reorder existing routes or
navigation unless explicitly requested.

## Page Development

Pages should be improved individually.

When working on a page:

- Modify only the requested page and directly necessary components.
- Preserve existing routes.
- Preserve existing data.
- Preserve blockchain functionality.
- Preserve wallet connectivity.
- Preserve tickers.
- Preserve Arcade functionality.
- Do not introduce unrelated design changes.

## Brand

- Visible brand: **CyborgPunks Club**
- Package name: cyborgpunky-node
- Do not reintroduce **VΣLOHE SYSTEM** into the CyborgPunks Club branding
  unless explicitly requested.

## Chrome

- Ticker: BTC // ETH // SOL // XTZ // POL
- Home boot:
  - > CRYOGENIC SYSTEM ACTIVATED
  - > SYSTEM ONLINE

## Skin

- Fonts: Press Start 2P (UI arcade) + VT323 (lore)
- Colors: #0CF1FF #3003D9 #DB3FFD #FFC825 on #05010d

## Git Workflow

Work must be performed on the branch explicitly designated by the
developer.

Commits are allowed on the designated secondary/feature branch when the
developer has authorized the commit.

The agent may create commits on secondary/feature branches when:

- The branch has been explicitly designated for the work.
- The developer has authorized the commit.
- The commit contains only the intended changes.

### Main Branch Protection

The main branch is protected for agent operations.

The agent must NEVER, without explicit developer authorization:

- commit directly to main
- push changes directly to main
- rewrite main history
- reset main
- force-push main
- merge a feature branch into main

Do not switch away from the designated working branch unless the developer
explicitly requests it.

## Local Testing and Review

When applicable, the preferred workflow is:

1. Work on the designated secondary/feature branch.
2. Make the requested changes.
3. Test locally with the development server.
4. Review the result.
5. Review git diff.
6. Commit the changes when the developer has authorized the commit.

## Do Not Assume

Do not invent:

- contract addresses
- blockchain networks
- wallet behavior
- API endpoints
- NFT metadata
- collection data
- smart-contract functionality
- application features

Use the existing implementation unless the developer explicitly requests
something new.
