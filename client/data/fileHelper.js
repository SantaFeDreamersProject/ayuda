var _ = require('underscore');

export default {

  upload: function (path, file, fileFormFieldName) {

    let keyVals = {};

    keyVals[fileFormFieldName || 'file'] = file;

    return this.uploadForm(path, keyVals);

  },

  uploadForm: function (path, keyVals) {

    return new Promise(function (ful, rej) {

      var formData = new FormData();

      _.each(keyVals, function (val, key) {
        formData.append(key, val);
      });

      var xhr = new XMLHttpRequest();

      //NOTE: keeping this around in case we add progress indicators later..
      //xhr.upload.onprogress = function (e) {
      //  console.log(e.loaded + '    ' + e.total);
      //};

      xhr.open('post', path, true);

      xhr.onerror = function(e) {
        return rej({error: e, path, fields: keyVals});
      };


      xhr.onload = function() {
        if (xhr.status == 200) {
          ful(JSON.parse(xhr.responseText));
        } else {
          var rejectionMessage = xhr.status;
          try {

            if (xhr.responseText) rejectionMessage = JSON.parse(xhr.responseText);

          } catch(e) {}
          rej({error: rejectionMessage, path, fields: keyVals});
        }
      };
      
      xhr.send(formData);

    });

  }

};
