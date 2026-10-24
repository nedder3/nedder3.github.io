---
title: "whaah - In-Browser Cloud Emulator"
summary: "Lightweight, zero-install emulator for AWS cloud primitives running directly in modern browser environments, backed by automated Vitest suites."
date: "May 01 2026"
draft: false
tags:
  - TypeScript
  - Emulation
  - Cloud / AWS
  - Vitest
repoUrl: "https://github.com/nedder3/whaah"
---

### Architectural Overview

**whaah** is a zero-dependency, in-browser emulator for AWS cloud services designed for rapid local prototyping, sandbox evaluation, and offline educational demonstrations without requiring live AWS infrastructure or billing credentials.

#### Key Architectural Highlights

- **Client-Side Simulation:** Emulates fundamental AWS operations entirely within the browser execution runtime using TypeScript.
- **Contract Fidelity:** Replicates AWS REST API contracts, standard error responses, and query parameters.
- **Automated Verification:** Fully covered by 16 automated Vitest test suites verifying contract compliance and simulated state mutations.
