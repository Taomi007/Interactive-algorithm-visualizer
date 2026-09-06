/* ==========================================================
   KINETIC LOGIC ENGINE — STEP ENGINE
   Each algorithm below is a generator function that returns
   an ARRAY of "steps". Every step is a plain object snapshot:
     { array/graph state, highlights, line, vars, message }
   The UI (app.js) just walks this array — play/pause/scrub
   are all "jump to step[n] and render it".
   ========================================================== */

const PSEUDOCODE = {
  "linear-search": [
    "for i = 0 to n-1:",
    "  if arr[i] == target:",
    "    return i",
    "return -1",
  ],
  "binary-search": [
    "lo = 0, hi = n-1",
    "while lo <= hi:",
    "  mid = (lo + hi) / 2",
    "  if arr[mid] == target: return mid",
    "  elif arr[mid] < target: lo = mid + 1",
    "  else: hi = mid - 1",
    "return -1",
  ],
  "bubble-sort": [
    "for i = 0 to n-1:",
    "  for j = 0 to n-i-2:",
    "    if arr[j] > arr[j+1]:",
    "      swap(arr[j], arr[j+1])",
  ],
  "insertion-sort": [
    "for i = 1 to n-1:",
    "  key = arr[i]; j = i-1",
    "  while j >= 0 and arr[j] > key:",
    "    arr[j+1] = arr[j]; j--",
    "  arr[j+1] = key",
  ],
  "selection-sort": [
    "for i = 0 to n-1:",
    "  minIdx = i",
    "  for j = i+1 to n-1:",
    "    if arr[j] < arr[minIdx]: minIdx = j",
    "  swap(arr[i], arr[minIdx])",
  ],
  "merge-sort": [
    "mergeSort(arr, lo, hi):",
    "  if lo >= hi: return",
    "  mid = (lo+hi)/2",
    "  mergeSort(arr, lo, mid)",
    "  mergeSort(arr, mid+1, hi)",
    "  merge(arr, lo, mid, hi)",
  ],
  "quick-sort": [
    "quickSort(arr, lo, hi):",
    "  if lo >= hi: return",
    "  p = partition(arr, lo, hi)",
    "  quickSort(arr, lo, p-1)",
    "  quickSort(arr, p+1, hi)",
    "partition(arr, lo, hi):",
    "  pivot = arr[hi]; i = lo-1",
    "  for j = lo to hi-1:",
    "    if arr[j] < pivot: i++; swap(arr[i],arr[j])",
    "  swap(arr[i+1], arr[hi]); return i+1",
  ],
  "heap-sort": [
    "buildMaxHeap(arr)",
    "for end = n-1 downto 1:",
    "  swap(arr[0], arr[end])",
    "  siftDown(arr, 0, end)",
    "siftDown(arr, i, size):",
    "  largest = i; l = 2i+1; r = 2i+2",
    "  if l < size and arr[l] > arr[largest]: largest = l",
    "  if r < size and arr[r] > arr[largest]: largest = r",
    "  if largest != i: swap; siftDown(arr, largest, size)",
  ],
  "counting-sort": [
    "count = array of zeros, size = max+1",
    "for x in arr: count[x]++",
    "for i = 1 to max: count[i] += count[i-1]",
    "for x in arr (reverse):",
    "  output[count[x]-1] = x; count[x]--",
    "return output",
  ],
  "radix-sort": [
    "max = maximum value in arr",
    "for exp = 1; max/exp > 0; exp *= 10:",
    "  countingSortByDigit(arr, exp)",
    "countingSortByDigit(arr, exp):",
    "  bucket by digit = (arr[i]/exp) % 10",
    "  stable counting sort using that digit",
  ],
  bfs: [
    "queue = [start]; visited = {start}",
    "while queue not empty:",
    "  u = queue.dequeue()",
    "  for v in neighbors(u):",
    "    if v not visited:",
    "      visited.add(v); queue.enqueue(v)",
  ],
  dfs: [
    "stack = [start]",
    "while stack not empty:",
    "  u = stack.pop()",
    "  if u not visited:",
    "    visited.add(u)",
    "    for v in neighbors(u): stack.push(v)",
  ],
  dijkstra: [
    "dist[start] = 0, all others ∞",
    "while unvisited nodes remain:",
    "  u = unvisited node with min dist[u]",
    "  for (v, w) in neighbors(u):",
    "    if dist[u]+w < dist[v]: dist[v] = dist[u]+w",
  ],
  "bellman-ford": [
    "dist[start] = 0, all others ∞",
    "repeat (V-1) times:",
    "  for each edge (u,v,w):",
    "    if dist[u]+w < dist[v]: dist[v] = dist[u]+w",
    "check for negative cycle (extra pass)",
  ],
  "floyd-warshall": [
    "dist = adjacency matrix (∞ if no edge)",
    "for k in vertices:",
    "  for i in vertices: for j in vertices:",
    "    dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])",
  ],
  prim: [
    "mst = {start}",
    "while mst does not span all vertices:",
    "  pick cheapest edge (u,v) with u in mst, v not in mst",
    "  add v and edge (u,v) to mst",
  ],
  kruskal: [
    "sort all edges ascending by weight",
    "for each edge (u,v,w) in sorted order:",
    "  if find(u) != find(v):",
    "    union(u,v); add edge to mst",
  ],
  "topo-sort": [
    "for each unvisited vertex u: dfs(u)",
    "dfs(u):",
    "  visited.add(u)",
    "  for v in neighbors(u): if unvisited: dfs(v)",
    "  prepend u to order",
  ],
  "ford-fulkerson": [
    "flow = 0 on all edges",
    "while BFS finds augmenting path source→sink:",
    "  bottleneck = min residual capacity on path",
    "  add bottleneck to flow along path",
    "  subtract bottleneck on reverse (residual) edges",
    "return total flow",
  ],
  "fibonacci-dp": [
    "dp[0]=0, dp[1]=1",
    "for i = 2 to n:",
    "  dp[i] = dp[i-1] + dp[i-2]",
    "return dp[n]",
  ],
  "rod-cutting": [
    "dp[0] = 0",
    "for len = 1 to n:",
    "  dp[len] = max over cut(1..len) of price[cut] + dp[len-cut]",
    "return dp[n]",
  ],
  "coin-change-dp": [
    "dp[0] = 0, dp[1..amount] = ∞",
    "for a = 1 to amount:",
    "  for coin in coins:",
    "    if coin <= a: dp[a] = min(dp[a], dp[a-coin] + 1)",
    "return dp[amount]",
  ],
  "01-knapsack": [
    "dp[0][*] = 0, dp[*][0] = 0",
    "for i = 1 to n:",
    "  for w = 0 to capacity:",
    "    if weight[i] <= w:",
    "      dp[i][w] = max(dp[i-1][w], value[i]+dp[i-1][w-weight[i]])",
    "    else: dp[i][w] = dp[i-1][w]",
  ],
  lcs: [
    "dp[0][*] = 0, dp[*][0] = 0",
    "if s1[i]==s2[j]: dp[i][j] = dp[i-1][j-1] + 1",
    "else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
  ],
  "activity-selection": [
    "sort activities by finish time ascending",
    "select first activity; lastFinish = its finish",
    "for each remaining activity a:",
    "  if a.start >= lastFinish: select a; lastFinish = a.finish",
  ],
  "fractional-knapsack": [
    "sort items descending by value/weight",
    "for each item:",
    "  if item fits fully: take it entirely",
    "  else: take the fraction that fills remaining capacity; stop",
  ],
  "huffman-coding": [
    "queue = all symbols as leaf nodes, keyed by frequency",
    "while queue.size > 1:",
    "  a, b = two lowest-frequency nodes",
    "  merged = new node(freq = a.freq + b.freq, children = a,b)",
    "  insert merged into queue",
    "return remaining node as tree root",
  ],
};

const ENGINE = {};

/* ---------------- LINEAR SEARCH ---------------- */
ENGINE["linear-search"] = function (arr, target) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: arr.slice(),
      highlights: { compare: [i] },
      line: 1,
      vars: { i, target },
      message: `Comparing arr[${i}] = ${arr[i]} to target ${target}`,
    });
    if (arr[i] === target) {
      steps.push({
        array: arr.slice(),
        highlights: { sorted: [i] },
        line: 2,
        vars: { i, target, result: i },
        message: `Match found at index ${i}. Returning ${i}.`,
      });
      return steps;
    }
  }
  steps.push({
    array: arr.slice(),
    highlights: {},
    line: 3,
    vars: { target, result: -1 },
    message: `Target ${target} not found. Returning -1.`,
  });
  return steps;
};

/* ---------------- BINARY SEARCH ---------------- */
ENGINE["binary-search"] = function (arrIn, target) {
  const arr = arrIn.slice().sort((a, b) => a - b);
  const steps = [];
  let lo = 0,
    hi = arr.length - 1;
  steps.push({
    array: arr.slice(),
    highlights: {},
    line: 0,
    vars: { lo, hi, target },
    message: `Input sorted ascending. lo=${lo}, hi=${hi}.`,
  });
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: arr.slice(),
      highlights: { compare: [mid], sorted: rangeArr(0, lo - 1).concat(rangeArr(hi + 1, arr.length - 1)) },
      line: 2,
      vars: { lo, hi, mid, target },
      message: `mid = (${lo}+${hi})/2 = ${mid}. arr[mid] = ${arr[mid]}.`,
    });
    if (arr[mid] === target) {
      steps.push({
        array: arr.slice(),
        highlights: { sorted: [mid] },
        line: 3,
        vars: { lo, hi, mid, result: mid },
        message: `arr[mid] == target. Found at index ${mid}.`,
      });
      return steps;
    } else if (arr[mid] < target) {
      lo = mid + 1;
      steps.push({
        array: arr.slice(),
        highlights: { compare: [mid] },
        line: 4,
        vars: { lo, hi, mid },
        message: `arr[mid] < target. Search right half: lo = ${lo}.`,
      });
    } else {
      hi = mid - 1;
      steps.push({
        array: arr.slice(),
        highlights: { compare: [mid] },
        line: 5,
        vars: { lo, hi, mid },
        message: `arr[mid] > target. Search left half: hi = ${hi}.`,
      });
    }
  }
  steps.push({
    array: arr.slice(),
    highlights: {},
    line: 6,
    vars: { result: -1 },
    message: `Search space exhausted. Target not found. Returning -1.`,
  });
  return steps;
};

function rangeArr(a, b) {
  const out = [];
  for (let i = a; i <= b; i++) if (i >= 0) out.push(i);
  return out;
}

/* ---------------- BUBBLE SORT ---------------- */
ENGINE["bubble-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];
  const n = arr.length;
  const sortedIdx = [];
  for (let i = 0; i < n; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: arr.slice(),
        highlights: { compare: [j, j + 1], sorted: sortedIdx.slice() },
        line: 2,
        vars: { i, j },
        message: `Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedAny = true;
        steps.push({
          array: arr.slice(),
          highlights: { swap: [j, j + 1], sorted: sortedIdx.slice() },
          line: 3,
          vars: { i, j },
          message: `Swapped: arr[${j}] and arr[${j + 1}]`,
        });
      }
    }
    sortedIdx.unshift(n - i - 1);
    if (!swappedAny) break;
  }
  for (let k = 0; k < n; k++) if (!sortedIdx.includes(k)) sortedIdx.push(k);
  steps.push({
    array: arr.slice(),
    highlights: { sorted: sortedIdx },
    line: 3,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- INSERTION SORT ---------------- */
ENGINE["insertion-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({
      array: arr.slice(),
      highlights: { pivot: [i], sorted: rangeArr(0, i - 1) },
      line: 1,
      vars: { i, key, j },
      message: `key = arr[${i}] = ${key}`,
    });
    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: arr.slice(),
        highlights: { compare: [j], pivot: [i] },
        line: 2,
        vars: { i, key, j },
        message: `arr[${j}]=${arr[j]} > key(${key}), shift right`,
      });
      arr[j + 1] = arr[j];
      j--;
      steps.push({
        array: arr.slice(),
        highlights: { swap: [j + 1], sorted: rangeArr(0, i) },
        line: 3,
        vars: { i, key, j },
        message: `Shifted. j = ${j}`,
      });
    }
    arr[j + 1] = key;
    steps.push({
      array: arr.slice(),
      highlights: { sorted: rangeArr(0, i) },
      line: 4,
      vars: { i, key, insertedAt: j + 1 },
      message: `Inserted key at index ${j + 1}`,
    });
  }
  steps.push({
    array: arr.slice(),
    highlights: { sorted: rangeArr(0, n - 1) },
    line: 4,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- SELECTION SORT ---------------- */
ENGINE["selection-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    steps.push({
      array: arr.slice(),
      highlights: { pivot: [i], sorted: rangeArr(0, i - 1) },
      line: 1,
      vars: { i, minIdx },
      message: `Assume arr[${i}]=${arr[i]} is minimum so far`,
    });
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: arr.slice(),
        highlights: { compare: [j, minIdx], pivot: [i] },
        line: 3,
        vars: { i, j, minIdx },
        message: `Comparing arr[${j}]=${arr[j]} to current min arr[${minIdx}]=${arr[minIdx]}`,
      });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: arr.slice(),
          highlights: { pivot: [i], compare: [minIdx] },
          line: 3,
          vars: { i, j, minIdx },
          message: `New minimum found at index ${minIdx}`,
        });
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    steps.push({
      array: arr.slice(),
      highlights: { swap: [i, minIdx], sorted: rangeArr(0, i) },
      line: 4,
      vars: { i, minIdx },
      message: `Swapped arr[${i}] and arr[${minIdx}]`,
    });
  }
  steps.push({
    array: arr.slice(),
    highlights: { sorted: rangeArr(0, n - 1) },
    line: 4,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- MERGE SORT ---------------- */
ENGINE["merge-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];

  function mergeSort(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: arr.slice(),
      highlights: { pivot: rangeArr(lo, hi) },
      line: 2,
      vars: { lo, hi, mid },
      message: `Divide [${lo}..${hi}] at mid=${mid}`,
    });
    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  function merge(lo, mid, hi) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0,
      j = 0,
      k = lo;
    while (i < left.length && j < right.length) {
      steps.push({
        array: arr.slice(),
        highlights: { compare: [lo + i, mid + 1 + j] },
        line: 5,
        vars: { lo, mid, hi, k },
        message: `Merging: comparing ${left[i]} and ${right[j]}`,
      });
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      steps.push({
        array: arr.slice(),
        highlights: { swap: [k] },
        line: 5,
        vars: { lo, mid, hi, k },
        message: `Placed ${arr[k]} at index ${k}`,
      });
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        array: arr.slice(),
        highlights: { swap: [k] },
        line: 5,
        vars: { lo, mid, hi, k },
        message: `Copying remaining left value ${arr[k]}`,
      });
      i++;
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        array: arr.slice(),
        highlights: { swap: [k] },
        line: 5,
        vars: { lo, mid, hi, k },
        message: `Copying remaining right value ${arr[k]}`,
      });
      j++;
      k++;
    }
    steps.push({
      array: arr.slice(),
      highlights: { sorted: rangeArr(lo, hi) },
      line: 5,
      vars: { lo, hi },
      message: `Range [${lo}..${hi}] merged and sorted.`,
    });
  }

  mergeSort(0, arr.length - 1);
  steps.push({
    array: arr.slice(),
    highlights: { sorted: rangeArr(0, arr.length - 1) },
    line: 5,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- QUICK SORT (Lomuto partition) ---------------- */
ENGINE["quick-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];
  const sortedIdx = new Set();

  function partition(lo, hi) {
    const pivot = arr[hi];
    let i = lo - 1;
    steps.push({
      array: arr.slice(),
      highlights: { pivot: [hi], sorted: [...sortedIdx] },
      line: 6,
      vars: { lo, hi, pivot },
      message: `Pivot = arr[${hi}] = ${pivot}`,
    });
    for (let j = lo; j < hi; j++) {
      steps.push({
        array: arr.slice(),
        highlights: { compare: [j], pivot: [hi], sorted: [...sortedIdx] },
        line: 8,
        vars: { lo, hi, i, j, pivot },
        message: `Comparing arr[${j}]=${arr[j]} to pivot ${pivot}`,
      });
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
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    sortedIdx.add(i + 1);
    steps.push({
      array: arr.slice(),
      highlights: { swap: [i + 1, hi], sorted: [...sortedIdx] },
      line: 9,
      vars: { pivotFinalIndex: i + 1 },
      message: `Pivot placed at its final sorted position ${i + 1}.`,
    });
    return i + 1;
  }

  function quickSort(lo, hi) {
    if (lo >= hi) {
      if (lo === hi) sortedIdx.add(lo);
      return;
    }
    const p = partition(lo, hi);
    quickSort(lo, p - 1);
    quickSort(p + 1, hi);
  }

  quickSort(0, arr.length - 1);
  steps.push({
    array: arr.slice(),
    highlights: { sorted: rangeArr(0, arr.length - 1) },
    line: 1,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- HEAP SORT ---------------- */
ENGINE["heap-sort"] = function (arrIn) {
  const arr = arrIn.slice();
  const steps = [];
  const n = arr.length;

  function siftDown(i, size) {
    let largest = i;
    const l = 2 * i + 1,
      r = 2 * i + 2;
    steps.push({
      array: arr.slice(),
      highlights: { pivot: [i], compare: [l, r].filter((x) => x < size), sorted: rangeArr(size, n - 1) },
      line: 4,
      vars: { i, l, r, size },
      message: `Sift down from index ${i}. Checking children ${l},${r}.`,
    });
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        array: arr.slice(),
        highlights: { swap: [i, largest], sorted: rangeArr(size, n - 1) },
        line: 8,
        vars: { i, largest, size },
        message: `Child larger than parent. Swapped arr[${i}] and arr[${largest}].`,
      });
      siftDown(largest, size);
    }
  }

  steps.push({ array: arr.slice(), highlights: {}, line: 0, vars: {}, message: "Building max-heap from unsorted array." });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(i, n);

  for (let end = n - 1; end >= 1; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    steps.push({
      array: arr.slice(),
      highlights: { swap: [0, end], sorted: rangeArr(end, n - 1) },
      line: 2,
      vars: { end },
      message: `Moved max (root) to sorted position ${end}.`,
    });
    siftDown(0, end);
  }

  steps.push({
    array: arr.slice(),
    highlights: { sorted: rangeArr(0, n - 1) },
    line: 3,
    vars: {},
    message: `Array fully sorted.`,
  });
  return steps;
};

/* ---------------- COUNTING SORT ---------------- */
ENGINE["counting-sort"] = function (arrIn) {
  const arr = arrIn.slice().map((x) => Math.max(0, Math.round(x)));
  const steps = [];
  const n = arr.length;
  const max = Math.max(...arr, 0);
  const count = new Array(max + 1).fill(0);

  steps.push({ array: arr.slice(), highlights: {}, line: 0, vars: { max }, message: `Counting array of size ${max + 1} initialized to zero.` });
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
    steps.push({
      array: arr.slice(),
      highlights: { compare: [i] },
      line: 1,
      vars: { value: arr[i], count: count.join(",") },
      message: `count[${arr[i]}]++ → counts = [${count.join(",")}]`,
    });
  }
  for (let i = 1; i <= max; i++) count[i] += count[i - 1];
  steps.push({ array: arr.slice(), highlights: {}, line: 2, vars: { count: count.join(",") }, message: `Prefix-summed counts = [${count.join(",")}] (final position of each value)` });

  const output = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const pos = count[arr[i]] - 1;
    output[pos] = arr[i];
    count[arr[i]]--;
    steps.push({
      array: output.slice(),
      highlights: { swap: [pos] },
      line: 4,
      vars: { value: arr[i], position: pos },
      message: `Placed ${arr[i]} at output index ${pos} (stable, right-to-left).`,
    });
  }
  steps.push({ array: output.slice(), highlights: { sorted: rangeArr(0, n - 1) }, line: 5, vars: {}, message: "Array fully sorted." });
  return steps;
};

/* ---------------- RADIX SORT (LSD, base 10) ---------------- */
ENGINE["radix-sort"] = function (arrIn) {
  let arr = arrIn.slice().map((x) => Math.max(0, Math.round(x)));
  const steps = [];
  const n = arr.length;
  const max = Math.max(...arr, 0);

  steps.push({ array: arr.slice(), highlights: {}, line: 0, vars: { max }, message: `Largest value is ${max}. Determines number of digit passes.` });

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    arr = output;
    steps.push({
      array: arr.slice(),
      highlights: {},
      line: 2,
      vars: { exp, digitPlace: exp === 1 ? "ones" : exp === 10 ? "tens" : exp === 100 ? "hundreds" : `10^${Math.log10(exp)}` },
      message: `Stable counting sort on the ${exp === 1 ? "ones" : exp === 10 ? "tens" : "10^" + Math.log10(exp)} digit complete.`,
    });
  }
  steps.push({ array: arr.slice(), highlights: { sorted: rangeArr(0, n - 1) }, line: 2, vars: {}, message: "Array fully sorted." });
  return steps;
};

/* ---------------- GRAPH HELPERS ----------------
   Graph input format: { nodes:['A','B',...], edges:[['A','B'],['B','C'],...] }
   Positions are auto-laid-out in a circle by the renderer.
------------------------------------------------- */
function neighborsOf(graph, u) {
  const out = [];
  graph.edges.forEach(([a, b]) => {
    if (a === u) out.push(b);
    if (b === u) out.push(a);
  });
  return out.sort();
}

/* ---------------- BFS ---------------- */
ENGINE["bfs"] = function (graph, start) {
  const steps = [];
  const visited = new Set([start]);
  const queue = [start];
  steps.push({
    graph,
    visited: [...visited],
    current: null,
    frontier: queue.slice(),
    activeEdge: null,
    line: 0,
    vars: { queue: queue.join(",") },
    message: `Start BFS at ${start}. queue=[${queue.join(",")}]`,
  });
  while (queue.length) {
    const u = queue.shift();
    steps.push({
      graph,
      visited: [...visited],
      current: u,
      frontier: queue.slice(),
      activeEdge: null,
      line: 2,
      vars: { u, queue: queue.join(",") },
      message: `Dequeue ${u}`,
    });
    for (const v of neighborsOf(graph, u)) {
      steps.push({
        graph,
        visited: [...visited],
        current: u,
        frontier: queue.slice(),
        activeEdge: [u, v],
        line: 3,
        vars: { u, v },
        message: `Checking neighbor ${v} of ${u}`,
      });
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        steps.push({
          graph,
          visited: [...visited],
          current: u,
          frontier: queue.slice(),
          activeEdge: [u, v],
          line: 5,
          vars: { u, v, queue: queue.join(",") },
          message: `${v} unvisited. Mark visited, enqueue.`,
        });
      }
    }
  }
  steps.push({
    graph,
    visited: [...visited],
    current: null,
    frontier: [],
    activeEdge: null,
    line: 1,
    vars: {},
    message: `Queue empty. BFS complete. Visited order preserved.`,
  });
  return steps;
};

/* ---------------- DFS (iterative) ---------------- */
ENGINE["dfs"] = function (graph, start) {
  const steps = [];
  const visited = new Set();
  const stack = [start];
  steps.push({
    graph,
    visited: [],
    current: null,
    frontier: stack.slice(),
    activeEdge: null,
    line: 0,
    vars: { stack: stack.join(",") },
    message: `Start DFS at ${start}. stack=[${stack.join(",")}]`,
  });
  while (stack.length) {
    const u = stack.pop();
    if (visited.has(u)) continue;
    visited.add(u);
    steps.push({
      graph,
      visited: [...visited],
      current: u,
      frontier: stack.slice(),
      activeEdge: null,
      line: 4,
      vars: { u, stack: stack.join(",") },
      message: `Visit ${u}`,
    });
    for (const v of neighborsOf(graph, u).reverse()) {
      if (!visited.has(v)) {
        stack.push(v);
        steps.push({
          graph,
          visited: [...visited],
          current: u,
          frontier: stack.slice(),
          activeEdge: [u, v],
          line: 5,
          vars: { u, v, stack: stack.join(",") },
          message: `Push unvisited neighbor ${v}`,
        });
      }
    }
  }
  steps.push({
    graph,
    visited: [...visited],
    current: null,
    frontier: [],
    activeEdge: null,
    line: 1,
    vars: {},
    message: `Stack empty. DFS complete.`,
  });
  return steps;
};

/* ---------------- WEIGHTED GRAPH HELPERS ----------------
   Weighted graph format: { nodes:[...], edges:[[a,b,weight], ...], directed: bool }
------------------------------------------------------------ */
function weightedNeighbors(graph, u) {
  const out = [];
  graph.edges.forEach(([a, b, w]) => {
    if (a === u) out.push({ node: b, w });
    if (!graph.directed && b === u) out.push({ node: a, w });
  });
  return out.sort((x, y) => x.node.localeCompare(y.node));
}

/* ---------------- DIJKSTRA'S ALGORITHM ---------------- */
ENGINE["dijkstra"] = function (graph, start) {
  const steps = [];
  const dist = {};
  graph.nodes.forEach((n) => (dist[n] = Infinity));
  dist[start] = 0;
  const visited = new Set();

  const fmt = () => graph.nodes.map((n) => `${n}:${dist[n] === Infinity ? "∞" : dist[n]}`).join("  ");

  steps.push({
    graph, visited: [], current: null, frontier: [], activeEdge: null,
    nodeLabels: { ...dist }, line: 0, vars: { dist: fmt() },
    message: `Initialize dist[${start}] = 0, all others ∞.`,
  });

  while (visited.size < graph.nodes.length) {
    let u = null, best = Infinity;
    graph.nodes.forEach((n) => {
      if (!visited.has(n) && dist[n] < best) { best = dist[n]; u = n; }
    });
    if (u === null) break;
    visited.add(u);
    steps.push({
      graph, visited: [...visited], current: u, frontier: [], activeEdge: null,
      nodeLabels: { ...dist }, line: 2, vars: { u, dist: fmt() },
      message: `Select unvisited node with smallest distance: ${u} (${dist[u]}).`,
    });
    for (const { node: v, w } of weightedNeighbors(graph, u)) {
      steps.push({
        graph, visited: [...visited], current: u, frontier: [], activeEdge: [u, v],
        nodeLabels: { ...dist }, line: 3, vars: { u, v, edgeWeight: w, dist: fmt() },
        message: `Relax edge ${u}→${v} (weight ${w}). Candidate = ${dist[u]} + ${w} = ${dist[u] + w}.`,
      });
      if (!visited.has(v) && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        steps.push({
          graph, visited: [...visited], current: u, frontier: [], activeEdge: [u, v],
          nodeLabels: { ...dist }, line: 4, vars: { v, newDist: dist[v], dist: fmt() },
          message: `Shorter path found. dist[${v}] updated to ${dist[v]}.`,
        });
      }
    }
  }
  steps.push({
    graph, visited: [...visited], current: null, frontier: [], activeEdge: null,
    nodeLabels: { ...dist }, line: 0, vars: { dist: fmt() },
    message: `All nodes finalized. Shortest distances from ${start} computed.`,
  });
  return steps;
};

/* ---------------- BELLMAN-FORD ---------------- */
ENGINE["bellman-ford"] = function (graph, start) {
  const steps = [];
  const dist = {};
  graph.nodes.forEach((n) => (dist[n] = Infinity));
  dist[start] = 0;
  const fmt = () => graph.nodes.map((n) => `${n}:${dist[n] === Infinity ? "∞" : dist[n]}`).join("  ");

  steps.push({
    graph, visited: [start], current: null, frontier: [], activeEdge: null,
    nodeLabels: { ...dist }, line: 0, vars: { dist: fmt() },
    message: `Initialize dist[${start}] = 0, all others ∞.`,
  });

  for (let iter = 1; iter < graph.nodes.length; iter++) {
    let changed = false;
    for (const [a, b, w] of graph.edges) {
      steps.push({
        graph, visited: Object.keys(dist).filter((n) => dist[n] < Infinity), current: a, frontier: [], activeEdge: [a, b],
        nodeLabels: { ...dist }, line: 1, vars: { iter, edge: `${a}->${b}`, w, dist: fmt() },
        message: `Pass ${iter}: relax edge ${a}→${b} (weight ${w}).`,
      });
      if (dist[a] + w < dist[b]) {
        dist[b] = dist[a] + w;
        changed = true;
        steps.push({
          graph, visited: Object.keys(dist).filter((n) => dist[n] < Infinity), current: a, frontier: [], activeEdge: [a, b],
          nodeLabels: { ...dist }, line: 1, vars: { updated: b, newDist: dist[b], dist: fmt() },
          message: `Improved dist[${b}] to ${dist[b]}.`,
        });
      }
    }
    if (!changed) break;
  }
  steps.push({
    graph, visited: graph.nodes, current: null, frontier: [], activeEdge: null,
    nodeLabels: { ...dist }, line: 0, vars: { dist: fmt() },
    message: `No negative cycle detected. Final shortest distances from ${start}.`,
  });
  return steps;
};

/* ---------------- FLOYD-WARSHALL (matrix-based) ---------------- */
ENGINE["floyd-warshall"] = function (graph) {
  const steps = [];
  const nodes = graph.nodes;
  const n = nodes.length;
  const idx = {};
  nodes.forEach((node, i) => (idx[node] = i));
  const INF = Infinity;
  let dist = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  graph.edges.forEach(([a, b, w]) => {
    dist[idx[a]][idx[b]] = w;
    if (!graph.directed) dist[idx[b]][idx[a]] = w;
  });

  steps.push({ matrix: dist.map((r) => r.slice()), labels: nodes, highlight: null, line: 0, vars: {}, message: "Distance matrix initialized from direct edges." });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const through = dist[i][k] + dist[k][j];
        steps.push({
          matrix: dist.map((r) => r.slice()), labels: nodes,
          highlight: { read: [[i, k], [k, j]], write: [i, j] },
          line: 1, vars: { k: nodes[k], i: nodes[i], j: nodes[j] },
          message: `Can ${nodes[i]}→${nodes[k]}→${nodes[j]} (${through === INF ? "∞" : through}) beat direct ${nodes[i]}→${nodes[j]} (${dist[i][j] === INF ? "∞" : dist[i][j]})?`,
        });
        if (through < dist[i][j]) {
          dist[i][j] = through;
          steps.push({
            matrix: dist.map((r) => r.slice()), labels: nodes,
            highlight: { write: [i, j] },
            line: 1, vars: { updated: `${nodes[i]}->${nodes[j]}`, newDist: through },
            message: `Shorter path via ${nodes[k]} found. Updated dist[${nodes[i]}][${nodes[j]}] = ${through}.`,
          });
        }
      }
    }
  }
  steps.push({ matrix: dist.map((r) => r.slice()), labels: nodes, highlight: null, line: 0, vars: {}, message: "All intermediate vertices considered. Matrix holds all-pairs shortest paths." });
  return steps;
};

/* ---------------- PRIM'S MST ---------------- */
ENGINE["prim"] = function (graph, start) {
  const steps = [];
  const inMst = new Set([start]);
  const mstEdges = [];
  const fmtEdges = () => mstEdges.map(([a, b, w]) => `${a}-${b}(${w})`).join(", ") || "—";

  steps.push({
    graph, visited: [...inMst], current: start, frontier: [], activeEdge: null, mstEdges: [],
    line: 0, vars: { mst: fmtEdges() }, message: `Start MST from ${start}.`,
  });

  while (inMst.size < graph.nodes.length) {
    let best = null;
    inMst.forEach((u) => {
      weightedNeighbors(graph, u).forEach(({ node: v, w }) => {
        if (!inMst.has(v) && (!best || w < best.w)) best = { u, v, w };
      });
    });
    if (!best) break;
    steps.push({
      graph, visited: [...inMst], current: best.u, frontier: [], activeEdge: [best.u, best.v], mstEdges: mstEdges.slice(),
      line: 0, vars: { candidate: `${best.u}-${best.v}`, weight: best.w, mst: fmtEdges() },
      message: `Cheapest edge crossing the cut: ${best.u}-${best.v} (weight ${best.w}).`,
    });
    inMst.add(best.v);
    mstEdges.push([best.u, best.v, best.w]);
    steps.push({
      graph, visited: [...inMst], current: best.v, frontier: [], activeEdge: [best.u, best.v], mstEdges: mstEdges.slice(),
      line: 0, vars: { added: `${best.u}-${best.v}`, mst: fmtEdges() },
      message: `Added ${best.v} to MST via edge ${best.u}-${best.v}.`,
    });
  }
  const totalWeight = mstEdges.reduce((s, [, , w]) => s + w, 0);
  steps.push({
    graph, visited: graph.nodes, current: null, frontier: [], activeEdge: null, mstEdges: mstEdges.slice(),
    line: 0, vars: { mst: fmtEdges(), totalWeight }, message: `MST complete. Total weight = ${totalWeight}.`,
  });
  return steps;
};

/* ---------------- KRUSKAL'S MST (Union-Find) ---------------- */
function makeUnionFind(nodes) {
  const parent = {};
  nodes.forEach((n) => (parent[n] = n));
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  function union(a, b) { const ra = find(a), rb = find(b); if (ra === rb) return false; parent[ra] = rb; return true; }
  return { find, union };
}
ENGINE["kruskal"] = function (graph) {
  const steps = [];
  const sortedEdges = graph.edges.slice().sort((a, b) => a[2] - b[2]);
  const uf = makeUnionFind(graph.nodes);
  const mstEdges = [];
  const fmtEdges = () => mstEdges.map(([a, b, w]) => `${a}-${b}(${w})`).join(", ") || "—";

  steps.push({
    graph, visited: [], current: null, frontier: [], activeEdge: null, mstEdges: [],
    line: 0, vars: { sortedEdges: sortedEdges.map(([a, b, w]) => `${a}-${b}:${w}`).join(", ") },
    message: `Edges sorted ascending by weight.`,
  });

  for (const [a, b, w] of sortedEdges) {
    steps.push({
      graph, visited: [], current: null, frontier: [], activeEdge: [a, b], mstEdges: mstEdges.slice(),
      line: 1, vars: { edge: `${a}-${b}`, weight: w, mst: fmtEdges() },
      message: `Consider edge ${a}-${b} (weight ${w}). Would it create a cycle?`,
    });
    if (uf.union(a, b)) {
      mstEdges.push([a, b, w]);
      steps.push({
        graph, visited: [], current: null, frontier: [], activeEdge: [a, b], mstEdges: mstEdges.slice(),
        line: 1, vars: { added: `${a}-${b}`, mst: fmtEdges() },
        message: `No cycle. Added ${a}-${b} to MST.`,
      });
    } else {
      steps.push({
        graph, visited: [], current: null, frontier: [], activeEdge: [a, b], mstEdges: mstEdges.slice(),
        line: 1, vars: { rejected: `${a}-${b}`, mst: fmtEdges() },
        message: `${a} and ${b} already connected. Rejected to avoid a cycle.`,
      });
    }
    if (mstEdges.length === graph.nodes.length - 1) break;
  }
  const totalWeight = mstEdges.reduce((s, [, , w]) => s + w, 0);
  steps.push({
    graph, visited: graph.nodes, current: null, frontier: [], activeEdge: null, mstEdges: mstEdges.slice(),
    line: 1, vars: { mst: fmtEdges(), totalWeight }, message: `MST complete. Total weight = ${totalWeight}.`,
  });
  return steps;
};

/* ---------------- TOPOLOGICAL SORT (DFS-based, directed graph) ---------------- */
ENGINE["topo-sort"] = function (graph) {
  const steps = [];
  const visited = new Set();
  const order = [];

  function dfs(u) {
    visited.add(u);
    steps.push({
      graph, visited: [...visited], current: u, frontier: [], activeEdge: null,
      line: 3, vars: { u, order: order.join(" → ") || "—" },
      message: `Visit ${u}. Explore its outgoing edges first.`,
    });
    graph.edges.forEach(([a, b]) => {
      if (a === u && !visited.has(b)) {
        steps.push({
          graph, visited: [...visited], current: u, frontier: [], activeEdge: [a, b],
          line: 3, vars: { u, v: b, order: order.join(" → ") || "—" },
          message: `Follow edge ${u}→${b}.`,
        });
        dfs(b);
      }
    });
    order.unshift(u);
    steps.push({
      graph, visited: [...visited], current: u, frontier: [], activeEdge: null,
      line: 4, vars: { u, order: order.join(" → ") },
      message: `${u} has no more unvisited outgoing edges. Prepend to order.`,
    });
  }

  graph.nodes.forEach((n) => { if (!visited.has(n)) dfs(n); });
  steps.push({
    graph, visited: [...visited], current: null, frontier: [], activeEdge: null,
    line: 0, vars: { order: order.join(" → ") },
    message: `Topological order: ${order.join(" → ")}`,
  });
  return steps;
};

/* ---------------- FORD-FULKERSON (Edmonds-Karp, BFS augmenting paths) ---------------- */
ENGINE["ford-fulkerson"] = function (graph, source, sink) {
  const steps = [];
  const cap = {};
  const flow = {};
  const key = (a, b) => `${a}|${b}`;
  graph.edges.forEach(([a, b, c]) => {
    cap[key(a, b)] = (cap[key(a, b)] || 0) + c;
    if (cap[key(b, a)] === undefined) cap[key(b, a)] = 0;
    flow[key(a, b)] = 0;
    flow[key(b, a)] = 0;
  });

  function fmtFlows() {
    return graph.edges.map(([a, b]) => `${a}→${b}: ${flow[key(a, b)]}/${cap[key(a, b)]}`).join("  ");
  }

  function bfsAugment() {
    const parent = {};
    const visited = new Set([source]);
    const queue = [source];
    while (queue.length) {
      const u = queue.shift();
      for (const node of graph.nodes) {
        const residual = (cap[key(u, node)] || 0) - (flow[key(u, node)] || 0);
        if (residual > 0 && !visited.has(node)) {
          visited.add(node);
          parent[node] = u;
          queue.push(node);
          if (node === sink) return parent;
        }
      }
    }
    return null;
  }

  let maxFlow = 0;
  steps.push({
    graph, visited: [], current: null, frontier: [], activeEdge: null,
    line: 0, vars: { maxFlow, flows: fmtFlows() }, message: `Start Ford-Fulkerson from ${source} to ${sink}.`,
  });

  let parent = bfsAugment();
  let guard = 0;
  while (parent && guard < 50) {
    guard++;
    const path = [];
    let v = sink;
    while (v !== source) { path.unshift(v); v = parent[v]; }
    path.unshift(source);

    let bottleneck = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const r = cap[key(path[i], path[i + 1])] - flow[key(path[i], path[i + 1])];
      bottleneck = Math.min(bottleneck, r);
    }

    steps.push({
      graph, visited: path.slice(), current: null, frontier: [], activeEdge: null,
      line: 0, vars: { path: path.join(" → "), bottleneck, maxFlow, flows: fmtFlows() },
      message: `Augmenting path found: ${path.join(" → ")}. Bottleneck capacity = ${bottleneck}.`,
    });

    for (let i = 0; i < path.length - 1; i++) {
      flow[key(path[i], path[i + 1])] += bottleneck;
      flow[key(path[i + 1], path[i])] -= bottleneck;
    }
    maxFlow += bottleneck;

    steps.push({
      graph, visited: path.slice(), current: null, frontier: [], activeEdge: null,
      line: 0, vars: { maxFlow, flows: fmtFlows() },
      message: `Pushed ${bottleneck} units along the path. Running max flow = ${maxFlow}.`,
    });

    parent = bfsAugment();
  }

  steps.push({
    graph, visited: [], current: null, frontier: [], activeEdge: null,
    line: 0, vars: { maxFlow, flows: fmtFlows() },
    message: `No augmenting path remains. Maximum flow from ${source} to ${sink} = ${maxFlow}.`,
  });
  return steps;
};

/* ================================================================
   DYNAMIC PROGRAMMING — 1D (array/bar renderer)
   ================================================================ */

/* ---------------- FIBONACCI (bottom-up tabulation) ---------------- */
ENGINE["fibonacci-dp"] = function (n) {
  const steps = [];
  const dp = new Array(n + 1).fill(0);
  if (n >= 1) dp[1] = 1;
  steps.push({ array: dp.slice(0, 2), highlights: { sorted: [0, 1].filter((i) => i <= n) }, line: 1, vars: { "dp[0]": 0, "dp[1]": n >= 1 ? 1 : "-" }, message: "Base cases: dp[0] = 0, dp[1] = 1." });
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      array: dp.slice(0, i + 1),
      highlights: { compare: [i - 1, i - 2], swap: [i] },
      line: 2,
      vars: { i, [`dp[${i - 1}]`]: dp[i - 1], [`dp[${i - 2}]`]: dp[i - 2], [`dp[${i}]`]: dp[i] },
      message: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
    });
  }
  steps.push({ array: dp.slice(0, n + 1), highlights: { sorted: rangeArr(0, n) }, line: 2, vars: { result: dp[n] }, message: `Fibonacci(${n}) = ${dp[n]}` });
  return steps;
};

/* ---------------- ROD CUTTING ---------------- */
ENGINE["rod-cutting"] = function (prices) {
  const steps = [];
  const n = prices.length;
  const dp = new Array(n + 1).fill(0);
  steps.push({ array: dp.slice(), highlights: {}, line: 0, vars: { prices: prices.join(",") }, message: `Price table: [${prices.join(", ")}] for lengths 1..${n}.` });
  for (let len = 1; len <= n; len++) {
    let best = -Infinity, bestCut = 0;
    for (let cut = 1; cut <= len; cut++) {
      const candidate = prices[cut - 1] + dp[len - cut];
      steps.push({
        array: dp.slice(0, len),
        highlights: { compare: [len - cut] },
        line: 1,
        vars: { len, cut, price: prices[cut - 1], remainder: dp[len - cut], candidate },
        message: `Rod length ${len}: try first cut = ${cut}. price[${cut}] + dp[${len - cut}] = ${prices[cut - 1]} + ${dp[len - cut]} = ${candidate}`,
      });
      if (candidate > best) { best = candidate; bestCut = cut; }
    }
    dp[len] = best;
    steps.push({
      array: dp.slice(0, len + 1),
      highlights: { swap: [len] },
      line: 1,
      vars: { len, bestCut, dpLen: dp[len] },
      message: `dp[${len}] = ${dp[len]} (best first cut = ${bestCut})`,
    });
  }
  steps.push({ array: dp.slice(), highlights: { sorted: rangeArr(0, n) }, line: 1, vars: { result: dp[n] }, message: `Maximum revenue for rod of length ${n} = ${dp[n]}` });
  return steps;
};

/* ---------------- COIN CHANGE (min coins, DP) ---------------- */
ENGINE["coin-change-dp"] = function (coins, amount) {
  const steps = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  steps.push({ array: dp.map((v) => (v === Infinity ? 0 : v)), highlights: { sorted: [0] }, line: 0, vars: { coins: coins.join(","), amount }, message: `dp[0] = 0 (zero coins needed for amount 0).` });
  for (let a = 1; a <= amount; a++) {
    let best = Infinity;
    for (const c of coins) {
      if (c <= a && dp[a - c] !== Infinity) {
        steps.push({
          array: dp.slice(0, a).map((v) => (v === Infinity ? 0 : v)),
          highlights: { compare: [a - c] },
          line: 3,
          vars: { a, coin: c, candidate: dp[a - c] + 1 },
          message: `Amount ${a}: using coin ${c} → 1 + dp[${a - c}] = ${dp[a - c] + 1}`,
        });
        best = Math.min(best, dp[a - c] + 1);
      }
    }
    dp[a] = best;
    steps.push({
      array: dp.slice(0, a + 1).map((v) => (v === Infinity ? 0 : v)),
      highlights: { swap: [a] },
      line: 3,
      vars: { a, dpA: dp[a] === Infinity ? "unreachable" : dp[a] },
      message: `dp[${a}] = ${dp[a] === Infinity ? "unreachable" : dp[a]}`,
    });
  }
  steps.push({
    array: dp.map((v) => (v === Infinity ? 0 : v)),
    highlights: { sorted: rangeArr(0, amount) },
    line: 3,
    vars: { result: dp[amount] === Infinity ? "no solution" : dp[amount] },
    message: `Minimum coins for amount ${amount} = ${dp[amount] === Infinity ? "not possible" : dp[amount]}`,
  });
  return steps;
};

/* ================================================================
   DYNAMIC PROGRAMMING — 2D (grid renderer)
   Grid step format: { grid: number[][], rowLabels, colLabels, highlight:{read:[[r,c],...], write:[r,c]}, line, vars, message }
   ================================================================ */

/* ---------------- 0/1 KNAPSACK ---------------- */
ENGINE["01-knapsack"] = function (weights, values, capacity) {
  const steps = [];
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));
  const rowLabels = ["∅", ...weights.map((w, i) => `item${i + 1} (w${w}/v${values[i]})`)];
  const colLabels = rangeArr(0, capacity).map(String);

  steps.push({ grid: dp.map((r) => r.slice()), rowLabels, colLabels, highlight: null, line: 0, vars: {}, message: "DP table initialized to 0 (0 items or 0 capacity ⇒ 0 value)." });

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const without = dp[i - 1][w];
      let withItem = -1;
      if (weights[i - 1] <= w) withItem = values[i - 1] + dp[i - 1][w - weights[i - 1]];
      steps.push({
        grid: dp.map((r) => r.slice()), rowLabels, colLabels,
        highlight: { read: weights[i - 1] <= w ? [[i - 1, w], [i - 1, w - weights[i - 1]]] : [[i - 1, w]], write: [i, w] },
        line: weights[i - 1] <= w ? 2 : 1,
        vars: { item: i, capacity: w, without, withItem: withItem === -1 ? "n/a (too heavy)" : withItem },
        message: weights[i - 1] <= w
          ? `Item ${i} fits (w=${weights[i - 1]}). max(skip=${without}, take=${withItem}) at cell [${i}][${w}]`
          : `Item ${i} (w=${weights[i - 1]}) too heavy for capacity ${w}. Carry over ${without}.`,
      });
      dp[i][w] = Math.max(without, withItem);
    }
  }
  steps.push({
    grid: dp.map((r) => r.slice()), rowLabels, colLabels, highlight: { write: [n, capacity] },
    line: 2, vars: { result: dp[n][capacity] },
    message: `Maximum value with capacity ${capacity} = ${dp[n][capacity]}`,
  });
  return steps;
};

/* ---------------- LONGEST COMMON SUBSEQUENCE ---------------- */
ENGINE["lcs"] = function (s1, s2) {
  const steps = [];
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const rowLabels = ["∅", ...s1.split("")];
  const colLabels = ["∅", ...s2.split("")];

  steps.push({ grid: dp.map((r) => r.slice()), rowLabels, colLabels, highlight: null, line: 0, vars: { s1, s2 }, message: "DP table initialized to 0 for empty prefixes." });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          grid: dp.map((r) => r.slice()), rowLabels, colLabels,
          highlight: { read: [[i - 1, j - 1]], write: [i, j] },
          line: 1, vars: { char: s1[i - 1], i, j, value: dp[i][j] },
          message: `'${s1[i - 1]}' == '${s2[j - 1]}'. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          grid: dp.map((r) => r.slice()), rowLabels, colLabels,
          highlight: { read: [[i - 1, j], [i, j - 1]], write: [i, j] },
          line: 2, vars: { i, j, up: dp[i - 1][j], left: dp[i][j - 1], value: dp[i][j] },
          message: `'${s1[i - 1]}' != '${s2[j - 1]}'. dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
        });
      }
    }
  }
  steps.push({
    grid: dp.map((r) => r.slice()), rowLabels, colLabels, highlight: { write: [m, n] },
    line: 2, vars: { result: dp[m][n] },
    message: `Length of longest common subsequence = ${dp[m][n]}`,
  });
  return steps;
};

/* ================================================================
   GREEDY ALGORITHMS (array/bar renderer)
   ================================================================ */

/* ---------------- ACTIVITY SELECTION ---------------- */
ENGINE["activity-selection"] = function (starts, finishes) {
  const steps = [];
  const activities = starts.map((s, i) => ({ s, f: finishes[i], idx: i + 1 }));
  activities.sort((a, b) => a.f - b.f);
  const labelArr = () => activities.map((a) => a.f);

  steps.push({
    array: labelArr(), highlights: {}, line: 0,
    vars: { sortedByFinish: activities.map((a) => `A${a.idx}[${a.s}-${a.f}]`).join(", ") },
    message: "Activities sorted ascending by finish time.",
  });

  const selected = [activities[0]];
  let lastFinish = activities[0].f;
  steps.push({
    array: labelArr(), highlights: { sorted: [0] }, line: 0,
    vars: { selected: `A${activities[0].idx}[${activities[0].s}-${activities[0].f}]` },
    message: `Select first activity A${activities[0].idx} (finishes earliest at ${activities[0].f}).`,
  });

  for (let i = 1; i < activities.length; i++) {
    const act = activities[i];
    steps.push({
      array: labelArr(), highlights: { compare: [i] }, line: 0,
      vars: { candidate: `A${act.idx}[${act.s}-${act.f}]`, lastFinish },
      message: `Check A${act.idx}: starts at ${act.s}, last selected finishes at ${lastFinish}.`,
    });
    if (act.s >= lastFinish) {
      selected.push(act);
      lastFinish = act.f;
      steps.push({
        array: labelArr(), highlights: { sorted: selected.map((a) => activities.indexOf(a)) }, line: 0,
        vars: { selectedCount: selected.length },
        message: `A${act.idx} starts after previous finish. Selected. lastFinish = ${lastFinish}.`,
      });
    }
  }
  steps.push({
    array: labelArr(), highlights: { sorted: selected.map((a) => activities.indexOf(a)) }, line: 0,
    vars: { total: selected.length, chosen: selected.map((a) => "A" + a.idx).join(", ") },
    message: `Done. Maximum non-overlapping activities = ${selected.length} (${selected.map((a) => "A" + a.idx).join(", ")}).`,
  });
  return steps;
};

/* ---------------- FRACTIONAL KNAPSACK ---------------- */
ENGINE["fractional-knapsack"] = function (weights, values, capacity) {
  const steps = [];
  const items = weights.map((w, i) => ({ w, v: values[i], idx: i + 1, ratio: values[i] / w }));
  items.sort((a, b) => b.ratio - a.ratio);
  const labelArr = () => items.map((it) => Math.round(it.ratio * 100) / 100);

  steps.push({
    array: labelArr(), highlights: {}, line: 0,
    vars: { sortedByRatio: items.map((it) => `I${it.idx}(v/w=${(it.ratio).toFixed(2)})`).join(", ") },
    message: "Items sorted descending by value/weight ratio.",
  });

  let remaining = capacity, totalValue = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (remaining <= 0) {
      steps.push({ array: labelArr(), highlights: {}, line: 0, vars: { remaining }, message: "Capacity exhausted. Remaining items skipped." });
      break;
    }
    if (it.w <= remaining) {
      remaining -= it.w;
      totalValue += it.v;
      steps.push({
        array: labelArr(), highlights: { sorted: [i] }, line: 0,
        vars: { item: `I${it.idx}`, taken: "fully", remaining, totalValue },
        message: `Take all of I${it.idx} (weight ${it.w}, value ${it.v}). Remaining capacity = ${remaining}.`,
      });
    } else {
      const fraction = remaining / it.w;
      totalValue += it.v * fraction;
      steps.push({
        array: labelArr(), highlights: { pivot: [i] }, line: 0,
        vars: { item: `I${it.idx}`, fraction: fraction.toFixed(2), addedValue: (it.v * fraction).toFixed(2), totalValue: totalValue.toFixed(2) },
        message: `Take ${(fraction * 100).toFixed(0)}% of I${it.idx} to exactly fill remaining capacity.`,
      });
      remaining = 0;
    }
  }
  steps.push({
    array: labelArr(), highlights: {}, line: 0,
    vars: { totalValue: Math.round(totalValue * 100) / 100 },
    message: `Maximum achievable value = ${Math.round(totalValue * 100) / 100}`,
  });
  return steps;
};

/* ---------------- HUFFMAN CODING (priority-queue merges) ---------------- */
ENGINE["huffman-coding"] = function (symbols, freqs) {
  const steps = [];
  let nodes = symbols.map((s, i) => ({ label: s, freq: freqs[i] }));
  nodes.sort((a, b) => a.freq - b.freq);
  const labelArr = () => nodes.map((n) => n.freq);
  const nameArr = () => nodes.map((n) => n.label).join(", ");

  steps.push({ array: labelArr(), highlights: {}, line: 0, vars: { queue: nameArr() }, message: "Priority queue initialized with symbol frequencies (ascending)." });

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const a = nodes[0], b = nodes[1];
    steps.push({ array: labelArr(), highlights: { compare: [0, 1] }, line: 0, vars: { a: a.label, b: b.label }, message: `Extract two lowest-frequency nodes: ${a.label}(${a.freq}) and ${b.label}(${b.freq}).` });
    const merged = { label: `(${a.label}${b.label})`, freq: a.freq + b.freq };
    nodes = nodes.slice(2);
    nodes.push(merged);
    steps.push({ array: labelArr(), highlights: { swap: [nodes.length - 1] }, line: 0, vars: { merged: merged.label, freq: merged.freq }, message: `Merge into new node ${merged.label} with frequency ${merged.freq}. Reinsert into queue.` });
  }
  steps.push({ array: labelArr(), highlights: { sorted: [0] }, line: 0, vars: { tree: nodes[0].label }, message: `Huffman tree complete: ${nodes[0].label} (root frequency ${nodes[0].freq}).` });
  return steps;
};


