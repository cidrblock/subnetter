# Subnetter

Subnetter is a simple network visualization and IP schema design aid.  Given a yaml file describing the hierarchy of the network and it's subnets, a resulting json file will be created and a d3.js visualization.

![screenshot](https://github.com/cidrblock/subnetter/raw/master/screenshot.png)


## Try it now

http://ipv4sub.net

1. Paste this in as a template


```yaml
name: "My network design"   # The name of the root node
root: 10.200.0.0/22         # The root network to subnet
type: dc aggregate network  # The type (used in the legend)
site: East Coast DC         # A variable to be used later
location: Washington, DC    # Another variable to be used later
spec:
    - name: "{{site}}-{{location}}-servers-1"
      type: subnet
    - name: "{{site}}-{{location}}-servers-2"
      type: subnet
    - name: "{{site}}-{{location}}-servers-3"
      type: subnet
    - name: "{{site}}-{{location}}-servers-4"
      type: subnet
```
2. Click [convert]
3. Click [render]
4. Fine tune the yaml and repeat


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

You will need node.js and npm installed.  (or a suitable web server to host the files, all content is static)

https://nodejs.org/en/download/


### Installing

Clone this repository.

change directories and run the project.
```
cd subnetter
npm install
node app.js
```

Open your browser
```
http://localhost:8080
```

End with an example of getting some data out of the system or using it for a little demo



## Development

Rebuilding the javascript and css files:
```
bower install
gulp bower
```

## Usage

Subnetter starts with a yaml file describing the network.

Example:

```yaml
name: "My network design"   # The name of the root node
root: 10.200.0.0/22         # The root network to subnet
type: dc aggregate network  # The type (used in the legend)
site: East Coast DC         # A variable to be used later
location: Washington, DC    # Another variable to be used later
spec:
    - name: "{{site}}-{{location}}-servers-1"
      type: subnet
    - name: "{{site}}-{{location}}-servers-2"
      type: subnet
    - name: "{{site}}-{{location}}-servers-3"
      type: subnet
    - name: "{{site}}-{{location}}-servers-4"
      type: subnet
```

Child subnet masks will automatically be determined based on the root network.  The number of subnets will also be rounded up to fill the IP block.

Example:

```yaml
name: "My network design"   # The name of the root node
root: 10.200.0.0/22         # The root network to subnet
type: dc aggregate network  # The type (used in the legend)
site: East Coast DC         # A variable to be used later
location: Washington, DC    # Another variable to be used later
spec:
    - name: "{{site}}-{{location}}-servers-1"
      type: container
      children:
        - name: child network
          type: subnet       # processing stops at subnet
        - name: child network
          type: subnet
          children:
            - name: will never be seen
              type: something # because the parent is a 'subnet'
        - name: child network
          type: subnet
    - name: "{{site}}-{{location}}-servers-2"
      type: type2             # types are used in the legend  
    - name: "{{site}}-{{location}}-servers-3"
      type: type3
```

Complex networks can be designed using yaml anchor (&) and reference (*) labels.

Example:

```yaml
site1: Seattle, WA
site2: Portland, OR
site3: Denver, CO
site4: New York, NY
site5: Tampa, FL

adminblock: &adminblock
  - name: management systems
    type: subnet
  - name: loopback addresses
    type: subnet


office: &office
  - name: Users
    type: subnet
  - name: Phones
    type: subnet
  - name: Network Admin
    type: admin block
    children: *adminblock


name: "My network design"   # The name of the root node
root: 10.200.0.0/20         # The root network to subnet
type: WAN                   # The type (used in the legend)
spec:
    - name: "{{site1}}"
      type: container
      children: *office
    - name: "{{site2}}"
      type: container
      children: *office
    - name: "{{site3}}"
      type: container
      children: *office
    - name: "{{site4}}"
      type: container
      children: *office
    - name: "{{site5}}"
      type: container
      children: *office
```

*Try changing the root mask to /19 so the user and phone networks become a /24.*


## Built With

* angular
* angular-bootstrap
* angular-ui-ace
* express
* bower
* gulp
* d3.js
* ace editor

## Contributing

Please do.

## Versioning

soon.

## Authors

* **Bradley Thornton** - *Initial work* - [cidrblock](https://github.com/cidrblock)

## License

This project is licensed under the MIT License. [MIT License](http://www.opensource.org/licenses/MIT).

## Acknowledgments

* D3.js, Angular, Bootstrap, Ace
