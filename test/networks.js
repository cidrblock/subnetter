yaml = require('js-yaml');

var fs = require('fs')

eval(fs.readFileSync('../public/app.js')+'');


var design = `
name: "NA vDC"
root: 10.252.0.0/19
site1: iaddc1
site2: chddc1
spec:
- name: "zone1"
  type: container
  children:
    - name: "{{site1}}-zone1-servers1.1"
      type: subnet
    - name: "{{site2}}-zone1-servers1.1"
      type: subnet
    - name: "{{site1}}-zone1-servers1.2"
      type: subnet
    - name: "{{site2}}-zone1-servers1.2"
      type: subnet
    - name: "{{site1}}-zone1-servers1.3"
      type: subnet
    - name: "{{site2}}-zone1-servers1.3"
      type: subnet
    - name: "{{site1}}-zone1-unused"
      type: subnet
    - name: "zone1-network"
      type: container
      children:
        - name: "{{site1}} localvips"
          type: subnet
        - name: "{{site1}} network"
          type: container
        - name: "{{site2}} localvips"
          type: subnet
        - name: "{{site2}} network"
          type: subnet
`;




var design = yaml.load(design);
var start = design.root

var answer = subnets(design.root, design.spec)
var json = {
  network: design.root,
  networkname: design.name,
  children: answer
  }


console.log(JSON.stringify(json, null, 2))
