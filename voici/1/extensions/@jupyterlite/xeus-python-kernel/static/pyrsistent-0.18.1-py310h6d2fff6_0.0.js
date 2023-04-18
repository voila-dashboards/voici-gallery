
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
      var PACKAGE_NAME = 'pyrsistent-0.18.1-py310h6d2fff6_0.0.data';
      var REMOTE_PACKAGE_BASE = 'pyrsistent-0.18.1-py310h6d2fff6_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pyrsistent-0.18.1.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pyrsistent", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":88042,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1455,2780,4125,5540,6839,8377,9781,11146,11564,11589,12279,13499,14830,16100,17067,18289,19278,20373,21484,22531,23710,24959,26177,27350,28183,29318,30527,31888,33184,34487,35464,36293,37598,38864,40104,41258,42351,43519,44654,45550,46412,47365,48479,49711,50861,52116,53429,54876,56029,57099,58088,59206,60182,61480,62795,64155,65322,66314,67548,68536,69898,71195,72263,73107,74087,75211,76358,77751,78951,80215,81295,82527,84104,85375,86520,87747],"sizes":[1455,1325,1345,1415,1299,1538,1404,1365,418,25,690,1220,1331,1270,967,1222,989,1095,1111,1047,1179,1249,1218,1173,833,1135,1209,1361,1296,1303,977,829,1305,1266,1240,1154,1093,1168,1135,896,862,953,1114,1232,1150,1255,1313,1447,1153,1070,989,1118,976,1298,1315,1360,1167,992,1234,988,1362,1297,1068,844,980,1124,1147,1393,1200,1264,1080,1232,1577,1271,1145,1227,295],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyrsistent-0.18.1-py310h6d2fff6_0.0.data');
      };
      Module['addRunDependency']('datafile_pyrsistent-0.18.1-py310h6d2fff6_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/pyrsistent-0.18.1-py310h6d2fff6_0.json", "start": 0, "end": 90}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/_pyrsistent_version.py", "start": 90, "end": 113}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pvectorc.cpython-310-wasm32-emscripten.so", "start": 113, "end": 21508}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent-0.18.1.dist-info/direct_url.json", "start": 21508, "end": 21624}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/__init__.py", "start": 21624, "end": 23103}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_checked_types.py", "start": 23103, "end": 41475}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_field_common.py", "start": 41475, "end": 53438}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_helpers.py", "start": 53438, "end": 56670}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_immutable.py", "start": 56670, "end": 60204}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pbag.py", "start": 60204, "end": 66934}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pclass.py", "start": 66934, "end": 76636}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pdeque.py", "start": 76636, "end": 88839}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_plist.py", "start": 88839, "end": 97132}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pmap.py", "start": 97132, "end": 111834}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_precord.py", "start": 111834, "end": 118866}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pset.py", "start": 118866, "end": 124559}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_pvector.py", "start": 124559, "end": 147253}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_toolz.py", "start": 147253, "end": 150681}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/_transformations.py", "start": 150681, "end": 154481}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyrsistent/typing.py", "start": 154481, "end": 156248}]});
  })();
