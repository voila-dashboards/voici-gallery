
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
      var PACKAGE_NAME = 'ipywidgets-8.0.6-py310h8bed8af_0.0.data';
      var REMOTE_PACKAGE_BASE = 'ipywidgets-8.0.6-py310h8bed8af_0.0.data';
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
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "ipywidgets-8.0.6.dist-info", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages", "ipywidgets", true, true);
Module['FS_createPath']("/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets", "widgets", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":131681,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1405,2730,4158,5299,6579,7957,9324,10180,11384,12678,13872,15196,16493,17817,19040,20180,21149,22133,23274,24173,25614,26801,28027,28977,29949,31129,32092,33314,34807,36228,37463,38701,39941,41141,42109,43202,43769,44965,46040,46996,48202,49379,50584,51787,52945,54042,55346,56323,57408,58763,59741,60755,62104,63170,64232,65294,66369,67433,68576,69752,70856,72011,73162,74364,75584,76794,78059,78953,79823,80951,82163,83405,84784,85323,85936,87107,88379,89549,90672,91967,92989,94368,95396,96382,97603,98825,100197,101582,102699,103576,104955,106080,107296,108300,109305,110436,111840,113044,114158,115121,115954,117204,118341,119203,120355,121537,122570,123343,124487,125570,126630,127717,128727,129958,131271],"sizes":[1405,1325,1428,1141,1280,1378,1367,856,1204,1294,1194,1324,1297,1324,1223,1140,969,984,1141,899,1441,1187,1226,950,972,1180,963,1222,1493,1421,1235,1238,1240,1200,968,1093,567,1196,1075,956,1206,1177,1205,1203,1158,1097,1304,977,1085,1355,978,1014,1349,1066,1062,1062,1075,1064,1143,1176,1104,1155,1151,1202,1220,1210,1265,894,870,1128,1212,1242,1379,539,613,1171,1272,1170,1123,1295,1022,1379,1028,986,1221,1222,1372,1385,1117,877,1379,1125,1216,1004,1005,1131,1404,1204,1114,963,833,1250,1137,862,1152,1182,1033,773,1144,1083,1060,1087,1010,1231,1313,410],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, true);
            Module['removeRunDependency']('datafile_ipywidgets-8.0.6-py310h8bed8af_0.0.data');
      };
      Module['addRunDependency']('datafile_ipywidgets-8.0.6-py310h8bed8af_0.0.data');

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
loadPackage({"files": [{"filename": "/tmp/xeus-python-kernel/envs/voici/conda-meta/ipywidgets-8.0.6-py310h8bed8af_0.json", "start": 0, "end": 89}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets-8.0.6.dist-info/direct_url.json", "start": 89, "end": 205}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/__init__.py", "start": 205, "end": 2137}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/_version.py", "start": 2137, "end": 2747}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/embed.py", "start": 2747, "end": 14034}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/state.schema.json", "start": 14034, "end": 16917}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/view.schema.json", "start": 16917, "end": 17512}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/__init__.py", "start": 17512, "end": 19221}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/docutils.py", "start": 19221, "end": 19860}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/domwidget.py", "start": 19860, "end": 22150}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/interaction.py", "start": 22150, "end": 42564}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/trait_types.py", "start": 42564, "end": 57483}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/utils.py", "start": 57483, "end": 60091}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/valuewidget.py", "start": 60091, "end": 60908}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget.py", "start": 60908, "end": 95984}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_bool.py", "start": 95984, "end": 100312}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_box.py", "start": 100312, "end": 104043}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_button.py", "start": 104043, "end": 108247}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_color.py", "start": 108247, "end": 109054}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_controller.py", "start": 109054, "end": 111374}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_core.py", "start": 111374, "end": 111996}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_date.py", "start": 111996, "end": 114593}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_datetime.py", "start": 114593, "end": 118727}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_description.py", "start": 118727, "end": 121005}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_float.py", "start": 121005, "end": 136033}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_int.py", "start": 136033, "end": 148158}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_layout.py", "start": 148158, "end": 155225}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_link.py", "start": 155225, "end": 158933}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_media.py", "start": 158933, "end": 166716}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_output.py", "start": 166716, "end": 173539}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_selection.py", "start": 173539, "end": 197996}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_selectioncontainer.py", "start": 197996, "end": 202194}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_string.py", "start": 202194, "end": 209063}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_style.py", "start": 209063, "end": 209622}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_tagsinput.py", "start": 209622, "end": 213120}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_templates.py", "start": 213120, "end": 228627}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_time.py", "start": 228627, "end": 231406}, {"filename": "/tmp/xeus-python-kernel/envs/voici/lib/python3.10/site-packages/ipywidgets/widgets/widget_upload.py", "start": 231406, "end": 236043}]});
  })();
