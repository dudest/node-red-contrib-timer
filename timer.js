module.exports = function(RED) {
    "use strict";

    function timer(config) {
        RED.nodes.createNode(this,config);
        
        let node = this;

        // Local variables
        var ticker = null;
        var ticks = -1;
        var timeout = Number.parseInt(config.timer);
        var topic = null;

        if (config.topic) {
            topic = config.topic;
        }

        this.status({ fill: "red", shape: "dot", text: timeout });

        function setTimer(time, msg, send) {
            timeout = time;
            node.status({ fill: "red", shape: "dot", text: timeout });

            if (topic) {
                msg.topic = topic;
            }

            msg.payload = timeout;
            send([null, msg]);
        };

        function startTimer(msg, send) {
            ticks = timeout;
            var payloadOn, stateMsg, clockMsg;

            if (!ticker) {
                ticker = setInterval(function() { node.emit("clockevent", msg); }, 1000);
            }

            node.status({ fill: "green", shape: "dot", text: timeout });

            payloadOn = RED.util.evaluateNodeProperty(config.payloadOn, config.payloadOnType);

            if (topic) {
                msg.topic = topic;
            }

            stateMsg = Object.assign({}, msg);
            clockMsg = Object.assign({}, msg);

            stateMsg.payload = payloadOn;
            clockMsg.payload = timeout;

            send([stateMsg, clockMsg]);
        };

        function stopTimer(msg, send) {
            var payloadOff, stateMsg, clockMsg;

            if (ticker) {
                clearInterval(ticker);
                ticker = null;
            }

            ticks = -1;

            node.status({ fill: "red", shape: "dot", text: timeout });
            
            payloadOff = RED.util.evaluateNodeProperty(config.payloadOff, config.payloadOffType);

            if (topic) {
                msg.topic = topic;
            }

            stateMsg = Object.assign({}, msg);
            clockMsg = Object.assign({}, msg);

            stateMsg.payload = payloadOff;
            clockMsg.payload = timeout;

            send([stateMsg, clockMsg]);
        }

         /***********************************************************************************
         * Event Listeners
         ***********************************************************************************/

        // Update status while running
        this.on("clockevent", function(msg, send) {
            send = send || function() { node.send.apply(node,arguments) }

            if (ticks > 1) {
                ticks--;
                
                this.status({ fill: "green", shape: "dot", text: ticks });

                if (topic) {
                    msg.topic = topic;
                }
                
                msg.payload = ticks;
                send([null, msg]);
            }
            else {
                stopTimer(msg, send);
            }
        });

        // On input
        this.on('input', function (msg, send, done) {
            // For maximum backwards compatibility, check that send exists.
            // If this node is installed in Node-RED 0.x, it will need to
            // fallback to using `node.send`
            send = send || function() { node.send.apply(node,arguments) }

            // pass payload on
            if (Number.isInteger(msg.payload) && msg.payload > 1){
                setTimer(msg.payload, msg, send);
            }
            else if (msg.payload === false) {
                stopTimer(msg, send);
            }
            else if (msg.payload === true) {
                startTimer(msg, send);
            }

            if (done) {
                done();
            }
        });

        // On close
        this.on("close", function(msg, send) {
            stopTimer(msg, send);
        });
    }
    RED.nodes.registerType("timer",timer);
}