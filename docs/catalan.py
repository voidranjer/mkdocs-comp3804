import math
 
def findCatalan(n):
  
    # Base case
    if n <= 1:
        return 1

    # catalan(n) is sum of catalan(i) * catalan(n-i-1)
    res = 0
    for i in range(n):
        res += findCatalan(i) * findCatalan(n - i - 1)

    return res


num_matrices = 6
n = num_matrices - 1

print(findCatalan(n))

print(4**n / (n*(3/2) * math.sqrt(math.pi)))
