const convertToJSON = (doc) => {
    if (!doc || typeof doc.toObject !== 'function') {
      throw new Error('The provided argument is not a valid Mongoose document.');
    }
  
    return doc.toObject({ getters: true, virtuals: true });
  };
  
  module.exports = convertToJSON;
  