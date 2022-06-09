function promisify(client) {
  for (let method in client) {
    client[`${method}Async`] = (parameters) => {
      return new Promise((resolve, reject) => {
        client[method](parameters, (err, response) => {
          if (err) reject(err);
          resolve(response);
        });
      });
    };
  }
}

module.exports = { promisify };
