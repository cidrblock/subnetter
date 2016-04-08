function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

function network2nm(str) {
  var parts = str.split('/')
  return {
     network: parts[0],
     mask: parts[1]
  }
}

function ip2b(str) {
  var octets = str.split(".")
  var binary = octets.map(function(val) {
       return padLeft(Number(val).toString(2),8);
   });
  return binary.join('')
}

function b2ip(str) {
  octets= str.match(/.{1,8}/g)
  var ips = octets.map(function(val) {
    return parseInt(val, 2);
  });
  return ips.join('.')
}

String.prototype.replaceAt = function(start, middle) {
    var first = this.substring(0, start)
    var last = this.substring(start + middle.length, this.length)
    return first + middle + last
};


function subnets(str, array) {
  var parts = network2nm(str)
  var network = parts.network
  var mask = Number(parts.mask)
  var binary = ip2b(network)
  var pow2 = Math.ceil(Math.log(array.length)/Math.log(2))
  var result = new Array();

  for (var i = 0; i < Math.pow(2, pow2) ; i++) {
    var newbinary = (binary.replaceAt(mask,padLeft(i.toString(2),pow2)));
    var hash = {}
    hash.network = `${b2ip(newbinary)}/${mask + pow2}`;
    hash.ips = Math.pow(2, 32 - (mask + pow2))
    if ( i > array.length - 1) {
      hash.name = "unused";
      hash.type = "unused";
    } else {
      hash.name = array[i].name;
      hash.type = array[i].type;
      if (array[i].attributes) {
        hash.attributes = array[i].attributes
      }
      if ((array[i].type != "subnet") && (array[i].hasOwnProperty("children"))) {
          hash.children = subnets( hash.network, array[i].children )
      }
    }
    result.push(hash);
  }
  return result
}
