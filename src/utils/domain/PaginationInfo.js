export class PaginationInfo {
  current = 1 // 第几页
  size = 10 // 每页条数
  pages = 0 // 总页数
  total = 0 // 总数

  constructor(size = 10, current = 1, total = 0) {
    this.size = size
    this.current = current
    this.total = total
  }

  paginationList(list) {
    const start = this.size * (this.current - 1)
    const end = this.size * this.current
    return list.slice(start, end)
  }

  indexMethod() {
    return index => {
      return index + 1 + (this.current - 1) * this.size
    }
  }

  reset() {
    this.current = 1
    this.pages = 0
    this.total = 0
  }
}
