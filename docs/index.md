# COMP 3804: Assignment 3

## Submission Details

{{ read_csv('details.csv') }}

## Question 1

We are given a directed graph $G =(V,E)$ with $|V|$  = $n$ vertices.  Let $goal$ be a vertex  of $G$.  We want to compute a shortest path   from each of  $k$ vertices of $G$ to $goal$, where $k<n$.

- We could solve the problem by applying Dijkstra's algorithm $k$ times, ones for each of the $k$ starting vertices. What is the time  complexity (stated in terms of $n$ and $k$)? 

---

**^^==Answer==^^:** Dijkstra's time complexity is $O((|E|+|V|) \times \log |V|)$ using **standard heaps**, where $E$ is the set of all edges in the graph, and $V$ is the set of all vertices. Since we are running Dijkstra's algorithm $k$ times, the time complexity of the solution is $O(k \times (|E|+|V|) \times \log |V|)$.

---

- Alternately, we could  start at  the vertex $goal$ and  somehow go backwards to all $k$ vertices. Describe how this would work, i.e., how would we modify Dijkstra's algorithm and/or its input to achieve this?  Then, state the time complexity of this solution to our original problem. (Do not forget to argue why the algorithm, as modified, is correct!)

---

**^^==Answer:==^^** The output of Dijkstra's algorithm is the shortest path from a source vertex to **all other vertices** in a graph. The keyword here is **"all"**. If we do this, then we are effectively computing the ^^shortest path from **each** vertex $k$ to **every other vertex** in the graph.^^

However, we only care about the shortest path between each vertex $k$ to the $goal$ vertex. This is wasteful as we are doing a ton of unecessary computations *(we do not need to know the shortest path to every other node, just the $goal$ node)*.

**The solution:** Instead, we can modify Dijkstra's algorithm to start at the $goal$ vertex and work backwards to all $k$ vertices. We can do this by **reversing the direction** of the edges in the graph. This way, we can compute the shortest path from the $goal$ vertex to all $k$ vertices. We'll just have to remember to reverse the path at the end to get the original path directions.

This way, instead of computing $k$ number of shortest path graphs, we are only computing **exactly 1** shortest path graph. The time complexity of this solution is $O((|E|+|V|) \times \log |V|)$, which is the same as Dijkstra's algorithm.

**Correctness:** The correctness of this algorithm is guaranteed by the fact that the shortest path from a source vertex to a destination vertex is the same as the shortest path from the destination vertex to the source vertex when the direction of the edges is reversed.

---

## Question 2

Let $G =(V,E)$  be a graph with vertex set,  $V$, and edge set $E$.  We would like to apply Topological Sort on $G$. One problem is that we do not know if $G$ is a DAG or not. What will happen if we apply the algorithm for  Topological Sorting on $G$ if $G$ is not a DAG?

---

**^^==Answer:==^^** We state that we expect the Topological Sort algorithm will fail. The theory is that a graph that isn't a DAG (a graph with a cycle, for example) will produce an infinite loop because there are subgraphs that are cyclic, producing no vertices with in-degree of 0 during the execution of the algorithm. We will now provide a concrete example.

![alt text](image.png)

Consider such a graph as the one in the diagram above. Note that a cycle exists between ${A, B, C}$.

![alt text](image-1.png)

According to the Topological Sorting algorithm, we are to start each iteration from a vertex with in-degree of 0. In this case, we can start from vertex $A$ because it has in-degree 0. We will then remove the edge between $A$ and $B$. Then, we update all the in-degrees to their new values.

**Issue arises:** See that we have decremented the in-degree of $B$ from 2 to 1. However, this is insufficient because none of the vertices have in-degree of 0. We are now unable to continue with topological sort.

---

## Question 3

Suppose we consider lattice paths from $(0,0)$ to $(n,n)$ on an  $n$  by  $n$ grid. The paths must, at every step,  either go up or  right. We call lattice path, $k$-Lpaths, if  they have precisely $2k$ path segments on one side of the diagonal  and the remaining $2(n-k)$ segments on the other.  Argue precisely why the number of $k$-Lpaths is equal to the number of $(n-k)$-Lpaths. 

---

**^^==Answer==^^:**

First, notice the bijection between the graph on the left and the graph on the right.

![alt text](image-2.png)

Given that these are Cartesian grids with the top right corner being $(n,n)$ and the bottom left corner being $(0,0)$:

For every graph that adheres to the $k$-Lpaths, we can reflect it along the diagonal to get a graph that adheres to the $(n-k)$-Lpaths. This is because the reflection of a path that goes up will go right, and vice versa. This is a bijection because the reflection is reversible. We can define such a matrix to be the reflection matrix.

\[
\mathbf{A} = 
\begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
\]

Then, for every vector that represents each path item, we can multiply it by the reflection matrix to get the reflected path. 

1. **Transforming \((0, 1)\) to \((1, 0)\)**:

\[
\begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
\cdot
\begin{bmatrix}
0 \\
1
\end{bmatrix}
=
\begin{bmatrix}
(0 \times 0) + (1 \times 1) \\
(1 \times 0) + (0 \times 1)
\end{bmatrix}
=
\begin{bmatrix}
1 \\
0
\end{bmatrix}
\]

2. **Transforming \((1, 0)\) to \((0, 1)\)**:

\[
\begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
\cdot
\begin{bmatrix}
1 \\
0
\end{bmatrix}
=
\begin{bmatrix}
(0 \times 1) + (1 \times 0) \\
(1 \times 1) + (0 \times 0)
\end{bmatrix}
=
\begin{bmatrix}
0 \\
1
\end{bmatrix}
\]

**In conclusion:** For any arrangement of $k$-Lpaths, we can reflect it along the diagonal to get an $(n-k)$-Lpaths arrangement. This is a bijection because the reflection is reversible. Therefore, the number of $k$-Lpaths is equal to the number of $(n-k)$-Lpaths.

---

## Question 4

- Run DFS, from A, on the graph and classify each edge as being either: Tree edge, Forward edge, Back edge, or Cross edge. Show and argue: the algorithm execution,   pre(v) and post(v) time intervals and the edge-classification. (An edge type may or may not appear in a particular graph.)

- Find a topological order of the nodes or argue that no such order can exist. How does the DFS help detect that?

- Consider two intervals $[pre(u), post(u)]$ and $[pre(v), post(v)]$ for vertices $u$ and $v$, respectively. Argue precisely in your own words, why the intervals cannot overlap (other than if one is contained in the other).

![alt text](image-3.png)

---

**^^==Answer==^^:**

The diagram below breaks down the execution of DFS with the time intervals annotated in **blue** and **red**.

**Blue** represents the pre-visit time, while **red** represents the post-visit time.

The different types of edges *(tree, forward, back, cross)* are also described in the legend section of the image below.

![alt text](image-6.png)

![alt text](image-7.png)

**Arguments:** I will not provide an exhaustive list of arguments for each edge. However, I will provide an example:

Observe that with edge $A \rightarrow F$, pre($v$) $= 1$, post($v$) $= 14$, pre($u$) $= 12$, post($u$) $= 13$, such that $\text{pre}(v) < \text{pre}(u) < \text{post}(u) < \text{post}(v)$.

---