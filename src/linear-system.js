// import Matrix from './matrix'
import Vector from './vector'
import mix from './libs/clazz'
import {isZero} from './libs/util'

export default class LinearSystem extends mix(Array) {
  constructor(matrix, vector) {
    super()
    if (matrix.rlen !== vector.length) {
      throw new Error('矩阵matrix的行数必须等于向量vector的长度')
    }
    // if (matrix.rlen !== matrix.clen) {
    //   throw new Error('矩阵必须是个方阵')
    // }
    this.matrix = matrix
    this.vector = vector
    // 矩阵行数
    this.row = matrix.rlen
    // 矩阵列数
    this.col = matrix.clen

    // 线性系统的增广矩阵
    this.Ab = matrix.map((m, i) => {
      m.push(vector[i])
      return new Vector(m)
    })
    // 存储主元所在列的索引
    this.pivots = []
  }

  // 高斯-约旦消元法
  gaussJordanElimination() {
    this.forward()
    this.backward()
    // 有解true(唯一解或无数解), 无解false
    for (let i = this.pivots.length; i < this.row; i++) {
      // 如果增广矩阵的第i行的最后一列不等于0，无解
      if (!isZero(this.Ab[i].slice(-1))) {
        return false
      }
    }
    return true
  }

  forward() {
    let i = 0, // 行索引
      j = 0 // 列索引
    while (i < this.row && j < this.col) {
      // this.Ab[i][j] 为主元
      const maxRow = this.maxRow(i, j, this.row)
      // 交换主元最大的行
      ;[this.Ab[i], this.Ab[maxRow]] = [this.Ab[maxRow], this.Ab[i]]
      // this.Ab[i][j] === 0
      if (isZero(this.Ab[i][j])) {
        j++
      } else {
        // 主元归1
        this.Ab[i] = this.Ab[i].multiple(1 / this.Ab[i][j])
        for (let k = i + 1; k < this.row; k++) {
          // 将其他行的主元所在列的元素归0
          // 此时this.Ab[i][k] = 1
          // 第k行 - 第i行 * 第k行的主元
          this.Ab[k] = this.Ab[k].subtract(this.Ab[i].multiple(this.Ab[k][j]))
        }
        this.pivots.push(i)
        i++
      }
    }
    // for (let i = 0, len = this.Ab.length; i < len; i++) {
    //   // this.Ab[i][i] 为主元
    //   const maxRow = this.maxRow(i, len)
    //   // 交换主元最大的行
    //   ;[this.Ab[i], this.Ab[maxRow]] = [this.Ab[maxRow], this.Ab[i]]
    //   // 主元归1
    //   // this.Ab[i][i] === 0 todo
    //   this.Ab[i] = this.Ab[i].multiple(1 / this.Ab[i][i])
    //   for (let j = i + 1; j < len; j++) {
    //     // 将其他行的主元所在列的元素归0
    //     // 此时this.Ab[i][i] = 1
    //     // 第j行 - 第i行 * 第j行的主元
    //     this.Ab[j] = this.Ab[j].subtract(this.Ab[i].multiple(this.Ab[j][i]))
    //   }
    // }
  }

  backward() {
    // 倒着循环 使上面的所有主元等于0
    const n = this.pivots.length
    for (let i = n - 1; i >= 0; i--) {
      const k = this.pivots[i]
      // this.Ab[i][k] 为主元
      for (let j = i - 1; j >= 0; j--) {
        this.Ab[j] = this.Ab[j].subtract(this.Ab[i].multiple(this.Ab[j][k]))
      }
    }
  }

  // 取主元最大行，减少误差
  maxRow(i, j, n) {
    let [res, best] = [i, this.Ab[i][j]]
    for (let k = i + 1; k < n; k++) {
      if (this.Ab[k][j] > best) {
        ;[res, best] = [k, this.Ab[k][j]]
      }
    }
    return res
  }

  // 打印出行最简形式
  print() {
    let str = ''
    for (let i = 0; i < this.Ab.length; i++) {
      const front = this.Ab[i].slice(0, -1).join(' '),
        result = this.Ab[i].slice(-1)
      str += `${front} | ${result} \n`
    }
    console.log(str)
    return str
  }
}
