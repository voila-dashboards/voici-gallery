
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
      var PACKAGE_NAME = 'wcwidth-0.2.5-pyh9f0ad1d_2.0.data';
      var REMOTE_PACKAGE_BASE = 'wcwidth-0.2.5-pyh9f0ad1d_2.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "wcwidth-0.2.5.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "wcwidth", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":186243,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1518,2510,3651,4685,5734,6806,7934,9057,10115,11236,12376,13475,14568,15691,16771,17861,18883,20004,21162,22242,23287,24432,25616,26658,27705,28845,30011,31056,32096,33194,34353,35479,36488,37601,38755,39925,40914,41994,43151,44290,45194,45951,46823,47772,48725,49596,50375,51239,52147,53128,54041,54810,55646,56512,57433,58280,59341,60102,60856,61695,62571,63532,64355,65321,66272,67045,67883,68684,69552,70527,71402,72343,73295,74074,74891,75706,76568,77514,78357,79231,80227,81080,81852,82718,83546,84379,85339,86171,87074,88070,88825,89590,90439,91317,92233,93132,94019,95012,95927,96724,97531,98334,99214,100161,101013,101940,102747,103762,104680,105466,106287,107095,107977,108923,109780,110701,111523,112421,113481,114279,115045,115901,116739,117555,118509,119355,120275,121090,121969,122992,123823,124612,125470,126313,127138,128108,128955,129911,130714,131541,132312,133396,134245,135018,135887,136729,137549,138517,139368,140334,141163,142007,142825,143796,144721,145504,146353,147156,148016,148975,149838,150776,151666,152479,153295,154183,155170,155940,156697,157555,158407,159238,160182,161032,161988,162799,163639,164460,165462,166385,167178,168009,168814,169675,170623,171511,172443,173341,174148,174923,175753,177134,178693,180075,181388,182806,184161,185244],"sizes":[1518,992,1141,1034,1049,1072,1128,1123,1058,1121,1140,1099,1093,1123,1080,1090,1022,1121,1158,1080,1045,1145,1184,1042,1047,1140,1166,1045,1040,1098,1159,1126,1009,1113,1154,1170,989,1080,1157,1139,904,757,872,949,953,871,779,864,908,981,913,769,836,866,921,847,1061,761,754,839,876,961,823,966,951,773,838,801,868,975,875,941,952,779,817,815,862,946,843,874,996,853,772,866,828,833,960,832,903,996,755,765,849,878,916,899,887,993,915,797,807,803,880,947,852,927,807,1015,918,786,821,808,882,946,857,921,822,898,1060,798,766,856,838,816,954,846,920,815,879,1023,831,789,858,843,825,970,847,956,803,827,771,1084,849,773,869,842,820,968,851,966,829,844,818,971,925,783,849,803,860,959,863,938,890,813,816,888,987,770,757,858,852,831,944,850,956,811,840,821,1002,923,793,831,805,861,948,888,932,898,807,775,830,1381,1559,1382,1313,1418,1355,1083,999],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_wcwidth-0.2.5-pyh9f0ad1d_2.0.data');
      };
      Module['addRunDependency']('datafile_wcwidth-0.2.5-pyh9f0ad1d_2.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/wcwidth-0.2.5-pyh9f0ad1d_2.json", "start": 0, "end": 83}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth-0.2.5.dist-info/direct_url.json", "start": 83, "end": 186}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth/__init__.py", "start": 186, "end": 1743}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth/table_wide.py", "start": 1743, "end": 81165}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth/table_zero.py", "start": 81165, "end": 391395}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth/unicode_versions.py", "start": 391395, "end": 392187}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/wcwidth/wcwidth.py", "start": 392187, "end": 407059}]});
  })();
