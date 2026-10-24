---
title: "Distributed Cache Engine"
summary: "Fault-tolerant distributed KV cache with Hexagonal architecture, Vector Clocks, WAL with CRC32 integrity, and W-TinyLFU eviction (359 automated tests)."
date: "Oct 20 2026"
draft: false
tags:
  - Java 21
  - Distributed Systems
  - Hexagonal Architecture
  - Concurrency
  - CQRS
  - Virtual Threads
repoUrl: "https://github.com/nedder3/distributed-cache-engine"
---

### Architectural Overview

**Distributed Cache Engine** is a high-performance, fault-tolerant key-value store engineered from scratch in Java 21, designed to study and implement core distributed systems primitives without third-party black boxes.

#### Key Architectural Highlights

- **Ports & Adapters (Hexagonal Architecture):** Decouples domain logic from network protocols, persistent storage, and cluster communication.
- **CQRS / Event Sourcing:** Strict segregation between mutate (Command) and read (Query) execution pathways.
- **Causality & Replication:** Implements **Vector Clocks** to detect concurrent updates, establish happens-before relationships, and resolve conflicting writes across active-active nodes.
- **Durability & Recovery:** Features an append-only **Write-Ahead Log (WAL)** protected by CRC32 checksum verification, point-in-time snapshotting, and crash-recovery replay mechanics.
- **Eviction Engine:** Pairs **W-TinyLFU** admission policies with a **Count-Min Sketch** frequency estimator, achieving optimal cache hit ratios under heavy zipfian distributions.
- **Concurrency & Concurrency Primitives:** Built leveraging Java 21 Virtual Threads and granular lock striping for high concurrent throughput.
- **Automated Verification:** Verified by **359 automated unit and integration tests**, including simulated cluster partitions and concurrent write contention.
