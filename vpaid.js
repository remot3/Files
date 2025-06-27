(function() {
  function VPAIDAd() {
    var slot = null;
    var videoSlot = null;
    var eventsCallbacks = {};

    this.handshakeVersion = function(version) {
      return '2.0';
    };

    this.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
      slot = environmentVars.slot;
      videoSlot = environmentVars.videoSlot;

      // Example: create a simple overlay
      var overlay = document.createElement('div');
      overlay.style.width = width + 'px';
      overlay.style.height = height + 'px';
      overlay.style.backgroundColor = 'rgba(255,0,0,0.5)';
      overlay.innerHTML = '<h1>VPAID Ad Loaded</h1>';
      slot.appendChild(overlay);

      // Notify that the ad has loaded and started
      callEvent('AdLoaded');
      callEvent('AdStarted');
    };

    this.startAd = function() {
      callEvent('AdImpression');
      callEvent('AdVideoStart');
    };

    this.stopAd = function() {
      callEvent('AdStopped');
    };

    this.skipAd = function() {
      callEvent('AdSkipped');
    };

    this.resizeAd = function(width, height, viewMode) {};
    this.pauseAd = function() {
      callEvent('AdPaused');
    };
    this.resumeAd = function() {
      callEvent('AdPlaying');
    };
    this.expandAd = function() {
      callEvent('AdExpandedChange');
    };
    this.collapseAd = function() {
      callEvent('AdExpandedChange');
    };

    this.subscribe = function(eventCallback, eventName) {
      eventsCallbacks[eventName] = eventCallback;
    };

    this.unsubscribe = function(eventName) {
      delete eventsCallbacks[eventName];
    };

    function callEvent(eventName) {
      if (eventsCallbacks[eventName]) {
        eventsCallbacks[eventName]();
      }
    }
  }

  // **THIS is the critical bit your error complains about:**
  window.getVPAIDAd = function() {
    return new VPAIDAd();
  };
})();
