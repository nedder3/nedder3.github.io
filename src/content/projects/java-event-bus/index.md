---
title: "Java Event Bus"
summary: "High-throughput asynchronous in-memory event bus featuring non-blocking CAS queues, bounded backpressure policies, and multi-consumer dispatch."
date: "Aug 15 2026"
draft: false
tags:
  - Java 21
  - Concurrency
  - Lock-Free
  - CompletableFuture
  - Event-Driven
repoUrl: "https://github.com/nedder3/java-event-bus"
---

### Architectural Overview

**Java Event Bus** is an asynchronous in-memory event routing framework designed for modular monoliths requiring microsecond-level dispatch latency without the latency overhead or network serialization costs of external message brokers.

#### Key Architectural Highlights

- **Non-Blocking Core:** Implements lock-free internal queuing using `ConcurrentLinkedQueue` and atomic CAS (Compare-And-Swap) operations on the hot path, eliminating thread contention.
- **Explicit Concurrency Boundaries:** Lock-free in unbounded mode; for bounded capacity scenarios, employs explicit backpressure policies (`REJECT` via `RejectedExecutionException` or `DROP` with drop-rate observability metrics).
- **Flexible Dispatch Modes:** Supports both broadcast/fan-out delivery (all subscribed handlers receive events) and round-robin load-balanced delivery (single consumer per event).
- **Asynchronous Orchestration:** Coordinated using Java 21 `CompletableFuture` chains with dedicated, thread-pool-isolated subscriber execution.
- **Stress-Tested Rigor:** **42 multi-threaded concurrency stress tests** validating strict ordering, backpressure enforcement, and zero race conditions under heavy subscriber loads.
