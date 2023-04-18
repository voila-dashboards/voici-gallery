
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
      var PACKAGE_NAME = 'jedi-0.18.1-pyhd8ed1ab_2.0.data';
      var REMOTE_PACKAGE_BASE = 'jedi-0.18.1-pyhd8ed1ab_2.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "jedi-0.18.1.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "jedi", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi", "api", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api", "refactoring", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi", "inference", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference", "compiled", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled", "subprocess", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference", "gradual", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference", "value", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi", "plugins", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":443924,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1497,2769,4085,5601,7083,8280,9563,10842,12099,13387,14610,15828,16952,18108,19058,20081,21393,22762,24040,25265,26447,27433,28683,29991,31193,32493,33719,34991,36195,37221,38351,39487,40628,41786,42817,43991,45049,46219,47260,48316,49610,50760,51869,53194,54308,55491,56727,57899,59322,60646,61947,63125,64300,65706,66854,68191,69273,70236,71512,72806,74076,75124,76128,77110,78421,79593,80842,81999,83344,84652,85900,87024,88084,89320,90378,91413,92716,93939,95086,96216,97314,98655,99758,100881,102075,103254,104435,105579,107122,108245,109662,110808,112122,113309,114398,115973,117473,118620,119697,120825,121934,123227,124277,125615,126786,128007,129042,130209,131320,132610,133696,134857,135783,137059,138323,139473,140494,141425,142617,143747,144972,146245,147560,148748,149720,150831,152006,153149,154312,155403,156635,157943,159282,160390,161515,162673,164203,165428,166795,167924,169027,170095,171247,172398,173760,174931,176224,177533,178723,179982,180837,181892,182952,183979,185045,185931,187028,188371,189665,190864,191948,192945,193788,194811,195899,196719,197978,199161,200585,201868,203062,204415,205762,206982,208259,209431,210619,211653,212807,213994,215047,216223,217366,218771,219986,221252,222373,223650,224861,226040,227209,228424,229587,230876,231953,233132,234380,235561,236841,237917,239017,240322,241019,242178,243255,244302,245426,246522,247639,248633,249752,250822,252026,253296,254283,255217,256349,257507,258608,259713,260798,261799,262995,264106,265242,266407,267795,269123,270246,271638,272703,273966,275318,276415,277587,278609,279731,280803,281904,283032,284264,285478,286598,287790,288803,289892,291097,292249,293368,294392,295347,296500,297812,299032,300471,301465,302514,303781,305165,306317,307499,308649,309776,310969,311953,313146,314156,315128,316457,317600,318524,319406,320607,321895,322915,323965,325025,326336,327625,328846,330097,331190,332424,333499,334663,335925,337007,338286,339563,340924,342093,343212,344490,345798,347259,348604,349994,351179,352306,353335,354445,355542,356561,357736,358894,359926,360946,362064,363204,364109,365299,366415,367568,368816,370116,371140,372200,373244,374341,375590,376836,377763,378913,379991,381111,382301,383361,384520,385460,386583,387930,389051,390184,391342,392623,393692,394956,396081,397207,398365,399585,400747,401988,403105,404346,405573,406831,407943,409236,410376,411485,412572,413920,414972,415960,416955,418142,419120,420324,421498,422741,424057,425164,426374,427773,428843,429974,431244,432289,433411,434414,435561,436700,437951,439211,440683,442032,443326],"sizes":[1497,1272,1316,1516,1482,1197,1283,1279,1257,1288,1223,1218,1124,1156,950,1023,1312,1369,1278,1225,1182,986,1250,1308,1202,1300,1226,1272,1204,1026,1130,1136,1141,1158,1031,1174,1058,1170,1041,1056,1294,1150,1109,1325,1114,1183,1236,1172,1423,1324,1301,1178,1175,1406,1148,1337,1082,963,1276,1294,1270,1048,1004,982,1311,1172,1249,1157,1345,1308,1248,1124,1060,1236,1058,1035,1303,1223,1147,1130,1098,1341,1103,1123,1194,1179,1181,1144,1543,1123,1417,1146,1314,1187,1089,1575,1500,1147,1077,1128,1109,1293,1050,1338,1171,1221,1035,1167,1111,1290,1086,1161,926,1276,1264,1150,1021,931,1192,1130,1225,1273,1315,1188,972,1111,1175,1143,1163,1091,1232,1308,1339,1108,1125,1158,1530,1225,1367,1129,1103,1068,1152,1151,1362,1171,1293,1309,1190,1259,855,1055,1060,1027,1066,886,1097,1343,1294,1199,1084,997,843,1023,1088,820,1259,1183,1424,1283,1194,1353,1347,1220,1277,1172,1188,1034,1154,1187,1053,1176,1143,1405,1215,1266,1121,1277,1211,1179,1169,1215,1163,1289,1077,1179,1248,1181,1280,1076,1100,1305,697,1159,1077,1047,1124,1096,1117,994,1119,1070,1204,1270,987,934,1132,1158,1101,1105,1085,1001,1196,1111,1136,1165,1388,1328,1123,1392,1065,1263,1352,1097,1172,1022,1122,1072,1101,1128,1232,1214,1120,1192,1013,1089,1205,1152,1119,1024,955,1153,1312,1220,1439,994,1049,1267,1384,1152,1182,1150,1127,1193,984,1193,1010,972,1329,1143,924,882,1201,1288,1020,1050,1060,1311,1289,1221,1251,1093,1234,1075,1164,1262,1082,1279,1277,1361,1169,1119,1278,1308,1461,1345,1390,1185,1127,1029,1110,1097,1019,1175,1158,1032,1020,1118,1140,905,1190,1116,1153,1248,1300,1024,1060,1044,1097,1249,1246,927,1150,1078,1120,1190,1060,1159,940,1123,1347,1121,1133,1158,1281,1069,1264,1125,1126,1158,1220,1162,1241,1117,1241,1227,1258,1112,1293,1140,1109,1087,1348,1052,988,995,1187,978,1204,1174,1243,1316,1107,1210,1399,1070,1131,1270,1045,1122,1003,1147,1139,1251,1260,1472,1349,1294,598],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_jedi-0.18.1-pyhd8ed1ab_2.0.data');
      };
      Module['addRunDependency']('datafile_jedi-0.18.1-pyhd8ed1ab_2.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/jedi-0.18.1-pyhd8ed1ab_2.json", "start": 0, "end": 81}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi-0.18.1.dist-info/direct_url.json", "start": 81, "end": 181}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/__init__.py", "start": 181, "end": 1667}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/__main__.py", "start": 1667, "end": 3617}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/_compatibility.py", "start": 3617, "end": 4535}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/__init__.py", "start": 4535, "end": 35806}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/classes.py", "start": 35806, "end": 65443}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/completion.py", "start": 65443, "end": 92634}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/completion_cache.py", "start": 92634, "end": 93588}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/environment.py", "start": 93588, "end": 110544}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/errors.py", "start": 110544, "end": 111797}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/exceptions.py", "start": 111797, "end": 112788}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/file_name.py", "start": 112788, "end": 118408}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/helpers.py", "start": 118408, "end": 137352}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/interpreter.py", "start": 137352, "end": 139767}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/keywords.py", "start": 139767, "end": 141050}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/project.py", "start": 141050, "end": 157663}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/refactoring/__init__.py", "start": 157663, "end": 166483}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/refactoring/extract.py", "start": 166483, "end": 180416}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/replstartup.py", "start": 180416, "end": 181366}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/api/strings.py", "start": 181366, "end": 184982}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/cache.py", "start": 184982, "end": 188656}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/common.py", "start": 188656, "end": 189324}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/debug.py", "start": 189324, "end": 192828}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/file_io.py", "start": 192828, "end": 195165}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/__init__.py", "start": 195165, "end": 203606}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/analysis.py", "start": 203606, "end": 211369}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/arguments.py", "start": 211369, "end": 223587}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/base_value.py", "start": 223587, "end": 241808}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/cache.py", "start": 241808, "end": 245999}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/__init__.py", "start": 245999, "end": 248650}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/access.py", "start": 248650, "end": 267092}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/getattr_static.py", "start": 267092, "end": 270954}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/mixed.py", "start": 270954, "end": 282309}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/__init__.py", "start": 282309, "end": 295799}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/__main__.py", "start": 295799, "end": 296966}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/subprocess/functions.py", "start": 296966, "end": 305632}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/compiled/value.py", "start": 305632, "end": 326158}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/context.py", "start": 326158, "end": 343322}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/docstring_utils.py", "start": 343322, "end": 344081}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/docstrings.py", "start": 344081, "end": 353905}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/dynamic_params.py", "start": 353905, "end": 362027}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/filters.py", "start": 362027, "end": 374520}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/finder.py", "start": 374520, "end": 379846}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/flow_analysis.py", "start": 379846, "end": 384429}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/__init__.py", "start": 384429, "end": 384572}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/annotation.py", "start": 384572, "end": 400504}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/base.py", "start": 400504, "end": 416058}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/conversion.py", "start": 416058, "end": 423659}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/generics.py", "start": 423659, "end": 426803}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/stub_value.py", "start": 426803, "end": 430132}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/type_var.py", "start": 430132, "end": 434271}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/typeshed.py", "start": 434271, "end": 445738}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/typing.py", "start": 445738, "end": 462887}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/gradual/utils.py", "start": 462887, "end": 464034}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/helpers.py", "start": 464034, "end": 469977}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/imports.py", "start": 469977, "end": 493059}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/lazy_value.py", "start": 493059, "end": 494726}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/names.py", "start": 494726, "end": 517914}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/param.py", "start": 517914, "end": 528364}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/parser_cache.py", "start": 528364, "end": 528555}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/recursion.py", "start": 528555, "end": 533487}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/references.py", "start": 533487, "end": 544342}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/signature.py", "start": 544342, "end": 549201}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/star_args.py", "start": 549201, "end": 557096}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/syntax_tree.py", "start": 557096, "end": 592452}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/sys_path.py", "start": 592452, "end": 602670}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/utils.py", "start": 602670, "end": 605376}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/__init__.py", "start": 605376, "end": 605792}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/decorator.py", "start": 605792, "end": 606999}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/dynamic_arrays.py", "start": 606999, "end": 614525}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/function.py", "start": 614525, "end": 631949}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/instance.py", "start": 631949, "end": 654460}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/iterable.py", "start": 654460, "end": 677765}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/klass.py", "start": 677765, "end": 694450}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/module.py", "start": 694450, "end": 702568}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/inference/value/namespace.py", "start": 702568, "end": 704669}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/parser_utils.py", "start": 704669, "end": 715569}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/__init__.py", "start": 715569, "end": 717014}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/django.py", "start": 717014, "end": 727909}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/flask.py", "start": 727909, "end": 728825}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/pytest.py", "start": 728825, "end": 736555}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/registry.py", "start": 736555, "end": 736862}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/plugins/stdlib.py", "start": 736862, "end": 766779}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/settings.py", "start": 766779, "end": 770305}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/jedi/utils.py", "start": 770305, "end": 775009}]});
  })();
