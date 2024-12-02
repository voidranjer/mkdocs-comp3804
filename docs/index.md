# COMP 3804: Assignment 4

## Submission Details

{{ read_csv('details.csv') }}

## Question 1

You and m − 1 of your friends live all in different cities (m > 1). Each of you has a car and can start driving right now (after determining the meeting location). You drive on a road network, i.e, you have cities as vertices and two cities are connected via a directed edge if there is a road between them; the weight of the directed edge (u; v) is the time it takes you to get from u to v. The number of vertices is n and you may assume that the number of edges is also O(n). You want to meet as soon as possible. How would you select a meeting location from one of your k favourite hang-out spot known to all of you? Which algorithm would you use and how is this done most efficiently. The more efficient the solution, the better the mark. State the complexities in terms of m; k, and n, you can make case distincations between m and k. Sometimes an algorithm can be stopped while it is still running to make it a bit faster. Descibe precisely here when and how you could terminate your algorithm.

### Answer

Let $ M = \{m_1, m_2, \ldots, m_{m}\} $ be the set of cities, where $ m_i $ is the city of the $ i $-th person.
Let $ K = \{k_1, k_2, \ldots, k_{k}\} $ be the set of cities, where $ k_i $ is the city of the $ i $-th hangout spot.

Case 1: $|K| \geq |M|$

In this case, there are more hangout spots than there are friends. To optimize, we would compute the shortest path only as many times as there are **friends**.

```plaintext
```

Case 2: $|K| < |M|$

In this case, there are more friends than there are hangout spots. To optimize, we would compute the shortest path only as many times as there are **hangout spots**.

```plaintext
```

Terminate when all k has been touched by a person's Dikstra during each iteration.
Or terminatew when all persons have been touched, during a hangout spot's iteration.
