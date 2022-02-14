// See https://web.archive.org/web/20120507054320/http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)
export const bytesToSize = (bytes, precision) => {
  var kilobyte = 1024;
  var megabyte = kilobyte * 1024;
  var gigabyte = megabyte * 1024;
  var terabyte = gigabyte * 1024;
 
  if ((bytes >= 0) && (bytes < kilobyte)) {
      return bytes + ' B';

  } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      return (bytes / kilobyte).toFixed(precision) + ' KB';

  } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      return (bytes / megabyte).toFixed(precision) + ' MB';

  } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      return (bytes / gigabyte).toFixed(precision) + ' GB';

  } else if (bytes >= terabyte) {
      return (bytes / terabyte).toFixed(precision) + ' TB';

  } else {
      return bytes + ' B';
  }
}

// See https://stackoverflow.com/a/43084928
export const parseExifDate = (dateString) => {
  var b = dateString.split(/\D/);
  return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]);
}