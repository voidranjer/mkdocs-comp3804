# COMP 3804: Assignment 4

## Submission Details

{{ read_csv('details.csv') }}

## Question 1

You and m − 1 of your friends live all in different cities (m > 1). Each of you has a car and can start driving right now (after determining the meeting location). You drive on a road network, i.e, you have cities as vertices and two cities are connected via a directed edge if there is a road between them; the weight of the directed edge (u; v) is the time it takes you to get from u to v. The number of vertices is n and you may assume that the number of edges is also O(n). You want to meet as soon as possible. How would you select a meeting location from one of your k favourite hang-out spot known to all of you? Which algorithm would you use and how is this done most efficiently. The more efficient the solution, the better the mark. State the complexities in terms of m; k, and n, you can make case distincations between m and k. Sometimes an algorithm can be stopped while it is still running to make it a bit faster. Descibe precisely here when and how you could terminate your algorithm.

### Answer

Let $M = \{m_1, m_2, \ldots, m_{m}\}$ be the set of cities, where $m_i$ is the city of the $i$-th person.
Let $K = \{k_1, k_2, \ldots, k_{k}\}$  be the set of cities, where $k_i$ is the city of the $i$-th hangout spot.

We will also modify the Dijkstra's algorithm to terminate early when all nodes of interest during an exploration has been reached (it is uncessary to continue traversing the graph at this point).

```plaintext
function DijkstraTerminateEarly(Graph, source, Graph.NodesOfInterest):
    for each vertex v in Graph.Vertices:
        dist[v] ← INFINITY
        prev[v] ← UNDEFINED
        add v to Q
   
    for each node n in Graph.NodesOfInterest:
        visited[n] ← False
    
    dist[source] ← 0
    visited[source] ← True

    while Q is not empty:
        u ← vertex in Q with minimum dist[u]
        remove u from Q
        visited[u] ← True

        /*
            TERMINATE EARLY
            To further optimize this check, we can use a bitwise OR operation to check that visited[n] for all n in Graph.NodesOfInterest is True.
        */
        if all visited[n] for n in Graph.NodesOfInterest is True:
            break
       
        for each neighbor v of u still in Q:
            alt ← dist[u] + Graph.Edges(u, v)
            if alt < dist[v]:
                dist[v] ← alt
                prev[v] ← u

    return dist[], prev[]
```

Case 1: $|K| \geq |M|$

In this case, there are more hangout spots than there are friends. To optimize, we would compute the shortest path only as many times as there are **friends**.

```plaintext
for each city 'm' in M:
    dist[], prev[] ← DijkstraTerminateEarly(Graph, m, K)
    m.dist[] ← dist[]

highest_min_dist ← INFINITY // We want to find a k that minimizes this. For example, [1, 5] is less preferable than [3, 3], because the meeting has to wait for the slowest person to arrive before starting.
meeting_spot ← UNDEFINED

for each city 'k' in K:
    highest_min_dist_k ← -INFINITY
    
    // Find the highest min_dist among all friends to travel to k
    for each city 'm' in M:
        if m.dist[k] > highest_min_dist_k:
            highest_min_dist_k ← m.dist[k]
    
    // If this k has a lower highest_min_dist than then current meeting spot, update the meeting spot
    if highest_min_dist_k < highest_min_dist:
        highest_min_dist ← highest_min_dist_k
        meeting_spot ← k
```

Case 2: $|K| < |M|$

In this case, there are more friends than there are hangout spots. To optimize, we would compute the shortest path only as many times as there are **hangout spots**.

```plaintext
E ← Graph.Edges

// Flip the direction of each edge
for each edge (u, v) in E:
    E ← (v, u)

for each city 'k' in K:
    dist[], prev[] ← DijkstraTerminateEarly(Graph, k, M)
    for city 'm' in dist:
        if m in M:
            m.dist[k] ← dist[m]

// This point onwards is the same as the previous case
highest_min_dist ← INFINITY
meeting_spot ← UNDEFINED

for each city 'k' in K:
    highest_min_dist_k ← -INFINITY
    for each city 'm' in M:
        if m.dist[k] > highest_min_dist_k:
            highest_min_dist_k ← m.dist[k]
    if highest_min_dist_k < highest_min_dist:
        highest_min_dist ← highest_min_dist_k
        meeting_spot ← k
```

Remember that in the previous assignment, we have proved that the shortest distance from point A to point B is the same as the shortest distance from point B to point A. Therefore, we can **flip the direction of the edges** to optimize the algorithm, while still preserving the correctness of the algorithm.

The reason we are doing this is because this time, we are ^^starting Dijkstra's algorithm from the hangout spots^^ (instead of from each $m$), and we want to find the shortest path from the hangout spots to the friends. Without flipping the edges, the algorithm would be incorrect: Just because we can reach $m_i$ from $k_j$ does not mean we can reach $k_j$ from $m_i$.


==TODO STILLLLL==

RUNTIME COMPLEXITY ANALYSIS
Fibonacci Heaps
Do not iterate through disconnected nodes


## Question 2

Find an optimal parameterization of a matrix-chain product whose sequence of dimensions is (3, 10, 2, 120, 5, 100, 4). Show the two solution matrices. How many different ways are there to evaluate this(!) matrix-chain product (i.e., different bracketings)?

### Answer {#q2-ans}

The dimensions of the source matrices are given as follows:

1. $A_1$: $3 \times 10$
2. $A_2$: $10 \times 2$
3. $A_3$: $2 \times 120$
4. $A_4$: $120 \times 5$
5. $A_5$: $5 \times 100$
6. $A_6$: $100 \times 4$

The number of different ways to evaluate a matrix-chain product is given by the **Catalan number**, with $n$ being the number of matrices, and $C_{n-1}$ being the number of possible parenthesizations. We will take this for granted because this has been ^^proven in lectures^^. The Catalan number is given by the formula:

$$
C_n = \frac{1}{n+1} \binom{2n}{n}
$$

where $n$ is the number of matrices in the chain. In this case, $n = 6$, so the number of ways to evaluate the matrix-chain product is:

$$
C_5 = \frac{1}{6} \binom{10}{5} = 42
$$

![alt text](image-2.png)

Next, we will compute the $m$ and $s$, tables for the matrix-chain product. $m$ represents the minimum number of scalar multiplications needed to compute the matrix product, and $s$ represents the index at which the split should be made to achieve the minimum number of scalar multiplications *(as seen in the pseudocode above)*.

For this, I have computed **by-hand** the $m$ and $s$ tables by following the algorithm in the textbook. As well, I have created some visualization tools using a Javascript graphics library ([$m$ table generator](https://editor.p5js.org/voidranjer/sketches/GMzhsXoEE), and [$s$ table generator](https://editor.p5js.org/voidranjer/sketches/uEHpbUJhz)) that can be used to verify and generate these table diagrams, as shown below. The source code that I wrote for these tools can be provided upon request.

![alt text](image.png)
![alt text](image-1.png)

Then, by following the $s$ table, we can generate the optimal parenthesization of the matrix-chain product. The optimal parenthesization is as follows:

$$
\begin{align*}
(A_1 A_2 A_3 A_4 A_5 A_6) \\
(A_1 A_2) (A_3 A_4 A_5 A_6) \\
(A_1 A_2) ((A_3 A_4 A_5) A_6) \\
(A_1 A_2) (((A_3 A_4) A_5) A_6)
\end{align*}
$$

**Therefore, the optimal parenthesization of the matrix-chain product is $(A_1 A_2)(((A_3 A_4) A_5)A_6)$. This is done at the minimum cost of 3084 scalar multiplications, which is the best of all 42 possible parenthesizations.**

## Question 3

![q3](q3.png)

### Answer {#q3-ans}

- Show the feasible region by plotting the constraints on the ($x_1$, $x_2$)-Cartesian coordinate system.

![feasibility](feasibility.png)
![desmos](desmos.png)

---

- Using your feasible region, find the optimal solution for this linear program. Is this the only solution? If yes, then explain why. If no, then state how many optimal solutions are there and justify your answer.

**Vertices:** *in the format ($x_1$, $x_2$)*

- (0, 5)
- (2, 5)
- (8, 2)
- (10, 0)
- (0, 0)

**Objective Function:** $3x_1+5x_2$ (minimize)

**Try each vertex:**

- (0, 5): $3(0) + 5(5) = 25$
- (2, 5): $3(2) + 5(5) = 31$
- (8, 2): $3(8) + 5(2) = 34$
- (10, 0): $3(10) + 5(0) = 30$
- (0, 0): $3(0) + 5(0) = 0$

**Optimal Solution:** (0, 0) with a value of 0.

---

- Enter the LP into an LP solver that you can get from the internet and show us the input and solution pages (via screen captures).

![ad1](ad1.png)
![ad2](ad2.png)
![ad3](ad3.png)


## Useful Resources

- <https://stackoverflow.com/questions/26547816/understanding-time-complexity-calculation-for-dijkstra-algorithm>
- <https://stackoverflow.com/questions/50458834/dijkstra-time-complexity-using-binary-heap>
- <https://math.stackexchange.com/questions/3683910/time-complexity-of-dijkstras-algorithm>
