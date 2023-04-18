
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
      var PACKAGE_NAME = 'parso-0.8.3-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'parso-0.8.3-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "parso-0.8.3.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "parso", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso", "pgen2", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso", "python", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":148940,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1480,2987,4181,5452,6662,7955,9234,10517,11505,12624,13830,14982,16059,17489,18739,19970,21228,22659,23935,25317,26476,27615,28853,29859,31032,32008,33168,34660,35855,37125,38359,39673,40783,41852,43051,44239,45288,46409,47440,48604,49769,50827,51954,53288,54241,55443,56520,57712,58751,59877,61053,62136,63169,64195,65403,66499,67514,68612,69657,70536,71609,72592,73445,74417,75550,76486,77463,78569,79808,80993,82161,83473,84433,85563,86694,87707,88778,89858,90956,91896,92585,93121,94156,95095,95925,96915,97932,99177,100407,101625,102917,104127,105358,106581,107649,109044,110144,111097,112061,113097,113971,115242,116674,117861,118951,119991,121050,122354,123597,124792,125602,126871,127949,129124,130236,131364,132411,133574,134504,135786,137116,137938,139091,140217,141368,142492,143544,144839,146216,147515,148741],"sizes":[1480,1507,1194,1271,1210,1293,1279,1283,988,1119,1206,1152,1077,1430,1250,1231,1258,1431,1276,1382,1159,1139,1238,1006,1173,976,1160,1492,1195,1270,1234,1314,1110,1069,1199,1188,1049,1121,1031,1164,1165,1058,1127,1334,953,1202,1077,1192,1039,1126,1176,1083,1033,1026,1208,1096,1015,1098,1045,879,1073,983,853,972,1133,936,977,1106,1239,1185,1168,1312,960,1130,1131,1013,1071,1080,1098,940,689,536,1035,939,830,990,1017,1245,1230,1218,1292,1210,1231,1223,1068,1395,1100,953,964,1036,874,1271,1432,1187,1090,1040,1059,1304,1243,1195,810,1269,1078,1175,1112,1128,1047,1163,930,1282,1330,822,1153,1126,1151,1124,1052,1295,1377,1299,1226,199],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_parso-0.8.3-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_parso-0.8.3-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/parso-0.8.3-pyhd8ed1ab_0.json", "start": 0, "end": 81}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso-0.8.3.dist-info/direct_url.json", "start": 81, "end": 182}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/__init__.py", "start": 182, "end": 1789}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/_compatibility.py", "start": 1789, "end": 1859}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/cache.py", "start": 1859, "end": 10311}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/file_io.py", "start": 10311, "end": 11334}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/grammar.py", "start": 11334, "end": 21817}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/normalizer.py", "start": 21817, "end": 27414}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/parser.py", "start": 27414, "end": 34596}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/pgen2/__init__.py", "start": 34596, "end": 34978}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/pgen2/generator.py", "start": 34978, "end": 49548}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/pgen2/grammar_parser.py", "start": 49548, "end": 55063}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/__init__.py", "start": 55063, "end": 55063}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/diff.py", "start": 55063, "end": 89269}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/errors.py", "start": 89269, "end": 137224}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/parser.py", "start": 137224, "end": 145332}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/pep8.py", "start": 145332, "end": 179111}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/prefix.py", "start": 179111, "end": 181854}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/token.py", "start": 181854, "end": 182763}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/tokenize.py", "start": 182763, "end": 208558}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/python/tree.py", "start": 208558, "end": 245745}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/tree.py", "start": 245745, "end": 261898}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/parso/utils.py", "start": 261898, "end": 268518}]});
  })();
