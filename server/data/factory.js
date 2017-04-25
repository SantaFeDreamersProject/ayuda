const AWS = require("aws-sdk");
const shortid = require('shortid');

AWS.config.update({
  region: "us-east-2"
});

module.exports = (tableName) => {

  /**
   * Get the params object with the table name
   *
   * @param  {[type]} params [description]
   * @return [type]          [description]
   */
  const _getParams = (params) => {
    return Object.assign({TableName: tableName}, params)
  }

  /**
   * Get the params for a unique keyParams
   *
   * @param  {[type]} id [description]
   * @return [type]      [description]
   */
  const _getKeyParams = (id) => {

    const Key = {};
    Key[`${tableName}Id`] = id
    return _getParams({Key})

  }

  const _getClient = () => new AWS.DynamoDB.DocumentClient()

  /**
   * Promisify an AWS call..
   * @param  {[type]} method [description]
   * @param  {[type]} params [description]
   * @return [type]          [description]
   */
  const _promisify = (method, params) => {

    const client = _getClient()

    return new Promise((ful, rej) => {
      client[method](params, function(err, data) {
        if (err) return rej(err)
        ful(data);
      });
    })

  }

  /**
   * CRUD helpers
   * @param  {[type]} params [description]
   * @return [type]          [description]
   */
  const _remove = (params) => _promisify("delete", params),
        _put = (params) => _promisify("put", params),
        _get = (params) => _promisify("get", params),
        _scan = () => _promisify("scan", _getParams({}));

  /**
   * CRUD external API
   * @type {[type]}
   */
  return {

    /**
     * Create a document
     * @param  {[type]} doc [description]
     * @return [type]       [description]
     */
    create: function(doc) {

      const Item = doc
      Item[`${tableName}Id`] = shortid.generate()
      return _put(_getParams({Item}))
        .then(() => Item);

    },

    /**
     * Remove a document
     * @param  {[type]} id [description]
     * @return [type]      [description]
     */
    remove: function(id) {

      return _remove(_getKeyParams(id));

    },

    /**
     * Get a single document
     *
     * @param  {[type]} id [description]
     * @return [type]      [description]
     */
    get: function(id) {

      return _get(_getKeyParams(id))
        .then(res => res.Item);

    },

    /**
     * Get all the things!
     *
     * @return [type] [description]
     */
    getAll: function() {

      let params = _getParams({})

      return new Promise((ful, rej) => {

        const client = _getClient()

        let items = []

        const _onScan = (err, data) => {

          if (err) return rej(err)

          items = items.concat(data.Items);
          if (typeof data.LastEvaluatedKey != "undefined") {
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              client.scan(params, _onScan);
          } else {
            ful(items)
          }

        }

        client.scan(params, _onScan)

      })

    }

  }

}
