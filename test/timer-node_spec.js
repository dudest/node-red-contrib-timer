var should = require("should");
var helper = require("node-red-node-test-helper");
var timerNode = require("../src/timer-node.js");

helper.init(require.resolve('node-red'));

describe('timer-node node', function () {

    beforeEach((done) => {
        helper.startServer(done);
    });

    afterEach((done) => {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', (done) => {
        var flow = [{ id: "n1", type: "timer-node", name: "timer-node" }];
        helper.load(timerNode, flow, () => {
            var n1 = helper.getNode("n1");
            try {
                n1.should.have.property('name', 'timer-node');
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('should pass input msg.topic to output', (done) => {
        var flow = [
            { id: "n1", type: "timer-node", name: "timer-node", wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];
        helper.load(timerNode, flow, () => {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                try {
                    msg.should.have.property('topic', 'input message');
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({ topic: "input message", payload: true });
        });
    });

    it('should override topic when defined in timer-node edit properties dialog', (done) => {
        var flow = [
            { id: "n1", type: "timer-node", name: "timer-node", topic: "override", wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];
        helper.load(timerNode, flow, () => {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                try {
                    msg.should.have.property('topic', 'override');
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({ topic: "input message", payload: true });
        });
    });

    it('should set timer when input is an integer', (done) => {
        var flow = [
            { id: "n1", type: "timer-node", name: "timer-node", timer: 60, wires: [[],["n2"]] },
            { id: "n2", type: "helper" }
        ];
        helper.load(timerNode, flow, () => {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                try {
                    msg.should.have.property('payload', 60);
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({ payload: 60 });
        });
    });
});