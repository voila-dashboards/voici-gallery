
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
      var PACKAGE_NAME = 'python-fastjsonschema-2.16.2-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'python-fastjsonschema-2.16.2-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "fastjsonschema-2.16.2.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "fastjsonschema", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":36969,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1483,2846,4113,5347,6709,7258,8157,9188,10061,11128,12219,13033,13861,14989,15855,16592,17498,18447,19543,20779,21693,22562,23658,24616,25521,26850,27912,28997,30078,31289,32296,33437,34798,36044],"sizes":[1483,1363,1267,1234,1362,549,899,1031,873,1067,1091,814,828,1128,866,737,906,949,1096,1236,914,869,1096,958,905,1329,1062,1085,1081,1211,1007,1141,1361,1246,925],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_python-fastjsonschema-2.16.2-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_python-fastjsonschema-2.16.2-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/python-fastjsonschema-2.16.2-pyhd8ed1ab_0.json", "start": 0, "end": 98}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema-2.16.2.dist-info/direct_url.json", "start": 98, "end": 220}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/__init__.py", "start": 220, "end": 8989}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/__main__.py", "start": 8989, "end": 9301}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/draft04.py", "start": 9301, "end": 38866}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/draft06.py", "start": 38866, "end": 46527}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/draft07.py", "start": 46527, "end": 50749}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/exceptions.py", "start": 50749, "end": 52361}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/generator.py", "start": 52361, "end": 64937}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/indent.py", "start": 64937, "end": 65857}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/ref_resolver.py", "start": 65857, "end": 71384}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/fastjsonschema/version.py", "start": 71384, "end": 71403}]});
  })();
