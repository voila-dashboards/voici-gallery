
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
      var PACKAGE_NAME = 'pyparsing-3.0.9-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'pyparsing-3.0.9-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pyparsing-3.0.9.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pyparsing", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing", "diagram", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":207802,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1650,3075,4170,5238,6477,7815,9048,10420,11191,12127,13300,14287,15661,16889,18481,19813,20900,22052,23349,24653,25949,27196,28465,29619,30969,32197,33360,34575,35275,35944,37162,38045,39307,40634,41981,43280,44326,45553,46768,48041,48808,49997,50830,51324,52267,53545,54697,55708,56868,58113,59314,60557,61601,62655,63768,65040,66103,67345,68500,69334,70530,71599,72788,74073,75078,75829,76806,78231,79368,80500,81561,82441,83532,84822,86029,87147,88211,89147,90257,91098,92066,93200,94178,95281,96444,97610,98680,99834,100873,102132,103062,104126,105223,106227,107411,108481,109882,110999,112372,113593,114631,115879,117109,118500,119611,120851,121985,123250,124411,125370,126586,127822,129119,130263,131509,132786,134146,135493,136879,138337,139647,141010,142278,143427,144546,145831,147067,148017,148994,150182,151521,152377,153616,154955,156321,157630,158751,160144,161470,162827,164162,165514,166838,167983,168977,170226,171531,172892,174198,174981,176329,177363,178634,179933,181169,182151,183083,184228,185351,186503,187591,188745,189950,190765,191794,193095,194093,195113,195977,196760,197944,198925,200289,201313,201997,202775,203554,204733,205820,206950],"sizes":[1650,1425,1095,1068,1239,1338,1233,1372,771,936,1173,987,1374,1228,1592,1332,1087,1152,1297,1304,1296,1247,1269,1154,1350,1228,1163,1215,700,669,1218,883,1262,1327,1347,1299,1046,1227,1215,1273,767,1189,833,494,943,1278,1152,1011,1160,1245,1201,1243,1044,1054,1113,1272,1063,1242,1155,834,1196,1069,1189,1285,1005,751,977,1425,1137,1132,1061,880,1091,1290,1207,1118,1064,936,1110,841,968,1134,978,1103,1163,1166,1070,1154,1039,1259,930,1064,1097,1004,1184,1070,1401,1117,1373,1221,1038,1248,1230,1391,1111,1240,1134,1265,1161,959,1216,1236,1297,1144,1246,1277,1360,1347,1386,1458,1310,1363,1268,1149,1119,1285,1236,950,977,1188,1339,856,1239,1339,1366,1309,1121,1393,1326,1357,1335,1352,1324,1145,994,1249,1305,1361,1306,783,1348,1034,1271,1299,1236,982,932,1145,1123,1152,1088,1154,1205,815,1029,1301,998,1020,864,783,1184,981,1364,1024,684,778,779,1179,1087,1130,852],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pyparsing-3.0.9-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_pyparsing-3.0.9-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/pyparsing-3.0.9-pyhd8ed1ab_0.json", "start": 0, "end": 85}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing-3.0.9.dist-info/direct_url.json", "start": 85, "end": 190}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/__init__.py", "start": 190, "end": 9349}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/actions.py", "start": 9349, "end": 15775}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/common.py", "start": 15775, "end": 28711}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/core.py", "start": 28711, "end": 242021}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/diagram/__init__.py", "start": 242021, "end": 265689}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/exceptions.py", "start": 265689, "end": 274712}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/helpers.py", "start": 274712, "end": 313841}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/results.py", "start": 313841, "end": 339182}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/testing.py", "start": 339182, "end": 352584}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/unicode.py", "start": 352584, "end": 363371}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pyparsing/util.py", "start": 363371, "end": 370176}]});
  })();
