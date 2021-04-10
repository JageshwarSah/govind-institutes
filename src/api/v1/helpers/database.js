const mongoose = require('mongoose');

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
      const docs = await Model.find({});

      res.status(200).json({
        status: 'success',
        data: docs,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.get_one = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);

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

      res.status(200).json({
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

      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
};
