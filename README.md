# Interactive Algorithm & Data Structure Visualizer
### *(a.k.a. Kinetic Logic Engine)*

An interactive, web-based visualizer for core Data Structures & Algorithms — built as a CSE course project at **Pirojpur Science and Technology University**.

Static textbooks and whiteboard diagrams struggle to show *dynamic* processes like memory swapping, pointer movement, or recursive call stacks. This project replaces static examples with step-by-step, user-controlled animations so learners can see exactly how an algorithm behaves at every state transition — not just its final output.

> 📄 Built from the original project proposal: *"Interactive Algorithm & Data Structure Visualizer"* — submitted by **Tahsin Ahmed Omi (ID: B230201044)**, Dept. of CSE.

---

## ✨ Features

- **Syllabus Matrix** — a full course-style navigation covering 7 modules: Introduction & Analysis, Divide & Conquer, Sorting, Greedy, Dynamic Programming, Graph Algorithms, and Network Flow.
- **Logic Lab** — a split-view visualizer: a live visual canvas next to a state machine panel showing the current pseudocode line, variable values, and a plain-English step log.
- **Time-travel scrub bar** — play, pause, step forward/backward, jump to start/end, or drag to any point in an algorithm's execution.
- **27 working visualizers**, including:
  - **Searching:** Linear Search, Binary Search
  - **Sorting:** Bubble, Insertion, Selection, Merge, Quick, Heap, Counting, Radix
  - **Greedy:** Activity Selection, Fractional Knapsack, Huffman Coding
  - **Dynamic Programming:** Fibonacci, Rod Cutting, Coin Change, 0/1 Knapsack, Longest Common Subsequence
  - **Graph:** BFS, DFS, Topological Sort, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim's MST, Kruskal's MST
  - **Network Flow:** Ford-Fulkerson (Edmonds-Karp)
- **Live, editable inputs** — change the array, graph start node, capacity, or amount and the visualization updates immediately, no "Run" button required.
- **Code view in 3 languages** — every visualizer shows equivalent C, C++, and Python implementations alongside the pseudocode.
- **Time & space complexity** displayed for every algorithm.
- **Written content pages** — a real explanation, complexity breakdown, and key points for every topic in the syllabus, whether or not it has a live visualizer yet.

---

## 🛠 Tech Stack

Plain **HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies.

- `index.html` — page shell (sidebar, topbar, router outlet)
- `css/style.css` — styling (dark, monospace-driven visual theme)
- `js/data.js` — syllabus structure + written topic content
- `js/engine.js` — the step-engine: generates a full execution trace (array/graph state, pseudocode line, variables, message) for every algorithm
- `js/code-snippets.js` — reference C / C++ / Python implementations
- `js/app.js` — router, page rendering, and the Logic Lab controller (visual canvas + state machine + scrub bar)

Because it's dependency-free, it runs by simply opening `index.html` in a browser — no `npm install`, no server required.

---

## ▶️ Running Locally

```bash
git clone <this-repo-url>
cd <repo-folder>
# then just open index.html in your browser
```

If your browser blocks local scripts from `file://`, serve it instead:

```bash
python3 -m http.server
# then open http://localhost:8000
```

---

## 🌐 Live Demo

Deployed via GitHub Pages: *(add your Pages URL here once enabled in Settings → Pages)*

---

## 🗺 Project Methodology

Following the original proposal's plan:

1. Requirement Analysis & UI Planning
2. System Layout Design (HTML/CSS)
3. Core Logic Development (JavaScript)
4. Animation Engine Implementation
5. Testing & Edge Case Handling
6. Deployment and Documentation

---

## 🔭 Future Work

- Step-synced line highlighting for the C/C++/Python code views (currently only pseudocode highlights the active line)
- Additional visualizers for remaining syllabus topics (closest pair of points, fast exponentiation)
- A side-by-side comparison mode to race two algorithms on the same input

---

## 👤 Author

**Tahsin Ahmed Omi**
ID: B230201044 · Department of CSE
Pirojpur Science and Technology University

---

## 📄 License

This project is submitted as academic coursework. Feel free to fork and learn from it — please credit the original author if reused.
