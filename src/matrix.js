import Vector from './vector'
import {isNum} from './libs/util'
import {matrixKey, vectorKey} from './constants'
// import {sum} from './libs/math'
import mix from './libs/clazz'

// 矩阵代表一组向量
export default class Matrix extends mix(Array) {
  constructor(list2d) {
    super(list2d)
    this[matrixKey] = []
    this.type = 'Matrix'
    this.isMatrix = true
    this.init(list2d)
  }

  init(list2d) {
    let len = 0
    list2d.forEach((list, index) => {
      this[matrixKey][index] = []
      if (index === 0) {
        len = list.length
      } else if (len !== list.length) {
        throw new Error('矩阵每行的元素个数必须相等')
      }
      if (!Array.isArray(list)) {
        throw new Error('矩阵必须由数组组成')
      }
      list.forEach(item => {
        if (!isNum(item)) {
          throw new Error('组成向量的元素必须是数字类型')
        }
        this[matrixKey][index].push(item)
      })
    })
    Object.assign(this, this[matrixKey])
    this.length = this.rlen
  }

  // 矩阵的行数
  get rlen() {
    // console.log(this[matrixKey].length)
    return this[matrixKey].length
  }

  // 矩阵的列数
  get clen() {
    return this[matrixKey][0].length
  }

  // 矩阵元素个数
  get size() {
    return this.rlen * this.clen
  }

  get shape() {
    return [this.rlen, this.clen]
  }

  // 获取装置矩阵
  get T() {
    return this.transpose()
  }

  getItem(pos) {
    const [r, c] = pos
    return this[matrixKey][r][c]
  }

  // 取矩阵中第index行组成的向量
  rvector(index) {
    return new Vector(this[matrixKey][index])
  }

  // 取矩阵中第index列组成的向量
  cvector(index) {
    return new Vector(this[matrixKey].map(row => row[index]))
  }

  valid(m1, m2) {
    if (m1.type !== 'Matrix' || m2.type !== 'Matrix') {
      throw new Error('不是矩阵不能运算')
    }
    if (m1.size.toString() !== m2.size.toString()) {
      throw new Error('矩阵的形状必须相同')
    }
    return true
  }

  add(matrix) {
    this.valid(matrix, this)
    const list = this[matrixKey].map((row, i) => {
      return row.map((v, j) => {
        return v + matrix[matrixKey][i][j]
      })
    })
    return new Matrix(list)
  }

  subtract(matrix) {
    this.valid(matrix, this)
    const list = this[matrixKey].map((row, i) => {
      return row.map((v, j) => {
        return v - matrix[matrixKey][i][j]
      })
    })
    return new Matrix(list)
  }

  scalar(matrix) {
    const boolean = isNum(matrix)
    !boolean && this.valid(matrix, this)
    const list = this[matrixKey].map((row, i) => {
      return row.map((v, j) => {
        return boolean ? v * matrix : v * matrix[matrixKey][i][j]
      })
    })
    return new Matrix(list)
  }

  // 矩阵A * 矩阵B（或向量B）
  // 设A为 `m * p` 的矩阵，B为 `p * n` 的矩阵，那么称 `m * n` 的矩阵C为矩阵A与B的乘积，记作`C = A * B`
  dot(anthor) {
    // A的列数必须与B的行数相同
    if (this.clen !== anthor.length) {
      throw new Error('第一个矩阵的列数必须与第二个矩阵的行数相等')
    }
    // 矩阵与向量相乘
    if (anthor instanceof Vector) {
      return new Vector(this[matrixKey].map(row => new Vector(row).dot(anthor)))
    } else if (anthor instanceof Matrix) {
      // 矩阵与矩阵相乘
      return anthor.transpose()[matrixKey].map(col => {
        return this.dot(new Vector(col))[vectorKey]
      })
    }
  }

  // 将矩阵转置，每一列转成行
  transpose() {
    const list = []
    this[matrixKey].forEach(row => {
      row.forEach((c, j) => {
        if (!list[j]) {
          list[j] = []
        }
        list[j].push(c)
      })
    })
    return new Matrix(list)
  }

  positive() {
    return this.multiple(1)
  }

  negative() {
    return this.multiple(-1)
  }

  // 单位矩阵，在矩阵的乘法中，有一种矩阵起着特殊的作用，如同数的乘法中的1，这种矩阵被称为单位矩阵。它是个方阵，从左上角到右下角的对角线（称为主对角线）上的元素均为1。除此以外全都为0。
  static identity(n) {
    // 返回一个n行n列的单位矩阵
    const list = Array.from({length: n}, _ => Array.from({length: n}).fill(0)).map((row, i) => {
      row[i] = 1
      return row
    })
    return new Matrix(list)
  }

  // 创建0矩阵
  static zero(row = 2, col = 2) {
    return new Matrix(new Array(row).fill(new Array(col).fill(0)))
  }
}
