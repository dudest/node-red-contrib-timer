# node-red-contrib-timer #

node-red-contrib-timer is a rudementary timer.

---

# Getting Started #

## Prerequisites ##

* [Node.js](https://nodejs.org/en/) v10.0.0 or newer
* [Node-RED](https://nodered.org) v1.0.0 or newer

## Installation ##

Install via Node-RED Manage Palette

`node-red-contrib-timer`

Install via npm

```
$ cd ~/.node-red
$ npm install node-red-contrib-timer
# then restart node-red
```

---

# Usage #

### Configuration Pane ###

![properties pane](images/img_properties.png)

### Node input ###

Start and stop with `msg.payload`:

* `true` starts the timer.
* `false` stops the timer.

Set expiry time with `msg.payload`:

* `int` sets countdown in seconds.

# Examples #

### Using function to filter cancel by topic ###

![canceling expiry](images/img_example_cancel.png)

```
[{"id":"38a5c6e.079893a","type":"tab","label":"timer ignore cancel","disabled":false,"info":""},{"id":"b5e83fc7.69dc8","type":"debug","z":"38a5c6e.079893a","name":"state","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"true","targetType":"full","statusVal":"payload","statusType":"auto","x":670,"y":140,"wires":[]},{"id":"6fb05b68.183e3c","type":"debug","z":"38a5c6e.079893a","name":"timer","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"true","targetType":"full","statusVal":"payload","statusType":"auto","x":670,"y":200,"wires":[]},{"id":"72a3e721.0cc288","type":"inject","z":"38a5c6e.079893a","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"cancel","payload":"false","payloadType":"bool","x":134,"y":196,"wires":[["cef7e1ee.595258"]]},{"id":"84f20a87.3a0308","type":"inject","z":"38a5c6e.079893a","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"true","payloadType":"bool","x":154,"y":136,"wires":[["cef7e1ee.595258"]]},{"id":"48ce8bab.3c0634","type":"function","z":"38a5c6e.079893a","name":"ignore cancel","func":"if (msg.topic != 'cancel') {\n    return msg;\n}","outputs":1,"noerr":0,"initialize":"","finalize":"","x":500,"y":140,"wires":[["b5e83fc7.69dc8"]]},{"id":"cef7e1ee.595258","type":"timer","z":"38a5c6e.079893a","name":"","topic":"","timer":"5","payloadOn":"true","payloadOnType":"bool","payloadOff":"false","payloadOffType":"bool","x":330,"y":160,"wires":[["48ce8bab.3c0634"],["6fb05b68.183e3c"]]},{"id":"225ff94.486e486","type":"comment","z":"38a5c6e.079893a","name":"using topic to ignore expiry playload when cancelled by user","info":"","x":300,"y":60,"wires":[]}]
```

### message propegation ###

![msg propegation](images/img_example_msgpass.png)

```
[{"id":"8af9695e.73126","type":"tab","label":"timer msg propegation","disabled":false,"info":""},{"id":"7fa42302.298614","type":"timer","z":"8af9695e.73126","name":"","topic":"","timer":"5","payloadOn":"true","payloadOnType":"bool","payloadOff":"false","payloadOffType":"bool","x":390,"y":160,"wires":[["3a0fe194.c88de6","40a132b2.d74a8c","d2e4815a.235dd"],["c830b39e.c0c1"]]},{"id":"43d996ab.f0fa48","type":"inject","z":"8af9695e.73126","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"},{"p":"foo","v":"bar","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"object copying","payload":"true","payloadType":"bool","x":210,"y":140,"wires":[["7fa42302.298614"]]},{"id":"c830b39e.c0c1","type":"debug","z":"8af9695e.73126","name":"timer","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"true","targetType":"full","statusVal":"payload","statusType":"auto","x":590,"y":280,"wires":[]},{"id":"3a0fe194.c88de6","type":"debug","z":"8af9695e.73126","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload","statusType":"auto","x":610,"y":140,"wires":[]},{"id":"40a132b2.d74a8c","type":"debug","z":"8af9695e.73126","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"foo","targetType":"msg","statusVal":"payload","statusType":"auto","x":600,"y":200,"wires":[]},{"id":"d2e4815a.235dd","type":"debug","z":"8af9695e.73126","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"topic","targetType":"msg","statusVal":"payload","statusType":"auto","x":600,"y":80,"wires":[]},{"id":"3b550efa.cdb4aa","type":"inject","z":"8af9695e.73126","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"},{"p":"foo","v":"cis boom bah","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"object copying cancelled","payload":"false","payloadType":"bool","x":180,"y":220,"wires":[["7fa42302.298614"]]},{"id":"8d7ff426.ad474","type":"comment","z":"8af9695e.73126","name":"last received msg object is copied to outputs","info":"","x":210,"y":80,"wires":[]}]
```

### override msg.topic in properties ###

![topic overriding](images/img_example_topicoverride.png)

```
[{"id":"3f3d6774.cce2f","type":"tab","label":"timer topic overide","disabled":false,"info":""},{"id":"6eed61c1.f7a888","type":"timer","z":"3f3d6774.cce2f","name":"","topic":"overide topic","timer":"5","payloadOn":"true","payloadOnType":"bool","payloadOff":"false","payloadOffType":"bool","x":370,"y":140,"wires":[["5d48ca08.c9c664","edfec9d6.4e066"],["4e8c7759.a6b17"]]},{"id":"c11b7d9c.021958","type":"inject","z":"3f3d6774.cce2f","name":"","props":[{"p":"topic","vt":"str"},{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"ignored","payload":"true","payloadType":"bool","x":190,"y":140,"wires":[["6eed61c1.f7a888"]]},{"id":"3706780.96a0c08","type":"inject","z":"3f3d6774.cce2f","name":"","props":[{"p":"topic","vt":"str"},{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"ignored","payload":"false","payloadType":"bool","x":190,"y":220,"wires":[["6eed61c1.f7a888"]]},{"id":"5d48ca08.c9c664","type":"debug","z":"3f3d6774.cce2f","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"topic","targetType":"msg","statusVal":"payload","statusType":"auto","x":520,"y":80,"wires":[]},{"id":"4e8c7759.a6b17","type":"debug","z":"3f3d6774.cce2f","name":"timer","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"true","targetType":"full","statusVal":"payload","statusType":"auto","x":510,"y":240,"wires":[]},{"id":"edfec9d6.4e066","type":"debug","z":"3f3d6774.cce2f","name":"","active":false,"tosidebar":true,"console":false,"tostatus":true,"complete":"payload","targetType":"msg","statusVal":"payload","statusType":"auto","x":530,"y":140,"wires":[]},{"id":"d9fa71cd.4df948","type":"comment","z":"3f3d6774.cce2f","name":"topic override in timer properties","info":"","x":170,"y":80,"wires":[]}]
```