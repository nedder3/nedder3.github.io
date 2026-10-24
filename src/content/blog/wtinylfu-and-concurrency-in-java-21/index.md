---
title: "Designing a Distributed Cache Engine: W-TinyLFU, Vector Clocks & Java 21 Concurrency"
summary: "An architectural exploration of near-optimal cache admission with Count-Min Sketch frequency estimation, causality tracking with Vector Clocks, and lock-free concurrency in Java 21."
date: "Oct 22 2026"
draft: false
tags:
  - Java 21
  - Distributed Systems
  - Concurrency
  - Architecture
  - Algorithms
---

When building distributed caching infrastructure, standard off-the-shelf LRU (Least Recently Used) policies break down under skewed, real-world access distributions. A burst of one-hit wonders can pollute the entire cache working set, ejecting frequently requested entries and crippling hit ratios.

In this deep dive, we walk through the architectural rationale and mechanics behind **[distributed-cache-engine](https://github.com/nedder3/distributed-cache-engine)**, exploring three key components:
1. **W-TinyLFU Admission Policy** using probabilistic frequency filters.
2. **Causality & Happens-Before Tracking** with Vector Clocks.
3. **Lock Striping and Virtual Threads** in Java 21.

---

### 1. The Cache Eviction Dilemma: Why LRU Fails

Traditional LRU only accounts for **recency**, not **frequency**. Conversely, pure LFU (Least Frequently Used) tracks frequency, but suffers from two critical flaws:
- High memory overhead storing 32-bit counters per entry.
- Historical bias: items popular in the past never get evicted, even after demand drops to zero.

#### W-TinyLFU: The Best of Both Worlds

W-TinyLFU (Window TinyLFU) organizes cache capacity into distinct segments:
- **Window Cache (LRU):** Accepts all newly arrived items. Caters to bursty, short-lived recency.
- **Main Cache (Segmented LRU):** Divided into a *Protected* region (frequent items) and a *Probationary* region (candidates for promotion or eviction).
- **Admission Filter:** When the window cache overflows into the main cache, an admission duel occurs between the incoming candidate and the victim from the probation queue.

```
       [ Incoming Writes ]
               │
               ▼
      ┌─────────────────┐
      │  Window Cache   │ (Recency buffer: ~1% capacity)
      └────────┬────────┘
               │
       Candidate evicted
               ▼
       ┌──────────────┐      Admission Duel      ┌──────────────┐
       │   Candidate  │ ── [Count-Min Sketch] ── │ Victim Entry │
       └──────────────┘         Comparison       └──────────────┘
               │                                         │
       Winner admitted                           Loser evicted
               ▼                                         ▼
      ┌─────────────────┐                       [ Discard / Drop ]
      │   Main Cache    │ (Segmented LRU: 99% capacity)
      │ ┌─────────────┐ │
      │ │ Probation   │ │
      │ └──────┬──────┘ │
      │ ┌──────▼──────┐ │
      │ │ Protected   │ │
      │ └─────────────┘ │
      └─────────────────┘
```

#### Count-Min Sketch Frequency Estimation

To avoid storing unbounded counters, TinyLFU uses a 4-bit **Count-Min Sketch**:
- A 2D array of 4-bit counters indexed by 4 independent hash functions.
- On each access, the corresponding 4 counters are incremented (saturating at 15).
- Frequency estimation queries return the minimum observed counter:
  `estimate(key) = min(M[0, h₀(key)], M[1, h₁(key)], M[2, h₂(key)], M[3, h₃(key)])`
- **Aging & Reset:** Every window of `W` admissions, all counters across the sketch are halved via bit-shifting (`counter >> 1`), preventing stale popularity biases.

---

### 2. Multi-Master Causality with Vector Clocks

In a distributed peer-to-peer or active-active cache topology, physical wall-clock timestamps cannot be trusted to order mutations due to network latency and clock drift (NTP skew).

Each cache node maintains a **Vector Clock** `V`, defined as:
```text
V[i][j] = number of state mutations observed by node i that originated at node j
```

#### Causality & Conflict Detection Rules:

1. **Happens-Before (`A → B`):**
   Event `A` causally precedes event `B` if and only if every component of `V_A` is less than or equal to `V_B`, and at least one component is strictly smaller:
   ```text
   (∀k : V_A[k] ≤ V_B[k])  AND  (∃k : V_A[k] < V_B[k])
   ```

2. **Concurrent Mutation Conflict (`A || B`):**
   If neither vector dominates the other:
   ```text
   NOT (V_A ≤ V_B)  AND  NOT (V_B ≤ V_A)
   ```
   A concurrent write conflict has occurred across nodes.

In `distributed-cache-engine`, concurrent mutations trigger deterministic domain merge strategies or surface conflicting versions to callers using explicit version tokens, preventing silent data loss.

---

### 3. Concurrency Model: Java 21 Virtual Threads & Striped Locks

Rather than using global monitors (`synchronized`) which serialize hot paths, the engine is structured around **lock striping** and **Java 21 Project Loom (Virtual Threads)**:

- **Partitioned Concurrency:** Keys are hashed into `N` power-of-two stripes (`N = 64` or `128`), ensuring writes to different keys proceed completely in parallel without thread contention.
- **Unbounded Lightweight Concurrency:** Network replication and WAL write-backs are dispatched via `Executors.newVirtualThreadPerTaskExecutor()`, utilizing ephemeral virtual threads that yield to the carrier thread pool on I/O operations without OS thread bloat.
- **Atomic State Verification:** Key metadata transitions leverage atomic CAS operations via `VarHandle` and `AtomicReference`.

---

### 4. Verification and Benchmark Rigor

An architectural claim is only as good as its verification suite:
- **359 Automated Tests:** Unit test suites verify hash collisions, sketch saturation, WAL replaying, and causal vector orderings.
- **Concurrency Stress Tests:** Multi-threaded stress runners execute simultaneous put/get/evict cycles across dozens of concurrent worker threads, asserting zero deadlocks, zero lost updates, and 100% deterministic WAL recovery.

For complete source code and test harnesses, check out the repository:
👉 **[github.com/nedder3/distributed-cache-engine](https://github.com/nedder3/distributed-cache-engine)**
