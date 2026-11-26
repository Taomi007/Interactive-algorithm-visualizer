/* ==========================================================
   KINETIC LOGIC ENGINE — CODE SNIPPETS
   Real, runnable reference implementations per language,
   shown in the Logic Lab's language tabs next to pseudocode.
   ========================================================== */

const CODE_SNIPPETS = {
  "linear-search": {
    c: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    cpp: `using namespace std;
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  },

  "binary-search": {
    c: `int binarySearch(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
    cpp: `using namespace std;
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
    python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },

  "bubble-sort": {
    c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`,
    cpp: `using namespace std;
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
  },

  "insertion-sort": {
    c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `using namespace std;
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },

  "selection-sort": {
    c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
}`,
    cpp: `using namespace std;
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  },

  "merge-sort": {
    c: `void merge(int arr[], int lo, int mid, int hi) {
    int n1 = mid - lo + 1, n2 = hi - mid;
    int left[n1], right[n2];
    for (int i = 0; i < n1; i++) left[i] = arr[lo + i];
    for (int j = 0; j < n2; j++) right[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = lo;
    while (i < n1 && j < n2)
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < n1) arr[k++] = left[i++];
    while (j < n2) arr[k++] = right[j++];
}

void mergeSort(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}`,
    cpp: `using namespace std;
void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> left(arr.begin() + lo, arr.begin() + mid + 1);
    vector<int> right(arr.begin() + mid + 1, arr.begin() + hi + 1);
    int i = 0, j = 0, k = lo;
    while (i < (int)left.size() && j < (int)right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}`,
    python: `def merge_sort(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo >= hi:
        return arr
    mid = (lo + hi) // 2
    merge_sort(arr, lo, mid)
    merge_sort(arr, mid + 1, hi)
    merge(arr, lo, mid, hi)
    return arr

def merge(arr, lo, mid, hi):
    left = arr[lo:mid + 1]
    right = arr[mid + 1:hi + 1]
    i = j = 0
    k = lo
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            arr[k] = left[i]; i += 1
        else:
            arr[k] = right[j]; j += 1
        k += 1
    while i < len(left):
        arr[k] = left[i]; i += 1; k += 1
    while j < len(right):
        arr[k] = right[j]; j += 1; k += 1`,
  },

  bfs: {
    c: `// adjacency list as arr of int lists; queue via simple array
void bfs(int start, int** adj, int* adjSize, int n) {
    int visited[n]; memset(visited, 0, sizeof(visited));
    int queue[n], front = 0, back = 0;
    queue[back++] = start; visited[start] = 1;
    while (front < back) {
        int u = queue[front++];
        printf("visit %d\\n", u);
        for (int k = 0; k < adjSize[u]; k++) {
            int v = adj[u][k];
            if (!visited[v]) {
                visited[v] = 1;
                queue[back++] = v;
            }
        }
    }
}`,
    cpp: `using namespace std;
void bfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    q.push(start); visited[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << "visit " << u << "\\n";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in sorted(graph[u]):
            if v not in visited:
                visited.add(v)
                queue.append(v)
    return order`,
  },

  dfs: {
    c: `void dfs(int start, int** adj, int* adjSize, int n) {
    int visited[n]; memset(visited, 0, sizeof(visited));
    int stack[n], top = 0;
    stack[top++] = start;
    while (top > 0) {
        int u = stack[--top];
        if (visited[u]) continue;
        visited[u] = 1;
        printf("visit %d\\n", u);
        for (int k = adjSize[u] - 1; k >= 0; k--) {
            int v = adj[u][k];
            if (!visited[v]) stack[top++] = v;
        }
    }
}`,
    cpp: `using namespace std;
void dfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    stack<int> s;
    s.push(start);
    while (!s.empty()) {
        int u = s.top(); s.pop();
        if (visited[u]) continue;
        visited[u] = true;
        cout << "visit " << u << "\\n";
        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
            if (!visited[*it]) s.push(*it);
        }
    }
}`,
    python: `def dfs(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        u = stack.pop()
        if u in visited:
            continue
        visited.add(u)
        order.append(u)
        for v in sorted(graph[u], reverse=True):
            if v not in visited:
                stack.append(v)
    return order`,
  },

  "quick-sort": {
    c: `int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i+1]; arr[i+1] = arr[hi]; arr[hi] = t;
    return i + 1;
}
void quickSort(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}`,
    cpp: `using namespace std;
int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[hi]);
    return i + 1;
}
void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}`,
    python: `def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    return i + 1

def quick_sort(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo < hi:
        p = partition(arr, lo, hi)
        quick_sort(arr, lo, p - 1)
        quick_sort(arr, p + 1, hi)
    return arr`,
  },

  "heap-sort": {
    c: `void siftDown(int arr[], int i, int size) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int t = arr[i]; arr[i] = arr[largest]; arr[largest] = t;
        siftDown(arr, largest, size);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n/2 - 1; i >= 0; i--) siftDown(arr, i, n);
    for (int end = n-1; end >= 1; end--) {
        int t = arr[0]; arr[0] = arr[end]; arr[end] = t;
        siftDown(arr, 0, end);
    }
}`,
    cpp: `using namespace std;
void siftDown(vector<int>& arr, int i, int size) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        siftDown(arr, largest, size);
    }
}
void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n/2 - 1; i >= 0; i--) siftDown(arr, i, n);
    for (int end = n-1; end >= 1; end--) {
        swap(arr[0], arr[end]);
        siftDown(arr, 0, end);
    }
}`,
    python: `def sift_down(arr, i, size):
    largest = i
    l, r = 2*i+1, 2*i+2
    if l < size and arr[l] > arr[largest]:
        largest = l
    if r < size and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        sift_down(arr, largest, size)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        sift_down(arr, i, n)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(arr, 0, end)
    return arr`,
  },

  "counting-sort": {
    c: `void countingSort(int arr[], int n, int maxVal) {
    int* count = calloc(maxVal + 1, sizeof(int));
    int* output = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) count[arr[i]]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i-1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    memcpy(arr, output, n * sizeof(int));
    free(count); free(output);
}`,
    cpp: `using namespace std;
void countingSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    vector<int> count(maxVal + 1, 0), output(arr.size());
    for (int x : arr) count[x]++;
    for (int i = 1; i <= maxVal; i++) count[i] += count[i-1];
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    arr = output;
}`,
    python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for x in reversed(arr):
        count[x] -= 1
        output[count[x]] = x
    return output`,
  },

  "radix-sort": {
    c: `void countingSortByDigit(int arr[], int n, int exp) {
    int output[n], count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i]/exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i-1];
    for (int i = n - 1; i >= 0; i--) {
        int d = (arr[i]/exp) % 10;
        output[count[d] - 1] = arr[i];
        count[d]--;
    }
    memcpy(arr, output, n * sizeof(int));
}
void radixSort(int arr[], int n) {
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > maxVal) maxVal = arr[i];
    for (int exp = 1; maxVal/exp > 0; exp *= 10)
        countingSortByDigit(arr, n, exp);
}`,
    cpp: `using namespace std;
void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n), count(10, 0);
    for (int x : arr) count[(x/exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i-1];
    for (int i = n - 1; i >= 0; i--) {
        int d = (arr[i]/exp) % 10;
        output[count[d] - 1] = arr[i];
        count[d]--;
    }
    arr = output;
}
void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal/exp > 0; exp *= 10)
        countingSortByDigit(arr, exp);
}`,
    python: `def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for x in arr:
        count[(x // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for x in reversed(arr):
        d = (x // exp) % 10
        count[d] -= 1
        output[count[d]] = x
    return output

def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr`,
  },

  dijkstra: {
    c: `// simplified: adjacency matrix graph[n][n], 0 = no edge
void dijkstra(int graph[][MAXN], int n, int src, int dist[]) {
    int visited[MAXN] = {0};
    for (int i = 0; i < n; i++) dist[i] = INT_MAX;
    dist[src] = 0;
    for (int count = 0; count < n - 1; count++) {
        int u = -1, best = INT_MAX;
        for (int v = 0; v < n; v++)
            if (!visited[v] && dist[v] < best) { best = dist[v]; u = v; }
        if (u == -1) break;
        visited[u] = 1;
        for (int v = 0; v < n; v++)
            if (graph[u][v] && !visited[v] && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
    cpp: `using namespace std;
vector<int> dijkstra(vector<vector<pair<int,int>>>& adj, int src) {
    int n = adj.size();
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    python: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
  },

  "bellman-ford": {
    c: `// edges as arrays: src[], dst[], weight[], m edges, n vertices
int bellmanFord(int src[], int dst[], int weight[], int m, int n, int source, int dist[]) {
    for (int i = 0; i < n; i++) dist[i] = INT_MAX;
    dist[source] = 0;
    for (int i = 1; i < n; i++)
        for (int j = 0; j < m; j++)
            if (dist[src[j]] != INT_MAX && dist[src[j]] + weight[j] < dist[dst[j]])
                dist[dst[j]] = dist[src[j]] + weight[j];
    for (int j = 0; j < m; j++)
        if (dist[src[j]] != INT_MAX && dist[src[j]] + weight[j] < dist[dst[j]])
            return -1; // negative cycle
    return 0;
}`,
    cpp: `using namespace std;
bool bellmanFord(vector<array<int,3>>& edges, int n, int source, vector<int>& dist) {
    dist.assign(n, INT_MAX);
    dist[source] = 0;
    for (int i = 1; i < n; i++)
        for (auto& [u, v, w] : edges)
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
    for (auto& [u, v, w] : edges)
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            return false; // negative cycle detected
    return true;
}`,
    python: `def bellman_ford(edges, nodes, source):
    dist = {n: float('inf') for n in nodes}
    dist[source] = 0
    for _ in range(len(nodes) - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            raise ValueError("Graph contains a negative-weight cycle")
    return dist`,
  },

  "floyd-warshall": {
    c: `void floydWarshall(int dist[][MAXN], int n) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
}`,
    cpp: `using namespace std;
void floydWarshall(vector<vector<int>>& dist) {
    int n = dist.size();
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
}`,
    python: `def floyd_warshall(dist):
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
  },

  prim: {
    c: `// adjacency matrix graph[n][n], 0 = no edge
void prim(int graph[][MAXN], int n) {
    int key[MAXN], parent[MAXN], inMst[MAXN] = {0};
    for (int i = 0; i < n; i++) key[i] = INT_MAX;
    key[0] = 0; parent[0] = -1;
    for (int count = 0; count < n - 1; count++) {
        int u = -1, best = INT_MAX;
        for (int v = 0; v < n; v++)
            if (!inMst[v] && key[v] < best) { best = key[v]; u = v; }
        inMst[u] = 1;
        for (int v = 0; v < n; v++)
            if (graph[u][v] && !inMst[v] && graph[u][v] < key[v]) {
                key[v] = graph[u][v]; parent[v] = u;
            }
    }
}`,
    cpp: `using namespace std;
void prim(vector<vector<pair<int,int>>>& adj, int start) {
    int n = adj.size();
    vector<int> key(n, INT_MAX);
    vector<bool> inMst(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    key[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        int u = pq.top().second; pq.pop();
        if (inMst[u]) continue;
        inMst[u] = true;
        for (auto [v, w] : adj[u])
            if (!inMst[v] && w < key[v]) {
                key[v] = w;
                pq.push({key[v], v});
            }
    }
}`,
    python: `import heapq

def prim(graph, start):
    visited = {start}
    edges = [(w, start, v) for v, w in graph[start]]
    heapq.heapify(edges)
    mst = []
    while edges and len(visited) < len(graph):
        w, u, v = heapq.heappop(edges)
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for to, weight in graph[v]:
            if to not in visited:
                heapq.heappush(edges, (weight, v, to))
    return mst`,
  },

  kruskal: {
    c: `int find(int parent[], int x) { return parent[x]==x ? x : (parent[x]=find(parent,parent[x])); }
void unionSet(int parent[], int a, int b) { parent[find(parent,a)] = find(parent,b); }

// edges sorted ascending by weight beforehand: src[], dst[], weight[], m edges
void kruskal(int src[], int dst[], int weight[], int m, int n) {
    int parent[MAXN];
    for (int i = 0; i < n; i++) parent[i] = i;
    int mstWeight = 0, count = 0;
    for (int i = 0; i < m && count < n - 1; i++) {
        int ru = find(parent, src[i]), rv = find(parent, dst[i]);
        if (ru != rv) {
            unionSet(parent, ru, rv);
            mstWeight += weight[i];
            count++;
        }
    }
}`,
    cpp: `using namespace std;
struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x]==x ? x : parent[x]=find(parent[x]); }
    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        parent[ra] = rb;
        return true;
    }
};
int kruskal(vector<array<int,3>>& edges, int n) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return a[2] < b[2]; });
    DSU dsu(n);
    int totalWeight = 0;
    for (auto& [u, v, w] : edges)
        if (dsu.unite(u, v)) totalWeight += w;
    return totalWeight;
}`,
    python: `def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def kruskal(nodes, edges):
    parent = {n: n for n in nodes}
    mst = []
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        ru, rv = find(parent, u), find(parent, v)
        if ru != rv:
            parent[ru] = rv
            mst.append((u, v, w))
    return mst`,
  },

  "topo-sort": {
    c: `void dfs(int u, int** adj, int* adjSize, int visited[], int order[], int* idx) {
    visited[u] = 1;
    for (int k = 0; k < adjSize[u]; k++)
        if (!visited[adj[u][k]]) dfs(adj[u][k], adj, adjSize, visited, order, idx);
    order[(*idx)++] = u; // will be reversed at the end
}
void topoSort(int n, int** adj, int* adjSize, int order[]) {
    int visited[MAXN] = {0}, idx = 0;
    for (int u = 0; u < n; u++) if (!visited[u]) dfs(u, adj, adjSize, visited, order, &idx);
    for (int i = 0; i < n/2; i++) { int t=order[i]; order[i]=order[n-1-i]; order[n-1-i]=t; }
}`,
    cpp: `using namespace std;
void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& order) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v, adj, visited, order);
    order.push(u);
}
vector<int> topoSort(vector<vector<int>>& adj) {
    int n = adj.size();
    vector<bool> visited(n, false);
    stack<int> order;
    for (int u = 0; u < n; u++) if (!visited[u]) dfs(u, adj, visited, order);
    vector<int> result;
    while (!order.empty()) { result.push_back(order.top()); order.pop(); }
    return result;
}`,
    python: `def topo_sort(graph, nodes):
    visited = set()
    order = []

    def dfs(u):
        visited.add(u)
        for v in graph.get(u, []):
            if v not in visited:
                dfs(v)
        order.append(u)

    for n in nodes:
        if n not in visited:
            dfs(n)
    return order[::-1]`,
  },

  "ford-fulkerson": {
    c: `// simplified Edmonds-Karp on adjacency matrix capacity[n][n]
int bfsPath(int capacity[][MAXN], int n, int s, int t, int parent[]) {
    int visited[MAXN] = {0}, queue[MAXN], front=0, back=0;
    queue[back++] = s; visited[s] = 1; parent[s] = -1;
    while (front < back) {
        int u = queue[front++];
        for (int v = 0; v < n; v++)
            if (!visited[v] && capacity[u][v] > 0) {
                visited[v] = 1; parent[v] = u; queue[back++] = v;
                if (v == t) return 1;
            }
    }
    return 0;
}
int fordFulkerson(int capacity[][MAXN], int n, int s, int t) {
    int parent[MAXN], maxFlow = 0;
    while (bfsPath(capacity, n, s, t, parent)) {
        int pathFlow = INT_MAX;
        for (int v = t; v != s; v = parent[v])
            pathFlow = pathFlow < capacity[parent[v]][v] ? pathFlow : capacity[parent[v]][v];
        for (int v = t; v != s; v = parent[v]) {
            capacity[parent[v]][v] -= pathFlow;
            capacity[v][parent[v]] += pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
    cpp: `using namespace std;
int fordFulkerson(vector<vector<int>> capacity, int s, int t) {
    int n = capacity.size(), maxFlow = 0;
    vector<int> parent(n);
    auto bfsPath = [&]() {
        fill(parent.begin(), parent.end(), -2);
        parent[s] = -1;
        queue<int> q; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v = 0; v < n; v++)
                if (parent[v] == -2 && capacity[u][v] > 0) {
                    parent[v] = u;
                    if (v == t) return true;
                    q.push(v);
                }
        }
        return false;
    };
    while (bfsPath()) {
        int pathFlow = INT_MAX;
        for (int v = t; v != s; v = parent[v])
            pathFlow = min(pathFlow, capacity[parent[v]][v]);
        for (int v = t; v != s; v = parent[v]) {
            capacity[parent[v]][v] -= pathFlow;
            capacity[v][parent[v]] += pathFlow;
        }
        maxFlow += pathFlow;
    }
    return maxFlow;
}`,
    python: `from collections import deque

def bfs_path(capacity, source, sink, parent):
    visited = {source}
    queue = deque([source])
    while queue:
        u = queue.popleft()
        for v, cap in capacity[u].items():
            if v not in visited and cap > 0:
                visited.add(v)
                parent[v] = u
                if v == sink:
                    return True
                queue.append(v)
    return False

def ford_fulkerson(capacity, source, sink):
    max_flow = 0
    parent = {}
    while bfs_path(capacity, source, sink, parent):
        path_flow = float('inf')
        v = sink
        while v != source:
            u = parent[v]
            path_flow = min(path_flow, capacity[u][v])
            v = u
        v = sink
        while v != source:
            u = parent[v]
            capacity[u][v] -= path_flow
            capacity[v][u] = capacity.get(v, {}).get(u, 0) + path_flow
            v = u
        max_flow += path_flow
    return max_flow`,
  },

  "fibonacci-dp": {
    c: `int fibonacci(int n) {
    if (n <= 1) return n;
    int dp[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`,
    cpp: `using namespace std;
int fibonacci(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
  },

  "rod-cutting": {
    c: `int rodCutting(int price[], int n) {
    int dp[n + 1];
    dp[0] = 0;
    for (int len = 1; len <= n; len++) {
        int best = INT_MIN;
        for (int cut = 1; cut <= len; cut++)
            if (price[cut-1] + dp[len-cut] > best) best = price[cut-1] + dp[len-cut];
        dp[len] = best;
    }
    return dp[n];
}`,
    cpp: `using namespace std;
int rodCutting(vector<int>& price) {
    int n = price.size();
    vector<int> dp(n + 1, 0);
    for (int len = 1; len <= n; len++) {
        int best = INT_MIN;
        for (int cut = 1; cut <= len; cut++)
            best = max(best, price[cut-1] + dp[len-cut]);
        dp[len] = best;
    }
    return dp[n];
}`,
    python: `def rod_cutting(price):
    n = len(price)
    dp = [0] * (n + 1)
    for length in range(1, n + 1):
        dp[length] = max(price[cut - 1] + dp[length - cut] for cut in range(1, length + 1))
    return dp[n]`,
  },

  "coin-change-dp": {
    c: `int coinChange(int coins[], int m, int amount) {
    int dp[amount + 1];
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        dp[a] = INT_MAX;
        for (int i = 0; i < m; i++)
            if (coins[i] <= a && dp[a - coins[i]] != INT_MAX)
                dp[a] = dp[a] < dp[a-coins[i]]+1 ? dp[a] : dp[a-coins[i]]+1;
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
    cpp: `using namespace std;
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        for (int c : coins)
            if (c <= a && dp[a - c] != INT_MAX)
                dp[a] = min(dp[a], dp[a - c] + 1);
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
    python: `def coin_change(coins, amount):
    dp = [0] + [float('inf')] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and dp[a - c] != float('inf'):
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
  },

  "01-knapsack": {
    c: `int knapsack01(int weight[], int value[], int n, int capacity) {
    int dp[n+1][capacity+1];
    for (int i = 0; i <= n; i++)
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) dp[i][w] = 0;
            else if (weight[i-1] <= w)
                dp[i][w] = value[i-1] + dp[i-1][w-weight[i-1]] > dp[i-1][w]
                           ? value[i-1] + dp[i-1][w-weight[i-1]] : dp[i-1][w];
            else dp[i][w] = dp[i-1][w];
        }
    return dp[n][capacity];
}`,
    cpp: `using namespace std;
int knapsack01(vector<int>& weight, vector<int>& value, int capacity) {
    int n = weight.size();
    vector<vector<int>> dp(n+1, vector<int>(capacity+1, 0));
    for (int i = 1; i <= n; i++)
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i-1][w];
            if (weight[i-1] <= w)
                dp[i][w] = max(dp[i][w], value[i-1] + dp[i-1][w-weight[i-1]]);
        }
    return dp[n][capacity];
}`,
    python: `def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
    return dp[n][capacity]`,
  },

  lcs: {
    c: `int lcs(char* s1, char* s2, int m, int n) {
    int dp[m+1][n+1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (s1[i-1] == s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = dp[i-1][j] > dp[i][j-1] ? dp[i-1][j] : dp[i][j-1];
        }
    return dp[m][n];
}`,
    cpp: `using namespace std;
int lcs(const string& s1, const string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    return dp[m][n];
}`,
    python: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
  },

  "activity-selection": {
    c: `// activities pre-sorted by finish time ascending: start[], finish[], n
int activitySelection(int start[], int finish[], int n, int selected[]) {
    int count = 0;
    selected[count++] = 0;
    int lastFinish = finish[0];
    for (int i = 1; i < n; i++) {
        if (start[i] >= lastFinish) {
            selected[count++] = i;
            lastFinish = finish[i];
        }
    }
    return count;
}`,
    cpp: `using namespace std;
vector<int> activitySelection(vector<int>& start, vector<int>& finish) {
    int n = start.size();
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b){ return finish[a] < finish[b]; });
    vector<int> selected = { idx[0] };
    int lastFinish = finish[idx[0]];
    for (int i = 1; i < n; i++) {
        if (start[idx[i]] >= lastFinish) {
            selected.push_back(idx[i]);
            lastFinish = finish[idx[i]];
        }
    }
    return selected;
}`,
    python: `def activity_selection(starts, finishes):
    activities = sorted(range(len(starts)), key=lambda i: finishes[i])
    selected = [activities[0]]
    last_finish = finishes[activities[0]]
    for i in activities[1:]:
        if starts[i] >= last_finish:
            selected.append(i)
            last_finish = finishes[i]
    return selected`,
  },

  "fractional-knapsack": {
    c: `typedef struct { double weight, value, ratio; } Item;
int cmp(const void* a, const void* b) {
    double r1 = ((Item*)a)->ratio, r2 = ((Item*)b)->ratio;
    return r2 > r1 ? 1 : -1;
}
double fractionalKnapsack(Item items[], int n, double capacity) {
    qsort(items, n, sizeof(Item), cmp);
    double totalValue = 0;
    for (int i = 0; i < n && capacity > 0; i++) {
        if (items[i].weight <= capacity) {
            capacity -= items[i].weight;
            totalValue += items[i].value;
        } else {
            totalValue += items[i].value * (capacity / items[i].weight);
            capacity = 0;
        }
    }
    return totalValue;
}`,
    cpp: `using namespace std;
double fractionalKnapsack(vector<double> weight, vector<double> value, double capacity) {
    int n = weight.size();
    vector<int> idx(n);
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b){
        return value[a]/weight[a] > value[b]/weight[b];
    });
    double totalValue = 0;
    for (int i : idx) {
        if (capacity <= 0) break;
        if (weight[i] <= capacity) {
            capacity -= weight[i];
            totalValue += value[i];
        } else {
            totalValue += value[i] * (capacity / weight[i]);
            capacity = 0;
        }
    }
    return totalValue;
}`,
    python: `def fractional_knapsack(weights, values, capacity):
    items = sorted(zip(weights, values), key=lambda x: x[1]/x[0], reverse=True)
    total_value = 0.0
    for w, v in items:
        if capacity <= 0:
            break
        if w <= capacity:
            capacity -= w
            total_value += v
        else:
            total_value += v * (capacity / w)
            capacity = 0
    return total_value`,
  },

  "huffman-coding": {
    c: `// simplified: uses a naive O(n^2) priority "queue" via linear scan for min
typedef struct Node { char label[32]; int freq; struct Node *left, *right; } Node;

Node* extractMin(Node* nodes[], int* n) {
    int minIdx = 0;
    for (int i = 1; i < *n; i++) if (nodes[i]->freq < nodes[minIdx]->freq) minIdx = i;
    Node* result = nodes[minIdx];
    nodes[minIdx] = nodes[--(*n)];
    return result;
}
Node* buildHuffman(Node* nodes[], int n) {
    while (n > 1) {
        Node* a = extractMin(nodes, &n);
        Node* b = extractMin(nodes, &n);
        Node* merged = malloc(sizeof(Node));
        merged->freq = a->freq + b->freq;
        merged->left = a; merged->right = b;
        nodes[n++] = merged;
    }
    return nodes[0];
}`,
    cpp: `using namespace std;
struct Node {
    string label; int freq;
    Node *left = nullptr, *right = nullptr;
};
struct Cmp { bool operator()(Node* a, Node* b) { return a->freq > b->freq; } };

Node* buildHuffman(vector<Node*> leaves) {
    priority_queue<Node*, vector<Node*>, Cmp> pq(leaves.begin(), leaves.end());
    while (pq.size() > 1) {
        Node* a = pq.top(); pq.pop();
        Node* b = pq.top(); pq.pop();
        Node* merged = new Node{a->label + b->label, a->freq + b->freq, a, b};
        pq.push(merged);
    }
    return pq.top();
}`,
    python: `import heapq
from itertools import count

def build_huffman(symbols, freqs):
    counter = count()
    heap = [[f, next(counter), s, None, None] for s, f in zip(symbols, freqs)]
    heapq.heapify(heap)
    while len(heap) > 1:
        f1, _, l1, left1, right1 = heapq.heappop(heap)
        f2, _, l2, left2, right2 = heapq.heappop(heap)
        merged = [f1 + f2, next(counter), l1 + l2,
                  (l1, left1, right1), (l2, left2, right2)]
        heapq.heappush(heap, merged)
    return heap[0]  # root of Huffman tree`,
  },
};
