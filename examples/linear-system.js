import LinearSystem from '@/linear-system'
import Matrix from '@/matrix'
import Vector from '@/vector'

const A = new Matrix([[1, 2, 4], [3, 7, 2], [2, 3, 3]])
const b = new Vector([7, -11, 1])
const ls = new LinearSystem(A, b)
ls.gaussJordanElimination()
ls.print()

const A2 = new Matrix([[1, -3, 5], [2, -1, -3], [3, 1, 4]])
const b2 = new Vector([-9, 19, -13])
const ls2 = new LinearSystem(A2, b2)
ls2.gaussJordanElimination()
ls2.print()

const A3 = new Matrix([[1, 2, -2], [2, -3, 1], [3, -1, 3]])
const b3 = new Vector([6, -10, -16])
const ls3 = new LinearSystem(A3, b3)
ls3.gaussJordanElimination()
ls3.print()

const A4 = new Matrix([[3, 1, -2], [5, -3, 10], [7, 4, 16]])
const b4 = new Vector([4, 32, 13])
const ls4 = new LinearSystem(A4, b4)
ls4.gaussJordanElimination()
ls4.print()

const A5 = new Matrix([[6, -3, 2], [5, 1, 12], [8, 5, 1]])
const b5 = new Vector([31, 36, 11])
const ls5 = new LinearSystem(A5, b5)
ls5.gaussJordanElimination()
ls5.print()

const A6 = new Matrix([[1, 1, 1], [1, -1, -1], [2, 1, 5]])
const b6 = new Vector([3, -1, 8])
const ls6 = new LinearSystem(A6, b6)
ls6.gaussJordanElimination()
ls6.print()

const A7 = new Matrix([[1, -1, 2, 0, 3], [-1, 1, 0, 2, -5], [1, -1, 4, 2, 4], [-2, 2, -5, -1, -3]])
const b7 = new Vector([1, 5, 13, -1])
const ls7 = new LinearSystem(A7, b7)
console.log(ls7.gaussJordanElimination())
ls7.print()

const A8 = new Matrix([[2, 2], [2, 1], [1, 2]])
const b8 = new Vector([3, 2.5, 7])
const ls8 = new LinearSystem(A8, b8)
if (!ls8.gaussJordanElimination()) {
  console.log('No Solution!')
}
ls8.print()
