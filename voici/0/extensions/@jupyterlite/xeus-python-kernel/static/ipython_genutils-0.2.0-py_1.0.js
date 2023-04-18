
  var Module = typeof globalThis.Module !== 'undefined' ? globalThis.Module : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'ipython_genutils-0.2.0-py_1.0.data';
      var REMOTE_PACKAGE_BASE = 'ipython_genutils-0.2.0-py_1.0.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['empackSetStatus']) Module['empackSetStatus']('Downloading',PACKAGE_NAME,loaded,total);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "tmp", true, true);
Module['FS_createPath']("/tmp", "xeus-python-kernel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel", "envs", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs", "voici", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici", "conda-meta", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici", "lib", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib", "python3.10", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10", "site-packages", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "ipython_genutils", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils", "testing", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":34250,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1328,2839,4073,5108,6072,7397,8585,9900,11277,12698,13824,15229,16510,17710,18954,20526,21683,22907,24373,25756,26980,28179,29509,30895,32202,33486],"sizes":[1328,1511,1234,1035,964,1325,1188,1315,1377,1421,1126,1405,1281,1200,1244,1572,1157,1224,1466,1383,1224,1199,1330,1386,1307,1284,764],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_ipython_genutils-0.2.0-py_1.0.data');
      };
      Module['addRunDependency']('datafile_ipython_genutils-0.2.0-py_1.0.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/ipython_genutils-0.2.0-py_1.json", "start": 0, "end": 84}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/__init__.py", "start": 84, "end": 132}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/_version.py", "start": 132, "end": 204}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/encoding.py", "start": 204, "end": 3073}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/importstring.py", "start": 3073, "end": 4108}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/ipstruct.py", "start": 4108, "end": 15366}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/path.py", "start": 15366, "end": 20752}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/py3compat.py", "start": 20752, "end": 31562}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/tempdir.py", "start": 31562, "end": 36491}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/testing/__init__.py", "start": 36491, "end": 36491}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/testing/decorators.py", "start": 36491, "end": 47404}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipython_genutils/text.py", "start": 47404, "end": 54333}]});
  })();
