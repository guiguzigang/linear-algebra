import {vectorKey} from './constants'
import {isNum, isZero} from './libs/util'
import {sum} from './libs/math'
import mix from './libs/clazz'

// 向量表示一组数
export default class Vector extends mix(Array) {
  constructor(list) {
    super(list)
    this[vectorKey] = []
    this.type = 'Vector'
    this.isVector = 'true'
    this.init(list)
  }

  init(list) {
    list.forEach(item => {
      if (!isNum(item)) {
        throw new Error('组成向量的元素必须是数字类型')
      }
      this[vectorKey].push(item)
    })
    Object.assign(this, this[vectorKey])
    this.length = this[vectorKey].length
  }

  // 获取向量的模 ||v||
  norm() {
    return Math.sqrt(sum(...this[vectorKey].map(v => v ** 2)))
  }

  // 返回向量的单位向量，向量归一化，一个单位长度的向量为单位向量，表示向量的方向
  normalize() {
    const norm = this.norm()
    if (isZero(norm)) return Vector.zero(2)[vectorKey]
    return this.multiple(1 / norm)
  }

  add(v) {
    return Vector.add(this, v)
  }

  subtract(v) {
    return Vector.subtract(this, v)
  }

  multiple(k) {
    return Vector.multiple(this, k)
  }

  // 向量的点乘
  dot(v) {
    return Vector.dot(this, v)
  }

  toString() {
    return `[${this[vectorKey].join(', ')}]`
  }

  print() {
    console.log(`Vector(${this[vectorKey].join(',')})`)
  }

  static valid(v1, v2) {
    if (!v1.isVector || !v2.isVector) {
      throw new Error('不是向量不能进行运算')
    }
    if (v1[vectorKey].length !== v2[vectorKey].length) {
      throw new Error('运算的两个向量的长度必须相等')
    }
    return true
  }

  // 创建几个维度的 0 向量
  static zero(dimension = 1) {
    return new Vector(new Array(dimension).fill(0))
  }

  static add(v1, v2) {
    Vector.valid(v1, v2)
    return new Vector(v1[vectorKey].map((v, i) => v + v2[vectorKey][i]))
  }

  static subtract(v1, v2) {
    Vector.valid(v1, v2)
    return new Vector(v1[vectorKey].map((v, i) => v - v2[vectorKey][i]))
  }

  static dot(v1, v2) {
    return sum(...Vector.multiple(v1, v2)[vectorKey])
  }

  static multiple(v1, v2) {
    if (!isNum(v2)) {
      Vector.valid(v1, v2)
    } else if (!v1.isVector) {
      throw new Error('不是向量不能进行运算')
    }
    return new Vector(v1[vectorKey].map((a, i) => (isNum(v2) ? a * v2 : a * v2[vectorKey][i])))
  }

  static positive(v) {
    return Vector.multiple(v, 1)
  }

  static negative(v) {
    return Vector.multiple(v, -1)
  }
}

/*
两个向量的乘积 向量（u(x1, y1), v(x2, y2)）
两个向量的内积
u * v = x1·x2 + y1·y2 = ||u||·||v||cosβ
可用余弦定理证明 角β的两个邻边||u||(向量的长度|模), ||v|| 对边||u - v||
||u - v||² = ||u||² + ||v||² - 2·||u||·||v||·cosβ
cosβ= u * v / ||u||·||v||
相互垂直的向量的乘积为 0 (坐标轴)
锐角 向量的乘积 u * v > 0
钝角 向量的乘积 u * v < 0

向量的乘积 应用 推荐算法
锐角 相似 u * v结果越大越相似
直角 无关
钝角 背离 u * v结果为负数越小越背离
*/
