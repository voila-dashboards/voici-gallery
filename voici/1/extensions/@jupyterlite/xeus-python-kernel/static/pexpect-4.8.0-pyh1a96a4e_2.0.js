
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
      var PACKAGE_NAME = 'pexpect-4.8.0-pyh1a96a4e_2.0.data';
      var REMOTE_PACKAGE_BASE = 'pexpect-4.8.0-pyh1a96a4e_2.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pexpect-4.8.0.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "pexpect", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":103962,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1533,2155,3140,3896,4701,5879,7163,8624,9794,10744,11881,13004,14392,16107,17579,18729,19990,20794,21774,22803,23999,25348,26532,28025,29336,30664,31920,33100,34276,35584,36939,38211,39536,40924,41932,43185,44492,45721,46894,48118,49412,50838,52108,53083,54219,55560,56622,57977,59454,60787,62052,63279,64581,66030,67249,68402,69549,70650,71934,73309,74514,75803,77186,78613,79641,81183,82725,83802,84845,85849,86715,87528,88846,90029,91183,92421,93583,94829,96066,97202,98427,99754,101180,102416,103514],"sizes":[1533,622,985,756,805,1178,1284,1461,1170,950,1137,1123,1388,1715,1472,1150,1261,804,980,1029,1196,1349,1184,1493,1311,1328,1256,1180,1176,1308,1355,1272,1325,1388,1008,1253,1307,1229,1173,1224,1294,1426,1270,975,1136,1341,1062,1355,1477,1333,1265,1227,1302,1449,1219,1153,1147,1101,1284,1375,1205,1289,1383,1427,1028,1542,1542,1077,1043,1004,866,813,1318,1183,1154,1238,1162,1246,1237,1136,1225,1327,1426,1236,1098,448],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_pexpect-4.8.0-pyh1a96a4e_2.0.data');
      };
      Module['addRunDependency']('datafile_pexpect-4.8.0-pyh1a96a4e_2.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/pexpect-4.8.0-pyh1a96a4e_2.json", "start": 0, "end": 83}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect-4.8.0.dist-info/direct_url.json", "start": 83, "end": 186}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/ANSI.py", "start": 186, "end": 12363}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/FSM.py", "start": 12363, "end": 25782}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/__init__.py", "start": 25782, "end": 29684}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/_async.py", "start": 29684, "end": 32988}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/exceptions.py", "start": 32988, "end": 34056}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/expect.py", "start": 34056, "end": 47883}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/fdpexpect.py", "start": 47883, "end": 53711}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/popen_spawn.py", "start": 53711, "end": 59872}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/pty_spawn.py", "start": 59872, "end": 97254}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/pxssh.py", "start": 97254, "end": 121533}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/replwrap.py", "start": 121533, "end": 127166}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/run.py", "start": 127166, "end": 133794}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/screen.py", "start": 133794, "end": 147498}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/spawnbase.py", "start": 147498, "end": 168745}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/pexpect/utils.py", "start": 168745, "end": 174764}]});
  })();
