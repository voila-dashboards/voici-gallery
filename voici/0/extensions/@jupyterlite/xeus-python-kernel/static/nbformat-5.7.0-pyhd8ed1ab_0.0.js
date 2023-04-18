
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
      var PACKAGE_NAME = 'nbformat-5.7.0-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'nbformat-5.7.0-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "nbformat-5.7.0.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "nbformat", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat", "corpus", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat", "v1", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat", "v2", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat", "v3", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat", "v4", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":133295,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1318,2249,3346,4791,5856,6733,8030,9312,10428,11805,13049,14217,15353,16623,17692,18876,20253,21606,22804,24032,25014,26074,27313,28411,29534,30731,31996,33036,33877,34863,35609,36595,37620,38518,39458,40345,41424,42246,43167,44390,45396,46273,47285,48506,49736,50987,51918,52788,53805,54670,55383,56178,56844,57836,59048,59882,60680,61709,62676,63803,64642,65822,67038,68211,69446,70477,71738,72756,73680,74506,75264,76205,76921,77859,78903,79725,80484,81419,82148,83073,84100,84911,85813,86576,87484,88278,89329,90194,91123,91795,92714,93495,94384,95427,96307,97240,97958,98748,99654,100422,101452,102507,103385,104391,105132,105910,106834,107604,108748,109723,110582,111484,112180,113014,113942,114676,115843,117125,118528,119795,121057,122037,123406,124594,125746,126990,128192,129343,130424,131528,132759],"sizes":[1318,931,1097,1445,1065,877,1297,1282,1116,1377,1244,1168,1136,1270,1069,1184,1377,1353,1198,1228,982,1060,1239,1098,1123,1197,1265,1040,841,986,746,986,1025,898,940,887,1079,822,921,1223,1006,877,1012,1221,1230,1251,931,870,1017,865,713,795,666,992,1212,834,798,1029,967,1127,839,1180,1216,1173,1235,1031,1261,1018,924,826,758,941,716,938,1044,822,759,935,729,925,1027,811,902,763,908,794,1051,865,929,672,919,781,889,1043,880,933,718,790,906,768,1030,1055,878,1006,741,778,924,770,1144,975,859,902,696,834,928,734,1167,1282,1403,1267,1262,980,1369,1188,1152,1244,1202,1151,1081,1104,1231,536],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_nbformat-5.7.0-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_nbformat-5.7.0-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/nbformat-5.7.0-pyhd8ed1ab_0.json", "start": 0, "end": 84}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat-5.7.0.dist-info/direct_url.json", "start": 84, "end": 188}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/__init__.py", "start": 188, "end": 6322}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/_imports.py", "start": 6322, "end": 7370}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/_struct.py", "start": 7370, "end": 18586}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/_version.py", "start": 18586, "end": 19386}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/converter.py", "start": 19386, "end": 22005}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/corpus/__init__.py", "start": 22005, "end": 22005}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/corpus/words.py", "start": 22005, "end": 22077}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/current.py", "start": 22077, "end": 28099}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/json_compat.py", "start": 28099, "end": 31626}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/notebooknode.py", "start": 31626, "end": 33208}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/reader.py", "start": 33208, "end": 35693}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/sentinel.py", "start": 35693, "end": 36108}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/sign.py", "start": 36108, "end": 56355}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v1/__init__.py", "start": 56355, "end": 57251}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v1/convert.py", "start": 57251, "end": 57913}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v1/nbbase.py", "start": 57913, "end": 59742}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v1/nbjson.py", "start": 59742, "end": 61218}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v1/rwbase.py", "start": 61218, "end": 62637}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/__init__.py", "start": 62637, "end": 65355}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/convert.py", "start": 65355, "end": 67378}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/nbbase.py", "start": 67378, "end": 72815}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/nbjson.py", "start": 72815, "end": 74769}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/nbpy.py", "start": 74769, "end": 80014}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/nbxml.py", "start": 80014, "end": 80796}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v2/rwbase.py", "start": 80796, "end": 86589}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/__init__.py", "start": 86589, "end": 89050}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/convert.py", "start": 89050, "end": 91608}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/nbbase.py", "start": 91608, "end": 98736}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/nbformat.v3.schema.json", "start": 98736, "end": 110934}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/nbjson.py", "start": 110934, "end": 112381}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/nbpy.py", "start": 112381, "end": 119997}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v3/rwbase.py", "start": 119997, "end": 126258}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/__init__.py", "start": 126258, "end": 127023}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/convert.py", "start": 127023, "end": 136342}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbbase.py", "start": 136342, "end": 140858}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.0.schema.json", "start": 140858, "end": 153174}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.1.schema.json", "start": 153174, "end": 165490}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.2.schema.json", "start": 165490, "end": 178328}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.3.schema.json", "start": 178328, "end": 192328}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.4.schema.json", "start": 192328, "end": 208031}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.5.schema.json", "start": 208031, "end": 224135}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbformat.v4.schema.json", "start": 224135, "end": 240239}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/nbjson.py", "start": 240239, "end": 242099}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/v4/rwbase.py", "start": 242099, "end": 246369}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/validator.py", "start": 246369, "end": 268571}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/nbformat/warnings.py", "start": 268571, "end": 269296}]});
  })();
