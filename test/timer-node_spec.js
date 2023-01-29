var should = require("should");
var helper = require("node-red-node-test-helper");
var lowerNode = require("../src/timer-node.js");

helper.init(require.resolve('node-red'));

describe('timer-node node', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', function (done) {
        var flow = [{ id: "n1", type: "timer-node", name: "timer-node" }];
        helper.load(lowerNode, flow, function () {
            var n1 = helper.getNode("n1");
            try {
                n1.should.have.property('name', 'timer-node');
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});