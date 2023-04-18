
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
      var PACKAGE_NAME = 'traitlets-5.5.0-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'traitlets-5.5.0-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "traitlets-5.5.0.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "traitlets", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets", "config", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets", "utils", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":138358,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1373,2602,3981,5206,6369,7600,8774,9899,11070,12191,13181,14174,15328,16650,17935,19172,20147,21349,22586,23781,24990,26209,27302,28646,29777,31007,32066,33339,34494,35632,36895,37975,39245,40419,41350,42411,43640,44950,46175,47442,48666,49852,51006,52126,53382,54434,55694,56989,58361,59664,60997,62445,63554,64919,66212,67119,68184,69314,70524,71680,72819,74005,74922,75783,76891,77958,79325,80679,81792,82836,84066,85202,86223,87301,88431,89578,90786,91940,93230,94445,95680,96811,97867,98940,100228,101333,102689,103794,104831,105654,106789,107880,108943,109981,111297,112375,113528,114792,116084,117371,118501,119688,120871,121819,122858,123891,125122,126374,127434,128857,130317,131422,132708,133674,134949,136266,137485],"sizes":[1373,1229,1379,1225,1163,1231,1174,1125,1171,1121,990,993,1154,1322,1285,1237,975,1202,1237,1195,1209,1219,1093,1344,1131,1230,1059,1273,1155,1138,1263,1080,1270,1174,931,1061,1229,1310,1225,1267,1224,1186,1154,1120,1256,1052,1260,1295,1372,1303,1333,1448,1109,1365,1293,907,1065,1130,1210,1156,1139,1186,917,861,1108,1067,1367,1354,1113,1044,1230,1136,1021,1078,1130,1147,1208,1154,1290,1215,1235,1131,1056,1073,1288,1105,1356,1105,1037,823,1135,1091,1063,1038,1316,1078,1153,1264,1292,1287,1130,1187,1183,948,1039,1033,1231,1252,1060,1423,1460,1105,1286,966,1275,1317,1219,873],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_traitlets-5.5.0-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_traitlets-5.5.0-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/traitlets-5.5.0-pyhd8ed1ab_0.json", "start": 0, "end": 85}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets-5.5.0.dist-info/direct_url.json", "start": 85, "end": 190}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/__init__.py", "start": 190, "end": 888}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/_version.py", "start": 888, "end": 1408}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/__init__.py", "start": 1408, "end": 1592}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/application.py", "start": 1592, "end": 39510}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/configurable.py", "start": 39510, "end": 60509}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/loader.py", "start": 60509, "end": 96472}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/manager.py", "start": 96472, "end": 98785}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/config/sphinxdoc.py", "start": 98785, "end": 103715}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/log.py", "start": 103715, "end": 104496}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/traitlets.py", "start": 104496, "end": 223619}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/__init__.py", "start": 223619, "end": 226524}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/bunch.py", "start": 226524, "end": 227194}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/decorators.py", "start": 227194, "end": 230135}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/descriptions.py", "start": 230135, "end": 235517}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/getargspec.py", "start": 235517, "end": 237074}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/importstring.py", "start": 237074, "end": 238201}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/nested_update.py", "start": 238201, "end": 239200}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/sentinel.py", "start": 239200, "end": 239715}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/traitlets/utils/text.py", "start": 239715, "end": 240821}]});
  })();
