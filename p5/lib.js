function matrixChainOrder(p, n) {
  // 1-indexed
  const m = Array.from({ length: n + 1 }, () => new Array(n + 1)); // m[1:n, 1:n]
  const s = Array.from({ length: n }, () => new Array(n + 1)); // s[1:n-1, 2:n]

  for (let i = 1; i <= n; i++) {
    // chain length 1
    m[i][i] = 0;
  }

  for (let l = 2; l <= n; l++) {
    // l is the chain length

    for (let i = 1; i <= n - l + 1; i++) {
      // chain beings at A_i

      const j = i + l - 1; // chain ends at A_j
      m[i][j] = Infinity;

      for (let k = i; k <= j - 1; k++) {
        // try A_{i:k} and A_{k+1:j}

        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

        if (q < m[i][j]) {
          m[i][j] = q; // remember this cost
          s[i][j] = k; // remember this index
        }
      }
    }
  }

  return { m, s };
}
