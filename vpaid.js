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

      // Draw a simple overlay so we can see something
      var overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = width + 'px';
      overlay.style.height = height + 'px';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.color = 'white';
      overlay.style.fontSize = '20px';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.innerHTML = 'VPAID Ad Loaded';
      slot.appendChild(overlay);

      // Notify player that ad has loaded
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

  window.getVPAIDAd = function() {
    return new VPAIDAd();
  };
})();
