// @babel/plugin-transform-classes
// babel编译class继承Array的问题

// function mixin(Super) {
//   return class extends Super {}
// }
// const ExtensibleArray = class extends Array {}

// export default mixin(Array)
// export default mixin(ExtensibleArray)

function mix(...mixins) {
  class Mix {
    constructor() {
      for (let Mixin of mixins) {
        copyProperties(this, new Mixin()) // 拷贝实例属性
      }
    }
  }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin) // 拷贝静态属性]
    copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
  }

  return Mix
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}
// class DistributedEdit extends mix(Loggable, Serializable) {
//   // ...
// }
export default mix
