/* ==========================================================
   KINETIC LOGIC ENGINE — DATA LAYER
   Syllabus Matrix (modules + topics) and topic content.
   `live` topics have a working visualizer registered in engine.js
   under the matching `visualizer` key.
   ========================================================== */

const SYLLABUS = [
  {
    id: "intro",
    title: "Introduction & Analysis",
    desc: "Foundations of algorithmic thinking and complexity analysis.",
    topics: [
      { id: "what-is-algorithm", name: "What Is An Algorithm", live: false },
      { id: "asymptotic-notation", name: "Asymptotic Notation (Big-O, Ω, Θ)", live: false },
      { id: "time-space-tradeoff", name: "Time-Space Tradeoff", live: false },
      { id: "linear-search", name: "Linear Search", live: true, visualizer: "linear-search" },
      { id: "binary-search", name: "Binary Search", live: true, visualizer: "binary-search" },
    ],
  },
  {
    id: "divide-conquer",
    title: "Divide & Conquer",
    desc: "Breaking problems into independent subproblems.",
    topics: [
      { id: "dc-paradigm", name: "The D&C Paradigm", live: false },
      { id: "recurrence-relations", name: "Recurrence Relations & Master Theorem", live: false },
      { id: "merge-sort-dc", name: "Merge Sort as D&C", live: true, visualizer: "merge-sort" },
      { id: "power-element", name: "Fast Exponentiation", live: false },
      { id: "closest-pair", name: "Closest Pair of Points", live: false },
    ],
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    desc: "Comparison-based and non-comparison-based ordering.",
    topics: [
      { id: "bubble-sort", name: "Bubble Sort", live: true, visualizer: "bubble-sort" },
      { id: "insertion-sort", name: "Insertion Sort", live: true, visualizer: "insertion-sort" },
      { id: "selection-sort", name: "Selection Sort", live: true, visualizer: "selection-sort" },
      { id: "merge-sort", name: "Merge Sort", live: true, visualizer: "merge-sort" },
      { id: "quick-sort", name: "Quick Sort", live: true, visualizer: "quick-sort" },
      { id: "heap-sort", name: "Heap Sort", live: true, visualizer: "heap-sort" },
      { id: "counting-sort", name: "Counting Sort", live: true, visualizer: "counting-sort" },
      { id: "radix-sort", name: "Radix Sort", live: true, visualizer: "radix-sort" },
    ],
  },
  {
    id: "greedy",
    title: "Greedy Algorithms",
    desc: "Locally optimal choices toward a global solution.",
    topics: [
      { id: "greedy-paradigm", name: "The Greedy Paradigm", live: false },
      { id: "activity-selection", name: "Activity / Task Scheduling", live: true, visualizer: "activity-selection" },
      { id: "fractional-knapsack", name: "Fractional Knapsack", live: true, visualizer: "fractional-knapsack" },
      { id: "huffman-coding", name: "Huffman Coding", live: true, visualizer: "huffman-coding" },
    ],
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    desc: "Optimal substructure and overlapping subproblems.",
    topics: [
      { id: "dp-paradigm", name: "Memoization vs Tabulation", live: false },
      { id: "fibonacci-dp", name: "Fibonacci via DP", live: true, visualizer: "fibonacci-dp" },
      { id: "01-knapsack", name: "0/1 Knapsack", live: true, visualizer: "01-knapsack" },
      { id: "lcs", name: "Longest Common Subsequence", live: true, visualizer: "lcs" },
      { id: "coin-change-dp", name: "Coin Change (DP)", live: true, visualizer: "coin-change-dp" },
      { id: "rod-cutting", name: "Rod Cutting", live: true, visualizer: "rod-cutting" },
    ],
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    desc: "Traversal, shortest paths, and spanning trees.",
    topics: [
      { id: "graph-representations", name: "Graph Representations", live: false },
      { id: "bfs", name: "Breadth-First Search", live: true, visualizer: "bfs" },
      { id: "dfs", name: "Depth-First Search", live: true, visualizer: "dfs" },
      { id: "topo-sort", name: "Topological Sort", live: true, visualizer: "topo-sort" },
      { id: "dijkstra", name: "Dijkstra's Algorithm", live: true, visualizer: "dijkstra" },
      { id: "bellman-ford", name: "Bellman-Ford", live: true, visualizer: "bellman-ford" },
      { id: "floyd-warshall", name: "Floyd-Warshall", live: true, visualizer: "floyd-warshall" },
      { id: "prim", name: "Prim's MST", live: true, visualizer: "prim" },
      { id: "kruskal", name: "Kruskal's MST", live: true, visualizer: "kruskal" },
    ],
  },
  {
    id: "flow",
    title: "Network Flow",
    desc: "Maximum flow and minimum cut on flow networks.",
    topics: [
      { id: "flow-networks", name: "Flow Networks & Residual Graphs", live: false },
      { id: "ford-fulkerson", name: "Ford-Fulkerson Method", live: true, visualizer: "ford-fulkerson" },
      { id: "min-cut", name: "Min-Cut Max-Flow Theorem", live: false },
    ],
  },
];

const CONTENT = {
  "what-is-algorithm": {
    summary: "A finite, well-defined sequence of instructions that transforms an input into an output.",
    complexity: null,
    body: [
      "An algorithm is a precise, unambiguous, step-by-step procedure guaranteed to terminate after a finite number of operations. It is distinct from a program: the algorithm is the idea, the program is one implementation of that idea in a specific language.",
      "Every algorithm can be judged along three axes: correctness (does it produce the right answer for every valid input, including edge cases), efficiency (how do its time and memory requirements grow as input size grows), and clarity (can it be understood, proven correct, and maintained).",
    ],
    keypoints: [
      "Must be finite — it terminates.",
      "Must be unambiguous — each step has exactly one interpretation.",
      "Must be effective — each step is basic enough to be carried out.",
      "Correctness is proven independently of any specific implementation.",
    ],
  },
  "asymptotic-notation": {
    summary: "A mathematical language for describing how an algorithm's resource use scales with input size, ignoring constant factors.",
    complexity: null,
    body: [
      "Big-O (O) describes an asymptotic upper bound — the algorithm never does worse than this rate of growth. Big-Omega (Ω) describes a lower bound — it never does better. Big-Theta (Θ) is used when upper and lower bounds coincide, giving a tight characterization of growth.",
      "These notations deliberately discard constant factors and lower-order terms because, for large enough input, growth rate dominates. An O(n) algorithm will eventually outperform an O(n²) algorithm no matter how much larger its constant factor is.",
    ],
    keypoints: [
      "O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, O(2ⁿ) exponential.",
      "Big-O is about worst case unless stated otherwise; average and best case are separate analyses.",
      "Space complexity uses the same notation, applied to memory instead of operations.",
    ],
  },
  "time-space-tradeoff": {
    summary: "Many algorithms can trade memory usage for speed, or vice versa — there is rarely a free lunch.",
    complexity: null,
    body: [
      "A time-space tradeoff occurs when an algorithm can be sped up by using more memory (caching, precomputed lookup tables, hashing) or made more memory-efficient by recomputing values instead of storing them.",
      "Dynamic programming is the canonical example: memoization stores previously computed results to avoid recomputation, trading O(n) or more extra space for a dramatic reduction in time complexity — often from exponential to polynomial.",
    ],
    keypoints: [
      "Hash tables trade memory for O(1) average lookup time.",
      "Memoization trades space for avoiding repeated subproblem computation.",
      "In-place sorting algorithms trade a slightly more complex implementation for O(1) extra space.",
    ],
  },
  "linear-search": {
    summary: "Scan every element in sequence until the target is found or the list is exhausted.",
    complexity: { time: "O(n)", space: "O(1)" },
    body: [
      "Linear search is the simplest possible search strategy: starting at the first element, compare each element to the target in turn. It requires no precondition on the data — the array need not be sorted — which makes it the only option for unordered collections.",
      "Its worst case occurs when the target is the last element or absent entirely, requiring n comparisons. Its best case is a single comparison when the target is first. On average, an unsuccessful search or a search for a uniformly random position both settle around n/2 comparisons.",
    ],
    keypoints: [
      "No precondition on input ordering.",
      "Worst case O(n), best case O(1).",
      "Preferable to binary search only for very small or unsorted collections.",
    ],
  },
  "binary-search": {
    summary: "Repeatedly halve a sorted search space by comparing the target to the middle element.",
    complexity: { time: "O(log n)", space: "O(1) iterative / O(log n) recursive" },
    body: [
      "Binary search requires the input to be sorted. At each step it compares the target to the middle element: if equal, the search ends; if the target is smaller, the search continues in the left half; if larger, the right half. Each comparison eliminates half of the remaining candidates.",
      "Because the search space shrinks geometrically, the number of comparisons needed is bounded by log₂(n), making binary search dramatically faster than linear search for large sorted datasets.",
    ],
    keypoints: [
      "Precondition: input must be sorted.",
      "Each comparison halves the remaining search space.",
      "O(log n) time is a direct consequence of repeated halving.",
      "Forms the basis of binary search trees and many divide & conquer algorithms.",
    ],
  },
  "dc-paradigm": {
    summary: "Divide a problem into independent subproblems, conquer each recursively, then combine their solutions.",
    complexity: null,
    body: [
      "Divide & Conquer algorithms follow a three-step pattern: divide the problem into smaller subproblems of the same type, conquer each subproblem recursively (with a base case for the smallest instances), and combine the subproblem solutions into a solution for the original problem.",
      "The technique is powerful because it naturally exposes parallelism — independent subproblems can, in principle, be solved simultaneously — and because its running time can typically be analyzed cleanly through a recurrence relation.",
    ],
    keypoints: [
      "Divide, Conquer, Combine — the three canonical phases.",
      "Requires subproblems to be independent (no shared mutable state).",
      "Merge sort, quick sort, and binary search are all D&C algorithms.",
    ],
  },
  "recurrence-relations": {
    summary: "Equations that describe an algorithm's running time in terms of its running time on smaller inputs, solvable via the Master Theorem.",
    complexity: null,
    body: [
      "A recurrence relation such as T(n) = aT(n/b) + f(n) captures the cost of a divide & conquer algorithm: a subproblems, each of size n/b, plus f(n) work to divide and combine. The Master Theorem gives a direct formula for solving recurrences of this shape without expanding them by hand.",
      "Comparing f(n) to n^(log_b a) determines which of three cases applies: if f(n) grows slower, the recursive calls dominate; if it grows faster, the combine step dominates; if they grow at the same rate, both contribute equally with an extra logarithmic factor.",
    ],
    keypoints: [
      "T(n) = aT(n/b) + f(n) is the general D&C recurrence form.",
      "Master Theorem gives closed-form solutions for common cases.",
      "Merge sort's T(n) = 2T(n/2) + O(n) resolves to O(n log n).",
    ],
  },
  "merge-sort-dc": {
    summary: "Merge sort viewed through the divide & conquer lens: split, sort recursively, merge.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    body: [
      "Merge sort divides the array at its midpoint, recursively sorts each half, then combines the two sorted halves in a single linear merge pass. Its correctness follows by induction: single-element arrays are trivially sorted, and merging two sorted arrays always produces a sorted result.",
      "Its recurrence T(n) = 2T(n/2) + O(n) resolves via the Master Theorem to O(n log n) — the log n levels of recursive splitting, each doing O(n) work to merge, guaranteed in every case regardless of input order.",
    ],
    keypoints: [
      "Guaranteed O(n log n) in best, average, and worst case.",
      "Not in-place — requires O(n) auxiliary space for merging.",
      "Stable sort: equal elements retain their relative order.",
    ],
  },
  "power-element": {
    summary: "Compute xⁿ in O(log n) time by repeated squaring instead of n multiplications.",
    complexity: { time: "O(log n)", space: "O(log n) recursive" },
    body: [
      "Naively computing xⁿ requires n-1 multiplications. Fast exponentiation exploits the identity xⁿ = (x^(n/2))² for even n, and xⁿ = x · x^(n-1) for odd n, halving the exponent at each recursive step.",
      "This turns a linear number of multiplications into a logarithmic one, and the same repeated-squaring idea underlies fast modular exponentiation used throughout cryptography.",
    ],
    keypoints: [
      "Halve the exponent at each step rather than decrementing by one.",
      "O(log n) multiplications instead of O(n).",
      "Basis for modular exponentiation in RSA and Diffie-Hellman.",
    ],
  },
  "closest-pair": {
    summary: "Find the two closest points in a plane in O(n log n) rather than the naive O(n²).",
    complexity: { time: "O(n log n)", space: "O(n)" },
    body: [
      "The brute-force approach checks every pair of points, an O(n²) operation. The divide & conquer approach sorts points by x-coordinate, splits the set in half, recursively finds the closest pair in each half, then checks a narrow strip around the dividing line for any closer cross-boundary pair.",
      "The key insight that keeps the strip check linear is that, for a given minimum distance d found so far, any point in the strip can have at most a constant number of candidate points within d of it when the strip is also sorted by y-coordinate.",
    ],
    keypoints: [
      "Naive approach is O(n²); D&C approach is O(n log n).",
      "The 'strip' step is where the divide & conquer trick lives.",
      "A classic example of D&C applied to computational geometry.",
    ],
  },
  "bubble-sort": {
    summary: "Repeatedly swap adjacent out-of-order elements, letting the largest values 'bubble' to the end.",
    complexity: { time: "O(n²) avg/worst, O(n) best", space: "O(1)" },
    body: [
      "Bubble sort makes repeated passes over the array, comparing each pair of adjacent elements and swapping them if they are out of order. After each full pass, the largest unsorted element is guaranteed to have moved into its final position.",
      "With an early-exit optimization — stopping once a pass makes zero swaps — bubble sort achieves O(n) best case on already-sorted input, though its average and worst case remain quadratic.",
    ],
    keypoints: [
      "In-place and stable.",
      "O(n²) comparisons and swaps in the worst case.",
      "Mostly of pedagogical value; rarely used in production code.",
    ],
  },
  "insertion-sort": {
    summary: "Build a sorted prefix one element at a time, inserting each new element into its correct position.",
    complexity: { time: "O(n²) avg/worst, O(n) best", space: "O(1)" },
    body: [
      "Insertion sort treats the array as split into a sorted left portion and an unsorted right portion. At each step it takes the first unsorted element and shifts it leftward past every element greater than it, inserting it into its correct place in the sorted prefix.",
      "It performs very well on nearly-sorted data and small arrays, which is why many production sort implementations (including Timsort) fall back to insertion sort for small subarrays.",
    ],
    keypoints: [
      "O(n) on already-sorted input — adaptive.",
      "In-place and stable.",
      "Efficient for small n; often used as a base case inside hybrid sorts.",
    ],
  },
  "selection-sort": {
    summary: "Repeatedly select the minimum of the unsorted remainder and swap it into place.",
    complexity: { time: "O(n²) in all cases", space: "O(1)" },
    body: [
      "Selection sort scans the unsorted portion of the array to find its minimum element, then swaps that minimum into the front of the unsorted portion, growing the sorted prefix by one element each pass.",
      "Unlike bubble or insertion sort, selection sort's performance does not improve on nearly-sorted input — it always performs the same number of comparisons, though it makes at most n swaps, which can matter when writes are expensive.",
    ],
    keypoints: [
      "Always O(n²) comparisons, regardless of input order.",
      "At most n swaps — useful when writes are costlier than comparisons.",
      "In-place; not stable in its typical implementation.",
    ],
  },
  "merge-sort": {
    summary: "Divide, recursively sort, and merge — a guaranteed O(n log n) comparison sort.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    body: [
      "Merge sort splits the array into two halves, recursively sorts each, and merges the sorted halves back together in linear time. Because the split point is always the midpoint, the recursion tree has exactly log n levels, each performing O(n) work during the merge step.",
      "Its guaranteed O(n log n) performance — with no quadratic worst case — makes it a reliable default, particularly for linked lists (no random access penalty) and for external sorting of data too large to fit in memory.",
    ],
    keypoints: [
      "Guaranteed O(n log n) in every case.",
      "Stable, but not in-place — needs O(n) auxiliary space.",
      "The standard choice for external and linked-list sorting.",
    ],
  },
  "quick-sort": {
    summary: "Partition around a pivot so smaller elements land left and larger elements land right, then recurse on each side.",
    complexity: { time: "O(n log n) avg, O(n²) worst", space: "O(log n) avg" },
    body: [
      "Quick sort selects a pivot element and partitions the array so that every element less than the pivot ends up to its left and every element greater ends up to its right, placing the pivot in its final sorted position in a single linear pass. It then recurses on the two partitions.",
      "Average-case performance is O(n log n) because a random or well-chosen pivot tends to split the array roughly in half. Worst case degrades to O(n²) when the pivot is repeatedly the smallest or largest element — for example, on already-sorted input with a naive first-element pivot — which randomized pivot selection largely mitigates.",
    ],
    keypoints: [
      "In-place with O(log n) average extra stack space.",
      "Not stable in its typical implementation.",
      "Randomized pivot selection avoids the O(n²) worst case on adversarial or sorted input.",
    ],
  },
  "heap-sort": {
    summary: "Build a max-heap, then repeatedly extract the maximum to produce a sorted array in place.",
    complexity: { time: "O(n log n) in all cases", space: "O(1)" },
    body: [
      "Heap sort first arranges the array into a max-heap, a binary tree stored implicitly in array form where every parent is at least as large as its children. It then repeatedly swaps the root (the maximum) with the last unsorted element and 'sifts down' the new root to restore the heap property.",
      "Because heap construction is O(n) and each of the n extractions costs O(log n) to restore heap order, heap sort guarantees O(n log n) in every case, in place, unlike quick sort's quadratic worst case or merge sort's linear extra space.",
    ],
    keypoints: [
      "Guaranteed O(n log n), in place, O(1) extra space.",
      "Not stable.",
      "Typically slower in practice than quick sort due to poor cache locality.",
    ],
  },
  "counting-sort": {
    summary: "Count occurrences of each value directly, then place elements using those counts — no comparisons needed.",
    complexity: { time: "O(n + k)", space: "O(n + k)" },
    body: [
      "Counting sort works only on integers (or integer keys) within a known range [0, k]. It first tallies how many times each value appears, then converts those counts into prefix sums that give each value's final position, and finally places every element directly into its sorted slot.",
      "Because it never compares two elements against each other, it escapes the Ω(n log n) lower bound that applies to comparison-based sorts, running in linear time whenever the range k is not significantly larger than n.",
    ],
    keypoints: [
      "Not comparison-based — beats the n log n lower bound.",
      "Efficient only when k = O(n); degrades otherwise.",
      "Stable, and a required building block for radix sort.",
    ],
  },
  "radix-sort": {
    summary: "Sort integers digit by digit, from least significant to most significant, using a stable sort at each pass.",
    complexity: { time: "O(d · (n + k))", space: "O(n + k)" },
    body: [
      "Radix sort processes numbers one digit position at a time — typically starting from the least significant digit — using a stable subroutine (usually counting sort) to sort by that digit while preserving the relative order established by previous passes.",
      "After processing all d digits of the largest number, the array is fully sorted. Its running time O(d(n+k)) is linear in n whenever the number of digits d and the digit range k are both bounded, making it very fast for fixed-width integers.",
    ],
    keypoints: [
      "Requires a stable digit-sort subroutine, usually counting sort.",
      "Processes least significant digit first (LSD radix sort).",
      "Effective for fixed-width integers or strings; less natural for arbitrary comparable objects.",
    ],
  },
  "greedy-paradigm": {
    summary: "Make the locally optimal choice at each step, hoping — and, when provable, guaranteeing — a globally optimal result.",
    complexity: null,
    body: [
      "A greedy algorithm builds a solution incrementally, at each step choosing whatever option looks best under the current, immediate criteria, and never reconsidering that choice. This is fast and simple, but only correct for problems that exhibit the greedy-choice property (a locally optimal choice is part of some globally optimal solution) and optimal substructure.",
      "Not every optimization problem is greedy-solvable — 0/1 knapsack, for instance, cannot be solved greedily by value density alone — so each greedy algorithm requires its own correctness proof, typically via an exchange argument.",
    ],
    keypoints: [
      "Requires the greedy-choice property and optimal substructure to be correct.",
      "Usually much faster than DP alternatives when it applies.",
      "Correctness must be proven per-problem — greedy does not generalize automatically.",
    ],
  },
  "activity-selection": {
    summary: "Given overlapping intervals, select the maximum number of non-overlapping activities by always picking the one that finishes earliest.",
    complexity: { time: "O(n log n)", space: "O(1) after sorting" },
    body: [
      "Sorting activities by finish time and then greedily selecting each activity whose start time is not earlier than the finish time of the last selected activity provably yields the maximum possible number of non-overlapping activities.",
      "The exchange argument behind this: if an optimal solution doesn't pick the earliest-finishing activity first, it can always be modified to do so without reducing the total count, since finishing earlier only leaves more room for subsequent activities.",
    ],
    keypoints: [
      "Sort by finish time, not start time or duration.",
      "O(n log n) dominated by the sort; selection itself is O(n).",
      "Maximizes count of activities, not total duration.",
    ],
  },
  "fractional-knapsack": {
    summary: "Fill a knapsack of limited capacity by taking items (or fractions of them) in order of highest value-to-weight ratio.",
    complexity: { time: "O(n log n)", space: "O(1)" },
    body: [
      "Because items can be split in the fractional variant, the greedy strategy is provably optimal: sort items by value per unit weight, then take as much of the highest-ratio item as fits, moving to the next item once capacity or supply of the current item is exhausted.",
      "This greedy approach fails for the 0/1 variant, where items cannot be split — there, a high-ratio item that doesn't fit exactly can leave wasted capacity, requiring dynamic programming instead.",
    ],
    keypoints: [
      "Only optimal when items can be fractionally split.",
      "Sort by value/weight ratio, descending.",
      "0/1 knapsack (no splitting) requires DP, not greedy.",
    ],
  },
  "huffman-coding": {
    summary: "Build an optimal prefix-free binary code by repeatedly merging the two least frequent symbols into a new subtree.",
    complexity: { time: "O(n log n)", space: "O(n)" },
    body: [
      "Huffman coding assigns shorter binary codes to more frequent symbols and longer codes to rarer ones. It builds a binary tree bottom-up: repeatedly extract the two lowest-frequency nodes from a priority queue, merge them into a new internal node whose frequency is their sum, and reinsert it — until one tree remains.",
      "The resulting code is prefix-free (no code is a prefix of another), which allows unambiguous decoding, and it is provably optimal among all prefix-free codes for the given symbol frequencies.",
    ],
    keypoints: [
      "Uses a min-priority-queue (heap) to always merge the two rarest nodes.",
      "Produces a prefix-free code — no ambiguity when decoding.",
      "Optimal average code length among all prefix-free binary codes.",
    ],
  },
  "dp-paradigm": {
    summary: "Solve overlapping subproblems once and reuse their results, either top-down (memoization) or bottom-up (tabulation).",
    complexity: null,
    body: [
      "Dynamic programming applies when a problem has optimal substructure (an optimal solution is built from optimal solutions to subproblems) and overlapping subproblems (the same subproblem recurs many times in a naive recursive solution). Memoization caches results of a top-down recursive solution; tabulation builds results iteratively bottom-up, usually in an array.",
      "The two approaches are mathematically equivalent but differ in practice: memoization only computes subproblems actually needed and preserves natural recursive structure, while tabulation avoids recursion overhead and stack depth limits but usually computes every subproblem up to the target.",
    ],
    keypoints: [
      "Requires optimal substructure and overlapping subproblems.",
      "Memoization: top-down, recursive, cached.",
      "Tabulation: bottom-up, iterative, usually array-based.",
    ],
  },
  "fibonacci-dp": {
    summary: "Compute Fibonacci numbers in linear time by storing previously computed values instead of recomputing them.",
    complexity: { time: "O(n)", space: "O(n) or O(1) optimized" },
    body: [
      "Naive recursive Fibonacci recomputes the same subproblems exponentially many times, giving O(2ⁿ) time. Storing each computed Fibonacci value the first time it's needed — whether via a memoized recursive call or an iterative bottom-up array — reduces this to O(n), since each value is computed exactly once.",
      "Because each Fibonacci number depends only on the previous two, the space can be further reduced from O(n) to O(1) by keeping just two running variables instead of a full array.",
    ],
    keypoints: [
      "Naive recursion is O(2ⁿ); DP reduces it to O(n).",
      "Classic first example for teaching memoization vs tabulation.",
      "Space can be optimized to O(1) by tracking only the last two values.",
    ],
  },
  "01-knapsack": {
    summary: "Choose a subset of items, each either fully included or excluded, to maximize value within a weight capacity.",
    complexity: { time: "O(n · W)", space: "O(n · W) or O(W) optimized" },
    body: [
      "Unlike the fractional version, 0/1 knapsack items cannot be split, which breaks the greedy value-density strategy. Instead, a DP table is built where dp[i][w] represents the best achievable value using the first i items within capacity w, computed from the choice of including or excluding item i.",
      "The recurrence dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]]) — the second option only valid if weight[i] ≤ w — builds the full table in O(nW) time, and the space can be compressed to a single 1D array of size W by iterating weights in reverse.",
    ],
    keypoints: [
      "Pseudo-polynomial time — O(nW) depends on the magnitude of W, not just item count.",
      "Cannot be solved greedily; requires full DP.",
      "1D space optimization requires iterating the weight dimension in reverse.",
    ],
  },
  lcs: {
    summary: "Find the longest subsequence common to two strings, not necessarily contiguous, using a 2D DP table.",
    complexity: { time: "O(m · n)", space: "O(m · n) or O(min(m,n)) optimized" },
    body: [
      "LCS builds a table dp[i][j] representing the length of the longest common subsequence between the first i characters of one string and the first j characters of the other. If the characters match, dp[i][j] = dp[i-1][j-1] + 1; otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "Tracing back through the filled table reconstructs the actual subsequence, not just its length. LCS underlies practical tools like diff utilities and version-control merge algorithms.",
    ],
    keypoints: [
      "O(mn) time and space with a straightforward 2D table.",
      "Backtracking through the table reconstructs the actual subsequence.",
      "Foundation of the Unix diff algorithm and DNA sequence alignment.",
    ],
  },
  "coin-change-dp": {
    summary: "Find the minimum number of coins needed to make a target amount, using a bottom-up DP table over all amounts.",
    complexity: { time: "O(amount · number of coin types)", space: "O(amount)" },
    body: [
      "Unlike the greedy coin change heuristic (which fails for arbitrary denominations, e.g. {1,3,4} making 6), the DP formulation builds dp[a] = minimum coins to make amount a, computed as 1 + min over all coin denominations c of dp[a-c], for every amount from 0 up to the target.",
      "This guarantees a correct minimum regardless of denomination set, at the cost of pseudo-polynomial time proportional to the target amount rather than its number of digits.",
    ],
    keypoints: [
      "Greedy fails for arbitrary denominations; DP is always correct.",
      "dp[a] = 1 + min(dp[a - c]) over all valid coins c.",
      "Pseudo-polynomial: runtime depends on the amount's magnitude.",
    ],
  },
  "rod-cutting": {
    summary: "Cut a rod into pieces to maximize total sale value, using a DP table over rod lengths.",
    complexity: { time: "O(n²)", space: "O(n)" },
    body: [
      "Given a price table for rod pieces of each length, the rod-cutting problem asks how to cut a rod of length n into pieces to maximize total revenue. The DP recurrence dp[n] = max over all first-cut lengths i of (price[i] + dp[n-i]) considers every possible first cut and reuses optimal solutions for the remainder.",
      "This is structurally similar to the unbounded knapsack problem — pieces can be reused in any combination — and it's a canonical example for introducing DP because its optimal substructure is easy to see directly from the problem statement.",
    ],
    keypoints: [
      "dp[n] = max(price[i] + dp[n-i]) for all valid cut lengths i.",
      "Structurally equivalent to the unbounded knapsack problem.",
      "O(n²) due to trying every cut length for every rod length.",
    ],
  },
  "graph-representations": {
    summary: "Graphs are stored as adjacency matrices (dense, O(V²) space) or adjacency lists (sparse, O(V+E) space).",
    complexity: null,
    body: [
      "An adjacency matrix is a V×V grid where entry (i,j) indicates whether an edge exists between vertex i and j (or its weight). It gives O(1) edge lookup but uses O(V²) space regardless of how many edges actually exist, making it wasteful for sparse graphs.",
      "An adjacency list stores, for each vertex, a list of its neighbors. It uses O(V+E) space — proportional to what's actually in the graph — at the cost of O(degree) time to check whether a specific edge exists, and is the standard choice for most real-world sparse graphs.",
    ],
    keypoints: [
      "Adjacency matrix: O(V²) space, O(1) edge lookup — good for dense graphs.",
      "Adjacency list: O(V+E) space, O(degree) edge lookup — good for sparse graphs.",
      "Most real-world graphs are sparse, favoring adjacency lists.",
    ],
  },
  bfs: {
    summary: "Explore a graph level by level from a source, using a queue to guarantee shortest paths in unweighted graphs.",
    complexity: { time: "O(V + E)", space: "O(V)" },
    body: [
      "Breadth-first search visits a source vertex, then all of its unvisited neighbors, then all of their unvisited neighbors, and so on — expanding outward in concentric 'shells' of increasing distance. This is implemented with a FIFO queue: dequeue a vertex, visit its unvisited neighbors, enqueue them, repeat.",
      "Because it explores strictly in order of distance from the source, BFS is guaranteed to find shortest paths in terms of number of edges in an unweighted graph — a property that doesn't hold for DFS.",
    ],
    keypoints: [
      "Uses a FIFO queue; visits nodes in order of distance from source.",
      "Guarantees shortest path (by edge count) in unweighted graphs.",
      "O(V+E) — every vertex and edge is examined at most once.",
    ],
  },
  dfs: {
    summary: "Explore as far as possible down one branch before backtracking, using a stack (explicit or via recursion).",
    complexity: { time: "O(V + E)", space: "O(V)" },
    body: [
      "Depth-first search dives into a graph by following one path as deep as it goes before backtracking to try alternatives, naturally implemented via recursion (using the call stack) or an explicit stack. Each vertex is marked visited the first time it's reached to avoid infinite loops in cyclic graphs.",
      "DFS underlies many higher-level algorithms: detecting cycles, computing topological orderings of DAGs, finding connected components, and identifying strongly connected components (via Tarjan's or Kosaraju's algorithm).",
    ],
    keypoints: [
      "Uses a stack (explicit or the call stack via recursion).",
      "Does not guarantee shortest paths, unlike BFS.",
      "Basis for topological sort, cycle detection, and SCC algorithms.",
    ],
  },
  "topo-sort": {
    summary: "Order the vertices of a directed acyclic graph so every edge points from an earlier vertex to a later one.",
    complexity: { time: "O(V + E)", space: "O(V)" },
    body: [
      "A topological sort only exists for a directed acyclic graph (DAG) — if a cycle exists, no valid linear ordering respecting all edges is possible. One common approach runs DFS and prepends each vertex to the ordering as its DFS call finishes, which guarantees dependencies are placed before dependents.",
      "An alternative, Kahn's algorithm, repeatedly removes vertices with in-degree zero, which naturally produces a valid ordering and can also detect cycles: if fewer than V vertices are ever removed, a cycle exists.",
    ],
    keypoints: [
      "Only well-defined for DAGs.",
      "DFS-based approach: prepend vertices to the order as their DFS call finishes.",
      "Kahn's algorithm: repeatedly remove in-degree-zero vertices; also detects cycles.",
    ],
  },
  dijkstra: {
    summary: "Find shortest paths from a source to all vertices in a graph with non-negative edge weights, using a priority queue.",
    complexity: { time: "O((V + E) log V) with a binary heap", space: "O(V)" },
    body: [
      "Dijkstra's algorithm maintains a set of tentative shortest distances, initialized to infinity except the source at zero. At each step it selects the unvisited vertex with the smallest tentative distance, finalizes that distance, and relaxes all of its outgoing edges — updating neighbor distances if a shorter path through the current vertex is found.",
      "The algorithm's correctness relies on non-negative edge weights: it assumes that once a vertex's shortest distance is finalized, no future relaxation could ever improve it, which is false if negative weights exist (Bellman-Ford is required in that case).",
    ],
    keypoints: [
      "Requires non-negative edge weights.",
      "A priority queue (min-heap) gives O((V+E) log V) performance.",
      "Finalizes vertices in order of increasing distance from source — greedy in nature.",
    ],
  },
  "bellman-ford": {
    summary: "Find shortest paths from a source even with negative edge weights, by relaxing every edge V-1 times.",
    complexity: { time: "O(V · E)", space: "O(V)" },
    body: [
      "Bellman-Ford relaxes every edge in the graph, up to V-1 times, updating each vertex's distance whenever a shorter path is found through some edge. After V-1 iterations, if further relaxation is still possible on any edge, the graph contains a negative-weight cycle reachable from the source, which Bellman-Ford can explicitly detect.",
      "It is slower than Dijkstra — O(VE) versus O((V+E) log V) — but strictly more general, since it correctly handles negative edge weights that would break Dijkstra's greedy assumption.",
    ],
    keypoints: [
      "Handles negative edge weights; Dijkstra cannot.",
      "V-1 rounds of relaxing every edge guarantees correct shortest paths (absent negative cycles).",
      "An extra round detects negative-weight cycles reachable from the source.",
    ],
  },
  "floyd-warshall": {
    summary: "Compute shortest paths between every pair of vertices simultaneously using dynamic programming over intermediate vertices.",
    complexity: { time: "O(V³)", space: "O(V²)" },
    body: [
      "Floyd-Warshall builds a distance matrix and iteratively considers each vertex k as a potential intermediate point on the path between every pair (i, j), updating dist[i][j] to min(dist[i][j], dist[i][k] + dist[k][j]) if routing through k is shorter.",
      "After considering all V vertices as intermediates, the matrix holds the shortest distance between every pair of vertices. Its O(V³) time makes it best suited to dense graphs or small V, where computing all-pairs shortest paths via V separate Dijkstra runs would be comparably or more expensive.",
    ],
    keypoints: [
      "All-pairs shortest paths in a single O(V³) pass.",
      "Handles negative edges (but not negative cycles).",
      "Simple triple-nested loop; easy to implement correctly.",
    ],
  },
  prim: {
    summary: "Grow a minimum spanning tree one vertex at a time, always adding the cheapest edge that connects a new vertex.",
    complexity: { time: "O(E log V) with a binary heap", space: "O(V)" },
    body: [
      "Prim's algorithm starts from an arbitrary vertex and grows a tree by repeatedly adding the minimum-weight edge that connects a vertex already in the tree to a vertex not yet in it — analogous to Dijkstra's structure, but minimizing individual edge weight rather than cumulative path distance.",
      "A priority queue of candidate edges (or vertices keyed by their minimum connecting edge weight) makes each step efficient, giving O(E log V) overall with a binary heap, comparable to Kruskal's but growing the tree from a single connected component rather than merging forests.",
    ],
    keypoints: [
      "Grows a single tree from one starting vertex outward.",
      "Priority queue of candidate edges gives O(E log V).",
      "Equivalent final MST weight to Kruskal's, different growth strategy.",
    ],
  },
  kruskal: {
    summary: "Build a minimum spanning tree by adding the globally cheapest edge that doesn't create a cycle, using a Union-Find structure.",
    complexity: { time: "O(E log E)", space: "O(V)" },
    body: [
      "Kruskal's algorithm sorts all edges by weight ascending, then processes them in order, adding each edge to the spanning forest unless doing so would create a cycle — checked efficiently with a Union-Find (disjoint set) data structure that tracks which vertices are already connected.",
      "Unlike Prim's, which grows a single tree outward from one vertex, Kruskal's builds up a forest of trees that gradually merge, making it a natural fit when edges are already sorted or when the graph is sparse.",
    ],
    keypoints: [
      "Sort all edges by weight; O(E log E) is dominated by this sort.",
      "Union-Find gives near O(1) amortized cycle checks.",
      "Builds a forest that merges into a single MST, unlike Prim's single growing tree.",
    ],
  },
  "flow-networks": {
    summary: "A directed graph with edge capacities, a source, and a sink, modeling how much 'flow' can move from source to sink.",
    complexity: null,
    body: [
      "A flow network is a directed graph where each edge has a capacity limiting how much flow can pass through it, along with a designated source vertex (where flow originates) and sink vertex (where flow terminates). A valid flow must respect capacity constraints on every edge and conserve flow at every vertex other than source and sink.",
      "The residual graph tracks, for each edge, how much additional flow could still be pushed (its remaining capacity) and how much could be 'undone' (a reverse edge representing flow already sent), which is the key structure that flow-finding algorithms like Ford-Fulkerson operate on.",
    ],
    keypoints: [
      "Every edge has a capacity; flow through it cannot exceed that capacity.",
      "Flow is conserved at every vertex except source and sink.",
      "The residual graph enables 'undoing' flow along augmenting paths.",
    ],
  },
  "ford-fulkerson": {
    summary: "Repeatedly find an augmenting path from source to sink in the residual graph and push as much flow as that path allows.",
    complexity: { time: "O(E · max_flow)", space: "O(V + E)" },
    body: [
      "Ford-Fulkerson repeatedly searches (via BFS or DFS) for a path from source to sink in the residual graph along which more flow can be pushed, then augments the flow by the minimum residual capacity along that path, updating the residual graph accordingly. This repeats until no augmenting path exists.",
      "When implemented with BFS to find augmenting paths, the method is known as Edmonds-Karp, which guarantees O(VE²) time regardless of edge capacities — the plain DFS-based version can be much slower on graphs with large integer capacities because its runtime depends on the value of the max flow itself.",
    ],
    keypoints: [
      "Repeats: find augmenting path, push min residual capacity along it, update residual graph.",
      "Terminates when no augmenting path remains — that is the maximum flow.",
      "Edmonds-Karp (BFS-based) guarantees O(VE²), independent of capacity magnitudes.",
    ],
  },
  "min-cut": {
    summary: "The maximum flow through a network exactly equals the minimum total capacity of edges that, if removed, disconnect source from sink.",
    complexity: null,
    body: [
      "The Max-Flow Min-Cut theorem states that the value of the maximum flow from source to sink equals the minimum capacity among all s-t cuts — a partition of vertices into two sets, one containing the source and the other the sink, where the cut's capacity is the sum of capacities of edges crossing from the source side to the sink side.",
      "This duality means that once Ford-Fulkerson terminates (no augmenting path remains), the set of vertices still reachable from the source in the residual graph, versus those that are not, defines a minimum cut — giving both the max flow value and an explicit bottleneck simultaneously.",
    ],
    keypoints: [
      "Max flow value = min cut capacity, always, for any flow network.",
      "The final residual graph's reachable set from source defines the min cut.",
      "Used in network reliability, bipartite matching, and image segmentation.",
    ],
  },
};
