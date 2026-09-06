/* ==========================================================
   KINETIC LOGIC ENGINE — APP SHELL
   Hash-based router + page renderers + Logic Lab controller.
   ========================================================== */

/* ---------------- SHARED DEFAULT GRAPHS ---------------- */
const UNWEIGHTED_GRAPH = {
  nodes: ["A", "B", "C", "D", "E", "F"],
  edges: [
    ["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"],
    ["D", "E"], ["E", "F"], ["C", "F"],
  ],
};
const WEIGHTED_GRAPH = {
  nodes: ["A", "B", "C", "D", "E", "F"],
  edges: [
    ["A", "B", 4], ["A", "C", 2], ["B", "C", 1], ["B", "D", 5],
    ["C", "D", 8], ["C", "E", 10], ["D", "E", 2], ["D", "F", 6], ["E", "F", 3],
  ],
};
const BELLMAN_FORD_GRAPH = {
  nodes: ["A", "B", "C", "D", "E"],
  directed: true,
  edges: [
    ["A", "B", 4], ["A", "C", 5], ["B", "C", -3], ["B", "D", 6],
    ["C", "D", 4], ["D", "E", 2], ["C", "E", 7],
  ],
};
const DAG_GRAPH = {
  nodes: ["A", "B", "C", "D", "E", "F"],
  directed: true,
  edges: [
    ["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"],
    ["D", "E"], ["C", "F"], ["F", "E"],
  ],
};
const FLOW_GRAPH = {
  nodes: ["S", "A", "B", "C", "T"],
  directed: true,
  edges: [
    ["S", "A", 10], ["S", "B", 5], ["A", "B", 15], ["A", "C", 10],
    ["B", "C", 4], ["B", "T", 10], ["C", "T", 10],
  ],
};

/* ---------------- INPUT PARSERS ----------------
   'intarray'/'int'/'text'/'node' return a single value stored under
   the input's own key. 'pairs'/'items'/'freqs' return an object whose
   keys get merged directly into the collected values (see runVisualizer).
   ------------------------------------------------ */
const PARSERS = {
  intarray: (raw) => raw.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n)),
  int: (raw) => parseInt(raw, 10),
  text: (raw) => raw.trim(),
  node: (raw) => raw,
  pairs: (raw) => {
    const starts = [], finishes = [];
    raw.split(",").forEach((pair) => {
      const [s, f] = pair.split(":").map((x) => parseInt(x.trim(), 10));
      if (!isNaN(s) && !isNaN(f)) { starts.push(s); finishes.push(f); }
    });
    return { starts, finishes };
  },
  items: (raw) => {
    const values = [], weights = [];
    raw.split(",").forEach((pair) => {
      const [v, w] = pair.split(":").map((x) => parseInt(x.trim(), 10));
      if (!isNaN(v) && !isNaN(w)) { values.push(v); weights.push(w); }
    });
    return { values, weights };
  },
  freqs: (raw) => {
    const symbols = [], freqs = [];
    raw.split(",").forEach((pair) => {
      const parts = pair.split(":");
      const sym = (parts[0] || "").trim();
      const f = parseInt(parts[1], 10);
      if (sym && !isNaN(f)) { symbols.push(sym); freqs.push(f); }
    });
    return { symbols, freqs };
  },
};

/* ---------------- VISUALIZER REGISTRY ----------------
   category: 'bars' | 'graph' | 'grid' — selects the renderer.
   inputs: ordered field specs consumed by buildInputsPanel/runVisualizer.
   run(values): values is a flat object of parsed input values.
   -------------------------------------------------------- */
const VISUALIZERS = {
  /* ---------- SEARCH ---------- */
  "linear-search": {
    label: "Linear Search", category: "bars",
    complexity: { time: "O(n)", space: "O(1)" },
    inputs: [
      { key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [5, 3, 8, 1, 9, 2, 7], wide: true },
      { key: "target", label: "TARGET", kind: "int", default: 1 },
    ],
    run: (v) => ENGINE["linear-search"](v.array, v.target),
  },
  "binary-search": {
    label: "Binary Search", category: "bars",
    complexity: { time: "O(log n)", space: "O(1)" },
    inputs: [
      { key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [1, 3, 4, 6, 8, 9, 11, 14, 18], wide: true },
      { key: "target", label: "TARGET", kind: "int", default: 8 },
    ],
    run: (v) => ENGINE["binary-search"](v.array, v.target),
  },

  /* ---------- SORTING ---------- */
  "bubble-sort": {
    label: "Bubble Sort", category: "bars",
    complexity: { time: "O(n²) avg/worst, O(n) best", space: "O(1)" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [6, 2, 9, 1, 5, 8, 3], wide: true }],
    run: (v) => ENGINE["bubble-sort"](v.array),
  },
  "insertion-sort": {
    label: "Insertion Sort", category: "bars",
    complexity: { time: "O(n²) avg/worst, O(n) best", space: "O(1)" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [7, 2, 8, 5, 1, 9, 4], wide: true }],
    run: (v) => ENGINE["insertion-sort"](v.array),
  },
  "selection-sort": {
    label: "Selection Sort", category: "bars",
    complexity: { time: "O(n²) in all cases", space: "O(1)" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [4, 9, 1, 7, 3, 8, 2], wide: true }],
    run: (v) => ENGINE["selection-sort"](v.array),
  },
  "merge-sort": {
    label: "Merge Sort", category: "bars",
    complexity: { time: "O(n log n)", space: "O(n)" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [8, 3, 6, 1, 9, 4, 2, 7], wide: true }],
    run: (v) => ENGINE["merge-sort"](v.array),
  },
  "quick-sort": {
    label: "Quick Sort", category: "bars",
    complexity: { time: "O(n log n) avg, O(n²) worst", space: "O(log n) avg" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [8, 3, 6, 1, 9, 4, 2, 7], wide: true }],
    run: (v) => ENGINE["quick-sort"](v.array),
  },
  "heap-sort": {
    label: "Heap Sort", category: "bars",
    complexity: { time: "O(n log n) in all cases", space: "O(1)" },
    inputs: [{ key: "array", label: "ARRAY (comma-separated)", kind: "intarray", default: [4, 10, 3, 5, 1, 8, 9, 2], wide: true }],
    run: (v) => ENGINE["heap-sort"](v.array),
  },
  "counting-sort": {
    label: "Counting Sort", category: "bars",
    complexity: { time: "O(n + k)", space: "O(n + k)" },
    inputs: [{ key: "array", label: "ARRAY (non-negative ints)", kind: "intarray", default: [4, 2, 2, 8, 3, 3, 1, 0], wide: true }],
    run: (v) => ENGINE["counting-sort"](v.array),
  },
  "radix-sort": {
    label: "Radix Sort", category: "bars",
    complexity: { time: "O(d · (n + k))", space: "O(n + k)" },
    inputs: [{ key: "array", label: "ARRAY (non-negative ints)", kind: "intarray", default: [170, 45, 75, 90, 802, 24, 2, 66], wide: true }],
    run: (v) => ENGINE["radix-sort"](v.array),
  },

  /* ---------- GREEDY ---------- */
  "activity-selection": {
    label: "Activity Selection", category: "bars",
    complexity: { time: "O(n log n)", space: "O(1) after sorting" },
    inputs: [{ key: "activities", label: "ACTIVITIES (start:finish, comma-separated)", kind: "pairs", default: "1:4,3:5,0:6,5:7,3:9,5:9,6:10,8:11,8:12,2:14", wide: true }],
    run: (v) => ENGINE["activity-selection"](v.starts, v.finishes),
  },
  "fractional-knapsack": {
    label: "Fractional Knapsack", category: "bars",
    complexity: { time: "O(n log n)", space: "O(1)" },
    inputs: [
      { key: "items", label: "ITEMS (value:weight, comma-separated)", kind: "items", default: "60:10,100:20,120:30", wide: true },
      { key: "capacity", label: "CAPACITY", kind: "int", default: 50 },
    ],
    run: (v) => ENGINE["fractional-knapsack"](v.weights, v.values, v.capacity),
  },
  "huffman-coding": {
    label: "Huffman Coding", category: "bars",
    complexity: { time: "O(n log n)", space: "O(n)" },
    inputs: [{ key: "freqs", label: "SYMBOL:FREQUENCY (comma-separated)", kind: "freqs", default: "A:5,B:9,C:12,D:13,E:16,F:45", wide: true }],
    run: (v) => ENGINE["huffman-coding"](v.symbols, v.freqs),
  },

  /* ---------- DYNAMIC PROGRAMMING ---------- */
  "fibonacci-dp": {
    label: "Fibonacci (DP)", category: "bars",
    complexity: { time: "O(n)", space: "O(n)" },
    inputs: [{ key: "n", label: "N", kind: "int", default: 10 }],
    run: (v) => ENGINE["fibonacci-dp"](v.n),
  },
  "rod-cutting": {
    label: "Rod Cutting", category: "bars",
    complexity: { time: "O(n²)", space: "O(n)" },
    inputs: [{ key: "array", label: "PRICES (index = length 1..n)", kind: "intarray", default: [1, 5, 8, 9, 10, 17, 17, 20], wide: true }],
    run: (v) => ENGINE["rod-cutting"](v.array),
  },
  "coin-change-dp": {
    label: "Coin Change (DP)", category: "bars",
    complexity: { time: "O(amount × coins)", space: "O(amount)" },
    inputs: [
      { key: "coins", label: "COINS (comma-separated)", kind: "intarray", default: [1, 3, 4] },
      { key: "amount", label: "AMOUNT", kind: "int", default: 6 },
    ],
    run: (v) => ENGINE["coin-change-dp"](v.coins, v.amount),
  },
  "01-knapsack": {
    label: "0/1 Knapsack", category: "grid",
    complexity: { time: "O(n · W)", space: "O(n · W)" },
    inputs: [
      { key: "items", label: "ITEMS (value:weight, comma-separated)", kind: "items", default: "60:10,100:20,120:30", wide: true },
      { key: "capacity", label: "CAPACITY", kind: "int", default: 30 },
    ],
    run: (v) => ENGINE["01-knapsack"](v.weights, v.values, v.capacity),
  },
  lcs: {
    label: "Longest Common Subsequence", category: "grid",
    complexity: { time: "O(m · n)", space: "O(m · n)" },
    inputs: [
      { key: "s1", label: "STRING A", kind: "text", default: "ABCBDAB" },
      { key: "s2", label: "STRING B", kind: "text", default: "BDCABA" },
    ],
    run: (v) => ENGINE["lcs"](v.s1, v.s2),
  },

  /* ---------- GRAPH ---------- */
  bfs: {
    label: "Breadth-First Search", category: "graph",
    complexity: { time: "O(V + E)", space: "O(V)" },
    defaultGraph: UNWEIGHTED_GRAPH,
    inputs: [{ key: "start", label: "START NODE", kind: "node", default: "A" }],
    run: (v) => ENGINE["bfs"](UNWEIGHTED_GRAPH, v.start),
  },
  dfs: {
    label: "Depth-First Search", category: "graph",
    complexity: { time: "O(V + E)", space: "O(V)" },
    defaultGraph: UNWEIGHTED_GRAPH,
    inputs: [{ key: "start", label: "START NODE", kind: "node", default: "A" }],
    run: (v) => ENGINE["dfs"](UNWEIGHTED_GRAPH, v.start),
  },
  "topo-sort": {
    label: "Topological Sort", category: "graph",
    complexity: { time: "O(V + E)", space: "O(V)" },
    defaultGraph: DAG_GRAPH,
    inputs: [],
    run: () => ENGINE["topo-sort"](DAG_GRAPH),
  },
  dijkstra: {
    label: "Dijkstra's Algorithm", category: "graph",
    complexity: { time: "O((V+E) log V)", space: "O(V)" },
    defaultGraph: WEIGHTED_GRAPH,
    inputs: [{ key: "start", label: "START NODE", kind: "node", default: "A" }],
    run: (v) => ENGINE["dijkstra"](WEIGHTED_GRAPH, v.start),
  },
  "bellman-ford": {
    label: "Bellman-Ford", category: "graph",
    complexity: { time: "O(V · E)", space: "O(V)" },
    defaultGraph: BELLMAN_FORD_GRAPH,
    inputs: [{ key: "start", label: "START NODE", kind: "node", default: "A" }],
    run: (v) => ENGINE["bellman-ford"](BELLMAN_FORD_GRAPH, v.start),
  },
  "floyd-warshall": {
    label: "Floyd-Warshall", category: "grid",
    complexity: { time: "O(V³)", space: "O(V²)" },
    inputs: [],
    run: () => ENGINE["floyd-warshall"](WEIGHTED_GRAPH),
  },
  prim: {
    label: "Prim's MST", category: "graph",
    complexity: { time: "O(E log V)", space: "O(V)" },
    defaultGraph: WEIGHTED_GRAPH,
    inputs: [{ key: "start", label: "START NODE", kind: "node", default: "A" }],
    run: (v) => ENGINE["prim"](WEIGHTED_GRAPH, v.start),
  },
  kruskal: {
    label: "Kruskal's MST", category: "graph",
    complexity: { time: "O(E log E)", space: "O(V)" },
    defaultGraph: WEIGHTED_GRAPH,
    inputs: [],
    run: () => ENGINE["kruskal"](WEIGHTED_GRAPH),
  },

  /* ---------- NETWORK FLOW ---------- */
  "ford-fulkerson": {
    label: "Ford-Fulkerson (Edmonds-Karp)", category: "graph",
    complexity: { time: "O(E · max flow)", space: "O(V + E)" },
    defaultGraph: FLOW_GRAPH,
    inputs: [
      { key: "source", label: "SOURCE", kind: "node", default: "S" },
      { key: "sink", label: "SINK", kind: "node", default: "T" },
    ],
    run: (v) => ENGINE["ford-fulkerson"](FLOW_GRAPH, v.source, v.sink),
  },
};

/* ---------------- ROUTER ---------------- */
const root = document.getElementById("page-root");
const crumbs = document.getElementById("crumbs");

function router() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) return renderHome();
  if (parts[0] === "module" && parts[1]) return renderModule(parts[1]);
  if (parts[0] === "topic" && parts[1]) return renderTopic(parts[1]);
  if (parts[0] === "lab" && parts[1]) return renderLab(parts[1]);
  return renderHome();
}
window.addEventListener("hashchange", router);

/* ---------------- SIDEBAR ---------------- */
function renderSidebar(activeTopicId) {
  const nav = document.getElementById("syllabus-nav");
  nav.innerHTML = "";
  SYLLABUS.forEach((mod, mi) => {
    const isOpen = mod.topics.some((t) => t.id === activeTopicId);
    const block = document.createElement("div");
    block.className = "module-block" + (isOpen ? " open" : "");

    const head = document.createElement("div");
    head.className = "module-head";
    head.innerHTML = `<span><span class="idx">${String(mi + 1).padStart(2, "0")}</span>${mod.title}</span><span class="chev">›</span>`;
    head.onclick = () => {
      block.classList.toggle("open");
    };
    block.appendChild(head);

    const list = document.createElement("div");
    list.className = "topic-list";
    mod.topics.forEach((t) => {
      const item = document.createElement("a");
      item.href = `#/topic/${t.id}`;
      item.className = "topic-item" + (t.id === activeTopicId ? " active" : "");
      item.innerHTML = `<span>${t.name}</span>${t.live ? '<span class="live-tag">LIVE</span>' : ""}`;
      list.appendChild(item);
    });
    block.appendChild(list);
    nav.appendChild(block);
  });
}
renderSidebar(null);

document.getElementById("menu-toggle").onclick = () => {
  document.getElementById("sidebar").classList.toggle("open");
};

// On mobile, the sidebar sits on top of the whole page. Without this,
// tapping a link inside it navigates underneath while the menu stays
// open and covers the screen — it looks like the site stopped responding.
document.getElementById("sidebar").addEventListener("click", (e) => {
  if (e.target.closest("a") && window.innerWidth <= 800) {
    document.getElementById("sidebar").classList.remove("open");
  }
});

// Tapping the main content area while the mobile menu is open closes it too
// (but ignore the toggle button itself — it has its own open/close logic above).
document.querySelector(".main-col").addEventListener("click", (e) => {
  if (e.target.closest("#menu-toggle")) return;
  if (window.innerWidth <= 800) {
    document.getElementById("sidebar").classList.remove("open");
  }
});

/* ---------------- TERMINAL FOOTER ---------------- */
const terminalLines = [
  "SYSTEM READY // ALL MODULES INDEXED",
  "STEP-ENGINE v1.0 LOADED",
  "TIME-TRAVEL SCRUB: ENABLED",
  "SELECT A TOPIC TO BEGIN",
];
let tlIdx = 0;
function typeTerminal() {
  const el = document.getElementById("terminal-text");
  const text = terminalLines[tlIdx % terminalLines.length];
  let i = 0;
  el.textContent = "";
  const iv = setInterval(() => {
    el.textContent = text.slice(0, i++);
    if (i > text.length) {
      clearInterval(iv);
      setTimeout(() => {
        tlIdx++;
        typeTerminal();
      }, 1800);
    }
  }, 28);
}
typeTerminal();

/* ---------------- HOME ---------------- */
function renderHome() {
  crumbs.textContent = "HOME";
  renderSidebar(null);
  root.innerHTML = `
    <section class="hero">
      <h1>THINK IN <em>STEPS.</em><br/>SEE THE MACHINE.</h1>
      <p>The Kinetic Logic Engine is an interactive systems-view of data structures & algorithms — every module of the syllabus, laid out, explained, and where possible, made to run in front of you, one state transition at a time.</p>
      <div class="cta-row">
        <a href="#/lab/bubble-sort" class="btn primary">ENTER THE LOGIC LAB →</a>
        <button id="btn-browse-syllabus" class="btn">BROWSE SYLLABUS</button>
      </div>
    </section>

    <h2 style="font-size:22px;margin-bottom:16px;color:var(--ink-0);">MODULE INDEX</h2>
    <div class="module-grid" id="module-grid"></div>

    <section class="philosophy">
      <h2>Why step-by-step.</h2>
      <p>Algorithms fail to be intuitive not because they're conceptually hard, but because textbook descriptions collapse dozens of state transitions into a single paragraph. The Logic Lab refuses to collapse anything: every comparison, swap, and pointer movement is its own discrete, scrubbable frame — paired with the exact pseudocode line and variable state that produced it.</p>
    </section>
  `;
  document.getElementById("btn-browse-syllabus").onclick = () => {
    document.getElementById("module-grid").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const grid = document.getElementById("module-grid");
  SYLLABUS.forEach((mod, mi) => {
    const card = document.createElement("a");
    card.href = `#/module/${mod.id}`;
    card.className = "module-card";
    const liveCount = mod.topics.filter((t) => t.live).length;
    card.innerHTML = `
      <div class="idx">MODULE ${String(mi + 1).padStart(2, "0")}</div>
      <h3>${mod.title}</h3>
      <p>${mod.desc}</p>
      ${liveCount ? `<div class="badge-live">${liveCount} LIVE VISUALIZER${liveCount > 1 ? "S" : ""}</div>` : ""}
    `;
    grid.appendChild(card);
  });
}

/* ---------------- MODULE PAGE ---------------- */
function renderModule(id) {
  const mod = SYLLABUS.find((m) => m.id === id);
  if (!mod) return renderHome();
  crumbs.textContent = `HOME / ${mod.title.toUpperCase()}`;
  renderSidebar(null);
  root.innerHTML = `
    <div class="content-header">
      <div class="eyebrow">MODULE</div>
      <h1>${mod.title}</h1>
      <p class="prose" style="margin-top:10px;">${mod.desc}</p>
    </div>
    <div class="topic-grid" id="topic-grid"></div>
  `;
  const grid = document.getElementById("topic-grid");
  mod.topics.forEach((t) => {
    const row = document.createElement("a");
    row.href = t.live ? `#/lab/${t.visualizer}` : `#/topic/${t.id}`;
    row.className = "topic-row";
    row.innerHTML = `
      <span class="t-name">${t.name}</span>
      <span class="t-tag ${t.live ? "live" : ""}">${t.live ? "LOGIC LAB →" : "READ"}</span>
    `;
    grid.appendChild(row);
  });
}

/* ---------------- TOPIC PAGE ---------------- */
function renderTopic(id) {
  let mod = null,
    topic = null;
  SYLLABUS.forEach((m) => {
    const t = m.topics.find((t) => t.id === id);
    if (t) {
      mod = m;
      topic = t;
    }
  });
  if (!topic) return renderHome();
  const content = CONTENT[id];
  crumbs.textContent = `HOME / ${mod.title.toUpperCase()} / ${topic.name.toUpperCase()}`;
  renderSidebar(id);

  const idxInMod = mod.topics.findIndex((t) => t.id === id);
  const prev = mod.topics[idxInMod - 1];
  const next = mod.topics[idxInMod + 1];

  root.innerHTML = `
    <div class="content-header">
      <div class="eyebrow">${mod.title}</div>
      <h1>${topic.name} ${topic.live ? '<span class="badge-live">LIVE VISUALIZER</span>' : ""}</h1>
      ${content && content.complexity ? `
        <div class="complexity-row">
          <div class="chip">TIME &nbsp;<b>${content.complexity.time}</b></div>
          <div class="chip">SPACE &nbsp;<b>${content.complexity.space}</b></div>
        </div>` : ""}
      ${content ? `<p class="prose" style="margin-top:16px;">${content.summary}</p>` : ""}
    </div>

    ${topic.live ? `<div style="margin-bottom:22px;"><a href="#/lab/${topic.visualizer}" class="btn primary">OPEN IN LOGIC LAB →</a></div>` : ""}

    <div class="module">
      <div class="prose">
        ${content ? content.body.map((p) => `<p>${p}</p>`).join("") : "<p>Content for this topic is being indexed.</p>"}
      </div>
      ${content && content.keypoints ? `
        <div class="state-block">
          <div class="label">Key Points</div>
          <ul class="keypoints">${content.keypoints.map((k) => `<li>${k}</li>`).join("")}</ul>
        </div>` : ""}
    </div>

    <div class="sibling-nav">
      <a href="${prev ? `#/topic/${prev.id}` : "#"}">${prev ? "← " + prev.name : ""}</a>
      <a href="${next ? `#/topic/${next.id}` : "#"}">${next ? next.name + " →" : ""}</a>
    </div>
  `;
}

/* ================================================================
   LOGIC LAB — split view visualizer + state machine + scrub bar
   ================================================================ */
let LAB_STATE = {
  steps: [],
  idx: 0,
  playing: false,
  timer: null,
  speed: 500,
  vis: null,
};

function renderLab(visId) {
  const vis = VISUALIZERS[visId];
  if (!vis) return renderHome();

  // find matching topic for breadcrumb/sidebar highlight
  let topicId = null;
  SYLLABUS.forEach((m) => m.topics.forEach((t) => { if (t.visualizer === visId) topicId = t.id; }));
  crumbs.textContent = `HOME / LOGIC LAB / ${vis.label.toUpperCase()}`;
  renderSidebar(topicId);

  root.innerHTML = `
    <div class="content-header">
      <div class="eyebrow">LOGIC LAB</div>
      <h1>${vis.label}</h1>
    </div>

    <div class="lab-grid">
      <div class="lab-panel">
        <h4>Visual Canvas</h4>
        <div class="canvas-wrap" id="canvas-wrap"></div>
        <div class="controls" id="controls"></div>
      </div>
      <div class="lab-panel">
        <h4>State Machine</h4>
        <div class="state-block">
          <div class="label-row">
            <div class="label">Code</div>
            <div class="lang-tabs" id="lang-tabs">
              <button class="lang-tab active" data-lang="pseudo">PSEUDOCODE</button>
              <button class="lang-tab" data-lang="c">C</button>
              <button class="lang-tab" data-lang="cpp">C++</button>
              <button class="lang-tab" data-lang="python">PYTHON</button>
            </div>
          </div>
          <div class="pseudo" id="pseudo"></div>
        </div>
        <div class="state-block">
          <div class="label">Variables</div>
          <table class="vars-table" id="vars-table"><tbody></tbody></table>
        </div>
        <div class="state-block">
          <div class="label">Step Log</div>
          <div class="step-log" id="step-log"></div>
        </div>
      </div>
    </div>

    <div class="module" style="margin-top:16px;">
      <div class="module-title-row"><span class="num">COMPLEXITY</span></div>
      <div class="complexity-strip">
        <div class="chip">TIME &nbsp;<b>${vis.complexity ? vis.complexity.time : "—"}</b></div>
        <div class="chip">SPACE &nbsp;<b>${vis.complexity ? vis.complexity.space : "—"}</b></div>
      </div>
    </div>
  `;

  LAB_STATE = { steps: [], idx: 0, playing: false, timer: null, speed: 1100, vis: { id: visId, ...vis }, codeTab: "pseudo" };

  document.querySelectorAll("#lang-tabs .lang-tab").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll("#lang-tabs .lang-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      LAB_STATE.codeTab = btn.dataset.lang;
      renderStep();
    };
  });

  buildInputsPanel(visId);
}

function buildInputsPanel(visId) {
  const vis = VISUALIZERS[visId];
  const controls = document.getElementById("controls");
  let inputsHtml = `<div class="inputs-row" id="inputs-row">`;

  (vis.inputs || []).forEach((spec) => {
    if (spec.kind === "node") {
      const nodes = vis.defaultGraph.nodes;
      inputsHtml += `
        <div class="field">
          <label>${spec.label}</label>
          <select id="in-${spec.key}">
            ${nodes.map((n) => `<option value="${n}" ${n === spec.default ? "selected" : ""}>${n}</option>`).join("")}
          </select>
        </div>`;
    } else {
      const inputType = spec.kind === "int" ? "number" : "text";
      const val = Array.isArray(spec.default) ? spec.default.join(",") : spec.default;
      inputsHtml += `
        <div class="field" ${spec.wide ? 'style="flex:2;min-width:240px;"' : ""}>
          <label>${spec.label}</label>
          <input type="${inputType}" id="in-${spec.key}" value="${val}" />
        </div>`;
    }
  });

  inputsHtml += `</div>`;
  controls.innerHTML = `
    <div class="controls-row">
      <button class="ctrl-btn" id="btn-first" title="First">⏮</button>
      <button class="ctrl-btn" id="btn-prev" title="Step back">◀</button>
      <button class="ctrl-btn play" id="btn-play" title="Play/Pause">▶</button>
      <button class="ctrl-btn" id="btn-next" title="Step forward">▶|</button>
      <button class="ctrl-btn" id="btn-last" title="Last">⏭</button>
      <input type="range" id="scrub" min="0" max="0" value="0" />
      <span class="step-counter" id="step-counter">0 / 0</span>
      <select class="speed-select" id="speed-select">
        <option value="1800">SLOW</option>
        <option value="1100" selected>NORMAL</option>
        <option value="550">FAST</option>
      </select>
    </div>
    ${inputsHtml}
  `;

  document.getElementById("btn-first").onclick = () => gotoStep(0);
  document.getElementById("btn-prev").onclick = () => gotoStep(LAB_STATE.idx - 1);
  document.getElementById("btn-next").onclick = () => gotoStep(LAB_STATE.idx + 1);
  document.getElementById("btn-last").onclick = () => gotoStep(LAB_STATE.steps.length - 1);
  document.getElementById("btn-play").onclick = togglePlay;
  document.getElementById("scrub").oninput = (e) => gotoStep(parseInt(e.target.value, 10));
  document.getElementById("speed-select").onchange = (e) => {
    LAB_STATE.speed = parseInt(e.target.value, 10);
    if (LAB_STATE.playing) {
      stopPlay();
      togglePlay();
    }
  };

  // Live auto-update: re-run the moment any input value changes — no separate Run step.
  (vis.inputs || []).forEach((spec) => {
    const el = document.getElementById(`in-${spec.key}`);
    const evt = spec.kind === "node" ? "change" : "input";
    el.addEventListener(evt, () => runVisualizer(visId));
  });

  runVisualizer(visId);
}

function runVisualizer(visId) {
  const vis = VISUALIZERS[visId];
  stopPlay();
  let steps;
  try {
    const values = {};
    (vis.inputs || []).forEach((spec) => {
      const el = document.getElementById(`in-${spec.key}`);
      const parsed = PARSERS[spec.kind](el.value);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        Object.assign(values, parsed);
      } else {
        values[spec.key] = parsed;
      }
    });
    steps = vis.run(values);
    if (!steps || !steps.length) throw new Error("no steps produced — check your input");
  } catch (e) {
    steps = [{ array: [], grid: [[0]], rowLabels: [""], colLabels: [""], highlights: {}, line: 0, vars: {}, message: "Invalid input — " + e.message }];
  }
  LAB_STATE.steps = steps;
  LAB_STATE.idx = 0;
  const scrub = document.getElementById("scrub");
  scrub.max = String(Math.max(0, steps.length - 1));
  scrub.value = "0";
  renderStep();
}

function gotoStep(n) {
  if (!LAB_STATE.steps.length) return;
  LAB_STATE.idx = Math.max(0, Math.min(LAB_STATE.steps.length - 1, n));
  document.getElementById("scrub").value = String(LAB_STATE.idx);
  renderStep();
}

function togglePlay() {
  if (LAB_STATE.playing) {
    stopPlay();
    return;
  }
  LAB_STATE.playing = true;
  document.getElementById("btn-play").textContent = "❚❚";
  LAB_STATE.timer = setInterval(() => {
    if (LAB_STATE.idx >= LAB_STATE.steps.length - 1) {
      stopPlay();
      return;
    }
    gotoStep(LAB_STATE.idx + 1);
  }, LAB_STATE.speed);
}
function stopPlay() {
  LAB_STATE.playing = false;
  clearInterval(LAB_STATE.timer);
  const btn = document.getElementById("btn-play");
  if (btn) btn.textContent = "▶";
}

function renderStep() {
  const step = LAB_STATE.steps[LAB_STATE.idx];
  if (!step) return;
  document.getElementById("step-counter").textContent = `${LAB_STATE.idx + 1} / ${LAB_STATE.steps.length}`;

  const category = LAB_STATE.vis.category;
  if (category === "bars") renderArrayCanvas(step);
  else if (category === "graph") renderGraphCanvas(step);
  else if (category === "grid") renderGridCanvas(step);

  renderPseudocode(step);
  renderVars(step);
  document.getElementById("step-log").textContent = step.message || "";
}

function renderArrayCanvas(step) {
  const wrap = document.getElementById("canvas-wrap");
  wrap.innerHTML = "";
  const arr = step.array || [];
  const max = Math.max(...arr.map((v) => (typeof v === "number" && isFinite(v) ? Math.abs(v) : 0)), 1);
  const h = step.highlights || {};
  arr.forEach((val, i) => {
    const bar = document.createElement("div");
    let cls = "bar";
    if (h.sorted && h.sorted.includes(i)) cls += " sorted";
    if (h.pivot && h.pivot.includes(i)) cls += " pivot";
    if (h.compare && h.compare.includes(i)) cls += " compare";
    if (h.swap && h.swap.includes(i)) cls += " swap";
    bar.className = cls;
    bar.style.height = `${20 + (Math.abs(val) / max) * 200}px`;
    bar.textContent = val;
    wrap.appendChild(bar);
  });
}

function edgeKey(a, b) {
  return [a, b].sort().join("-");
}

function renderGraphCanvas(step) {
  const wrap = document.getElementById("canvas-wrap");
  wrap.innerHTML = `<div class="node-graph" id="node-graph"></div>`;
  const graph = step.graph;
  const container = document.getElementById("node-graph");
  const w = 460, hgt = 320, cx = w / 2, cy = hgt / 2, r = 120;
  const positions = {};
  graph.nodes.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / graph.nodes.length - Math.PI / 2;
    positions[n] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const mstSet = new Set((step.mstEdges || []).map(([a, b]) => edgeKey(a, b)));

  let defs = "";
  if (graph.directed) {
    defs = `<defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#44444d" /></marker>
      <marker id="arrow-active" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ff5a1f" /></marker>
      <marker id="arrow-mst" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#4fe38b" /></marker>
    </defs>`;
  }

  let svg = `<svg viewBox="0 0 ${w} ${hgt}" xmlns="http://www.w3.org/2000/svg">${defs}`;

  graph.edges.forEach((edge) => {
    const [a, b, weight] = edge;
    const pa = positions[a], pb = positions[b];
    if (!pa || !pb) return;
    const isActive = step.activeEdge && ((step.activeEdge[0] === a && step.activeEdge[1] === b) || (!graph.directed && step.activeEdge[0] === b && step.activeEdge[1] === a));
    const isMst = mstSet.has(edgeKey(a, b));
    let cls = "gedge";
    if (isMst) cls += " mst";
    else if (isActive) cls += " active";
    const marker = graph.directed ? (isMst ? "url(#arrow-mst)" : isActive ? "url(#arrow-active)" : "url(#arrow)") : "";
    svg += `<line class="${cls}" x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}" ${marker ? `marker-end="${marker}"` : ""} />`;
    if (weight !== undefined) {
      const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
      svg += `<rect x="${mx - 13}" y="${my - 9}" width="26" height="16" fill="#0a0a0c" stroke="#2c2c33" />`;
      svg += `<text class="glabel" style="font-size:10px;" x="${mx}" y="${my + 4}">${weight}</text>`;
    }
  });

  graph.nodes.forEach((n) => {
    const p = positions[n];
    let cls = "gnode";
    if (step.visited && step.visited.includes(n)) cls += " visited";
    if (step.current === n) cls += " current";
    svg += `<circle class="${cls}" cx="${p.x}" cy="${p.y}" r="20" />`;
    svg += `<text class="glabel" x="${p.x}" y="${p.y + 5}">${n}</text>`;
    if (step.nodeLabels && step.nodeLabels[n] !== undefined) {
      const dv = step.nodeLabels[n];
      svg += `<text class="glabel dist-label" x="${p.x}" y="${p.y + 35}">${dv === Infinity ? "∞" : dv}</text>`;
    }
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

function renderGridCanvas(step) {
  const wrap = document.getElementById("canvas-wrap");
  const grid = step.grid || [];
  const rowLabels = step.rowLabels || [];
  const colLabels = step.colLabels || [];
  const h = step.highlight || {};
  const isWrite = (r, c) => h.write && h.write[0] === r && h.write[1] === c;
  const isRead = (r, c) => h.read && h.read.some(([rr, cc]) => rr === r && cc === c);

  let html = `<table class="grid-table"><thead><tr><th></th>${colLabels.map((c) => `<th>${escapeHtml(String(c))}</th>`).join("")}</tr></thead><tbody>`;
  grid.forEach((row, r) => {
    html += `<tr><th>${escapeHtml(String(rowLabels[r] !== undefined ? rowLabels[r] : r))}</th>`;
    row.forEach((val, c) => {
      let cls = "grid-cell";
      if (isWrite(r, c)) cls += " write";
      else if (isRead(r, c)) cls += " read";
      html += `<td class="${cls}">${val === Infinity ? "∞" : val}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  wrap.innerHTML = `<div class="grid-scroll">${html}</div>`;
}

function renderPseudocode(step) {
  const el = document.getElementById("pseudo");
  const tab = LAB_STATE.codeTab || "pseudo";

  if (tab === "pseudo") {
    const lines = PSEUDOCODE[LAB_STATE.vis.id] || [];
    el.innerHTML = lines
      .map((l, i) => `<div class="pl${i === step.line ? " active" : ""}">${escapeHtml(l)}</div>`)
      .join("");
    return;
  }

  const snippets = CODE_SNIPPETS[LAB_STATE.vis.id];
  const code = snippets && snippets[tab] ? snippets[tab] : "// Not available for this algorithm yet.";
  el.innerHTML = `<pre>${escapeHtml(code)}</pre>`;
}

function renderVars(step) {
  const tbody = document.querySelector("#vars-table tbody");
  const vars = step.vars || {};
  const keys = Object.keys(vars);
  tbody.innerHTML = keys.length
    ? keys.map((k) => `<tr><td>${k}</td><td>${vars[k]}</td></tr>`).join("")
    : `<tr><td colspan="2" style="color:var(--ink-2);">—</td></tr>`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---------------- INIT ---------------- */
router();
