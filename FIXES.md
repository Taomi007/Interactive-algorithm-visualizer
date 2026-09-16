# Kinetic Logic Engine — Bug Fixes & Code Corrections

This document details all the identified bugs, edge cases, and line-highlighting corrections for `js/engine.js` so you can review and apply them directly to your code and GitHub repository.

---

## 1. Fix `neighborsOf()` for Directed Graphs
- **File:** `js/engine.js`
- **Location:** Line ~752
- **Issue:** The helper traverses graph edges backward on directed graphs because it is missing the `!graph.directed` condition.

### ❌ Before
```javascript
function neighborsOf(graph, u) {
  const out = [];
  graph.edges.forEach(([a, b]) => {
    if (a === u) out.push(b);
    if (b === u) out.push(a);
  });
  return out.sort();
}
```

### ✅ After
```javascript
function neighborsOf(graph, u) {
  const out = [];
  graph.edges.forEach(([a, b]) => {
    if (a === u) out.push(b);
    if (!graph.directed && b === u) out.push(a);
  });
  return out.sort();
}
```

---

## 2. Fix Radix Sort for All-Zero Input Arrays
- **File:** `js/engine.js`
- **Location:** Line ~725
- **Issue:** If an array is all zeros (e.g. `[0, 0, 0]`), `max` is `0`, causing `Math.floor(max / exp) > 0` to evaluate to `false` on the first iteration, skipping sorting completely.

### ❌ Before
```javascript
  steps.push({ array: arr.slice(), highlights: {}, line: 0, vars: { max }, message: `Largest value is ${max}. Determines number of digit passes.` });

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
```

### ✅ After
```javascript
  steps.push({ array: arr.slice(), highlights: {}, line: 0, vars: { max }, message: `Largest value is ${max}. Determines number of digit passes.` });

  const maxExp = max === 0 ? 1 : max;
  for (let exp = 1; Math.floor(maxExp / exp) > 0; exp *= 10) {
```

---

## 3. Fix Quick Sort Pre-Swap Variable in Log Message
- **File:** `js/engine.js`
- **Location:** Line ~575
- **Issue:** The array elements are swapped before interpolating `arr[j]` into the message string, causing it to display the post-swap value.

### ❌ Before
```javascript
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: arr.slice(),
          highlights: { swap: [i, j], pivot: [hi], sorted: [...sortedIdx] },
          line: 8,
          vars: { lo, hi, i, j, pivot },
          message: `arr[${j}] < pivot. Swapped to position ${i}.`,
        });
      }
```

### ✅ After
```javascript
      if (arr[j] < pivot) {
        const val = arr[j];
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: arr.slice(),
          highlights: { swap: [i, j], pivot: [hi], sorted: [...sortedIdx] },
          line: 8,
          vars: { lo, hi, i, j, pivot },
          message: `${val} < pivot (${pivot}). Swapped to position ${i}.`,
        });
      }
```

---

## 4. Pseudocode Step Line Highlighting Corrections

In `js/engine.js`, the active line in the pseudocode box is controlled by `step.line`. Several algorithms had hardcoded `line: 0` or incorrect line indices.

### A. Bellman-Ford
- **File:** `js/engine.js` (~Lines 968–987)

```javascript
// At line ~969 (pass relaxation step):
line: 2, vars: { iter, edge: `${a}->${b}`, w, dist: fmt() },

// At line ~977 (dist improvement step):
line: 3, vars: { updated: b, newDist: dist[b], dist: fmt() },

// At line ~986 (negative cycle check & completion):
line: 4, vars: { dist: fmt() },
```

---

### B. Floyd-Warshall
- **File:** `js/engine.js` (~Lines 1016–1031)

```javascript
// At line ~1016 (can route through k step):
line: 2, vars: { k: nodes[k], i: nodes[i], j: nodes[j] },

// At line ~1024 (shorter path updated step):
line: 3, vars: { updated: `${nodes[i]}->${nodes[j]}`, newDist: through },
```

---

### C. Prim's MST
- **File:** `js/engine.js` (~Lines 1057–1072)

```javascript
// At line ~1057 (cheapest edge crossing the cut):
line: 2, vars: { candidate: `${best.u}-${best.v}`, weight: best.w, mst: fmtEdges() },

// At line ~1064 (added vertex to MST):
line: 3, vars: { added: `${best.u}-${best.v}`, mst: fmtEdges() },

// At line ~1072 (MST complete):
line: 3, vars: { mst: fmtEdges(), totalWeight }, message: `MST complete. Total weight = ${totalWeight}.`,
```

---

### D. Kruskal's MST
- **File:** `js/engine.js` (~Lines 1107–1122)

```javascript
// At line ~1107 (no cycle, added edge to MST):
line: 3, vars: { added: `${a}-${b}`, mst: fmtEdges() },

// At line ~1113 (cycle detected, rejected):
line: 2, vars: { rejected: `${a}-${b}`, mst: fmtEdges() },
```

---

### E. Ford-Fulkerson (Edmonds-Karp)
- **File:** `js/engine.js` (~Lines 1226–1247)

```javascript
// At line ~1226 (augmenting path found):
line: 2, vars: { path: path.join(" → "), bottleneck, maxFlow, flows: fmtFlows() },

// At line ~1238 (pushed bottleneck flow):
line: 3, vars: { maxFlow, flows: fmtFlows() },

// At line ~1247 (max flow complete):
line: 5, vars: { maxFlow, flows: fmtFlows() },
```

---

### F. Fibonacci (DP)
- **File:** `js/engine.js` (~Lines 1262–1273)

```javascript
// At line ~1262 (base cases):
steps.push({ array: dp.slice(0, 2), highlights: { sorted: [0, 1].filter((i) => i <= n) }, line: 0, vars: { "dp[0]": 0, "dp[1]": n >= 1 ? 1 : "-" }, message: "Base cases: dp[0] = 0, dp[1] = 1." });

// At line ~1273 (final return):
steps.push({ array: dp.slice(0, n + 1), highlights: { sorted: rangeArr(0, n) }, line: 3, vars: { result: dp[n] }, message: `Fibonacci(${n}) = ${dp[n]}` });
```

---

### G. Rod Cutting
- **File:** `js/engine.js` (~Lines 1290–1305)

```javascript
// At line ~1290 (try first cut):
line: 2,
vars: { len, cut, price: prices[cut - 1], remainder: dp[len - cut], candidate },

// At line ~1300 (best cut found):
line: 2,
vars: { len, bestCut, dpLen: dp[len] },

// At line ~1305 (final return):
line: 3, vars: { result: dp[n] }, message: `Maximum revenue for rod of length ${n} = ${dp[n]}`
```

---

### H. 0/1 Knapsack
- **File:** `js/engine.js` (~Line 1371)

```javascript
// At line ~1371:
line: weights[i - 1] <= w ? 4 : 5,
```

---

### I. Activity Selection
- **File:** `js/engine.js` (~Lines 1447–1471)

```javascript
// At line ~1447 (select first activity):
line: 1,

// At line ~1455 (check next activity):
line: 2,

// At line ~1463 (select compatible activity):
line: 3,

// At line ~1471 (final result):
line: 3,
```

---

### J. Fractional Knapsack
- **File:** `js/engine.js` (~Lines 1494–1509)

```javascript
// At line ~1494 (capacity full/exhausted):
line: 1,

// At line ~1501 (take full item):
line: 2,

// At line ~1509 (take fractional item):
line: 3,
```

---

### K. Huffman Coding
- **File:** `js/engine.js` (~Lines 1537–1543)

```javascript
// At line ~1537 (extract two lowest-frequency nodes):
line: 2,

// At line ~1541 (merge and reinsert into queue):
line: 3,

// At line ~1543 (tree complete):
line: 5,
```
