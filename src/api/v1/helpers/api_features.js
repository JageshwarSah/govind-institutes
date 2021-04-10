module.exports = class API_features {
  constructor(query, query_string) {
    this.query = query;
    this.query_string = query_string;
  }

  //TODO Implement Filtering ?name[eq]="someone" -> convert to ?name[$eq]="someone"
  filter() {
    const query_object = { ...this.query_string };
    const excluded_fields = ['page', 'limit', 'sort', 'fields'];
    excluded_fields.forEach((element) => {
      delete query_object[element];
    });

    let query_str = JSON.stringify(query_object);

    // Prefix operator with $ and convert to Object
    query_str = query_str.replace(
      /\b(lte|gte|gt|lt|eq|cmp)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(query_str));

    return this;
  }

  //TODO Implement Sorting ?sort="firstfield,secondfield" -> convert to ?sort="firstfield secondfield"
  sort() {
    if (this.query_string.sort) {
      const sort_by = this.query_string.split(',').join(' ');
      this.query = this.query.sort(sort_by);
    } else {
      // default sort by
      this.query = this.query.sort('name');
    }
    return this;
  }

  //TODO Implement Fields Limiting ?fields="name,email,mentor" -> convert to ?fields="name email mentor"
  limit_fields() {
    if (this.query_string.fields) {
      const fields = this.query_string.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  //TODO Implement Paginatination ?page=1&limit=10 //eg 1- 10, 11-20, 21-30 ...
  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
};
