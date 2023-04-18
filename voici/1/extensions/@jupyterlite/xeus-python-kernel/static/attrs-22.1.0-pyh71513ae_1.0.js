
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
      var PACKAGE_NAME = 'attrs-22.1.0-pyh71513ae_1.0.data';
      var REMOTE_PACKAGE_BASE = 'attrs-22.1.0-pyh71513ae_1.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "attr", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "attrs-22.1.0.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "attrs", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":89546,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1300,2338,3647,4964,6094,7374,8724,9323,10099,11381,12113,13343,14774,16254,17721,18898,20293,21492,22725,24063,25267,26335,27504,28452,29506,30693,31903,33057,34000,34952,35920,37230,38688,40063,41448,42914,44372,45769,46912,47836,49129,50225,51288,52216,53281,54474,55625,56795,57832,58814,59341,59941,61154,62573,63649,64773,65733,66833,68098,69395,70629,72040,73232,74312,75577,76678,77836,78963,80214,81448,82687,83833,85111,86172,87149,87951,89055],"sizes":[1300,1038,1309,1317,1130,1280,1350,599,776,1282,732,1230,1431,1480,1467,1177,1395,1199,1233,1338,1204,1068,1169,948,1054,1187,1210,1154,943,952,968,1310,1458,1375,1385,1466,1458,1397,1143,924,1293,1096,1063,928,1065,1193,1151,1170,1037,982,527,600,1213,1419,1076,1124,960,1100,1265,1297,1234,1411,1192,1080,1265,1101,1158,1127,1251,1234,1239,1146,1278,1061,977,802,1104,491],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_attrs-22.1.0-pyh71513ae_1.0.data');
      };
      Module['addRunDependency']('datafile_attrs-22.1.0-pyh71513ae_1.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/attrs-22.1.0-pyh71513ae_1.json", "start": 0, "end": 82}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/__init__.py", "start": 82, "end": 1684}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_cmp.py", "start": 1684, "end": 5786}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_compat.py", "start": 5786, "end": 11354}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_config.py", "start": 11354, "end": 12180}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_funcs.py", "start": 12180, "end": 26825}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_make.py", "start": 26825, "end": 124394}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_next_gen.py", "start": 124394, "end": 130276}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/_version_info.py", "start": 130276, "end": 132397}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/converters.py", "start": 132397, "end": 136007}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/exceptions.py", "start": 136007, "end": 137922}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/filters.py", "start": 137922, "end": 138960}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/setters.py", "start": 138960, "end": 140360}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attr/validators.py", "start": 140360, "end": 157153}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs-22.1.0.dist-info/direct_url.json", "start": 157153, "end": 157254}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/__init__.py", "start": 157254, "end": 158363}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/converters.py", "start": 158363, "end": 158433}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/exceptions.py", "start": 158433, "end": 158503}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/filters.py", "start": 158503, "end": 158570}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/setters.py", "start": 158570, "end": 158637}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/attrs/validators.py", "start": 158637, "end": 158707}]});
  })();
