
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
      var PACKAGE_NAME = 'jsonschema-4.17.0-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'jsonschema-4.17.0-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "jsonschema-4.17.0.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "jsonschema", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema", "benchmarks", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/benchmarks", "issue232", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema", "schemas", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":109184,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1208,2563,3594,4482,5467,6070,6930,7924,9043,10058,10884,12040,12947,14062,15335,16361,17675,18845,20023,20942,21691,22682,23696,24444,25497,26405,27258,28131,29249,30050,30673,31344,32010,32649,33165,33677,34209,34720,35200,35748,36260,36875,37404,38010,38550,39138,39644,40069,40552,40955,41464,42050,42455,42969,43468,43915,44377,44813,45368,45962,46341,47229,47886,48450,49080,49690,50232,50812,51326,51860,52432,53005,53586,54230,54873,55461,55974,56503,57062,57580,58131,58630,59253,59623,60071,60548,61829,62724,63989,65183,66314,67297,68408,69583,70784,72251,73734,74990,76044,77145,78107,79018,79806,80530,81149,81916,82548,83314,83920,84699,85410,86256,87114,87891,88704,89775,90857,92058,93266,94326,95260,96444,97540,98345,99118,99895,100690,101594,102730,103894,104939,106184,107547,108803],"sizes":[1208,1355,1031,888,985,603,860,994,1119,1015,826,1156,907,1115,1273,1026,1314,1170,1178,919,749,991,1014,748,1053,908,853,873,1118,801,623,671,666,639,516,512,532,511,480,548,512,615,529,606,540,588,506,425,483,403,509,586,405,514,499,447,462,436,555,594,379,888,657,564,630,610,542,580,514,534,572,573,581,644,643,588,513,529,559,518,551,499,623,370,448,477,1281,895,1265,1194,1131,983,1111,1175,1201,1467,1483,1256,1054,1101,962,911,788,724,619,767,632,766,606,779,711,846,858,777,813,1071,1082,1201,1208,1060,934,1184,1096,805,773,777,795,904,1136,1164,1045,1245,1363,1256,381],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_jsonschema-4.17.0-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_jsonschema-4.17.0-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/jsonschema-4.17.0-pyhd8ed1ab_0.json", "start": 0, "end": 87}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema-4.17.0.dist-info/direct_url.json", "start": 87, "end": 198}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/__init__.py", "start": 198, "end": 2385}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/__main__.py", "start": 2385, "end": 2425}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/_format.py", "start": 2425, "end": 16833}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/_legacy_validators.py", "start": 16833, "end": 27382}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/_types.py", "start": 27382, "end": 32807}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/_utils.py", "start": 32807, "end": 43236}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/_validators.py", "start": 43236, "end": 58799}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/benchmarks/__init__.py", "start": 58799, "end": 58869}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/benchmarks/issue232.py", "start": 58869, "end": 59375}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/benchmarks/issue232/issue.json", "start": 59375, "end": 176480}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/benchmarks/json_schema_test_suite.py", "start": 176480, "end": 176800}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/cli.py", "start": 176800, "end": 185318}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/exceptions.py", "start": 185318, "end": 196654}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/protocols.py", "start": 196654, "end": 203905}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft2019-09.json", "start": 203905, "end": 205690}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft2020-12.json", "start": 205690, "end": 208142}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft3.json", "start": 208142, "end": 210742}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft4.json", "start": 210742, "end": 215099}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft6.json", "start": 215099, "end": 219536}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/draft7.json", "start": 219536, "end": 224355}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/schemas/vocabularies.json", "start": 224355, "end": 237200}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jsonschema/validators.py", "start": 237200, "end": 275044}]});
  })();
