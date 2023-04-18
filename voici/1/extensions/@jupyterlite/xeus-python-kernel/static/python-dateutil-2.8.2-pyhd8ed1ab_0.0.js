
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
      var PACKAGE_NAME = 'python-dateutil-2.8.2-pyhd8ed1ab_0.0.data';
      var REMOTE_PACKAGE_BASE = 'python-dateutil-2.8.2-pyhd8ed1ab_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "dateutil", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil", "parser", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil", "tz", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil", "zoneinfo", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "python_dateutil-2.8.2.dist-info", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":319973,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1382,2829,3977,5514,6807,7466,8510,9767,10686,11768,12854,13744,14893,16043,17219,18263,19267,20174,21259,22186,23231,24377,25618,26684,27862,29142,30322,31463,32222,33160,33741,35200,36504,37732,38809,39750,40957,42050,43474,44887,45858,46909,47734,48880,49485,50380,51185,51789,52522,53414,54829,56007,56983,57872,59025,60379,61450,62651,63791,64605,65496,66259,67024,68059,69130,70086,70819,71663,72478,73649,75011,76065,76902,77860,78800,79805,80932,81985,83023,84106,85115,85881,86755,88084,89264,90519,91537,92714,93780,94917,96250,97435,98666,99767,100709,101900,103268,104383,105545,106677,107766,108880,110119,111236,112490,113611,114656,116086,117129,118323,119556,120690,121535,122323,123414,124690,125699,126427,127545,128920,130321,131754,132864,134034,135341,136656,137833,139274,140619,141989,143247,145048,147096,149144,151191,153243,155236,157280,159328,161376,163426,165474,167529,169584,171632,173680,175736,177784,179832,181880,183928,185985,188033,190081,192129,194185,196233,198284,200332,202380,204436,206484,208540,210580,212628,214676,216724,218781,220829,222877,224925,226973,229030,231078,233126,235174,237222,239270,241318,243366,245422,247479,249527,251575,253623,255677,257729,259777,261834,263743,265791,267843,269891,271948,274004,276055,278083,280134,282173,284225,286270,288325,290373,292421,294469,296517,298565,300613,302670,304718,306775,308823,310871,312919,314976,317030,318812],"sizes":[1382,1447,1148,1537,1293,659,1044,1257,919,1082,1086,890,1149,1150,1176,1044,1004,907,1085,927,1045,1146,1241,1066,1178,1280,1180,1141,759,938,581,1459,1304,1228,1077,941,1207,1093,1424,1413,971,1051,825,1146,605,895,805,604,733,892,1415,1178,976,889,1153,1354,1071,1201,1140,814,891,763,765,1035,1071,956,733,844,815,1171,1362,1054,837,958,940,1005,1127,1053,1038,1083,1009,766,874,1329,1180,1255,1018,1177,1066,1137,1333,1185,1231,1101,942,1191,1368,1115,1162,1132,1089,1114,1239,1117,1254,1121,1045,1430,1043,1194,1233,1134,845,788,1091,1276,1009,728,1118,1375,1401,1433,1110,1170,1307,1315,1177,1441,1345,1370,1258,1801,2048,2048,2047,2052,1993,2044,2048,2048,2050,2048,2055,2055,2048,2048,2056,2048,2048,2048,2048,2057,2048,2048,2048,2056,2048,2051,2048,2048,2056,2048,2056,2040,2048,2048,2048,2057,2048,2048,2048,2048,2057,2048,2048,2048,2048,2048,2048,2048,2056,2057,2048,2048,2048,2054,2052,2048,2057,1909,2048,2052,2048,2057,2056,2051,2028,2051,2039,2052,2045,2055,2048,2048,2048,2048,2048,2048,2057,2048,2057,2048,2048,2048,2057,2054,1782,1161],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,1,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_python-dateutil-2.8.2-pyhd8ed1ab_0.0.data');
      };
      Module['addRunDependency']('datafile_python-dateutil-2.8.2-pyhd8ed1ab_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/python-dateutil-2.8.2-pyhd8ed1ab_0.json", "start": 0, "end": 91}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/__init__.py", "start": 91, "end": 313}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/_common.py", "start": 313, "end": 1245}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/_version.py", "start": 1245, "end": 1387}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/easter.py", "start": 1387, "end": 4065}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/parser/__init__.py", "start": 4065, "end": 5831}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/parser/_parser.py", "start": 5831, "end": 64627}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/parser/isoparser.py", "start": 64627, "end": 77874}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/relativedelta.py", "start": 77874, "end": 102778}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/rrule.py", "start": 102778, "end": 169334}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tz/__init__.py", "start": 169334, "end": 169778}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tz/_common.py", "start": 169778, "end": 182755}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tz/_factories.py", "start": 182755, "end": 185324}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tz/tz.py", "start": 185324, "end": 248181}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tz/win.py", "start": 248181, "end": 261116}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/tzwin.py", "start": 261116, "end": 261175}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/utils.py", "start": 261175, "end": 263140}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/zoneinfo/__init__.py", "start": 263140, "end": 269029}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/zoneinfo/dateutil-zoneinfo.tar.gz", "start": 269029, "end": 443423}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/dateutil/zoneinfo/rebuild.py", "start": 443423, "end": 445815}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/python_dateutil-2.8.2.dist-info/direct_url.json", "start": 445815, "end": 445926}]});
  })();
