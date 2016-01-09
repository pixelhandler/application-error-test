import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'application-error-test/tests/helpers/module-for-acceptance';
import startApp from 'application-error-test/tests/helpers/start-app';
import sinon from 'sinon';

Ember.Test.QUnitAdapter.reopen({
  /*
    This is a hack, throwing an error in a route must use the error.name
    `TransitionAborted`; otherwise, `Test.adapter.exception(error)` inside
    `onerrorDefault` fails tests via the same error that results in rendering
    the application-error template.
  */
  exception: function(error) {
    var makeItPass = false;
    debugger; // FIXME… CHANGE ^ to true to work around bug
    if (makeItPass /* we mocked a 502 so expected an error, it renders the application-error template… */) {
      console.warn('Expected this error, ignoring (no reason to fail a test)…', error);
    } else /* normal behavior… if (error.name !== 'TransitionAborted') */ {
      return this._super.call(this, error);
    }
  }
});

moduleForAcceptance('Acceptance | application-error', {
  beforeEach: function setup() {
    this.sandbox = sinon.sandbox.create();
    setupFakeServer.call(this);
    mockFetchSession.call(this);
    this.application = startApp();
  },
  afterEach: function teardown() {
    Ember.run(this.application, 'destroy');
    this.sandbox.restore();
    delete this.sandbox;
  }
});

test('with a server error, the application-error template renders', function(assert) {
  let done = assert.async();
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/', 'URL is "/"');
    assert.equal(find('.error-message').length, 1, 'Application error template rendered');
    done();
  });
});

function setupFakeServer() {
  this.sandbox.stub(Ember.$, 'ajaxPrefilter');
  this.server = this.sandbox.useFakeServer();
  this.server.autoRespond = true;
}

function mockFetchSession() {
  mockBadGatewayResponse.call(this);
}

function mockBadGatewayResponse() {
  this.server.respondWith('GET', 'api/session', [
    502,
    { 'Content-Type':'text/html; charset=utf-8' },
    `<html>
<head><title>502 Bad Gateway</title></head>
<body><h1 class="error-message-content">Bad Gateway</h1></body>
</html>`
  ]);
}
