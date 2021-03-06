- A为 `m * p` 的矩阵，B为 `p * n` 的矩阵，那么称 `m * n` 的矩阵C为矩阵A与B的乘积，记作`C = A * B`
- 逆矩阵

## 应用

- 让每个点围绕X轴进行翻转
```js
  M = [
    [1, 0],
    [0, -1]
  ]
```

- 让每个点围绕Y轴进行翻转
```js
  M = [
    [-1, 0],
    [0, 1]
  ]
```

- 让每个点围绕原点进行翻转
```js
  M = [
    [-1, 0],
    [0, -1]
  ]
```

- 沿X轴方向错切
```js
  M = [
    [1, a],
    [0, 1]
  ]
```

- 沿Y轴方向错切
```js
  M = [
    [1, 0],
    [a, 1]
  ]
```

- 原点旋转
```js
  M = [
    Math.cos(θ) + Math.sin(θ),
    -Math.sin(θ) + Math.cos(θ)
  ]
```

- 平移
  - 仿射变换，是指在几何中，一个向量空间进行一次线性变换并接上一个平移，变换为另一个向量空间


## 矩阵

### 单位矩阵

### 方阵

- 单位矩阵
  - 从左上角到右下角的对角线（称为主对角线）上的元素均为1，除此以外全都为0

```
1 0 0
0 1 0
0 0 1
```

- 逆矩阵：
  - AB = BA = I（单位矩阵），B是A的逆矩阵
  - 如果一个方阵A有右逆B，则B也是A的左逆，即B是A的逆

### 线性方程组
- 增广矩阵，高斯-约旦消元法，求解线性方程组
- 齐次线性方程组：常数项全部为零的线性方程组
- 非齐次线性方程组：常数项任意一项不为零的线性方程组
