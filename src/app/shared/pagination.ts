
export class FilterData {
  map = new Map<string, string>();

  clear() {
    this.map.clear();
  }

  setParam(key: string, value: string) {
    if ((!!key) && (!!value)) {
      this.map.set(key, value);
    }
  }

  getParams(): string {
    let results = '';
    this.map.forEach((key: string, value: string) => {
      results += (results !== '') ? '&' : '';
      results += `${value}=${key}`;
    });
    return results;
  }
}

export class PaginationData {
  page: Number;
  size: Number;
  totalElements: Number;
  rowsPerPage: Number[];
  sortField: String;
  sortOrder: Number;

  constructor() {
    this.page = 0;
    this.totalElements = 0;
    this.size = 5;
    this.rowsPerPage = [5, 10, 20, 50];
    this.sortField = '';
    this.sortOrder = -1;
  }

  setEvent(event) {
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
    this.size = event.rows;
    this.page = event.first / event.rows;
  }

  getParams(): String {
    let r: String = `page=${this.page}&size=${this.size}`;
    if (!!this.sortField) {
      r += `&sort=${this.sortField},${this.sortOrder > 0 ? 'ASC' : 'DESC'}`;
    }
    return r;
  }

}
