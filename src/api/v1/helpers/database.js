const mongoose = require('mongoose');

const API_features = require('./../helpers/api_features');
const Error = require('./error_handler');

//* Database connection method
exports.connect = async (db_string) => {
  const db = await mongoose.connect(db_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  return db;
};

exports.get_all = (Model) => {
  return async (req, res, next) => {
    try {
      const features = new API_features(Model.find(), req.query)
        .filter()
        .sort()
        .limit_fields()
        .paginate();

      const docs = await features.query;
      res.status(200).json({
        status: 'success',
        results: docs.length,
        data: docs,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.get_one = (Model, pop_options) => {
  return async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);
      if (pop_options) query = query.populate(pop_options);

      const doc = await query;

      if (!doc) return next(new Error('No document found with that ID'));
      res.status(200).json({
        status: 'success',
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.create_one = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.update_one = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json({
        status: 'success',
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.delete_one = (Model) => {
  return async (req, res, next) => {
    try {
      await Model.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
};
