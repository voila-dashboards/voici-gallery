
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
      var PACKAGE_NAME = 'wheel-0.38.4-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'wheel-0.38.4-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "wheel", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel", "cli", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel", "vendored", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored", "packaging", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":56082,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1351,2683,3858,4950,6220,7349,8541,9855,11026,12075,13118,14525,15819,17154,18388,19698,20878,22202,23634,24387,25252,26290,27385,28383,29540,30796,32035,33279,34305,35257,36730,38069,39171,40531,41884,43393,44639,45999,47128,48261,49351,50274,51328,52829,53940,55106],"sizes":[1351,1332,1175,1092,1270,1129,1192,1314,1171,1049,1043,1407,1294,1335,1234,1310,1180,1324,1432,753,865,1038,1095,998,1157,1256,1239,1244,1026,952,1473,1339,1102,1360,1353,1509,1246,1360,1129,1133,1090,923,1054,1501,1111,1166,976],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_wheel-0.38.4-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_wheel-0.38.4-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/wheel-0.38.4-pyhd8ed1ab_0.json", "start": 0, "end": 82}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/__init__.py", "start": 82, "end": 141}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/__main__.py", "start": 141, "end": 596}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/_setuptools_logging.py", "start": 596, "end": 1342}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/bdist_wheel.py", "start": 1342, "end": 20635}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/cli/__init__.py", "start": 20635, "end": 23019}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/cli/convert.py", "start": 23019, "end": 32446}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/cli/pack.py", "start": 32446, "end": 35829}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/cli/unpack.py", "start": 35829, "end": 36488}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/macosx_libfile.py", "start": 36488, "end": 52633}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/metadata.py", "start": 52633, "end": 56360}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/util.py", "start": 56360, "end": 56981}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored/__init__.py", "start": 56981, "end": 56981}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored/packaging/__init__.py", "start": 56981, "end": 56981}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored/packaging/_manylinux.py", "start": 56981, "end": 68470}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored/packaging/_musllinux.py", "start": 68470, "end": 72844}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/vendored/packaging/tags.py", "start": 72844, "end": 88456}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wheel/wheelfile.py", "start": 88456, "end": 95992}]});
  })();
