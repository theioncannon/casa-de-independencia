(function(){
	var script = {
 "shadow": false,
 "borderRadius": 0,
 "data": {
  "name": "Player468"
 },
 "scripts": {
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "_initItemWithComps": function(playList, index, components, eventName, visible, effectToApply, delay, restoreStateAt){  var item = playList.get('items')[index]; var registerVisibility = restoreStateAt > 0; var rootPlayer = this.rootPlayer; var cloneEffect = function(visible) { var klass = effectToApply ? effectToApply.get('class') : undefined; var effect = undefined; switch(klass) { case 'FadeInEffect': case 'FadeOutEffect': effect = rootPlayer.createInstance(visible ? 'FadeInEffect' : 'FadeOutEffect'); break; case 'SlideInEffect': case 'SlideOutEffect': effect = rootPlayer.createInstance(visible ? 'SlideInEffect' : 'SlideOutEffect'); break; } if(effect){ effect.set('duration', effectToApply.get('duration')); effect.set('easing', effectToApply.get('easing')); if(klass.indexOf('Slide') != -1) effect.set(visible ? 'from' : 'to', effectToApply.get(visible ? 'from' : 'to')); } return effect; }; var endFunc = function() { for(var i = 0, count = components.length; i<count; ++i) { var component = components[i]; if(restoreStateAt > 0){ this.setComponentVisibility(component, !visible, 0, cloneEffect(!visible)); } else { var key = 'visibility_' + component.get('id'); if(this.existsKey(key)) { if(this.getKey(key)) this.setComponentVisibility(component, true, 0, cloneEffect(true)); else this.setComponentVisibility(component, false, 0, cloneEffect(false)); this.unregisterKey(key); } } } item.unbind('end', endFunc, this); if(addMediaEndEvent) media.unbind('end', endFunc, this); }; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); for(var i = 0, count = components.length; i<count; ++i) { this.keepCompVisible(components[i], false); } }; var addEvent = function(eventName, delay, restoreStateAt){ var changeFunc = function(){ var changeVisibility = function(component, visible, effect) { rootPlayer.setComponentVisibility(component, visible, delay, effect, visible ? 'showEffect' : 'hideEffect', false); if(restoreStateAt > 0){ var time = delay + restoreStateAt + (effect != undefined ? effect.get('duration') : 0); rootPlayer.setComponentVisibility(component, !visible, time, cloneEffect(!visible), visible ? 'hideEffect' : 'showEffect', true); } }; for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; if(visible == 'toggle'){ if(!component.get('visible')) changeVisibility(component, true, cloneEffect(true)); else changeVisibility(component, false, cloneEffect(false)); } else { changeVisibility(component, visible, cloneEffect(visible)); } } item.unbind(eventName, changeFunc, this); }; item.bind(eventName, changeFunc, this) }; if(eventName == 'begin'){ for(var i = 0, count = components.length; i<count; ++i){ var component = components[i]; this.keepCompVisible(component, true); if(registerVisibility) { var key = 'visibility_' + component.get('id'); this.registerKey(key, component.get('visible')); } } item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); if(registerVisibility){ item.bind('end', endFunc, this); var media = item.get('media'); var addMediaEndEvent = media.get('loop') != undefined && !(media.get('loop')); if(addMediaEndEvent) media.bind('end', endFunc, this); } } else if(eventName == 'end' && restoreStateAt > 0){ addEvent('begin', restoreStateAt, 0); restoreStateAt = 0; } if(eventName != undefined) addEvent(eventName, delay, restoreStateAt); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData){ audio = audioData.audio; delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios).map(function(v) { return v.audio })); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext, true); }; playNext(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; } return audio; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "_getPlayListsWithViewer": function(viewer){  var playLists = this.getByClassName('PlayList'); var containsViewer = function(playList) { var items = playList.get('items'); for(var j=items.length-1; j>=0; --j) { var item = items[j]; var player = item.get('player'); if(player !== undefined && player.get('viewerArea') == viewer) return true; } return false; }; for(var i=playLists.length-1; i>=0; --i) { if(!containsViewer(playLists[i])) playLists.splice(i, 1); } return playLists; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "playGlobalAudio": function(audio, endCallback, asBackground){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = {'audio': audio, 'asBackground': asBackground || false}; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareSocial": function(socialID, url, deepLink){  if(url == undefined) { url = deepLink ? location.href : location.href.split(location.search||location.hash||/[?#]/)[0]; } else if(deepLink) { url += location.hash; } url = (function(id){ switch(id){ case 'fb': return 'https://www.facebook.com/sharer/sharer.php?u='+url; case 'wa': return 'https://api.whatsapp.com/send/?text='+encodeURIComponent(url); case 'tw': return 'https://twitter.com/intent/tweet?source=webclient&url='+url; default: return undefined; } })(socialID); this.openLink(url, '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')].audio; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "stopGlobalAudios": function(onlyForeground){  var audios = window.currentGlobalAudios; var self = this; if(audios){ Object.keys(audios).forEach(function(key){ var data = audios[key]; if(!onlyForeground || (onlyForeground && !data.asBackground)) { self.stopGlobalAudio(data.audio); } }); } },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "registerTextVariable": function(obj){  var property = (function() { switch (obj.get('class')) { case 'Label': return 'text'; case 'Button': case 'BaseButton': return 'label'; case 'HTMLText': return 'html'; } })(); if (property == undefined) return; var re = new RegExp('\\{\\{\\s*(\\w+)\\s*\\}\\}', 'g'); var text = obj.get(property); var data = obj.get('data') || {}; data[property] = text; obj.set('data', data); var updateLabel = function(vars) { var text = data[property]; for (var i = 0; i < vars.length; ++i) { var info = vars[i]; var dispatchers = info.dispatchers; for (var j = 0; j < dispatchers.length; ++j) { var dispatcher = dispatchers[j]; var index = dispatcher.get('selectedIndex'); if (index >= 0) { var srcPropArray = info.src.split('.'); var src = dispatcher.get('items')[index]; if(src == undefined || (info.itemCondition !== undefined && !info.itemCondition.call(this, src))) continue; for (var z = 0; z < srcPropArray.length; ++z) src = 'get' in src ? src.get(srcPropArray[z]) : src[srcPropArray[z]]; text = text.replace(info.replace, src); } } } if(text != data[property]) obj.set(property, text); }; var vars = []; var addVars = function(dispatchers, eventName, src, replace, itemCondition) { vars.push({ 'dispatchers': dispatchers, 'eventName': eventName, 'src': src, 'replace': replace, 'itemCondition': itemCondition }); }; var viewerAreaItemCondition = function(item) { var player = item.get('player'); return player !== undefined && player.get('viewerArea') == this.MainViewer; }; while (null != (result = re.exec(text))) { switch (result[1]) { case 'title': var playLists = this._getPlayListsWithViewer(this.MainViewer); addVars(playLists, 'change', 'media.label', result[0], viewerAreaItemCondition); break; case 'subtitle': var playLists = this._getPlayListsWithViewer(this.MainViewer); addVars(playLists, 'change', 'media.data.subtitle', result[0], viewerAreaItemCondition); break; } } if (vars.length > 0) { var func = updateLabel.bind(this, vars); for (var i = 0; i < vars.length; ++i) { var info = vars[i]; var dispatchers = info.dispatchers; for (var j = 0; j < dispatchers.length; ++j) dispatchers[j].bind(info.eventName, func, this); } } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback);  },
  "unregisterKey": function(key){  delete window[key]; },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getKey": function(key){  return window[key]; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ var audioData = audios[audio.get('id')]; if(audioData) audio = audioData.audio; } if(audio.get('state') == 'playing') audio.pause(); },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } }
 },
 "id": "rootPlayer",
 "vrPolyfillScale": 0.5,
 "paddingLeft": 0,
 "paddingRight": 0,
 "left": 577.55,
 "mouseWheelEnabled": true,
 "width": "100%",
 "children": [
  "this.MainViewer_mobile",
  "this.Container_D9918C9B_FCCD_6EDC_41E2_AA1B6A64F142",
  "this.Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174_mobile",
  "this.Container_BD141CC8_9478_145B_41D4_265F47E47DB6_mobile",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15_mobile",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7_mobile",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E_mobile",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "buttonToggleFullscreen": "this.IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57_mobile",
 "gap": 10,
 "mobileMipmappingEnabled": false,
 "backgroundPreloadEnabled": true,
 "minHeight": 20,
 "desktopMipmappingEnabled": false,
 "borderSize": 0,
 "start": "this['MainViewer'] = this.MainViewer_mobile; this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_6658D838_74AF_8B5A_41D7_154D466041BB_mobile], 'gyroscopeAvailable'); this.syncPlaylists([this.mainPlayList,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist]); if(!this.get('fullscreenAvailable')) { [this.IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57_mobile].forEach(function(component) { component.set('visible', false); }) }",
 "buttonToggleMute": "this.IconButton_6658C838_74AF_8B5A_418E_C797984D8CAE_mobile",
 "contentOpaque": false,
 "creationPolicy": "inAdvance",
 "height": "100%",
 "scrollBarOpacity": 0.5,
 "definitions": [{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 692
   }
  ]
 },
 "pitch": 21.06,
 "popupMaxWidth": "95%",
 "yaw": 139.87,
 "hfov": 5.31,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_12_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_12",
 "height": 1555,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_12.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15_mobile, true, 0, null, null, false)",
 "id": "Button_7DB33382_7065_343F_41B1_0B0F019C1828_mobile",
 "pressedBackgroundOpacity": 1,
 "paddingLeft": 10,
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "iconBeforeLabel": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "fontSize": "30px",
 "minHeight": 1,
 "fontWeight": "normal",
 "borderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "mode": "push",
 "height": 60,
 "backgroundColorDirection": "vertical",
 "label": "Lista de Perspectivas",
 "fontStyle": "italic",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "paddingBottom": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconHeight": 32,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "shadowSpread": 1,
 "data": {
  "name": "Button Panorama List"
 },
 "iconWidth": 32,
 "cursor": "hand",
 "class": "Button",
 "paddingTop": 0
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": 30,
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 30,
 "propagateClick": false,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57_pressed.png",
 "data": {
  "name": "IconButton Fullscreen"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "id": "ImageResource_D076B6B1_FCC4_DAED_41D0_D6EE1ADD9349",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1520
  },
  {
   "url": "media/popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 810
  },
  {
   "url": "media/popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 405
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "- COLLAPSE"
 },
 "children": [
  "this.Container_7FF195EF_706F_7FC6_41D7_A104CA87824D_mobile",
  "this.IconButton_7FF185EF_706F_7FC6_41A5_21B418265412_mobile"
 ],
 "id": "Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 66,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "propagateClick": true,
 "height": "100%",
 "verticalAlign": "top",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "shadow": false,
 "maxHeight": 1000,
 "backgroundOpacity": 0,
 "id": "Image_BD15FCC8_9478_145B_41DA_B306F52E3FCF_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 2000,
 "width": "100%",
 "url": "skin/Image_BD15FCC8_9478_145B_41DA_B306F52E3FCF.jpg",
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "minWidth": 1,
 "horizontalAlign": "center",
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "scaleMode": "fit_outside",
 "verticalAlign": "middle",
 "data": {
  "name": "Image"
 },
 "class": "Image",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 165.68,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F38037EF_FCB7_7E91_41E6_34F521860343",
 "id": "camera_F38027EF_FCB7_7E91_41EB_23D948F420A7",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_30_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_30",
 "height": 1920,
 "width": 1484,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_30.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_23_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_23",
 "height": 630,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_23.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_6658C838_74AF_8B5A_418E_C797984D8CAE_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_6658C838_74AF_8B5A_418E_C797984D8CAE.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": 30,
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 30,
 "propagateClick": false,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_6658C838_74AF_8B5A_418E_C797984D8CAE_pressed.png",
 "data": {
  "name": "IconButton Sound"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:0.42vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.41vw;font-family:'Oswald';\"><B><I>Museo Casa de la Independencia</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.61vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.61vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.9vw;\">Esta casa tiene una importancia hist\u00f3rica ya que los principales protagonistas de la independencia del pa\u00eds la usaron como sede secreta de reuniones..</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.9vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.9vw;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.9vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.9vw;\">Un lugar de referencia en el circuito hist\u00f3rico asunceno y nacional, y sin duda es el sitio m\u00e1s representativo de la independencia paraguaya de Espa\u00f1a, en mayo de 1811.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.9vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.9vw;\">La Casa de la Independencia se halla ubicada en el microcentro de Asunci\u00f3n, sitio que puede ser visitado diariamente y donde se atesoran hist\u00f3ricos documentos y objetos.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.9vw;\"><BR STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-size:0.38vw;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.9vw;\">Restaurado y enriquecido su museo con mobiliarios, pinturas y retratos, y enseres de la \u00e9poca, frecuentarla resulta una experiencia gratificante, especialmente para todo aquel que desee sentir y conocer de cerca el legado hist\u00f3rico de tan valioso patrimonio nacional.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "HTMLText_BD15BCC8_9478_145B_41A0_1BDCC9E92EE8_mobile",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 20,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText"
 },
 "class": "HTMLText",
 "paddingTop": 0
},
{
 "shadow": false,
 "maxHeight": 50,
 "maxWidth": 50,
 "backgroundOpacity": 0,
 "id": "IconButton_7FF185EF_706F_7FC6_41A5_21B418265412_mobile",
 "left": 10,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "width": 44,
 "rollOverIconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412_rollover.png",
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "top": "40%",
 "minWidth": 1,
 "bottom": "40%",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "propagateClick": true,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton arrow"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F6CC79A7_FBDD_B6F4_41EA_8A9A052A088D",
 "id": "panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 660
   }
  ]
 },
 "pitch": -9.04,
 "popupMaxWidth": "95%",
 "yaw": -83.22,
 "hfov": 4.23,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_42_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_42",
 "height": 1920,
 "width": 1347,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_42.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 704
   }
  ]
 },
 "pitch": -21.08,
 "popupMaxWidth": "95%",
 "yaw": 40.3,
 "hfov": 2.66,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117_0_2.jpg",
    "width": 732,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 4.96,
 "popupMaxWidth": "95%",
 "yaw": 3.72,
 "hfov": 4.01,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "right": 20,
 "width": "100%",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "top": 20,
 "minWidth": 50,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "horizontalAlign": "right",
 "propagateClick": false,
 "height": "36.14%",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "items": [
  {
   "begin": "this.MainViewer_mobileMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_DCC1FA23_FCCF_D5EC_41D1_722E2E747768",
   "player": "this.MainViewer_mobileMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_ED01F725_FCB7_7F91_41CF_E59E623A1213",
 "class": "PlayList"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "--STICKER"
 },
 "children": [
  "this.Container_D99E7C9B_FCCD_6EDC_41E0_22BCD02D7B34",
  "this.Label_D99E6C9B_FCCD_6EDC_41EA_75F8B0FF42EA",
  "this.Label_D9919C9B_FCCD_6EDC_41D0_8F2AFF273DAB"
 ],
 "id": "Container_D9918C9B_FCCD_6EDC_41E2_AA1B6A64F142",
 "left": "9.04%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 385.45,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "1.62%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": 116,
 "propagateClick": true,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "overflow": "visible",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "id": "ImageResource_D07BC6AC_FCC4_DAFB_41E5_29B24972E22B",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2849
  },
  {
   "url": "media/popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01_0_1.jpg",
   "width": 1380,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01_0_2.jpg",
   "width": 690,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01_0_3.jpg",
   "width": 345,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "id": "ImageResource_D07336B6_FCC4_DAD7_41E4_ED4B54C6C282",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2076
  },
  {
   "url": "media/popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6_0_1.jpg",
   "width": 1894,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6_0_2.jpg",
   "width": 947,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6_0_3.jpg",
   "width": 473,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_4_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_4",
 "height": 1239,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_4.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D07CF6AC_FCC4_DAFB_41D8_6D4B90012D8E",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1310
  },
  {
   "url": "media/popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 698
  },
  {
   "url": "media/popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 349
  }
 ]
},
{
 "label": "Sala 2 - Comedor",
 "id": "panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 134.08,
   "yaw": 162.23,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8"
  },
  {
   "backwardYaw": -14.32,
   "yaw": 106.06,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "thumbnailUrl": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_t.jpg",
 "class": "Panorama",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F594B0CD_FBFB_D6B4_41E7_DC2DD57AC252",
  "this.overlay_F56089F4_FBFB_D654_41E9_2D4C5859AEBB",
  "this.overlay_EFAB844F_FC45_BDB5_41E4_ECF424A56C9A",
  "this.popup_E8629788_FC45_7ABC_41A3_77198BE3A023",
  "this.overlay_EF3995FF_FC44_DE54_41DC_9A572E902CDB",
  "this.popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6",
  "this.overlay_E80787EC_FC4B_BA74_41DC_0FD74858E960",
  "this.popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387",
  "this.overlay_E6FD8896_FC4C_F6D4_41E0_1D664DAB999B",
  "this.overlay_E8639E60_FC4D_EA6C_41DE_F9946B556B02",
  "this.overlay_DB9EF065_FCCD_7675_41E9_E39AF0125BAE",
  "this.popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC",
  "this.overlay_D432A048_FCCD_B5BC_41D2_8A9474CE7993",
  "this.popup_D4BA825C_FCCD_5A54_41DD_01A757646D24",
  "this.overlay_D4FBFA2D_FCCC_B5F5_41C1_8C7221068584",
  "this.popup_D5750800_FCCC_F5AC_41C7_52033C261DF8",
  "this.overlay_D4116ACF_FCCB_6AB4_4143_60FB0B27D152",
  "this.popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C",
  "this.overlay_D0899973_FC45_766C_41E4_D9CE2308350A"
 ]
},
{
 "id": "ImageResource_D06036C5_FCC4_DAB5_41CC_D3AFB22A2043",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_DC446CB1_FCCC_AEED_41BC_38524039B807_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1299
  },
  {
   "url": "media/popup_DC446CB1_FCCC_AEED_41BC_38524039B807_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 692
  },
  {
   "url": "media/popup_DC446CB1_FCCC_AEED_41BC_38524039B807_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 346
  }
 ]
},
{
 "id": "ImageResource_D042D6A7_FCC4_DAF5_41CC_23A90E02F5A7",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1515
  },
  {
   "url": "media/popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 808
  },
  {
   "url": "media/popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 404
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -8.11,
 "popupMaxWidth": "95%",
 "yaw": -90.91,
 "hfov": 4.24,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D06496C0_FCC4_DAAB_41E4_81E880695400",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1549
  },
  {
   "url": "media/popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 826
  },
  {
   "url": "media/popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 413
  }
 ]
},
{
 "label": "Sala 6 - Sal\u00f3n Capitular",
 "id": "panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -28.17,
   "yaw": 179.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6"
  },
  {
   "backwardYaw": 69.3,
   "yaw": 64.52,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F61FD71C_FBC5_BBD4_41DE_AE4459ED05F9",
  "this.overlay_F63EFD6B_FBC5_AE7D_41C8_674DE02281B7",
  "this.overlay_F62A29B2_FBC5_76EF_41D1_EA74A3F07495",
  "this.overlay_DCF25246_FCCB_D5B7_41E9_0C9AA58DACAB",
  "this.overlay_D96460C4_FCCC_F6AB_41E0_F8156CFD09E9",
  "this.popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117",
  "this.overlay_E3122659_FCCD_7A5C_41CD_DA64A985476C",
  "this.overlay_E368EF4C_FCCD_EBB4_41E2_4B692F6EB75B",
  "this.popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132",
  "this.overlay_E3CFC787_FCCD_5AB5_4171_7829632CB7E5",
  "this.popup_DC446CB1_FCCC_AEED_41BC_38524039B807",
  "this.overlay_DC747649_FCCC_DDBC_41D8_246B56A6B0C9",
  "this.popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD",
  "this.overlay_E39DC698_FCCF_BADB_41D8_79C67EAB3173",
  "this.popup_E33285D5_FCCF_5E55_41ED_476D2B398123",
  "this.overlay_DC19D8FF_FCCC_D655_41EB_5B53E7CB60A5",
  "this.popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782"
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F6CDB9A7_FBDD_B6F4_41EE_A2EFA05EC171",
 "id": "panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D4168468_FCCB_7E7C_41EE_072C41F57617",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D4168468_FCCB_7E7C_41EE_072C41F57617_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 685
   }
  ]
 },
 "pitch": -11,
 "popupMaxWidth": "95%",
 "yaw": -119.8,
 "hfov": 4.21,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": 13.08,
 "popupMaxWidth": "95%",
 "yaw": -8.07,
 "hfov": 4.17,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container text"
 },
 "children": [
  "this.HTMLText_BD15BCC8_9478_145B_41A0_1BDCC9E92EE8_mobile"
 ],
 "id": "Container_BD15ACC8_9478_145B_41C2_6D37AD97A48D_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "vertical",
 "scrollBarColor": "#E73B2C",
 "gap": 10,
 "minHeight": 300,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 100,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "left",
 "height": "100%",
 "paddingBottom": 10,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "label": "Callej\u00f3n Hist\u00f3rico 2",
 "id": "panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C",
 "pitch": 0,
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F58EC2E7_FBC5_FA74_41B8_26DD4059C9AD"
 ]
},
{
 "id": "ImageResource_C84D2450_FCC4_DDAC_41B6_9225C3910001",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D5247812_FCC4_B5AC_41EE_0229C647C73C_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1314
  },
  {
   "url": "media/popup_D5247812_FCC4_B5AC_41EE_0229C647C73C_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 700
  },
  {
   "url": "media/popup_D5247812_FCC4_B5AC_41EE_0229C647C73C_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ]
},
{
 "label": "Entrada Principal",
 "id": "panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -102.77,
   "yaw": -8.32,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F63C16F5_FBFD_5A55_41E9_6B284299FB49",
  "this.overlay_EA192255_FBC4_DA54_41E4_BBAB6653638B",
  "this.overlay_E9AC76C9_FBC5_7ABC_41EE_D47D1EC8E147",
  "this.overlay_DF85BFBA_FCC7_EADC_41E9_4CA90FA04329",
  "this.overlay_E32B8923_FCC7_B7ED_41E6_C5A231594F08",
  "this.popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52",
  "this.popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8",
  "this.overlay_D5709FA9_FCC5_AAFD_41C9_50815E4FE10C",
  "this.popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452",
  "this.overlay_D194A51C_FC45_DFDB_41E9_8E41A356B6CE"
 ]
},
{
 "label": "Sala 5 - Sala Religiosa",
 "id": "panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E",
 "pitch": 0,
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F60BC014_FBC4_D5D4_41E1_614725C6F3A1",
  "this.overlay_D4B73E41_FCCB_ADAC_41ED_C24BBE29724A",
  "this.popup_D4168468_FCCB_7E7C_41EE_072C41F57617",
  "this.overlay_D402E850_FCC4_F5AD_41E3_FB35FEA72AE4",
  "this.overlay_D4B06F6E_FCC4_AA77_41E2_2A1820C2FDA7",
  "this.overlay_D48DF991_FCC4_B6AC_41C1_C3ED2FB592CD",
  "this.popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051",
  "this.popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F",
  "this.popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C",
  "this.overlay_D560A534_FCC4_DFEB_41C0_332750517CA9",
  "this.popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39",
  "this.overlay_D408D447_FCC4_BDB4_41B0_B3E0AE0A4F5A",
  "this.popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7",
  "this.overlay_D4B48622_FCC7_DDEF_41E5_9B438C676ED0",
  "this.popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6",
  "this.overlay_D4BBB388_FCC7_7ABB_41E2_603F6A64BEAF",
  "this.popup_D5247812_FCC4_B5AC_41EE_0229C647C73C"
 ]
},
{
 "borderRadius": 0,
 "data": {
  "name": "Global"
 },
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA_mobile",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile"
 ],
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528_mobile",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "layout": "absolute",
 "shadowBlurRadius": 25,
 "borderSize": 0,
 "shadowOpacity": 0.3,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "10%",
 "creationPolicy": "inAdvance",
 "shadowVerticalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "class": "Container",
 "shadow": true,
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "id": "ImageResource_D04796A2_FCC4_DAF0_41C9_FFD605738217",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1239
  },
  {
   "url": "media/popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 660
  },
  {
   "url": "media/popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 330
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_13_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_13",
 "height": 1520,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_13.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.7,
 "data": {
  "name": "Container"
 },
 "children": [
  "this.Image_7DB3C373_7065_34DE_41BA_CF5206137DED_mobile",
  "this.Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3_mobile",
  "this.Container_7DBCC382_7065_343F_41D5_9D3C36B5F479_mobile"
 ],
 "id": "Container_7DB20382_7065_343F_4186_6E0B0B3AFF36_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 40,
 "paddingRight": 40,
 "width": 420,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": "100%",
 "paddingBottom": 40,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 40
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F6CDD9A6_FBDD_B6F4_41E8_04C5DF106EE6",
 "id": "panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBottom": 0,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "width": "100%",
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowVerticalLength": 0,
 "minHeight": 1,
 "borderSize": 0,
 "toolTipBorderRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "vrPointerSelectionTime": 2000,
 "progressBorderSize": 0,
 "minWidth": 1,
 "playbackBarHeadWidth": 6,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarBorderRadius": 0,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontWeight": "normal",
 "height": "100%",
 "propagateClick": false,
 "shadow": false,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderSize": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontFamily": "Arial",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "transitionDuration": 500,
 "progressRight": 0,
 "playbackBarRight": 0,
 "toolTipPaddingTop": 4,
 "progressHeight": 10,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipFontSize": 12,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "borderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadBorderRadius": 0,
 "progressBackgroundOpacity": 1,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "paddingRight": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarOpacity": 1,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarLeft": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipOpacity": 1,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBorderSize": 0,
 "top": "0%",
 "progressBarOpacity": 1,
 "progressBorderRadius": 0,
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipPaddingRight": 6,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowColor": "#333333",
 "vrPointerColor": "#FFFFFF",
 "progressBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "paddingBottom": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "toolTipShadowOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipShadowSpread": 0,
 "transitionMode": "blending",
 "paddingTop": 0
},
{
 "label": "Callej\u00f3n Hist\u00f3rico 1",
 "id": "panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C"
  },
  {
   "backwardYaw": -97.14,
   "yaw": 179.83,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F5DEF75B_FBC5_DA5D_41BA_72BFE88407FA",
  "this.overlay_DCD0DF5D_FCC5_EA55_41BA_971F04C7138A",
  "this.overlay_DD490C9C_FCC4_EEDB_41EA_BF1F804E63C1"
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 657
   }
  ]
 },
 "pitch": -5.28,
 "popupMaxWidth": "95%",
 "yaw": 52.55,
 "hfov": 3.76,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_16_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_16",
 "height": 2852,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_16.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_8_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_8",
 "height": 2675,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_8.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "touchControlMode": "drag_rotation",
 "buttonToggleHotspots": "this.IconButton_6658F838_74AF_8B5A_41C1_8DA59962CFF4_mobile",
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer_mobile",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": "this.IconButton_66589837_74AF_8B56_41D7_A6F4FAC02CC3_mobile",
 "id": "MainViewer_mobilePanoramaPlayer",
 "mouseControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_6658D838_74AF_8B5A_41D7_154D466041BB_mobile"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.4,
 "data": {
  "name": "Container black"
 },
 "id": "Container_7FF195EF_706F_7FC6_41D7_A104CA87824D_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 36,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": "100%",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "id": "ImageResource_D215998F_FCFB_B6B5_41B1_A767589F3295",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1232
  },
  {
   "url": "media/popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 657
  },
  {
   "url": "media/popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 328
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_24_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_24",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_24.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "label": "Sala 3 - Sala de Lujo",
 "id": "panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 162.23,
   "yaw": 134.08,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719"
  },
  {
   "backwardYaw": -144.8,
   "yaw": -33.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F61A48EB_FBFB_B67C_41E2_18DB578B22B4",
  "this.overlay_F5E0AF7C_FBFB_AA5B_41EE_148B5CD6BCCE",
  "this.overlay_EFCD27A0_FC4C_BAEC_41CE_C6D1E60ECD02",
  "this.overlay_EA18425B_FC4F_5A5D_41EA_4467C759CDD2",
  "this.overlay_E847EE11_FC4D_ADAC_41E0_F3971B354CD4",
  "this.popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232",
  "this.overlay_E867271C_FC4D_7BD4_41E0_2083DE6221D2",
  "this.popup_E919807C_FC4C_D654_41D1_908AE02778D1",
  "this.overlay_E844E1E9_FC4C_B67C_41EB_C8F9C1133DF6",
  "this.popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209",
  "this.overlay_E9F907BB_FC4B_5ADC_41E5_95A41CEF2563",
  "this.popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1",
  "this.overlay_E91D07AC_FC45_5AF4_41CF_49FB71E927DC",
  "this.overlay_E9CA1114_FC45_57AB_41CF_560020E79AEA",
  "this.popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A",
  "this.overlay_EA22904C_FC44_B5B4_41C1_8566164FC4BF",
  "this.popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111",
  "this.overlay_E9CD0D18_FC44_AFDB_41CE_EC56C633FE23",
  "this.popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760",
  "this.popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9",
  "this.overlay_D79DF08C_FC4C_B6B4_41D6_44984BC080C1"
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "data": {
  "name": "-left"
 },
 "children": [
  "this.Image_BD15FCC8_9478_145B_41DA_B306F52E3FCF_mobile"
 ],
 "id": "Container_BD15ECC8_9478_145B_41CB_7D871BE75B47_mobile",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "85%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "center",
 "height": "100%",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F70949A9_FBDD_B6FC_41DA_D4A831467966",
 "id": "panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "fieldOfViewOverlayRadiusScale": 0.3,
 "maximumZoomFactor": 1.2,
 "thumbnailUrl": "media/map_DCC1FA23_FCCF_D5EC_41D1_722E2E747768_t.jpg",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_DCC1FA23_FCCF_D5EC_41D1_722E2E747768.jpeg",
    "width": 1920,
    "class": "ImageResourceLevel",
    "height": 1232
   },
   {
    "url": "media/map_DCC1FA23_FCCF_D5EC_41D1_722E2E747768_lq.jpeg",
    "width": 319,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 205
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "label": "IMG_6240_1",
 "id": "map_DCC1FA23_FCCF_D5EC_41D1_722E2E747768",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "width": 1920,
 "height": 1232,
 "fieldOfViewOverlayInsideOpacity": 0.4
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_mobile",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": "25%",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "propagateClick": false,
 "height": "75%",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -2.18,
 "popupMaxWidth": "95%",
 "yaw": 16.14,
 "hfov": 2.85,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_6658F838_74AF_8B5A_41C1_8DA59962CFF4_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_6658F838_74AF_8B5A_41C1_8DA59962CFF4.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": 30,
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 30,
 "propagateClick": false,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_6658F838_74AF_8B5A_41C1_8DA59962CFF4_pressed.png",
 "data": {
  "name": "IconButton Hs visibility"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D4BA825C_FCCD_5A54_41DD_01A757646D24",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D4BA825C_FCCD_5A54_41DD_01A757646D24_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 488
   }
  ]
 },
 "pitch": -7.1,
 "popupMaxWidth": "95%",
 "yaw": 62.31,
 "hfov": 3.39,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D07026B6_FCC4_DAD7_41EC_A09C50AE38CA",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232_0_0.jpg",
   "width": 1521,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232_0_1.jpg",
   "width": 811,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232_0_2.jpg",
   "width": 405,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "line"
 },
 "id": "Container_7DBCB382_7065_343F_41D8_AB382D384291_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": 1,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "shadow": false,
 "fontFamily": "Cinzel Bold",
 "backgroundOpacity": 0,
 "id": "Label_D9919C9B_FCCD_6EDC_41D0_8F2AFF273DAB",
 "left": 4,
 "paddingLeft": 3,
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "borderRadius": 0,
 "width": 354.3,
 "fontWeight": "normal",
 "minHeight": 1,
 "text": "CASA DE INDEPENDENCIA",
 "borderSize": 0,
 "textShadowHorizontalLength": 0,
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "bottom": 20.05,
 "textShadowBlurRadius": 10,
 "height": 44,
 "fontStyle": "normal",
 "propagateClick": true,
 "fontSize": 26,
 "paddingBottom": 0,
 "textShadowOpacity": 1,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "textShadowVerticalLength": 0,
 "data": {
  "name": "text 2"
 },
 "horizontalAlign": "center",
 "class": "Label",
 "paddingTop": 3
},
{
 "id": "ImageResource_D07426B6_FCC4_DAD7_41ED_F5A38086658D",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E8629788_FC45_7ABC_41A3_77198BE3A023_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1586
  },
  {
   "url": "media/popup_E8629788_FC45_7ABC_41A3_77198BE3A023_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 845
  },
  {
   "url": "media/popup_E8629788_FC45_7ABC_41A3_77198BE3A023_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 422
  }
 ]
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_6658D838_74AF_8B5A_41D7_154D466041BB_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_6658D838_74AF_8B5A_41D7_154D466041BB.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": 34,
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 34,
 "propagateClick": false,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_6658D838_74AF_8B5A_41D7_154D466041BB_pressed.png",
 "data": {
  "name": "IconButton Gyroscopic"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_mobile",
 "id": "MainViewer_mobilePhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_mobile",
 "viewerArea": "this.MainViewer_mobile"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "data": {
  "name": "-right"
 },
 "children": [
  "this.Container_BD159CC8_9478_145B_41AA_EFEDE92BF07B_mobile",
  "this.Container_BD15ACC8_9478_145B_41C2_6D37AD97A48D_mobile"
 ],
 "id": "Container_BD158CC8_9478_145B_41B5_3F260A00D36A_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 50,
 "paddingRight": 50,
 "width": "50%",
 "layout": "vertical",
 "scrollBarColor": "#0069A3",
 "gap": 0,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 460,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "left",
 "height": "100%",
 "paddingBottom": 20,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 20
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.6,
 "data": {
  "name": "--INFO photo"
 },
 "children": [
  "this.Container_BD15DCC8_9478_145B_41E1_35766BBBD98F_mobile",
  "this.Container_BD147CC8_9478_145B_41E1_A1505134A3C3_mobile"
 ],
 "id": "Container_BD141CC8_9478_145B_41D4_265F47E47DB6_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "click": "this.setComponentVisibility(this.Container_BD141CC8_9478_145B_41D4_265F47E47DB6_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "propagateClick": true,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container space"
 },
 "id": "Container_BD159CC8_9478_145B_41AA_EFEDE92BF07B_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "gap": 0,
 "minHeight": 0,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "right",
 "height": 50,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 20
},
{
 "shadow": false,
 "fontFamily": "Cinzel Bold",
 "backgroundOpacity": 0,
 "id": "Label_D99E6C9B_FCCD_6EDC_41EA_75F8B0FF42EA",
 "left": 0,
 "paddingLeft": 3,
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "borderRadius": 0,
 "width": 222.15,
 "fontWeight": "bold",
 "minHeight": 1,
 "text": "MUSEO",
 "borderSize": 0,
 "textShadowHorizontalLength": 0,
 "fontColor": "#FFFFFF",
 "top": 5,
 "minWidth": 1,
 "textShadowBlurRadius": 10,
 "height": 57.05,
 "fontStyle": "normal",
 "propagateClick": true,
 "fontSize": "50px",
 "paddingBottom": 0,
 "textShadowOpacity": 1,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "textShadowVerticalLength": 0,
 "data": {
  "name": "text 1"
 },
 "class": "Label",
 "horizontalAlign": "center",
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.6,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536_mobile"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "propagateClick": true,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "-Container settings"
 },
 "children": [
  "this.IconButton_66589837_74AF_8B56_41D7_A6F4FAC02CC3_mobile",
  "this.IconButton_6658E837_74AF_8B56_41B5_2A29A6498E57_mobile",
  "this.IconButton_6658F838_74AF_8B5A_41C1_8DA59962CFF4_mobile",
  "this.IconButton_6658C838_74AF_8B5A_418E_C797984D8CAE_mobile",
  "this.IconButton_6658D838_74AF_8B5A_41D7_154D466041BB_mobile"
 ],
 "scrollBarWidth": 10,
 "id": "Container_66588837_74AF_8B56_41CA_E204728E8E6C_mobile",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "gap": 16,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": 40,
 "horizontalAlign": "center",
 "propagateClick": false,
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "verticalAlign": "middle",
 "overflow": "scroll",
 "class": "Container",
 "paddingTop": 0
},
{
 "buttonNext": "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_mobile",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobilePhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_mobile",
 "viewerArea": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobile"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "insetBorder": false,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA_mobile",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollEnabled": true,
 "width": "100%",
 "url": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14430.811349755471!2d-57.6363366!3d-25.28058!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7fd4b0b8abaed399!2sCasa%20de%20la%20Independencia!5e0!3m2!1ses-419!2spy!4v1589073110591!5m2!1ses-419!2spy",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "class": "WebFrame",
 "paddingTop": 0
},
{
 "id": "ImageResource_D071F6B6_FCC4_DAD7_41E1_066535F06347",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387_0_0.jpg",
   "width": 1500,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387_0_1.jpg",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387_0_2.jpg",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_26_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_26",
 "height": 1920,
 "width": 1521,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_26.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F70689A9_FBDD_B6FC_41D9_6F3EAA3C4516",
 "id": "panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "id": "ImageResource_D06AD6BB_FCC4_DADD_41D9_C4BED0556926",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111_0_0.jpg",
   "width": 1347,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111_0_1.jpg",
   "width": 718,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111_0_2.jpg",
   "width": 359,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "id": "ImageResource_D04086AC_FCC4_DAFB_41C2_566E6CFE3444",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1320
  },
  {
   "url": "media/popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 704
  },
  {
   "url": "media/popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 352
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D5247812_FCC4_B5AC_41EE_0229C647C73C",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D5247812_FCC4_B5AC_41EE_0229C647C73C_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 700
   }
  ]
 },
 "pitch": -26.8,
 "popupMaxWidth": "95%",
 "yaw": 40.29,
 "hfov": 3.17,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "line"
 },
 "id": "Container_7DB32382_7065_343F_419E_6594814C420F_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": 1,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_9_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_9",
 "height": 1715,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_9.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_32_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_32",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_32.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F706A9A8_FBDD_B6FC_41BE_3724C6EAF811",
 "id": "panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E978760D_FC5D_5DB5_41A3_547496AB76C2",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E978760D_FC5D_5DB5_41A3_547496AB76C2_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 774
   }
  ]
 },
 "pitch": 13.91,
 "popupMaxWidth": "95%",
 "yaw": -37.41,
 "hfov": 4.16,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF_mobile",
 "rollOverIconURL": "skin/IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF_rollover.jpg",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": "25%",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_BD141CC8_9478_145B_41D4_265F47E47DB6_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "propagateClick": false,
 "height": "75%",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF_pressed.jpg",
 "data": {
  "name": "X"
 },
 "pressedRollOverIconURL": "skin/IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF_pressed_rollover.jpg",
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "Container photo"
 },
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobile",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_mobile",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_mobile",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_mobile"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "left",
 "height": "100%",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_28_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_28",
 "height": 1920,
 "width": 1494,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_28.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "-Container footer"
 },
 "children": [
  "this.Container_7DB2F382_7065_343F_41C8_85C6AE9C717F_mobile",
  "this.Container_66588837_74AF_8B56_41CA_E204728E8E6C_mobile",
  "this.Image_DA083442_FCCB_5DAF_41ED_95974F8860D7",
  "this.HTMLText_7DB2E382_7065_343F_41C2_951F708170F1_mobile"
 ],
 "id": "Container_7DBCC382_7065_343F_41D5_9D3C36B5F479_mobile",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "width": "100%",
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": 120,
 "propagateClick": true,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "bottom",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_20_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_20",
 "height": 2693,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_20.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06776C0_FCC4_DAAB_41ED_0EC544568CBA",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1047
  },
  {
   "url": "media/popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 558
  },
  {
   "url": "media/popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 279
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_21_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_21",
 "height": 916,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_21.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06896C0_FCC4_DAAB_41B9_8BA58EC9DE68",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E978760D_FC5D_5DB5_41A3_547496AB76C2_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1452
  },
  {
   "url": "media/popup_E978760D_FC5D_5DB5_41A3_547496AB76C2_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 774
  },
  {
   "url": "media/popup_E978760D_FC5D_5DB5_41A3_547496AB76C2_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 387
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9_0_1.jpg",
    "width": 808,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 10.76,
 "popupMaxWidth": "95%",
 "yaw": 90.52,
 "hfov": 1.92,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_41_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_41",
 "height": 1443,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_41.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D043E6A7_FCC4_DAF5_41E1_AE7B4A83443F",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 560
  },
  {
   "url": "media/popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 298
  },
  {
   "url": "media/popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 149
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1_0_1.jpg",
    "width": 791,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 13.09,
 "popupMaxWidth": "95%",
 "yaw": 104.77,
 "hfov": 2.49,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F706E9A8_FBDD_B6FC_41B1_51223B453837",
 "id": "panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "initialPosition": {
  "yaw": -73.94,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F33F6877_FCB7_7271_41E1_1E4C0920CC33",
 "id": "camera_F33F5877_FCB7_7271_41D8_81E938C29C50",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 500,
 "easing": "linear",
 "id": "effect_DC062F45_FC45_ABB4_41ED_77259FA5B2D7",
 "class": "FadeOutEffect"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "header"
 },
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3_mobile"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "horizontalAlign": "left",
 "height": 140,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": -45.92,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F39947DF_FCB7_7EB1_41E8_EF45E18A4C4A",
 "id": "camera_F399B7DF_FCB7_7EB1_41CE_215139BBD6A6",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_37_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_37",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_37.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E8161414_FC47_5DD4_41EC_FE9968EBB291",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E8161414_FC47_5DD4_41EC_FE9968EBB291_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 829
   }
  ]
 },
 "pitch": -0.58,
 "popupMaxWidth": "95%",
 "yaw": -150.17,
 "hfov": 2.56,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_F2D35590_FCAE_F28F_41E0_49F6C0F494A0",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1299
  },
  {
   "url": "media/popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 692
  },
  {
   "url": "media/popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 346
  }
 ]
},
{
 "label": "Sala 1 - Escritorio",
 "id": "panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 106.06,
   "yaw": -14.32,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F60845E3_FBFB_5E6C_41E1_49E7F622BD04",
  "this.overlay_F5FA7351_FBFC_FBAD_41D5_0D67D2D4467A",
  "this.overlay_EFC0B30C_FBC5_7BB4_41BD_ACDE85F1AC30",
  "this.overlay_EE2A393B_FBC4_B7DD_41E6_72AF9FF91D7B",
  "this.overlay_EE8871B0_FC3B_76EC_41EB_2F16BAD20E1A",
  "this.popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33",
  "this.overlay_E81E6A1A_FC3D_75DF_41C1_239FCB2113DE",
  "this.popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E",
  "this.overlay_EF4F9203_FC3D_55AC_41D7_E27F591436D0",
  "this.popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC",
  "this.overlay_EEDA1C7C_FC3F_EE5B_41A7_94C1D17049BB",
  "this.popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E",
  "this.overlay_EEC152BD_FC3F_5AD4_41E2_C957B3D39086",
  "this.popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D",
  "this.overlay_EFD2D60B_FC3D_5DBC_41EC_8C5361ADC896",
  "this.popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99",
  "this.overlay_E823DB8C_FC3D_6ABB_41DF_AFE7819A906D",
  "this.overlay_E8E765A0_FC3C_BEEC_41E4_62DCCAA4DC6F",
  "this.overlay_E96240FF_FC3C_D655_419D_B748B982F62A",
  "this.popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959",
  "this.popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01",
  "this.popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09",
  "this.overlay_EF28E6B8_FC3B_7ADC_41CB_877DCBABF15D",
  "this.popup_E951D931_FC45_77ED_41EC_7872266B5F5A",
  "this.overlay_EF01F001_FC45_B5AC_41E0_58946182FDD1",
  "this.popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694",
  "this.overlay_EF2C009A_FC44_B6DF_41BB_E081A6FA7540",
  "this.popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471",
  "this.overlay_EF1F0078_FC47_B65B_41DF_CBB6DECC5BF8",
  "this.popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D",
  "this.overlay_EF359FFC_FC47_AA54_41E9_46AF9613EBB1",
  "this.popup_E8161414_FC47_5DD4_41EC_FE9968EBB291",
  "this.overlay_D768D358_FC4C_BA5B_41E5_AF1A6FA67B09",
  "this.overlay_D21816E6_FC5D_7A77_41B5_FE83C18C728E"
 ]
},
{
 "shadow": false,
 "maxHeight": 72,
 "backgroundOpacity": 0,
 "id": "Image_DA083442_FCCB_5DAF_41ED_95974F8860D7",
 "paddingLeft": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 200,
 "width": "100%",
 "url": "skin/Image_D832CBC0_FCCD_AAAB_41E2_12449D83623C.png",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "click": "this.openLink('https://api.whatsapp.com/send?phone=595981408400&text=%C2%A1Hola!%20Me%20gust%C3%B3%20el%20Paseo%20Digital%20del%20Museo%20Casa%20de%20Independencia.', '_blank')",
 "horizontalAlign": "center",
 "propagateClick": false,
 "height": "48.333%",
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "verticalAlign": "middle",
 "data": {
  "name": "Image63180"
 },
 "cursor": "hand",
 "class": "Image",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 717
   }
  ]
 },
 "pitch": -8.49,
 "popupMaxWidth": "95%",
 "yaw": 117.96,
 "hfov": 2.52,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "Container X global"
 },
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_mobile"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B_mobile",
 "left": "15%",
 "paddingLeft": 0,
 "paddingRight": 20,
 "right": "15%",
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "80%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "propagateClick": false,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 20
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "line"
 },
 "id": "Container_7DB3E382_7065_343F_41C2_E1E6BB5BA055_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": 1,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466_0_2.jpg",
    "width": 732,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 4.42,
 "popupMaxWidth": "95%",
 "yaw": 114.06,
 "hfov": 5.67,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "initialPosition": {
  "yaw": 65.22,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": -13.73
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F6CD99A7_FBDD_B6F4_41D2_5BE5ECE86D9F",
 "id": "panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_6_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_6",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_6.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_25_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_25",
 "height": 1920,
 "width": 1500,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_25.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 886
   }
  ]
 },
 "pitch": 5.3,
 "popupMaxWidth": "95%",
 "yaw": 65.79,
 "hfov": 1.97,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F706C9A8_FBDD_B6FC_41D3_23FBA53A034F",
 "id": "panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232_0_1.jpg",
    "width": 811,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 23.84,
 "popupMaxWidth": "95%",
 "yaw": 0.31,
 "hfov": 3.1,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_45_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_45",
 "height": 1490,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_45.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.6,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528_mobile"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "propagateClick": true,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_44_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_44",
 "height": 2126,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_44.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "progressBackgroundColorDirection": "vertical",
 "playbackBarBottom": 5,
 "id": "MainViewer_mobile",
 "left": 0,
 "paddingLeft": 0,
 "width": "100%",
 "playbackBarProgressBorderRadius": 0,
 "minHeight": 50,
 "borderSize": 0,
 "toolTipBorderRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipPaddingLeft": 10,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "vrPointerSelectionTime": 2000,
 "progressBorderSize": 0,
 "minWidth": 100,
 "playbackBarHeadWidth": 6,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarBorderRadius": 0,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontWeight": "normal",
 "height": "100%",
 "propagateClick": true,
 "shadow": false,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipBorderSize": 1,
 "toolTipPaddingBottom": 7,
 "toolTipFontFamily": "Georgia",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "transitionDuration": 500,
 "progressRight": 0,
 "playbackBarRight": 0,
 "toolTipPaddingTop": 7,
 "progressHeight": 10,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipFontSize": 13,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "borderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadBorderRadius": 0,
 "progressBackgroundOpacity": 1,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "paddingRight": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarOpacity": 1,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarLeft": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipOpacity": 0.5,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBorderSize": 0,
 "top": 0,
 "progressBarOpacity": 1,
 "progressBorderRadius": 0,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipPaddingRight": 10,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowColor": "#333333",
 "vrPointerColor": "#FFFFFF",
 "progressBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "paddingBottom": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowOpacity": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipShadowSpread": 0,
 "transitionMode": "blending",
 "paddingTop": 0
},
{
 "label": "Sala 6 - Sal\u00f3n Capitular - Punto 2",
 "id": "panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6"
  },
  {
   "backwardYaw": 64.52,
   "yaw": 69.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93"
  },
  {
   "backwardYaw": 179.83,
   "yaw": -97.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F5C2B189_FBC4_B6BD_41EF_12BDE51E788C",
  "this.overlay_F5FB6819_FBC4_B5DD_41B4_F02EE4C1E39A",
  "this.overlay_F5F46E0D_FBC4_ADB5_41CA_AF4E2EEF6F69",
  "this.overlay_E3EAE0ED_FCCC_F674_41C0_FBB0009DE1FB",
  "this.overlay_E3EA90ED_FCCC_F674_41E9_6ABB120F7879",
  "this.overlay_E3EA90ED_FCCC_F674_41E3_1ECCDC6AF5F3",
  "this.overlay_E3EA80ED_FCCC_F674_41E6_993CAC223FC0",
  "this.overlay_E3EAA0ED_FCCC_F674_41B6_E60D51DB9D18",
  "this.overlay_E3EA50ED_FCCC_F674_41BB_C4173B5AC559",
  "this.overlay_E3EA70ED_FCCC_F674_41E0_78AA99048B06",
  "this.overlay_E3EA60ED_FCCC_F674_41EC_C7BF37E86065",
  "this.overlay_D8C19E66_FCC5_6A77_41E5_92CA6E49E552",
  "this.popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466",
  "this.popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE",
  "this.popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74",
  "this.popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8",
  "this.popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50",
  "this.popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E"
 ]
},
{
 "id": "ImageResource_C851744A_FCC4_DDBF_41A9_2D4EA208A173",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "shadow": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "paddingRight": 0,
 "borderRadius": 0,
 "right": 20,
 "width": "10%",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "top": 20,
 "minWidth": 50,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "horizontalAlign": "right",
 "propagateClick": true,
 "height": "10%",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F70969A9_FBDD_B6FC_41E9_E5E5E1F79068",
 "id": "panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 826
   }
  ]
 },
 "pitch": 0.79,
 "popupMaxWidth": "95%",
 "yaw": 89.46,
 "hfov": 3.22,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 298
   }
  ]
 },
 "pitch": 27.73,
 "popupMaxWidth": "95%",
 "yaw": -61.53,
 "hfov": 3.79,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "scrollBarMargin": 2,
 "titlePaddingTop": 5,
 "id": "window_D775C92F_FC45_77F4_41E5_BE6A8D047E0D",
 "paddingLeft": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "width": 800,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBorderSize": 0,
 "gap": 10,
 "footerHeight": 5,
 "minHeight": 20,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "bodyPaddingRight": 5,
 "bodyPaddingTop": 5,
 "borderSize": 0,
 "modal": true,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "headerPaddingRight": 10,
 "shadowOpacity": 0.5,
 "headerBorderSize": 0,
 "height": 800,
 "title": "Porqu\u00e9 la llamamos Casa de la Independencia",
 "headerBackgroundColorDirection": "vertical",
 "minWidth": 20,
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [],
 "headerBackgroundOpacity": 1,
 "titlePaddingLeft": 5,
 "veilOpacity": 0.4,
 "horizontalAlign": "center",
 "titleFontWeight": "bold",
 "bodyPaddingLeft": 5,
 "titleFontFamily": "Arial",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "titleTextDecoration": "none",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingLeft": 10,
 "scrollBarWidth": 10,
 "closeButtonBorderRadius": 11,
 "class": "Window",
 "backgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "shadow": true,
 "closeButtonPressedIconColor": "#FFFFFF",
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "children": [
  "this.htmlText_D776C92E_FC45_77F4_41D2_8D3D6C133200"
 ],
 "titlePaddingRight": 5,
 "layout": "vertical",
 "closeButtonIconHeight": 12,
 "closeButtonIconLineWidth": 2,
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundOpacity": 1,
 "headerPaddingBottom": 10,
 "shadowBlurRadius": 6,
 "shadowVerticalLength": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "contentOpaque": false,
 "titleFontStyle": "normal",
 "headerVerticalAlign": "middle",
 "bodyBorderColor": "#000000",
 "closeButtonBackgroundColorRatios": [],
 "titleFontSize": "18px",
 "scrollBarOpacity": 0.5,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColorDirection": "vertical",
 "titleFontColor": "#000000",
 "closeButtonIconColor": "#000000",
 "veilColorDirection": "horizontal",
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "headerPaddingTop": 10,
 "verticalAlign": "middle",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "overflow": "scroll",
 "paddingTop": 0,
 "shadowSpread": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window75235"
 }
},
{
 "id": "ImageResource_C853A447_FCC4_DDB5_41EA_0142F889AF30",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D4168468_FCCB_7E7C_41EE_072C41F57617_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1286
  },
  {
   "url": "media/popup_D4168468_FCCB_7E7C_41EE_072C41F57617_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 685
  },
  {
   "url": "media/popup_D4168468_FCCB_7E7C_41EE_072C41F57617_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 342
  }
 ]
},
{
 "initialPosition": {
  "yaw": 82.86,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F39447CE_FCB7_7E93_41E4_19E4F6C9369A",
 "id": "camera_F394B7CE_FCB7_7E93_41E0_252AC8AD15C9",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "Container X global"
 },
 "children": [
  "this.IconButton_BD140CC8_9478_145B_41BD_F96EEC163BAF_mobile"
 ],
 "id": "Container_BD147CC8_9478_145B_41E1_A1505134A3C3_mobile",
 "left": "15%",
 "paddingLeft": 0,
 "paddingRight": 20,
 "right": "15%",
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "80%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "propagateClick": false,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 20
},
{
 "id": "ImageResource_D07B16B1_FCC4_DAED_41ED_B674C041D320",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1715
  },
  {
   "url": "media/popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 914
  },
  {
   "url": "media/popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 457
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 886
   }
  ]
 },
 "pitch": 17.95,
 "popupMaxWidth": "95%",
 "yaw": -114.63,
 "hfov": 4.88,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "-Container buttons"
 },
 "children": [
  "this.Container_7DB3E382_7065_343F_41C2_E1E6BB5BA055_mobile",
  "this.Button_7DB31382_7065_343F_41D6_641BBE1B2562_mobile",
  "this.Container_7DB30382_7065_343F_416C_8610BCBA9F50_mobile",
  "this.Button_7DB33382_7065_343F_41B1_0B0F019C1828_mobile",
  "this.Container_7DB32382_7065_343F_419E_6594814C420F_mobile",
  "this.Button_7DB35382_7065_343F_41C5_CF0EAF3E4CFF_mobile",
  "this.Container_7DB34382_7065_343F_41CB_A5B96E9749EE_mobile",
  "this.Button_7DBC8382_7065_343F_4183_17B44518DB40_mobile",
  "this.Container_7DBCB382_7065_343F_41D8_AB382D384291_mobile"
 ],
 "id": "Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3_mobile",
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "width": "100%",
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "gap": 0,
 "minHeight": 1,
 "borderSize": 0,
 "top": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "25%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "propagateClick": true,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E33285D5_FCCF_5E55_41ED_476D2B398123",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E33285D5_FCCF_5E55_41ED_476D2B398123_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 657
   }
  ]
 },
 "pitch": -17.45,
 "popupMaxWidth": "95%",
 "yaw": 112.02,
 "hfov": 3.6,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_39_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_39",
 "height": 1047,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_39.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06BC6BB_FCC4_DADD_41ED_1817976174FE",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1542
  },
  {
   "url": "media/popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 822
  },
  {
   "url": "media/popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 411
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6_0_1.jpg",
    "width": 1010,
    "class": "ImageResourceLevel",
    "height": 1023
   }
  ]
 },
 "pitch": -23.96,
 "popupMaxWidth": "95%",
 "yaw": -1.01,
 "hfov": 3.12,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D077A6B1_FCC4_DAED_41E0_06C8B1DB8A8D",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_mobile",
 "left": 10,
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "width": "14.22%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "top": "20%",
 "minWidth": 50,
 "bottom": "20%",
 "mode": "push",
 "horizontalAlign": "center",
 "propagateClick": true,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 171.68,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3FC381E_FCB7_71B3_41E3_D82FC7415437",
 "id": "camera_F3FC281E_FCB7_71B3_41BE_409BDF8EADF3",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "id": "ImageResource_C850244B_FCC4_DDBD_41E3_0EBBEC77D52B",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "shadow": false,
 "maxHeight": 50,
 "maxWidth": 50,
 "backgroundOpacity": 0,
 "id": "IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_mobile",
 "left": "89%",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "width": 44,
 "rollOverIconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_rollover.png",
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "top": "48%",
 "minWidth": 1,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, false, 0, this.effect_DC062F45_FC45_ABB4_41ED_77259FA5B2D7, 'hideEffect', false); this.setComponentVisibility(this.IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_mobile, false, 0, this.effect_DC062F45_FC45_ABB4_41ED_77259FA5B2D7, 'hideEffect', false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "horizontalAlign": "center",
 "propagateClick": true,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton collapse"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_0_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_0",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_0.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D07AD6B1_FCC4_DAED_41B5_788E37B61427",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2675
  },
  {
   "url": "media/popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09_0_1.jpg",
   "width": 1469,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09_0_2.jpg",
   "width": 734,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09_0_3.jpg",
   "width": 367,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_BD141CC8_9478_145B_41D4_265F47E47DB6_mobile, true, 0, null, null, false); this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, false, 0, null, null, false)",
 "id": "Button_7DB31382_7065_343F_41D6_641BBE1B2562_mobile",
 "pressedBackgroundOpacity": 1,
 "paddingLeft": 10,
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "iconBeforeLabel": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "fontSize": "30px",
 "minHeight": 1,
 "fontWeight": "normal",
 "borderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "mode": "push",
 "height": 60,
 "backgroundColorDirection": "vertical",
 "label": "Informaci\u00f3n del Paseo",
 "fontStyle": "italic",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "paddingBottom": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconHeight": 32,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "shadowSpread": 1,
 "data": {
  "name": "Button Tour Info"
 },
 "iconWidth": 32,
 "cursor": "hand",
 "class": "Button",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 151.83,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3AF97AC_FCB7_7E97_41E3_A8190B9C4519",
 "id": "camera_F3AF87AC_FCB7_7E97_41D5_9B23934260D3",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387_0_1.jpg",
    "width": 800,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 16.79,
 "popupMaxWidth": "95%",
 "yaw": -108.74,
 "hfov": 1.89,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E919807C_FC4C_D654_41D1_908AE02778D1",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E919807C_FC4C_D654_41D1_908AE02778D1_0_1.jpg",
    "width": 811,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 16.97,
 "popupMaxWidth": "95%",
 "yaw": 18.15,
 "hfov": 2.58,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_F2D05590_FCAE_F28F_41A8_30DC1536FD94",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1662
  },
  {
   "url": "media/popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 886
  },
  {
   "url": "media/popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 443
  }
 ]
},
{
 "id": "ImageResource_D06626C0_FCC4_DAAB_41E0_6E8CAE76148A",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328_0_0.jpg",
   "width": 1448,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328_0_1.jpg",
   "width": 772,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328_0_2.jpg",
   "width": 386,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111_0_1.jpg",
    "width": 718,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": -6.56,
 "popupMaxWidth": "95%",
 "yaw": 62.99,
 "hfov": 1.63,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "initialPosition": {
  "yaw": -110.7,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F39247BD_FCB7_7EF1_41E1_7238C4F601E0",
 "id": "camera_F392B7BD_FCB7_7EF1_41E1_C363B34FB2E0",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "borderRadius": 0,
 "data": {
  "name": "Global"
 },
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC_mobile"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536_mobile",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "layout": "vertical",
 "shadowBlurRadius": 25,
 "borderSize": 0,
 "shadowOpacity": 0.3,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "10%",
 "creationPolicy": "inAdvance",
 "shadowVerticalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "class": "Container",
 "shadow": true,
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "id": "ImageResource_D069B6BB_FCC4_DADD_41C7_7B1C09894D4A",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1346
  },
  {
   "url": "media/popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 717
  },
  {
   "url": "media/popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 358
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09_0_2.jpg",
    "width": 734,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": -9.73,
 "popupMaxWidth": "95%",
 "yaw": -79.65,
 "hfov": 1.93,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "- EXPANDED"
 },
 "children": [
  "this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36_mobile",
  "this.IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_mobile"
 ],
 "id": "Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 450,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "propagateClick": false,
 "height": "100%",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": -0.13,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3F1080F_FCB7_7191_41C1_5E009E3E7A40",
 "id": "camera_F3F1780F_FCB7_7191_41E3_840A31439F74",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_31_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_31",
 "height": 1286,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_31.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06E76BB_FCC4_DADD_41D5_5E2D712AD21A",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1_0_0.jpg",
   "width": 1484,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1_0_1.jpg",
   "width": 791,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1_0_2.jpg",
   "width": 395,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7_mobile, true, 0, null, null, false); this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, false, 0, null, null, false)",
 "id": "Button_7DB35382_7065_343F_41C5_CF0EAF3E4CFF_mobile",
 "pressedBackgroundOpacity": 1,
 "paddingLeft": 10,
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "iconBeforeLabel": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedLabel": "Location",
 "gap": 5,
 "fontSize": "30px",
 "minHeight": 1,
 "fontWeight": "normal",
 "borderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "mode": "push",
 "height": 60,
 "backgroundColorDirection": "vertical",
 "label": "Ubicaci\u00f3n",
 "fontStyle": "italic",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "paddingBottom": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconHeight": 32,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "shadowSpread": 1,
 "data": {
  "name": "Button Location"
 },
 "iconWidth": 32,
 "cursor": "hand",
 "class": "Button",
 "paddingTop": 0
},
{
 "itemBackgroundOpacity": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile",
 "left": 0,
 "itemHeight": 160,
 "paddingLeft": 70,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "width": "100%",
 "scrollBarColor": "#04A3E1",
 "itemVerticalAlign": "top",
 "selectedItemLabelFontColor": "#04A3E1",
 "gap": 26,
 "minHeight": 1,
 "itemPaddingRight": 3,
 "selectedItemThumbnailShadow": true,
 "borderSize": 0,
 "itemLabelGap": 7,
 "itemLabelFontColor": "#666666",
 "minWidth": 1,
 "itemMinWidth": 50,
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "height": "92%",
 "itemLabelPosition": "bottom",
 "propagateClick": false,
 "itemMode": "normal",
 "shadow": false,
 "itemLabelFontStyle": "italic",
 "itemLabelFontSize": 16,
 "scrollBarWidth": 10,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "class": "ThumbnailGrid",
 "backgroundOpacity": 0,
 "borderRadius": 5,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColor": [],
 "paddingRight": 70,
 "itemOpacity": 1,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist",
 "itemLabelHorizontalAlign": "center",
 "itemHorizontalAlign": "center",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemThumbnailHeight": 125,
 "itemThumbnailShadow": false,
 "itemThumbnailWidth": 220,
 "itemWidth": 220,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemMaxWidth": 1000,
 "itemLabelFontFamily": "Oswald",
 "itemBorderRadius": 0,
 "itemThumbnailOpacity": 1,
 "bottom": -0.2,
 "scrollBarVisible": "rollOver",
 "itemMinHeight": 50,
 "scrollBarOpacity": 0.5,
 "itemBackgroundColorRatios": [],
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "itemThumbnailScaleMode": "fit_outside",
 "paddingBottom": 70,
 "scrollBarMargin": 2,
 "itemPaddingBottom": 3,
 "verticalAlign": "middle",
 "itemLabelFontWeight": "normal",
 "itemMaxHeight": 1000,
 "rollOverItemThumbnailShadow": true,
 "itemPaddingLeft": 3,
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemBackgroundColorDirection": "vertical",
 "data": {
  "name": "ThumbnailList"
 },
 "paddingTop": 10
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_33_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_33",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_33.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "data": {
  "name": "--- LEFT PANEL 2"
 },
 "children": [
  "this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile",
  "this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile"
 ],
 "id": "Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 450,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "propagateClick": false,
 "height": "100%",
 "verticalAlign": "top",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_34_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_34",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_34.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "label": "Sala 4 - Habitaci\u00f3n",
 "id": "panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": -33.01,
   "yaw": -144.8,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F5FD8C00_FBC4_ADAB_41EB_31E5E0C78626",
  "this.overlay_F5A40324_FBFB_5BEB_41D9_DBD06881D18C",
  "this.overlay_E9605513_FC5C_BFAC_41E3_586DBC612D55",
  "this.overlay_E8EB1193_FC5D_56AC_41DC_370B47890FDD",
  "this.popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05",
  "this.popup_E978760D_FC5D_5DB5_41A3_547496AB76C2",
  "this.overlay_E9D9E47E_FC5C_DE54_41EB_5776687B0FD2",
  "this.popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328",
  "this.overlay_EAD8FE07_FC45_ADB5_41EC_D7B84CC74670",
  "this.overlay_EA163AE1_FC44_AA6C_41C8_7BA8F2C30205"
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 698
   }
  ]
 },
 "pitch": -3.95,
 "popupMaxWidth": "95%",
 "yaw": 28.79,
 "hfov": 2.67,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_36_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_36",
 "height": 1965,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_36.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 558
   }
  ]
 },
 "pitch": -10.64,
 "popupMaxWidth": "95%",
 "yaw": -39.07,
 "hfov": 4.21,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_35_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_35",
 "height": 1945,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_35.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D07596B6_FCC4_DAD7_41E1_45B5F6D132C9",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E8161414_FC47_5DD4_41EC_FE9968EBB291_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1555
  },
  {
   "url": "media/popup_E8161414_FC47_5DD4_41EC_FE9968EBB291_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 829
  },
  {
   "url": "media/popup_E8161414_FC47_5DD4_41EC_FE9968EBB291_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 414
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E951D931_FC45_77ED_41EC_7872266B5F5A",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E951D931_FC45_77ED_41EC_7872266B5F5A_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -20.64,
 "popupMaxWidth": "95%",
 "yaw": -94.34,
 "hfov": 2.4,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_C850544C_FCC4_DDB4_41EE_9A844C2BCEDB",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "line"
 },
 "id": "Container_7DB30382_7065_343F_416C_8610BCBA9F50_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": 1,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "id": "ImageResource_D07E36AC_FCC4_DAFB_41E5_39993058E4B2",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2852
  },
  {
   "url": "media/popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D_0_1.jpg",
   "width": 1378,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D_0_2.jpg",
   "width": 689,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D_0_3.jpg",
   "width": 344,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "id": "ImageResource_D06366C5_FCC4_DAB5_41C2_4807A6D08E66",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2683
  },
  {
   "url": "media/popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117_0_1.jpg",
   "width": 1465,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117_0_2.jpg",
   "width": 732,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117_0_3.jpg",
   "width": 366,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 810
   }
  ]
 },
 "pitch": 10.51,
 "popupMaxWidth": "95%",
 "yaw": -125.24,
 "hfov": 2.52,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "initialPosition": {
  "yaw": -17.77,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3DF884A_FCB7_7193_41EC_FCD6BDFEA660",
 "id": "camera_F3DFF84A_FCB7_7193_41E6_DBD7845EDBAD",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "HTMLText_7DB2E382_7065_343F_41C2_951F708170F1_mobile",
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderSize": 0,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": 78,
 "propagateClick": true,
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText47602"
 },
 "visible": false,
 "class": "HTMLText",
 "paddingTop": 0
},
{
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_t.png",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B",
 "label": "\u00c1lbum de Fotos",
 "class": "PhotoAlbum",
 "playList": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_AlbumPlayList"
},
{
 "id": "ImageResource_D01DA6C5_FCC4_DAB5_41D4_9938C9AA8CDE",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E33285D5_FCCF_5E55_41ED_476D2B398123_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1232
  },
  {
   "url": "media/popup_E33285D5_FCCF_5E55_41ED_476D2B398123_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 657
  },
  {
   "url": "media/popup_E33285D5_FCCF_5E55_41ED_476D2B398123_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 328
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209_0_1.jpg",
    "width": 796,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 12.62,
 "popupMaxWidth": "95%",
 "yaw": 27.14,
 "hfov": 1.49,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "maxHeight": 1095,
 "backgroundOpacity": 0,
 "id": "Image_7DB3C373_7065_34DE_41BA_CF5206137DED_mobile",
 "left": "0%",
 "paddingLeft": 0,
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 1095,
 "width": "100%",
 "url": "skin/Image_7DB3C373_7065_34DE_41BA_CF5206137DED.png",
 "minHeight": 30,
 "borderSize": 0,
 "top": "0%",
 "minWidth": 40,
 "bottom": "73.11%",
 "horizontalAlign": "center",
 "propagateClick": true,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "verticalAlign": "top",
 "data": {
  "name": "Image Company"
 },
 "shadow": false,
 "class": "Image",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -5.36,
 "popupMaxWidth": "95%",
 "yaw": -94.55,
 "hfov": 2.55,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "items": [
  {
   "media": "this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_camera"
  },
  {
   "media": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_camera"
  },
  {
   "media": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_camera"
  },
  {
   "media": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_camera"
  },
  {
   "media": "this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_camera"
  },
  {
   "media": "this.panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_camera"
  },
  {
   "media": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_camera"
  },
  {
   "media": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_camera"
  },
  {
   "media": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_camera"
  },
  {
   "media": "this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_camera"
  },
  {
   "media": "this.panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_camera"
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 0)",
   "player": "this.MainViewer_mobilePhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_19_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_19",
 "height": 2076,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_19.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06F76BB_FCC4_DADD_41ED_91811EA90AC4",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209_0_0.jpg",
   "width": 1494,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209_0_1.jpg",
   "width": 796,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209_0_2.jpg",
   "width": 398,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "id": "MainViewer_mobileMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained",
 "viewerArea": "this.MainViewer_mobile"
},
{
 "label": "Patio",
 "id": "panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "backwardYaw": 179.87,
   "yaw": -28.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93"
  },
  {
   "backwardYaw": -8.32,
   "yaw": -102.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6"
  }
 ],
 "partial": false,
 "vfov": 180,
 "frames": [
  {
   "thumbnailUrl": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "rowCount": 7,
      "colCount": 7,
      "height": 3584
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_t.jpg",
 "hfov": 360,
 "hfovMax": 100,
 "overlays": [
  "this.overlay_F6378C0F_FBFC_ADB5_41DB_99835BC7DCD0",
  "this.overlay_F47E569C_FBC4_DAD4_41E5_B2427D19D871",
  "this.overlay_EBA52A5C_FBC5_6A54_41EE_074AED8004CD",
  "this.popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1",
  "this.popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF",
  "this.overlay_EAC60C15_FBCB_ADD4_41D4_F15B2AAEA7A8",
  "this.overlay_EA5C4921_FBCB_77ED_41CE_391D3A6CBB26"
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 822
   }
  ]
 },
 "pitch": -19.21,
 "popupMaxWidth": "95%",
 "yaw": 94.26,
 "hfov": 2.41,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D06CE6BB_FCC4_DADD_41D4_20EE38C3B9B7",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9_0_0.jpg",
   "width": 1516,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9_0_1.jpg",
   "width": 808,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9_0_2.jpg",
   "width": 404,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F70929A9_FBDD_B6FC_419F_E416FC146D3A",
 "id": "panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_camera",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 808
   }
  ]
 },
 "pitch": 13.76,
 "popupMaxWidth": "95%",
 "yaw": 84.93,
 "hfov": 4.32,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "data": {
  "name": "blue line"
 },
 "id": "Container_7DB2F382_7065_343F_41C8_85C6AE9C717F_mobile",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 40,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "creationPolicy": "inAdvance",
 "height": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "shadow": false,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_66589837_74AF_8B56_41D7_A6F4FAC02CC3_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_66589837_74AF_8B56_41D7_A6F4FAC02CC3.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "maxWidth": 60,
 "width": 30,
 "minHeight": 1,
 "transparencyActive": true,
 "borderSize": 0,
 "minWidth": 1,
 "mode": "push",
 "height": 30,
 "propagateClick": false,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "id": "ImageResource_D06156C5_FCC4_DAB5_41DC_850D73E8A7B3",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2123
  },
  {
   "url": "media/popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132_0_1.jpg",
   "width": 1852,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132_0_2.jpg",
   "width": 926,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132_0_3.jpg",
   "width": 463,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 793
   }
  ]
 },
 "pitch": 11.54,
 "popupMaxWidth": "95%",
 "yaw": 100.93,
 "hfov": 4.2,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7_0_1.jpg",
    "width": 1000,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 7.72,
 "popupMaxWidth": "95%",
 "yaw": 17.85,
 "hfov": 3.35,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "borderRadius": 0,
 "data": {
  "name": "Global"
 },
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA_mobile"
 ],
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E_mobile",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "layout": "horizontal",
 "shadowBlurRadius": 25,
 "borderSize": 0,
 "shadowOpacity": 0.3,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "10%",
 "creationPolicy": "inAdvance",
 "shadowVerticalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "class": "Container",
 "shadow": true,
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D_0_2.jpg",
    "width": 689,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": -11.27,
 "popupMaxWidth": "95%",
 "yaw": 9.88,
 "hfov": 2.32,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "backgroundOpacity": 0,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_mobile",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingRight": 0,
 "borderRadius": 0,
 "right": 10,
 "width": "14.22%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "minHeight": 50,
 "transparencyActive": false,
 "borderSize": 0,
 "top": "20%",
 "minWidth": 50,
 "bottom": "20%",
 "mode": "push",
 "horizontalAlign": "center",
 "propagateClick": true,
 "paddingBottom": 0,
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "data": {
  "name": "IconButton >"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton",
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01_0_2.jpg",
    "width": 690,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": -8.43,
 "popupMaxWidth": "95%",
 "yaw": -66.17,
 "hfov": 1.82,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1_0_1.jpg",
    "width": 961,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 14.92,
 "popupMaxWidth": "95%",
 "yaw": 89.81,
 "hfov": 2.78,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 475
   }
  ]
 },
 "pitch": -16.78,
 "popupMaxWidth": "95%",
 "yaw": 64.68,
 "hfov": 3.27,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_ED1DC722_FCB7_7F93_41EC_FAD9456B0B24, 0)",
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B",
   "player": "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobilePhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_ED1DC722_FCB7_7F93_41EC_FAD9456B0B24",
 "class": "PlayList"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_2_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_2",
 "height": 1299,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_2.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_17_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_17",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_17.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_D06366C0_FCC4_DAAB_4197_CAD2DE9C722E",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2044
  },
  {
   "url": "media/popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1_0_1.jpg",
   "width": 961,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1_0_2.jpg",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74_0_2.jpg",
    "width": 926,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 14.44,
 "popupMaxWidth": "95%",
 "yaw": 125.36,
 "hfov": 4.55,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_29_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_29",
 "height": 1920,
 "width": 1516,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_29.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "data": {
  "name": "line"
 },
 "id": "Container_7DB34382_7065_343F_41CB_A5B96E9749EE_mobile",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "horizontalAlign": "left",
 "height": 1,
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingTop": 0
},
{
 "id": "ImageResource_C860A438_FCC4_DDDC_41DD_6EB41D70B66A",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D5750800_FCCC_F5AC_41C7_52033C261DF8_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 630
  },
  {
   "url": "media/popup_D5750800_FCCC_F5AC_41C7_52033C261DF8_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 336
  },
  {
   "url": "media/popup_D5750800_FCCC_F5AC_41C7_52033C261DF8_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 168
  }
 ]
},
{
 "id": "ImageResource_D079F6B1_FCC4_DAED_41DA_419704438EB5",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E951D931_FC45_77ED_41EC_7872266B5F5A_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_E951D931_FC45_77ED_41EC_7872266B5F5A_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_E951D931_FC45_77ED_41EC_7872266B5F5A_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "id": "ImageResource_D078D6B1_FCC4_DAED_41D2_54EF33A783D3",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_5_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_5",
 "height": 1280,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_5.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_C874F421_FCC4_DDED_41DF_04790863B23D",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1490
  },
  {
   "url": "media/popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 794
  },
  {
   "url": "media/popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 397
  }
 ]
},
{
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "scrollBarMargin": 2,
 "titlePaddingTop": 5,
 "id": "window_D001FBF7_FC4F_6A54_41DA_493ED2234296",
 "paddingLeft": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "width": 800,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBorderSize": 0,
 "gap": 10,
 "footerHeight": 5,
 "minHeight": 20,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "bodyPaddingRight": 5,
 "bodyPaddingTop": 5,
 "borderSize": 0,
 "modal": true,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "headerPaddingRight": 10,
 "shadowOpacity": 0.5,
 "headerBorderSize": 0,
 "height": 800,
 "title": "Adquisici\u00f3n y Restauraci\u00f3n",
 "headerBackgroundColorDirection": "vertical",
 "minWidth": 20,
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [],
 "headerBackgroundOpacity": 1,
 "titlePaddingLeft": 5,
 "veilOpacity": 0.4,
 "horizontalAlign": "center",
 "titleFontWeight": "bold",
 "bodyPaddingLeft": 5,
 "titleFontFamily": "Arial",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "titleTextDecoration": "none",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingLeft": 10,
 "scrollBarWidth": 10,
 "closeButtonBorderRadius": 11,
 "class": "Window",
 "backgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "shadow": true,
 "closeButtonPressedIconColor": "#FFFFFF",
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "children": [
  "this.htmlText_D007ABF7_FC4F_6A54_4187_A042DBA2B2B1"
 ],
 "titlePaddingRight": 5,
 "layout": "vertical",
 "closeButtonIconHeight": 12,
 "closeButtonIconLineWidth": 2,
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundOpacity": 1,
 "headerPaddingBottom": 10,
 "shadowBlurRadius": 6,
 "shadowVerticalLength": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "contentOpaque": false,
 "titleFontStyle": "normal",
 "headerVerticalAlign": "middle",
 "bodyBorderColor": "#000000",
 "closeButtonBackgroundColorRatios": [],
 "titleFontSize": "18px",
 "scrollBarOpacity": 0.5,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColorDirection": "vertical",
 "titleFontColor": "#000000",
 "closeButtonIconColor": "#000000",
 "veilColorDirection": "horizontal",
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "headerPaddingTop": 10,
 "verticalAlign": "middle",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "overflow": "scroll",
 "paddingTop": 0,
 "shadowSpread": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window78461"
 }
},
{
 "borderRadius": 0,
 "data": {
  "name": "Global"
 },
 "children": [
  "this.Container_BD15ECC8_9478_145B_41CB_7D871BE75B47_mobile",
  "this.Container_BD158CC8_9478_145B_41B5_3F260A00D36A_mobile"
 ],
 "id": "Container_BD15DCC8_9478_145B_41E1_35766BBBD98F_mobile",
 "left": "15%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "layout": "horizontal",
 "shadowBlurRadius": 25,
 "borderSize": 0,
 "shadowOpacity": 0.3,
 "top": "10%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "10%",
 "creationPolicy": "inAdvance",
 "shadowVerticalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "scroll",
 "class": "Container",
 "shadow": true,
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D5750800_FCCC_F5AC_41C7_52033C261DF8",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D5750800_FCCC_F5AC_41C7_52033C261DF8_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 336
   }
  ]
 },
 "pitch": 3.12,
 "popupMaxWidth": "95%",
 "yaw": 62.34,
 "hfov": 3.42,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D06F36B6_FCC4_DAD7_41C6_6056B64471B3",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E919807C_FC4C_D654_41D1_908AE02778D1_0_0.jpg",
   "width": 1521,
   "class": "ImageResourceLevel",
   "height": 1920
  },
  {
   "url": "media/popup_E919807C_FC4C_D654_41D1_908AE02778D1_0_1.jpg",
   "width": 811,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E919807C_FC4C_D654_41D1_908AE02778D1_0_2.jpg",
   "width": 405,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_27_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_27",
 "height": 1920,
 "width": 1521,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_27.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_C85F4439_FCC4_DDDC_41DF_92BC01F5825D",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_3_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_3",
 "height": 1662,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_3.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_DC446CB1_FCCC_AEED_41BC_38524039B807",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_DC446CB1_FCCC_AEED_41BC_38524039B807_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 692
   }
  ]
 },
 "pitch": 7.18,
 "popupMaxWidth": "95%",
 "yaw": 56.06,
 "hfov": 3.75,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132_0_2.jpg",
    "width": 926,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 9.64,
 "popupMaxWidth": "95%",
 "yaw": 37.85,
 "hfov": 3.7,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_C862F436_FCC4_DDD4_41A8_9C172898DBF8",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 892
  },
  {
   "url": "media/popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 475
  },
  {
   "url": "media/popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 237
  }
 ]
},
{
 "id": "ImageResource_F2D2558F_FCAE_F291_41C6_ACE2905F84E6",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2123
  },
  {
   "url": "media/popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74_0_1.jpg",
   "width": 1852,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74_0_2.jpg",
   "width": 926,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74_0_3.jpg",
   "width": 463,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 914
   }
  ]
 },
 "pitch": 2.36,
 "popupMaxWidth": "95%",
 "yaw": -66.93,
 "hfov": 2.56,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_D211E98B_FCFB_B6BD_4172_02550B15F2D4",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_14_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_14",
 "height": 2667,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_14.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "initialPosition": {
  "yaw": -0.17,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3D1783C_FCB7_71F7_41E0_B17B440EC1EF",
 "id": "camera_F3D1683C_FCB7_71F7_41E4_37E362D8D756",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": 6.86,
 "popupMaxWidth": "95%",
 "yaw": -86.84,
 "hfov": 4.25,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_7_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_7",
 "height": 2849,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_7.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": 13.7,
 "popupMaxWidth": "95%",
 "yaw": 64.39,
 "hfov": 3.32,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -13.65,
 "popupMaxWidth": "95%",
 "yaw": 20.36,
 "hfov": 4.57,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_1_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_1",
 "height": 2123,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_1.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "id": "ImageResource_C8524449_FCC4_DDBD_41B8_34E338C21E8E",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_11_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_11",
 "height": 1488,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_11.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "borderRadius": 0,
 "data": {
  "name": "color block"
 },
 "id": "Container_D99E7C9B_FCCD_6EDC_41E0_22BCD02D7B34",
 "left": 5,
 "backgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "layout": "absolute",
 "width": 10,
 "shadowColor": "#000000",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 10,
 "borderSize": 0,
 "shadowOpacity": 0.5,
 "top": 24,
 "contentOpaque": false,
 "height": 90,
 "shadowVerticalLength": 0,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "backgroundColor": [
  "#A67C52"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": true,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "shadowSpread": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "shadow": true,
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "initialPosition": {
  "yaw": 146.99,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F38B97FE_FCB7_7E73_41C7_B44C8F159BBD",
 "id": "camera_F38BF7FE_FCB7_7E73_41E9_D39FEA030223",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_40_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_40",
 "height": 1452,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_40.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_18_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_18",
 "height": 1586,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_18.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 794
   }
  ]
 },
 "pitch": 15.14,
 "popupMaxWidth": "95%",
 "yaw": -139.6,
 "hfov": 4.14,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_C84E244E_FCC4_DDB4_41E9_D57B76854634",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1945
  },
  {
   "url": "media/popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6_0_1.jpg",
   "width": 1010,
   "class": "ImageResourceLevel",
   "height": 1023
  },
  {
   "url": "media/popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6_0_2.jpg",
   "width": 505,
   "class": "ImageResourceLevel",
   "height": 511
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328_0_1.jpg",
    "width": 772,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 9.19,
 "popupMaxWidth": "95%",
 "yaw": -4.02,
 "hfov": 3.19,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "id": "ImageResource_C8618437_FCC4_DDD4_41B6_E78F32F9BDAF",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D4BA825C_FCCD_5A54_41DD_01A757646D24_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 916
  },
  {
   "url": "media/popup_D4BA825C_FCCD_5A54_41DD_01A757646D24_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 488
  },
  {
   "url": "media/popup_D4BA825C_FCCD_5A54_41DD_01A757646D24_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 244
  }
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E8629788_FC45_7ABC_41A3_77198BE3A023",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E8629788_FC45_7ABC_41A3_77198BE3A023_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 845
   }
  ]
 },
 "pitch": 8.25,
 "popupMaxWidth": "95%",
 "yaw": -21.33,
 "hfov": 2.58,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "scrollBarMargin": 2,
 "titlePaddingTop": 5,
 "id": "window_D11C524B_FC45_F5BC_41ED_81082A117B99",
 "paddingLeft": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "width": 800,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBorderSize": 0,
 "gap": 10,
 "footerHeight": 5,
 "minHeight": 20,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "bodyPaddingRight": 5,
 "bodyPaddingTop": 5,
 "borderSize": 0,
 "modal": true,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "headerPaddingRight": 10,
 "shadowOpacity": 0.5,
 "headerBorderSize": 0,
 "height": 800,
 "title": "Historia",
 "headerBackgroundColorDirection": "vertical",
 "minWidth": 20,
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [],
 "headerBackgroundOpacity": 1,
 "titlePaddingLeft": 5,
 "veilOpacity": 0.4,
 "horizontalAlign": "center",
 "titleFontWeight": "bold",
 "bodyPaddingLeft": 5,
 "titleFontFamily": "Arial",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "titleTextDecoration": "none",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingLeft": 10,
 "scrollBarWidth": 10,
 "closeButtonBorderRadius": 11,
 "class": "Window",
 "backgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "shadow": true,
 "closeButtonPressedIconColor": "#FFFFFF",
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "children": [
  "this.htmlText_D11FE24B_FC45_F5BC_41DC_24D876169B31"
 ],
 "titlePaddingRight": 5,
 "layout": "vertical",
 "closeButtonIconHeight": 12,
 "closeButtonIconLineWidth": 2,
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundOpacity": 1,
 "headerPaddingBottom": 10,
 "shadowBlurRadius": 6,
 "shadowVerticalLength": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "contentOpaque": false,
 "titleFontStyle": "normal",
 "headerVerticalAlign": "middle",
 "bodyBorderColor": "#000000",
 "closeButtonBackgroundColorRatios": [],
 "titleFontSize": "18px",
 "scrollBarOpacity": 0.5,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColorDirection": "vertical",
 "titleFontColor": "#000000",
 "closeButtonIconColor": "#000000",
 "veilColorDirection": "horizontal",
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "headerPaddingTop": 10,
 "verticalAlign": "middle",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "overflow": "scroll",
 "paddingTop": 0,
 "shadowSpread": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window82758"
 }
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_43_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_43",
 "height": 1542,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_43.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "scrollBarMargin": 2,
 "titlePaddingTop": 5,
 "id": "window_D7746462_FC4C_FE6C_41EC_30C69A2FEB7E",
 "paddingLeft": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "width": 800,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBorderSize": 0,
 "gap": 10,
 "footerHeight": 5,
 "minHeight": 20,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "bodyPaddingRight": 5,
 "bodyPaddingTop": 5,
 "borderSize": 0,
 "modal": true,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "headerPaddingRight": 10,
 "shadowOpacity": 0.5,
 "headerBorderSize": 0,
 "height": 800,
 "title": "Pr\u00f3ceres de la Independencia",
 "headerBackgroundColorDirection": "vertical",
 "minWidth": 20,
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [],
 "headerBackgroundOpacity": 1,
 "titlePaddingLeft": 5,
 "veilOpacity": 0.4,
 "horizontalAlign": "center",
 "titleFontWeight": "bold",
 "bodyPaddingLeft": 5,
 "titleFontFamily": "Arial",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "titleTextDecoration": "none",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingLeft": 10,
 "scrollBarWidth": 10,
 "closeButtonBorderRadius": 11,
 "class": "Window",
 "backgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "shadow": true,
 "closeButtonPressedIconColor": "#FFFFFF",
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "children": [
  "this.htmlText_D7765463_FC4C_FE6C_41DB_2635E370BDED"
 ],
 "titlePaddingRight": 5,
 "layout": "vertical",
 "closeButtonIconHeight": 12,
 "closeButtonIconLineWidth": 2,
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundOpacity": 1,
 "headerPaddingBottom": 10,
 "shadowBlurRadius": 6,
 "shadowVerticalLength": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "contentOpaque": false,
 "titleFontStyle": "normal",
 "headerVerticalAlign": "middle",
 "bodyBorderColor": "#000000",
 "closeButtonBackgroundColorRatios": [],
 "titleFontSize": "18px",
 "scrollBarOpacity": 0.5,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColorDirection": "vertical",
 "titleFontColor": "#000000",
 "closeButtonIconColor": "#000000",
 "veilColorDirection": "horizontal",
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "headerPaddingTop": 10,
 "verticalAlign": "middle",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "overflow": "scroll",
 "paddingTop": 0,
 "shadowSpread": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window77130"
 }
},
{
 "id": "ImageResource_D041D6AC_FCC4_DAFB_41C5_C9147D029965",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1488
  },
  {
   "url": "media/popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 793
  },
  {
   "url": "media/popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 396
  }
 ]
},
{
 "id": "ImageResource_D20A9980_FCFB_B6AB_41EF_08895B07724C",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "id": "ImageResource_D01EC6C5_FCC4_DAB5_41D2_BEDD3EFF2D5E",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1662
  },
  {
   "url": "media/popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 886
  },
  {
   "url": "media/popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 443
  }
 ]
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.6,
 "data": {
  "name": "--LOCATION"
 },
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E_mobile",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B_mobile"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7_mobile",
 "left": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "gap": 10,
 "minHeight": 1,
 "borderSize": 0,
 "top": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7_mobile, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D_mobile, true, 0, null, null, false)",
 "propagateClick": true,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "visible": false,
 "overflow": "scroll",
 "class": "Container",
 "scrollBarWidth": 10,
 "paddingTop": 0
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -21.06,
 "popupMaxWidth": "95%",
 "yaw": -88.37,
 "hfov": 4,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": 8.32,
 "popupMaxWidth": "95%",
 "yaw": -92.28,
 "hfov": 2.54,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E_mobile, true, 0, null, null, false); this.setComponentVisibility(this.Container_6396DD92_74B8_852E_41C7_7F2F88EAB543_mobile, false, 0, null, null, false); this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C_mobile.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_ED1DC722_FCB7_7F93_41EC_FAD9456B0B24.set('selectedIndex', -1); }, this); this.playList_ED1DC722_FCB7_7F93_41EC_FAD9456B0B24.set('selectedIndex', 0)",
 "id": "Button_7DBC8382_7065_343F_4183_17B44518DB40_mobile",
 "pressedBackgroundOpacity": 1,
 "paddingLeft": 10,
 "paddingRight": 0,
 "fontFamily": "Oswald",
 "width": "100%",
 "shadowColor": "#000000",
 "iconBeforeLabel": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "fontSize": "30px",
 "minHeight": 1,
 "fontWeight": "normal",
 "borderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "mode": "push",
 "height": 60,
 "backgroundColorDirection": "vertical",
 "label": "\u00c1lbum de Fotos",
 "fontStyle": "italic",
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "paddingBottom": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconHeight": 32,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "shadowSpread": 1,
 "data": {
  "name": "Button Photoalbum"
 },
 "iconWidth": 32,
 "cursor": "hand",
 "class": "Button",
 "paddingTop": 0
},
{
 "id": "ImageResource_D07F56AC_FCC4_DAFB_41DD_9233DCCEACB9",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1280
  },
  {
   "url": "media/popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E_0_1.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 682
  },
  {
   "url": "media/popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E_0_2.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 341
  }
 ]
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_38_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_38",
 "height": 1920,
 "width": 1448,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_38.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "initialPosition": {
  "yaw": -115.48,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3EA682D_FCB7_7191_41E0_ED06778B0CB5",
 "id": "camera_F3EA582D_FCB7_7191_41EC_966352D2A6C2",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "id": "ImageResource_C84F644D_FCC4_DDB4_41ED_C987AC664BAE",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 1965
  },
  {
   "url": "media/popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7_0_1.jpg",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7_0_2.jpg",
   "width": 500,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "scrollBarMargin": 2,
 "titlePaddingTop": 5,
 "id": "window_D3C16EC1_FC5C_AAAD_41E2_F0C2F133CC0A",
 "paddingLeft": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "width": 800,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBorderSize": 0,
 "gap": 10,
 "footerHeight": 5,
 "minHeight": 20,
 "scrollBarColor": "#000000",
 "headerBorderColor": "#000000",
 "bodyPaddingRight": 5,
 "bodyPaddingTop": 5,
 "borderSize": 0,
 "modal": true,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "headerPaddingRight": 10,
 "shadowOpacity": 0.5,
 "headerBorderSize": 0,
 "height": 800,
 "title": "El Museo",
 "headerBackgroundColorDirection": "vertical",
 "minWidth": 20,
 "bodyBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [],
 "headerBackgroundOpacity": 1,
 "titlePaddingLeft": 5,
 "veilOpacity": 0.4,
 "horizontalAlign": "center",
 "titleFontWeight": "bold",
 "bodyPaddingLeft": 5,
 "titleFontFamily": "Arial",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "titleTextDecoration": "none",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "headerPaddingLeft": 10,
 "scrollBarWidth": 10,
 "closeButtonBorderRadius": 11,
 "class": "Window",
 "backgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "shadow": true,
 "closeButtonPressedIconColor": "#FFFFFF",
 "borderRadius": 5,
 "shadowHorizontalLength": 3,
 "children": [
  "this.htmlText_D3C32EC1_FC5C_AAAD_41EE_DA3EBCAE05CE"
 ],
 "titlePaddingRight": 5,
 "layout": "vertical",
 "closeButtonIconHeight": 12,
 "closeButtonIconLineWidth": 2,
 "paddingRight": 0,
 "backgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "shadowColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundOpacity": 1,
 "headerPaddingBottom": 10,
 "shadowBlurRadius": 6,
 "shadowVerticalLength": 0,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "contentOpaque": false,
 "titleFontStyle": "normal",
 "headerVerticalAlign": "middle",
 "bodyBorderColor": "#000000",
 "closeButtonBackgroundColorRatios": [],
 "titleFontSize": "18px",
 "scrollBarOpacity": 0.5,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "backgroundColorDirection": "vertical",
 "titleFontColor": "#000000",
 "closeButtonIconColor": "#000000",
 "veilColorDirection": "horizontal",
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "headerPaddingTop": 10,
 "verticalAlign": "middle",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "overflow": "scroll",
 "paddingTop": 0,
 "shadowSpread": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "data": {
  "name": "Window86764"
 }
},
{
 "id": "ImageResource_F2D4458D_FCAE_F291_41E2_D6827A591F4A",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466_0_0.jpg",
   "width": 1920,
   "class": "ImageResourceLevel",
   "height": 2683
  },
  {
   "url": "media/popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466_0_1.jpg",
   "width": 1465,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466_0_2.jpg",
   "width": 732,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466_0_3.jpg",
   "width": 366,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "initialPosition": {
  "yaw": 35.2,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3CA485A_FCB7_71B3_41E1_633377D4F22B",
 "id": "camera_F3CAB85A_FCB7_71B3_41DB_E88927C78B31",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE_0_1.jpg",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 682
   }
  ]
 },
 "pitch": -7.35,
 "popupMaxWidth": "95%",
 "yaw": 107.45,
 "hfov": 4.66,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupDistance": 100,
 "hideEasing": "cubic_out",
 "hideDuration": 500,
 "id": "popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6",
 "rotationZ": 0,
 "showEasing": "cubic_in",
 "popupMaxHeight": "95%",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6_0_2.jpg",
    "width": 947,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": 6.75,
 "popupMaxWidth": "95%",
 "yaw": -37.27,
 "hfov": 1.93,
 "class": "PopupPanoramaOverlay",
 "showDuration": 500
},
{
 "items": [
  {
   "media": "this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 0, 1)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_camera"
  },
  {
   "media": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 1, 2)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_camera"
  },
  {
   "media": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 2, 3)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_camera"
  },
  {
   "media": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 3, 4)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_camera"
  },
  {
   "media": "this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 4, 5)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_camera"
  },
  {
   "media": "this.panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 5, 6)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_camera"
  },
  {
   "media": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 6, 7)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_camera"
  },
  {
   "media": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 7, 8)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_camera"
  },
  {
   "media": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 8, 9)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_camera"
  },
  {
   "media": "this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 9, 10)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_camera"
  },
  {
   "media": "this.panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 10, 11)",
   "player": "this.MainViewer_mobilePanoramaPlayer",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F6C6D406_FBDC_DDB4_41D2_0FEFE280BB0C_camera"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist, 11, 0)",
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B",
   "player": "this.MainViewer_mobilePhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_mobile_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 77.23,
  "hfov": 80,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "initialSequence": "this.sequence_F3309869_FCB7_7191_41E1_F481B825C8A0",
 "id": "camera_F3308869_FCB7_7191_41E2_A6E0C4656AF4",
 "automaticZoomSpeed": 10,
 "manualZoomSpeed": 2
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_22_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_22",
 "height": 892,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_22.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_10_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_10",
 "height": 1515,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_10.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_15_t.jpg",
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_15",
 "height": 1320,
 "width": 1920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_15.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "class": "Photo"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.55,
 "id": "veilPopupPanorama",
 "left": 0,
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "minHeight": 0,
 "borderSize": 0,
 "top": 0,
 "minWidth": 0,
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 350,
  "class": "FadeInEffect"
 },
 "paddingBottom": 0,
 "data": {
  "name": "UIComponent2655"
 },
 "visible": false,
 "class": "UIComponent",
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 1,
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "backgroundColorRatios": [],
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "minHeight": 0,
 "borderSize": 0,
 "top": 0,
 "minWidth": 0,
 "bottom": 0,
 "backgroundColor": [],
 "backgroundColorDirection": "vertical",
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "custom",
 "data": {
  "name": "ZoomImage2656"
 },
 "visible": false,
 "class": "ZoomImage",
 "paddingTop": 0
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0.3,
 "id": "closeButtonPopupPanorama",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "rollOverIconColor": "#666666",
 "paddingLeft": 5,
 "paddingRight": 5,
 "fontFamily": "Arial",
 "right": 10,
 "iconColor": "#000000",
 "shadowColor": "#000000",
 "iconLineWidth": 5,
 "gap": 5,
 "fontSize": "1.29vmin",
 "minHeight": 0,
 "iconBeforeLabel": true,
 "fontWeight": "normal",
 "borderColor": "#000000",
 "borderSize": 0,
 "shadowBlurRadius": 6,
 "top": 10,
 "fontColor": "#FFFFFF",
 "minWidth": 0,
 "layout": "horizontal",
 "mode": "push",
 "pressedIconColor": "#888888",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "backgroundColorDirection": "vertical",
 "label": "",
 "fontStyle": "normal",
 "propagateClick": false,
 "horizontalAlign": "center",
 "iconHeight": 20,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 350,
  "class": "FadeInEffect"
 },
 "paddingBottom": 5,
 "verticalAlign": "middle",
 "textDecoration": "none",
 "shadowSpread": 1,
 "visible": false,
 "data": {
  "name": "CloseButton2657"
 },
 "class": "CloseButton",
 "iconWidth": 20,
 "cursor": "hand",
 "paddingTop": 5
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F38037EF_FCB7_7E91_41E6_34F521860343",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F6CC79A7_FBDD_B6F4_41EA_8A9A052A088D",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": -103.63,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 41.26,
 "bleaching": 0.7,
 "id": "overlay_F594B0CD_FBFB_D6B4_41E7_DC2DD57AC252"
},
{
 "yaw": -49.11,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 38.5,
 "bleaching": 0.7,
 "id": "overlay_F56089F4_FBFB_D654_41E9_2D4C5859AEBB"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -21.33,
   "hfov": 2.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 8.25
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E8629788_FC45_7ABC_41A3_77198BE3A023, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07426B6_FCC4_DAD7_41ED_F5A38086658D, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_0_0.png",
      "width": 72,
      "class": "ImageResourceLevel",
      "height": 74
     }
    ]
   },
   "pitch": 8.25,
   "yaw": -21.33,
   "hfov": 2.58
  }
 ],
 "id": "overlay_EFAB844F_FC45_BDB5_41E4_ECF424A56C9A",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -37.27,
   "hfov": 2.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 6.75
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EFC51BA9_FC44_AAFC_41B0_6AF6DA8123F6, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07336B6_FCC4_DAD7_41E4_ED4B54C6C282, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_1_0.png",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": 6.75,
   "yaw": -37.27,
   "hfov": 2.04
  }
 ],
 "id": "overlay_EF3995FF_FC44_DE54_41DC_9A572E902CDB",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -108.74,
   "hfov": 2.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 16.79
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E8E1BAA6_FC4B_EAF4_41EF_70F281AD5387, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D071F6B6_FCC4_DAD7_41E1_066535F06347, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_2_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 70
     }
    ]
   },
   "pitch": 16.79,
   "yaw": -108.74,
   "hfov": 2.46
  }
 ],
 "id": "overlay_E80787EC_FC4B_BA74_41DC_0FD74858E960",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 106.06,
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.92
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251, this.camera_F38027EF_FCB7_7E91_41EB_23D948F420A7); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B8A67F_FCC4_DA55_41E3_BBBC819B6BFB",
   "yaw": 106.06,
   "hfov": 15.89,
   "pitch": -9.92,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E6FD8896_FC4C_F6D4_41E0_1D664DAB999B",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 162.23,
   "hfov": 15.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.83
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8, this.camera_F399B7DF_FCB7_7EB1_41CE_215139BBD6A6); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B8667F_FCC4_DA55_41E1_EF4519E14056",
   "yaw": 162.23,
   "hfov": 15.94,
   "pitch": -8.83,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E8639E60_FC4D_EA6C_41DE_F9946B556B02",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 64.68,
   "hfov": 3.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.78
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D4CBD7A4_FCCD_5AEB_41EB_ECEC75F5EBEC, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C862F436_FCC4_DDD4_41A8_9C172898DBF8, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_5_0.png",
      "width": 95,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -16.78,
   "yaw": 64.68,
   "hfov": 3.27
  }
 ],
 "id": "overlay_DB9EF065_FCCD_7675_41E9_E39AF0125BAE",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 62.31,
   "hfov": 3.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.1
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D4BA825C_FCCD_5A54_41DD_01A757646D24, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C8618437_FCC4_DDD4_41B6_E78F32F9BDAF, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_6_0.png",
      "width": 95,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": -7.1,
   "yaw": 62.31,
   "hfov": 3.39
  }
 ],
 "id": "overlay_D432A048_FCCD_B5BC_41D2_8A9474CE7993",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 62.34,
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.12
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D5750800_FCCC_F5AC_41C7_52033C261DF8, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C860A438_FCC4_DDDC_41DD_6EB41D70B66A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_7_0.png",
      "width": 95,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": 3.12,
   "yaw": 62.34,
   "hfov": 3.42
  }
 ],
 "id": "overlay_D4FBFA2D_FCCC_B5F5_41C1_8C7221068584",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 64.39,
   "hfov": 3.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.7
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D48AF41A_FCCB_5DDF_41E1_6027FC06608C, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C85F4439_FCC4_DDDC_41DF_92BC01F5825D, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_8_0.png",
      "width": 95,
      "class": "ImageResourceLevel",
      "height": 100
     }
    ]
   },
   "pitch": 13.7,
   "yaw": 64.39,
   "hfov": 3.32
  }
 ],
 "id": "overlay_D4116ACF_FCCB_6AB4_4143_60FB0B27D152",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -0.35,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.4
  }
 ],
 "areas": [
  {
   "click": "this.showWindow(this.window_D775C92F_FC45_77F4_41E5_BE6A8D047E0D, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C577A4B4_FC44_DEEB_41C3_C1602499BDAA",
   "yaw": -0.35,
   "hfov": 7.53,
   "pitch": 2.4,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D0899973_FC45_766C_41E4_D9CE2308350A",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "yaw": -84.79,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 57.09,
 "bleaching": 0.7,
 "id": "overlay_F61FD71C_FBC5_BBD4_41DE_AE4459ED05F9"
},
{
 "yaw": 102.88,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 73.92,
 "bleaching": 0.7,
 "id": "overlay_F63EFD6B_FBC5_AE7D_41C8_674DE02281B7"
},
{
 "yaw": 162.67,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 19.91,
 "bleaching": 0.7,
 "id": "overlay_F62A29B2_FBC5_76EF_41D1_EA74A3F07495"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 179.87,
   "hfov": 18.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.86
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6, this.camera_F3AF87AC_FCB7_7E97_41D5_9B23934260D3); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B16684_FCC4_DAAB_4153_E95E9646A660",
   "yaw": 179.87,
   "hfov": 18.12,
   "pitch": -8.86,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DCF25246_FCCB_D5B7_41E9_0C9AA58DACAB",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 3.72,
   "hfov": 5.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.96
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3ADDDA5_FCCC_AEF5_41E6_F34237C86117, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06366C5_FCC4_DAB5_41C2_4807A6D08E66, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_1_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 156
     }
    ]
   },
   "pitch": 4.96,
   "yaw": 3.72,
   "hfov": 5.67
  }
 ],
 "id": "overlay_D96460C4_FCCC_F6AB_41E0_F8156CFD09E9",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 20.36,
   "hfov": 4.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.65
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E306C631_FCCD_7DEC_41D4_CE37FEEC0782, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D20A9980_FCFB_B6AB_41EF_08895B07724C, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_2_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -13.65,
   "yaw": 20.36,
   "hfov": 4.57
  }
 ],
 "id": "overlay_E3122659_FCCD_7A5C_41CD_DA64A985476C",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_3_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 37.85,
   "hfov": 4.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 9.64
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3A62B7B_FCCD_AA5C_41C7_EFC6F5081132, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06156C5_FCC4_DAB5_41DC_850D73E8A7B3, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_3_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 9.64,
   "yaw": 37.85,
   "hfov": 4.64
  }
 ],
 "id": "overlay_E368EF4C_FCCD_EBB4_41E2_4B692F6EB75B",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_4_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 56.06,
   "hfov": 3.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.18
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_DC446CB1_FCCC_AEED_41BC_38524039B807, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06036C5_FCC4_DAB5_41CC_D3AFB22A2043, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_4_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 94
     }
    ]
   },
   "pitch": 7.18,
   "yaw": 56.06,
   "hfov": 3.75
  }
 ],
 "id": "overlay_E3CFC787_FCCD_5AB5_4171_7829632CB7E5",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 65.79,
   "hfov": 1.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 5.3
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_DD770FD3_FCCF_6AAC_41DD_0A741D12A0CD, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D01EC6C5_FCC4_DAB5_41D2_BEDD3EFF2D5E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_5_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 60
     }
    ]
   },
   "pitch": 5.3,
   "yaw": 65.79,
   "hfov": 1.97
  }
 ],
 "id": "overlay_DC747649_FCCC_DDBC_41D8_246B56A6B0C9",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_6_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 112.02,
   "hfov": 3.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.45
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E33285D5_FCCF_5E55_41ED_476D2B398123, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D01DA6C5_FCC4_DAB5_41D4_9938C9AA8CDE, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_6_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 94
     }
    ]
   },
   "pitch": -17.45,
   "yaw": 112.02,
   "hfov": 3.6
  }
 ],
 "id": "overlay_E39DC698_FCCF_BADB_41D8_79C67EAB3173",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 64.52,
   "hfov": 10.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.6
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151, this.camera_F392B7BD_FCB7_7EF1_41E1_C363B34FB2E0); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7AF6684_FCC4_DAAB_41EE_50CBA907A3D2",
   "yaw": 64.52,
   "hfov": 10.79,
   "pitch": -9.6,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DC19D8FF_FCCC_D655_41EB_5B53E7CB60A5",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 04"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F6CDB9A7_FBDD_B6F4_41EE_A2EFA05EC171",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": 89.06,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 20.66,
 "bleaching": 0.7,
 "id": "overlay_F58EC2E7_FBC5_FA74_41B8_26DD4059C9AD"
},
{
 "yaw": -66.45,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 75.43,
 "bleaching": 0.7,
 "id": "overlay_F63C16F5_FBFD_5A55_41E9_6B284299FB49"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -8.32,
   "hfov": 9.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.33
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6, this.camera_F3308869_FCB7_7191_41E2_A6E0C4656AF4); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D09EC722_FCFC_BBEF_41C6_87C9582E60F5",
   "yaw": -8.32,
   "hfov": 9.66,
   "pitch": -6.33,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EA192255_FBC4_DA54_41E4_BBAB6653638B",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01c"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 72.36,
   "hfov": 12.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.32
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D780367A_FCC4_DA5F_41EA_3484F8EEAD75",
   "yaw": 72.36,
   "hfov": 12.61,
   "pitch": -6.32,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E9AC76C9_FBC5_7ABC_41EE_D47D1EC8E147",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -83.22,
   "hfov": 4.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.04
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E31021A8_FCC4_B6FB_41E3_B4321527D5E8, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D04796A2_FCC4_DAF0_41C9_FFD605738217, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_2_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": -9.04,
   "yaw": -83.22,
   "hfov": 4.23
  }
 ],
 "id": "overlay_DF85BFBA_FCC7_EADC_41E9_4CA90FA04329",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -61.53,
   "hfov": 3.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 27.73
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3A081B9_FCC7_76DC_41E8_CF45D3F0CC52, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D043E6A7_FCC4_DAF5_41E1_AE7B4A83443F, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_3_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 27.73,
   "yaw": -61.53,
   "hfov": 3.79
  }
 ],
 "id": "overlay_E32B8923_FCC7_B7ED_41E6_C5A231594F08",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -139.6,
   "hfov": 4.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 15.14
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D501E69B_FCC5_DADC_41E0_6D194B1CB452, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C874F421_FCC4_DDED_41DF_04790863B23D, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_4_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 15.14,
   "yaw": -139.6,
   "hfov": 4.14
  }
 ],
 "id": "overlay_D5709FA9_FCC5_AAFD_41C9_50815E4FE10C",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 50.3,
   "hfov": 7.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 5.72
  }
 ],
 "areas": [
  {
   "click": "this.showWindow(this.window_D11C524B_FC45_F5BC_41ED_81082A117B99, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C57F84AD_FC44_DEF5_41D6_D6866B41F17E",
   "yaw": 50.3,
   "hfov": 7.5,
   "pitch": 5.72,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D194A51C_FC45_DFDB_41E9_8E41A356B6CE",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "yaw": 33.79,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 77.19,
 "bleaching": 0.7,
 "id": "overlay_F60BC014_FBC4_D5D4_41E1_614725C6F3A1"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -119.8,
   "hfov": 4.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D4168468_FCCB_7E7C_41EE_072C41F57617, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C853A447_FCC4_DDB5_41EA_0142F889AF30, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_0_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ]
   },
   "pitch": -11,
   "yaw": -119.8,
   "hfov": 4.21
  }
 ],
 "id": "overlay_D4B73E41_FCCB_ADAC_41ED_C24BBE29724A",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -88.37,
   "hfov": 4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.06
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D6531218_FCC5_B5DC_41E6_7A4F5E34C051, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C8524449_FCC4_DDBD_41B8_34E338C21E8E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_1_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ]
   },
   "pitch": -21.06,
   "yaw": -88.37,
   "hfov": 4
  }
 ],
 "id": "overlay_D402E850_FCC4_F5AD_41E3_FB35FEA72AE4",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -90.91,
   "hfov": 4.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.11
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D49F1BA3_FCC5_AAEC_41A6_6A89CD8AB21F, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C851744A_FCC4_DDBF_41A9_2D4EA208A173, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_2_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ]
   },
   "pitch": -8.11,
   "yaw": -90.91,
   "hfov": 4.24
  }
 ],
 "id": "overlay_D4B06F6E_FCC4_AA77_41E2_2A1820C2FDA7",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -86.84,
   "hfov": 4.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 6.86
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D4CF13B0_FCC5_7AEC_41E5_C36E081A226C, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C850244B_FCC4_DDBD_41E3_0EBBEC77D52B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_3_0.png",
      "width": 118,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ]
   },
   "pitch": 6.86,
   "yaw": -86.84,
   "hfov": 4.25
  }
 ],
 "id": "overlay_D48DF991_FCC4_B6AC_41C1_C3ED2FB592CD",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -8.07,
   "hfov": 4.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.08
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D5FD992D_FCC4_F7F4_41D1_F36772572F39, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C850544C_FCC4_DDB4_41EE_9A844C2BCEDB, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_4_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 13.08,
   "yaw": -8.07,
   "hfov": 4.17
  }
 ],
 "id": "overlay_D560A534_FCC4_DFEB_41C0_332750517CA9",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 17.85,
   "hfov": 3.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.72
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D488EEB3_FCC7_6AED_41D6_7E1BFC49BCD7, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C84F644D_FCC4_DDB4_41ED_C987AC664BAE, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_5_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": 7.72,
   "yaw": 17.85,
   "hfov": 3.52
  }
 ],
 "id": "overlay_D408D447_FCC4_BDB4_41B0_B3E0AE0A4F5A",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -1.01,
   "hfov": 3.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.96
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D51B7B78_FCC7_AA5C_41E7_3730FEECE1B6, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C84E244E_FCC4_DDB4_41E9_D57B76854634, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_6_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -23.96,
   "yaw": -1.01,
   "hfov": 3.25
  }
 ],
 "id": "overlay_D4B48622_FCC7_DDEF_41E5_9B438C676ED0",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 40.29,
   "hfov": 3.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.8
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_D5247812_FCC4_B5AC_41EE_0229C647C73C, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_C84D2450_FCC4_DDAC_41B6_9225C3910001, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706F49D_FBDD_DED4_41D9_71480E5C680E_0_HS_7_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 96
     }
    ]
   },
   "pitch": -26.8,
   "yaw": 40.29,
   "hfov": 3.17
  }
 ],
 "id": "overlay_D4BBB388_FCC7_7ABB_41E2_603F6A64BEAF",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F6CDD9A6_FBDD_B6F4_41E8_04C5DF106EE6",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": 90.57,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 21.67,
 "bleaching": 0.7,
 "id": "overlay_F5DEF75B_FBC5_DA5D_41BA_72BFE88407FA"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 179.83,
   "hfov": 25.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.55
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151, this.camera_F394B7CE_FCB7_7E93_41E0_252AC8AD15C9); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7AE3689_FCC4_DABD_41D2_E710AD133E94",
   "yaw": 179.83,
   "hfov": 25.06,
   "pitch": -12.55,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DCD0DF5D_FCC5_EA55_41BA_971F04C7138A",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_1_HS_1_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 89.8,
   "hfov": 14.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.32
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7ADD689_FCC4_DABD_41EF_4EE94D791B7B",
   "yaw": 89.8,
   "hfov": 14.29,
   "pitch": -13.32,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_DD490C9C_FCC4_EEDB_41EA_BF1F804E63C1",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01c"
 }
},
{
 "yaw": 32.78,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 32.22,
 "bleaching": 0.7,
 "id": "overlay_F61A48EB_FBFB_B67C_41E2_18DB578B22B4"
},
{
 "yaw": 65.44,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 38.25,
 "bleaching": 0.7,
 "id": "overlay_F5E0AF7C_FBFB_AA5B_41EE_148B5CD6BCCE"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 134.08,
   "hfov": 14.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.7
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719, this.camera_F3DFF84A_FCB7_7193_41E6_DBD7845EDBAD); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B7F67F_FCC4_DA55_41DE_2C7C09095AB6",
   "yaw": 134.08,
   "hfov": 14.98,
   "pitch": -6.7,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EFCD27A0_FC4C_BAEC_41CE_C6D1E60ECD02",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -33.01,
   "hfov": 17.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.79
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4, this.camera_F3CAB85A_FCB7_71B3_41DB_E88927C78B31); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B7A67F_FCC4_DA55_41E4_FF2D78EE6069",
   "yaw": -33.01,
   "hfov": 17.73,
   "pitch": -6.79,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EA18425B_FC4F_5A5D_41EA_4467C759CDD2",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 0.31,
   "hfov": 3.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 23.84
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E8A86492_FC4D_FEAF_41E1_C8A58FBAC232, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07026B6_FCC4_DAD7_41EC_A09C50AE38CA, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_2_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 23.84,
   "yaw": 0.31,
   "hfov": 3.92
  }
 ],
 "id": "overlay_E847EE11_FC4D_ADAC_41E0_F3971B354CD4",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 18.15,
   "hfov": 3.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 16.97
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E919807C_FC4C_D654_41D1_908AE02778D1, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06F36B6_FCC4_DAD7_41C6_6056B64471B3, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_3_0.png",
      "width": 88,
      "class": "ImageResourceLevel",
      "height": 94
     }
    ]
   },
   "pitch": 16.97,
   "yaw": 18.15,
   "hfov": 3.04
  }
 ],
 "id": "overlay_E867271C_FC4D_7BD4_41E0_2083DE6221D2",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 27.14,
   "hfov": 1.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 12.62
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EB20CD73_FC4B_EE6C_41EC_8DA422FC0209, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06F76BB_FCC4_DADD_41ED_91811EA90AC4, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_4_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 54
     }
    ]
   },
   "pitch": 12.62,
   "yaw": 27.14,
   "hfov": 1.94
  }
 ],
 "id": "overlay_E844E1E9_FC4C_B67C_41EB_C8F9C1133DF6",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 104.77,
   "hfov": 3.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.09
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EB8098C1_FC44_D6AD_41E3_B65A5B73C6B1, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06E76BB_FCC4_DADD_41D5_5E2D712AD21A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_5_0.png",
      "width": 89,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": 13.09,
   "yaw": 104.77,
   "hfov": 3.15
  }
 ],
 "id": "overlay_E9F907BB_FC4B_5ADC_41E5_95A41CEF2563",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 90.52,
   "hfov": 2.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 10.76
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E95F10E0_FC5F_D66B_41E5_6BB27ADD48F9, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06CE6BB_FCC4_DADD_41D4_20EE38C3B9B7, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_6_0.png",
      "width": 68,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   },
   "pitch": 10.76,
   "yaw": 90.52,
   "hfov": 2.43
  }
 ],
 "id": "overlay_E91D07AC_FC45_5AF4_41CF_49FB71E927DC",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 94.26,
   "hfov": 2.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.21
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E61F2A84_FC47_EAB4_41E2_BB419D83E62A, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06BC6BB_FCC4_DADD_41ED_1817976174FE, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_7_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   },
   "pitch": -19.21,
   "yaw": 94.26,
   "hfov": 2.41
  }
 ],
 "id": "overlay_E9CA1114_FC45_57AB_41CF_560020E79AEA",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 62.99,
   "hfov": 2.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.56
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EB0E7AA5_FC44_EAF4_41C9_14032014D111, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06AD6BB_FCC4_DADD_41D9_C4BED0556926, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_8_0.png",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 65
     }
    ]
   },
   "pitch": -6.56,
   "yaw": 62.99,
   "hfov": 2.41
  }
 ],
 "id": "overlay_EA22904C_FC44_B5B4_41C1_8566164FC4BF",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 117.96,
   "hfov": 2.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.49
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EA5F7A32_FC5B_75EF_41C7_03FD7AF7F760, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D069B6BB_FCC4_DADD_41C7_7B1C09894D4A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_9_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 68
     }
    ]
   },
   "pitch": -8.49,
   "yaw": 117.96,
   "hfov": 2.52
  }
 ],
 "id": "overlay_E9CD0D18_FC44_AFDB_41CE_EC56C633FE23",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -8.57,
   "hfov": 7.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13
  }
 ],
 "areas": [
  {
   "click": "this.showWindow(this.window_D7746462_FC4C_FE6C_41EC_30C69A2FEB7E, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C57464B7_FC44_DED5_41D6_F70ECC79DFA7",
   "yaw": -8.57,
   "hfov": 7.34,
   "pitch": 13,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D79DF08C_FC4C_B6B4_41D6_44984BC080C1",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F70949A9_FBDD_B6FC_41DA_D4A831467966",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F70689A9_FBDD_B6FC_41D9_6F3EAA3C4516",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F706A9A8_FBDD_B6FC_41BE_3724C6EAF811",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F706E9A8_FBDD_B6FC_41B1_51223B453837",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F33F6877_FCB7_7271_41E1_1E4C0920CC33",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F39947DF_FCB7_7EB1_41E8_EF45E18A4C4A",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": -139.8,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 45.53,
 "bleaching": 0.7,
 "id": "overlay_F60845E3_FBFB_5E6C_41E1_49E7F622BD04"
},
{
 "yaw": 38.81,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 43.02,
 "bleaching": 0.7,
 "id": "overlay_F5FA7351_FBFC_FBAD_41D5_0D67D2D4467A"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 157.89,
   "hfov": 23.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.73
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7BE667A_FCC4_DA5F_41E2_58EAD3F56A06",
   "yaw": 157.89,
   "hfov": 23.84,
   "pitch": -8.73,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EFC0B30C_FBC5_7BB4_41BD_ACDE85F1AC30",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -14.32,
   "hfov": 12.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.49
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719, this.camera_F33F5877_FCB7_7271_41D8_81E938C29C50); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7BE167A_FCC4_DA5F_41C0_C0A0CA774E66",
   "yaw": -14.32,
   "hfov": 12.8,
   "pitch": -5.49,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EE2A393B_FBC4_B7DD_41E6_72AF9FF91D7B",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 84.93,
   "hfov": 4.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.76
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EEFDAC74_FC3C_AE6B_41AF_1D91D7E2AA33, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D042D6A7_FCC4_DAF5_41CC_23A90E02F5A7, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_2_0.png",
      "width": 123,
      "class": "ImageResourceLevel",
      "height": 123
     }
    ]
   },
   "pitch": 13.76,
   "yaw": 84.93,
   "hfov": 4.32
  }
 ],
 "id": "overlay_EE8871B0_FC3B_76EC_41EB_2F16BAD20E1A",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 100.93,
   "hfov": 4.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 11.54
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E91EE10C_FC3D_D7BB_41D7_D722A075471E, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D041D6AC_FCC4_DAFB_41C5_C9147D029965, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_3_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 11.54,
   "yaw": 100.93,
   "hfov": 4.2
  }
 ],
 "id": "overlay_E81E6A1A_FC3D_75DF_41C1_239FCB2113DE",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "yaw": 40.3,
   "hfov": 2.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.08
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EEA48EA1_FC3F_AAED_41DF_0569BA028ACC, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D04086AC_FCC4_DAFB_41C2_566E6CFE3444, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_4_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 97
     }
    ]
   },
   "pitch": -21.08,
   "yaw": 40.3,
   "hfov": 2.66
  }
 ],
 "id": "overlay_EF4F9203_FC3D_55AC_41D7_E27F591436D0",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "yaw": 16.14,
   "hfov": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.18
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EF80CCB9_FC3F_AEDC_41D9_3108BEC1DA3E, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07F56AC_FCC4_DAFB_41DD_9233DCCEACB9, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_5_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 97
     }
    ]
   },
   "pitch": -2.18,
   "yaw": 16.14,
   "hfov": 2.85
  }
 ],
 "id": "overlay_EEDA1C7C_FC3F_EE5B_41A7_94C1D17049BB",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "yaw": 9.88,
   "hfov": 2.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.27
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EF8C9E4A_FC3C_EDBC_41E9_74FE5B55552D, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07E36AC_FCC4_DAFB_41E5_39993058E4B2, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_6_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 97
     }
    ]
   },
   "pitch": -11.27,
   "yaw": 9.88,
   "hfov": 2.8
  }
 ],
 "id": "overlay_EEC152BD_FC3F_5AD4_41E2_C957B3D39086",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "yaw": 28.79,
   "hfov": 2.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.95
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E91FC169_FC3D_B67D_41DA_0F4F16782A99, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07CF6AC_FCC4_DAFB_41D8_6D4B90012D8E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_7_0.png",
      "width": 74,
      "class": "ImageResourceLevel",
      "height": 83
     }
    ]
   },
   "pitch": -3.95,
   "yaw": 28.79,
   "hfov": 2.67
  }
 ],
 "id": "overlay_EFD2D60B_FC3D_5DBC_41EC_8C5361ADC896",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -66.17,
   "hfov": 2.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.43
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EF731AB6_FC3B_6AD4_41C2_620C61842C01, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07BC6AC_FCC4_DAFB_41E5_29B24972E22B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_8_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -8.43,
   "yaw": -66.17,
   "hfov": 2.54
  }
 ],
 "id": "overlay_E823DB8C_FC3D_6ABB_41DF_AFE7819A906D",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -79.65,
   "hfov": 2.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.73
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EF19586F_FC3B_F674_41D7_7D5F6B3E4F09, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07AD6B1_FCC4_DAED_41B5_788E37B61427, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_9_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -9.73,
   "yaw": -79.65,
   "hfov": 2.53
  }
 ],
 "id": "overlay_E8E765A0_FC3C_BEEC_41E4_62DCCAA4DC6F",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -66.93,
   "hfov": 2.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.36
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EAAF666E_FC3C_DA74_41CD_B526BC61A959, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07B16B1_FCC4_DAED_41ED_B674C041D320, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_10_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": 2.36,
   "yaw": -66.93,
   "hfov": 2.56
  }
 ],
 "id": "overlay_E96240FF_FC3C_D655_419D_B748B982F62A",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -94.34,
   "hfov": 2.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.64
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E951D931_FC45_77ED_41EC_7872266B5F5A, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D079F6B1_FCC4_DAED_41DA_419704438EB5, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_11_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -20.64,
   "yaw": -94.34,
   "hfov": 2.4
  }
 ],
 "id": "overlay_EF28E6B8_FC3B_7ADC_41CB_877DCBABF15D",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -94.55,
   "hfov": 2.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.36
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EFB79C53_FC45_6DAC_41B0_095DDFF52694, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D078D6B1_FCC4_DAED_41D2_54EF33A783D3, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_12_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -5.36,
   "yaw": -94.55,
   "hfov": 2.55
  }
 ],
 "id": "overlay_EF01F001_FC45_B5AC_41E0_58946182FDD1",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -92.28,
   "hfov": 2.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 8.32
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EFC68AC4_FC47_6AAB_41D2_FB45A21DE471, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D077A6B1_FCC4_DAED_41E0_06C8B1DB8A8D, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_13_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": 8.32,
   "yaw": -92.28,
   "hfov": 2.54
  }
 ],
 "id": "overlay_EF2C009A_FC44_B6DF_41BB_E081A6FA7540",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_14_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -125.24,
   "hfov": 2.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 10.51
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EFB32C07_FC47_EDB5_41EE_75BF3DF2D03D, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D076B6B1_FCC4_DAED_41D0_D6EE1ADD9349, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_14_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": 10.51,
   "yaw": -125.24,
   "hfov": 2.52
  }
 ],
 "id": "overlay_EF1F0078_FC47_B65B_41DF_CBB6DECC5BF8",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_15_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -150.17,
   "hfov": 2.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.58
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E8161414_FC47_5DD4_41EC_FE9968EBB291, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D07596B6_FCC4_DAD7_41E1_45B5F6D132C9, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_15_0.png",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 75
     }
    ]
   },
   "pitch": -0.58,
   "yaw": -150.17,
   "hfov": 2.56
  }
 ],
 "id": "overlay_EF359FFC_FC47_AA54_41E9_46AF9613EBB1",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0_HS_16_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -30.52,
   "hfov": 7.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.58
  }
 ],
 "areas": [
  {
   "click": "this.showWindow(this.window_D001FBF7_FC4F_6A54_41DA_493ED2234296, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_C57A94B1_FC44_DEED_41C0_62008D491F63",
   "yaw": -30.52,
   "hfov": 7.53,
   "pitch": 2.58,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D768D358_FC4C_BA5B_41E5_AF1A6FA67B09",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0_HS_17_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -14.78,
   "hfov": 5.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 14.33
  }
 ],
 "areas": [
  {
   "click": "this.showWindow(this.window_D3C16EC1_FC5C_AAAD_41E2_F0C2F133CC0A, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D2854F66_FC5F_AA74_41E4_406D99456F5C",
   "yaw": -14.78,
   "hfov": 5.93,
   "pitch": 14.33,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D21816E6_FC5D_7A77_41B5_FE83C18C728E",
 "data": {
  "label": "Info Red 02"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F6CD99A7_FBDD_B6F4_41D2_5BE5ECE86D9F",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F706C9A8_FBDD_B6FC_41D3_23FBA53A034F",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": -43.34,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 33.98,
 "bleaching": 0.7,
 "id": "overlay_F5C2B189_FBC4_B6BD_41EF_12BDE51E788C"
},
{
 "yaw": -20.22,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 21.67,
 "bleaching": 0.7,
 "id": "overlay_F5FB6819_FBC4_B5DD_41B4_F02EE4C1E39A"
},
{
 "yaw": 22.48,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 24.43,
 "bleaching": 0.7,
 "id": "overlay_F5F46E0D_FBC4_ADB5_41CA_AF4E2EEF6F69"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 51.96,
   "hfov": 8.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 5.03
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7AEF684_FCC4_DAAB_41BE_8FD7E5158B51",
   "yaw": 51.96,
   "hfov": 8.05,
   "pitch": 5.03,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E3EAE0ED_FCCC_F674_41C0_FBB0009DE1FB",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 114.06,
   "hfov": 5.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.42
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DE60B6_FCCC_F6D4_41EF_0147A706C466, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_F2D4458D_FCAE_F291_41E2_D6827A591F4A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_1_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 156
     }
    ]
   },
   "pitch": 4.42,
   "yaw": 114.06,
   "hfov": 5.67
  }
 ],
 "id": "overlay_E3EA90ED_FCCC_F674_41E9_6ABB120F7879",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 107.45,
   "hfov": 4.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.35
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DE30B6_FCCC_F6D4_41E7_AED716D446FE, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D211E98B_FCFB_B6BD_4172_02550B15F2D4, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_2_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": -7.35,
   "yaw": 107.45,
   "hfov": 4.66
  }
 ],
 "id": "overlay_E3EA90ED_FCCC_F674_41E3_1ECCDC6AF5F3",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_3_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 125.36,
   "hfov": 4.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 14.44
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DDC0B6_FCCC_F6D4_41E3_14E86D625E74, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_F2D2558F_FCAE_F291_41C6_ACE2905F84E6, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_3_0.png",
      "width": 130,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "pitch": 14.44,
   "yaw": 125.36,
   "hfov": 4.55
  }
 ],
 "id": "overlay_E3EA80ED_FCCC_F674_41E6_993CAC223FC0",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 139.87,
   "hfov": 5.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 21.06
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DDF0B6_FCCC_F6D4_41DE_3F963D77EDB8, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_F2D35590_FCAE_F28F_41E0_49F6C0F494A0, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_4_0.png",
      "width": 158,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": 21.06,
   "yaw": 139.87,
   "hfov": 5.31
  }
 ],
 "id": "overlay_E3EAA0ED_FCCC_F674_41B6_E60D51DB9D18",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_5_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -114.63,
   "hfov": 4.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 17.95
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DDB0B6_FCCC_F6D4_41CC_5F924987EA50, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_F2D05590_FCAE_F28F_41A8_30DC1536FD94, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_5_0.png",
      "width": 142,
      "class": "ImageResourceLevel",
      "height": 132
     }
    ]
   },
   "pitch": 17.95,
   "yaw": -114.63,
   "hfov": 4.88
  }
 ],
 "id": "overlay_E3EA50ED_FCCC_F674_41BB_C4173B5AC559",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_6_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 52.55,
   "hfov": 3.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.28
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E3DD70BB_FCCC_F6DC_41E8_213669A4C23E, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D215998F_FCFB_B6B5_41B1_A767589F3295, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_6_0.png",
      "width": 104,
      "class": "ImageResourceLevel",
      "height": 94
     }
    ]
   },
   "pitch": -5.28,
   "yaw": 52.55,
   "hfov": 3.76
  }
 ],
 "id": "overlay_E3EA70ED_FCCC_F674_41E0_78AA99048B06",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 69.3,
   "hfov": 10.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.57
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93, this.camera_F3EA582D_FCB7_7191_41EC_966352D2A6C2); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7AD8684_FCC4_DAAB_41E7_4D6359F3F804",
   "yaw": 69.3,
   "hfov": 10.48,
   "pitch": -16.57,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_E3EA60ED_FCCC_F674_41EC_C7BF37E86065",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 04"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -97.14,
   "hfov": 13.96,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.47
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF, this.camera_F3D1683C_FCB7_71F7_41E4_37E362D8D756); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7AD3684_FCC4_DAAB_41DA_B050ED565ACF",
   "yaw": -97.14,
   "hfov": 13.96,
   "pitch": -1.47,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_D8C19E66_FCC5_6A77_41E5_92CA6E49E552",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F70969A9_FBDD_B6FC_41E9_E5E5E1F79068",
 "class": "PanoramaCameraSequence"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">En \u00e9ste solar, propiedad en condominio de los hermanos MART\u00cdNEZ S\u00c1ENZ sol\u00eda hospedarse el Capit\u00e1n PEDRO JUAN CAVALLERO cuando ven\u00eda a la capital desde su pueblo natal de Tobat\u00ed, pues era primo de los due\u00f1os de casa.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Muy asidua a la casa era Do\u00f1a JUANA MAR\u00cdA DE LARA, cuyo domicilio se hallaba al frente. Esta era mayordoma permanente de la Catedral y del templo Santo Domingo. Su sobrino era el pr\u00f3cer VICENTE IGNACIO ITURBE, quien habitualmente se hospedaba en casa de la ilustre patricia.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El Capit\u00e1n JUAN BAUTISTA RIVAROLA, quien resid\u00eda en Barrero Grande (hoy Eusebio Ayala), cuando viajaba a la ciudad buscaba albergue en la casa de su suegra quien ten\u00eda su propiedad a la vera del antiguo Callej\u00f3n.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Frecuentaba la casa, el pr\u00f3cer FULGENCIO YEGROS quien festejaba a FACUNDA MICAELA SPERATTI, cu\u00f1ada de PEDRO PABLO MART\u00cdNEZ S\u00c1ENZ. Ella viv\u00eda tambi\u00e9n en la casona y contrajeron matrimonio seis meses despu\u00e9s de nuestra independencia. Era tambi\u00e9n asiduo visitante de la casa el Teniente MARIANO RECALDE que en la misma \u00e9poca festejaba a VIRGINIA MAR\u00cdN, cu\u00f1ada de SEBASTI\u00c1N ANTONIO MART\u00cdNEZ S\u00c1ENZ. Estos se unieron en matrimonio en marzo de 1813.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Por lo tanto para los principales protagonistas de nuestra independencia, el sitio m\u00e1s c\u00f3modo y disimulado donde reunirse fue la casa de los MART\u00cdNEZ S\u00c1ENZ quienes utilizaban la misma no solo con fines rom\u00e1nticos sino tambi\u00e9n como sede de las reuniones secretas en la que se conspiraba contra el gobierno espa\u00f1ol.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Toda esa conspiraci\u00f3n culmin\u00f3 la noche del 14 de Mayo de 1811 cuando los patriotas dieron el golpe encabezados por PEDRO JUAN CAVALLERO.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Estos hombres salieron por el callej\u00f3n contiguo a la Casa, hoy llamado \"CALLEJ\u00d3N HIST\u00d3RICO\" y se dirigieron hacia la casa del Gobernador espa\u00f1ol distante a pocas cuadras del lugar.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Tomaron los cuarteles y en la madrugada del 15 de Mayo, ante la firme decisi\u00f3n de los patriotas que dieron un plazo perentorio, el Gobernador BERNARDO DE VELAZCO Y HUIDOBRO, entreg\u00f3 el mando.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Lo hermoso de nuestra independencia es que la misma se consigui\u00f3 solamente con paraguayos y sin derramamiento de sangre. Esta Casa es la m\u00e1s grande en su significado hist\u00f3rico, puesto que en ella se gest\u00f3 la emancipaci\u00f3n definitiva de la corona espa\u00f1ola.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "htmlText_D776C92E_FC45_77F4_41D2_8D3D6C133200",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 10,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText75236"
 },
 "class": "HTMLText",
 "paddingTop": 10
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F39447CE_FCB7_7E93_41E4_19E4F6C9369A",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3FC381E_FCB7_71B3_41E3_D82FC7415437",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3AF97AC_FCB7_7E97_41E3_A8190B9C4519",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F39247BD_FCB7_7EF1_41E1_7238C4F601E0",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3F1080F_FCB7_7191_41C1_5E009E3E7A40",
 "class": "PanoramaCameraSequence"
},
{
 "yaw": 135.79,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 38.75,
 "bleaching": 0.7,
 "id": "overlay_F5FD8C00_FBC4_ADAB_41EB_31E5E0C78626"
},
{
 "yaw": 175.73,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 50.31,
 "bleaching": 0.7,
 "id": "overlay_F5A40324_FBFB_5BEB_41D9_DBD06881D18C"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -37.41,
   "hfov": 4.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 13.91
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E978760D_FC5D_5DB5_41A3_547496AB76C2, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06896C0_FCC4_DAAB_41B9_8BA58EC9DE68, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_0_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 13.91,
   "yaw": -37.41,
   "hfov": 4.16
  }
 ],
 "id": "overlay_E9605513_FC5C_BFAC_41E3_586DBC612D55",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -39.07,
   "hfov": 4.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.64
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_E97D06B6_FC5D_5AD4_41C9_9A4C68CFBE05, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06776C0_FCC4_DAAB_41ED_0EC544568CBA, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_1_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": -10.64,
   "yaw": -39.07,
   "hfov": 4.21
  }
 ],
 "id": "overlay_E8EB1193_FC5D_56AC_41DC_370B47890FDD",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -4.02,
   "hfov": 4.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 9.19
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EA34788C_FC5C_B6B4_41A2_8ECFD0B79328, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06626C0_FCC4_DAAB_41E0_6E8CAE76148A, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_2_0.png",
      "width": 119,
      "class": "ImageResourceLevel",
      "height": 119
     }
    ]
   },
   "pitch": 9.19,
   "yaw": -4.02,
   "hfov": 4.23
  }
 ],
 "id": "overlay_E9D9E47E_FC5C_DE54_41EB_5776687B0FD2",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -92.26,
   "hfov": 14.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.81
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B3C684_FCC4_DAAB_41BC_F274FA2F05E8",
   "yaw": -92.26,
   "hfov": 14.78,
   "pitch": -9.81,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EAD8FE07_FC45_ADB5_41EC_D7B84CC74670",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -144.8,
   "hfov": 14.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.54
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8, this.camera_F38BF7FE_FCB7_7E73_41E9_D39FEA030223); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B38684_FCC4_DAAB_41DB_90909FDE7B60",
   "yaw": -144.8,
   "hfov": 14.84,
   "pitch": -8.54,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EA163AE1_FC44_AA6C_41C8_7BA8F2C30205",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3DF884A_FCB7_7193_41EC_FCD6BDFEA660",
 "class": "PanoramaCameraSequence"
},
{
 "items": [
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_0",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.27",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.36"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_1",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.30",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.72"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_2",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.59",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.30"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_3",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.63",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.33"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_4",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.31",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.63"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_5",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.67",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.42"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_6",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.31",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.29"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_7",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.70",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.52"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_8",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.56",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.29"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_9",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.42",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.37"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_10",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.75",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.54"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_11",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.64",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.70"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_12",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.62",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.25"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_13",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.63",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.66"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_14",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.27",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.70"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_15",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.63",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.40"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_16",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.65",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.60"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_17",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.75",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.61"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_18",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.57",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.27"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_19",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.43",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.45"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_20",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.44",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.27"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_21",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.74",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.48"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_22",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.38",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.64"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_23",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.52",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.67"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_24",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.75",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.58"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_25",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.34",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.55"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_26",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.58",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.44"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_27",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.34",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.47"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_28",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.35",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.58"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_29",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.65",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.48"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_30",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.37",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.51"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_31",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.61",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.35"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_32",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.70",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.72"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_33",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.35",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.71"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_34",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.61",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.70"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_35",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.42",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.61"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_36",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.70",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.67"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_37",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.36",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.63"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_38",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.44",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.36"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_39",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.67",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.71"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_40",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.49",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.65"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_41",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.56",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.68"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_42",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.68",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.51"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_43",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.72",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.25"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_44",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.46",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.30"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  },
  {
   "media": "this.album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_45",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.54",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "easing": "linear",
    "scaleMode": "fit_inside"
   }
  }
 ],
 "id": "album_E5CEEA2D_FC7B_55F5_41D6_705905D42D8B_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "yaw": 87.55,
 "bleachingDistance": 0.4,
 "class": "LensFlarePanoramaOverlay",
 "pitch": 33.22,
 "bleaching": 0.7,
 "id": "overlay_F6378C0F_FBFC_ADB5_41DB_99835BC7DCD0"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 89.46,
   "hfov": 3.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.79
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EABBD1E6_FBC4_F677_41C6_88A6E6C059EF, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06496C0_FCC4_DAAB_41E4_81E880695400, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_0_0.png",
      "width": 89,
      "class": "ImageResourceLevel",
      "height": 81
     }
    ]
   },
   "pitch": 0.79,
   "yaw": 89.46,
   "hfov": 3.22
  }
 ],
 "id": "overlay_F47E569C_FBC4_DAD4_41E5_B2427D19D871",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 89.81,
   "hfov": 3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 14.92
  }
 ],
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_EA2B20D7_FBC5_D655_41EE_9D6D4EE3E3C1, {'iconWidth':20,'rollOverIconHeight':20,'pressedBackgroundOpacity':0.3,'paddingTop':5,'rollOverIconWidth':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','pressedBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','paddingRight':5,'pressedIconLineWidth':5,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBorderColor':'#000000','iconHeight':20,'pressedIconColor':'#888888','iconColor':'#000000','iconLineWidth':5,'paddingBottom':5,'rollOverIconColor':'#666666','rollOverBackgroundOpacity':0.3,'rollOverBackgroundColorDirection':'vertical','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'borderColor':'#000000','borderSize':0,'rollOverBorderSize':0,'pressedBorderSize':0,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundOpacity':0.3,'pressedIconWidth':20}, this.ImageResource_D06366C0_FCC4_DAAB_4197_CAD2DE9C722E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_1_0.png",
      "width": 86,
      "class": "ImageResourceLevel",
      "height": 85
     }
    ]
   },
   "pitch": 14.92,
   "yaw": 89.81,
   "hfov": 3
  }
 ],
 "id": "overlay_EBA52A5C_FBC5_6A54_41EE_074AED8004CD",
 "enabledInCardboard": true,
 "data": {
  "label": "Image"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -28.17,
   "hfov": 8.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.77
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93, this.camera_F3F1780F_FCB7_7191_41E3_840A31439F74); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B27684_FCC4_DAAB_41E0_C09C5E66CF21",
   "yaw": -28.17,
   "hfov": 8.94,
   "pitch": 0.77,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EAC60C15_FBCB_ADD4_41D4_F15B2AAEA7A8",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 }
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_3_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -102.77,
   "hfov": 10.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.14
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6, this.camera_F3FC281E_FCB7_71B3_41BE_409BDF8EADF3); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_D7B21684_FCC4_DAAB_41D2_010C7AF0773E",
   "yaw": -102.77,
   "hfov": 10.51,
   "pitch": -10.14,
   "distance": 100,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_EA5C4921_FBCB_77ED_41CE_391D3A6CBB26",
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01c"
 }
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F70929A9_FBDD_B6FC_419F_E416FC146D3A",
 "class": "PanoramaCameraSequence"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">La antigua casona sigui\u00f3 en poder de particulares hasta el a\u00f1o 1943 en que fue adquirido por el gobierno paraguayo, dado su origen eminentemente hist\u00f3rico. Lastimosamente desde su adquisici\u00f3n, el predio hab\u00eda quedado en estado de abandono hasta el a\u00f1o 1951 en el que se hicieron peque\u00f1as refacciones.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">En el a\u00f1o 1961 por Decreto del P.E. N\u00b0 15.639 de fecha 2 de mayo, fue declarado Monumento Hist\u00f3rico Nacional. Por el mismo Decreto se cre\u00f3 una Comisi\u00f3n Nacional de la Casa de la Independencia compuesta por el Sub Secretario de Educaci\u00f3n y Culto, Director del Departamento de Ense\u00f1anza Superior y Difusi\u00f3n Cultural del mismo Ministerio, Director del Departamento de Cultura de la Municipalidad de la Capital, Presidente del Instituto de Numism\u00e1tica y Antig\u00fcedades del Paraguay, Presidente del Instituto de Investigaciones Hist\u00f3ricas, Asesor: Director General de Archivo, Biblioteca y Museos de la Naci\u00f3n.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Se ha nombrado adem\u00e1s una Comisi\u00f3n Asesora de entendidos en antig\u00fcedades, arquitectos, historiadores, religiosos, artistas, coleccionistas. Asesoraba adem\u00e1s la Oficina T\u00e9cnica del Ministerio de Obras P\u00fablicas y Comunicaciones, el Instituto Paraguayo de Investigaciones Hist\u00f3ricas y finalmente, se ha nombrado un Director de la Casa quien fue el encargado de ejecutar lo proyectado por la Comisi\u00f3n Nacional.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El conjunto de personas citadas anteriormente se ha empe\u00f1ado en hacer resaltar la verdadera significaci\u00f3n hist\u00f3rica que tiene la Casa y ha efectuado las refacciones necesarias para hacer un Museo alhajado al estilo de las viviendas de la \u00e9poca colonial.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Para ello se preocuparon por el acopio de reliquias coloniales de la \u00e9poca y que guardan relaci\u00f3n con la Independencia obteni\u00e9ndose tambi\u00e9n varios objetos que pertenec\u00edan a nuestros pr\u00f3ceres o a familiares de \u00e9stos enriqueciendo de esta manera la colecci\u00f3n.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El Museo \u201cCasa de la Independencia\u201d fue inaugurado como tal el 14 de Mayo de 1965 y se conservan reliquias de incalculable valor hist\u00f3rico.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">En Febrero de 2003 </SPAN><SPAN STYLE=\"font-size:18px;\"><B>NICOL\u00c1S DARIO LATOURRETTE BO</B></SPAN><SPAN STYLE=\"font-size:18px;\"> por iniciativa y medios propios restaura todo el acervo museogr\u00e1fico. A partir del 2005 es </SPAN><SPAN STYLE=\"font-size:18px;\"><B>PROTECTOR VITALICIO DEL MUSEO CASA DE LA INDEPENDENCIA.</B></SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "htmlText_D007ABF7_FC4F_6A54_4187_A042DBA2B2B1",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 10,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText78462"
 },
 "class": "HTMLText",
 "paddingTop": 10
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3D1783C_FCB7_71F7_41E0_B17B440EC1EF",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F38B97FE_FCB7_7E73_41C7_B44C8F159BBD",
 "class": "PanoramaCameraSequence"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El 14 de mayo de 1811, por el estrecho callej\u00f3n contiguo a esta antigua casona, resonaron los pasos de quienes hicieron el deseo compartido por todo un pueblo: vivir en una tierra propia, libre e independiente del imperio espa\u00f1ol y de la Junta de Buenos Aires.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Esta casa fue constru\u00edda en 1772 por el espa\u00f1ol Antonio Mart\u00ednez S\u00e1enz y su esposa la paraguaya Petrona Caballero, con paredes de adobe, techo de tejas y armaz\u00f3n de palmas y tacuaras, al modo tradicional de la \u00e9poca, tal como puede apreciarse hasta hoy.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El solar fue heredado por sus hijos Pedro Pablo y Sebasti\u00e1n Antonio, convirti\u00e9ndose, por diversas circunstancias, en un lugar seguro y discreto para las reuniones secretas en las que se gest\u00f3 la ca\u00edda del gobierno espa\u00f1ol.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El Capit\u00e1n Pedro Juan Caballero, primo de los due\u00f1os de casa, se hospedaba all\u00ed cuando llegaba a la capital desde Tobat\u00ed, su pueblo natal, convergiendo con otros pr\u00f3ceres, como Do\u00f1a Juana Mar\u00eda de Lara -mayordoma de la catedral- cuya residencia, ubicada en la vereda de enfrente, era albergue habitual de su sobrino el Capit\u00e1n Vicente Ignacio Iturbe. Otro asiduo visitante era el Capit\u00e1n Juan Bautista Rivarola que durante sus frecuentes estad\u00edas en Asunci\u00f3n se hospedaba en casa de su suegra, vecina del lugar.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Las reuniones contaban as\u00ed mismo con otras ilustres personas: Fulgencio Yegros, que manten\u00eda un noviazgo con Facunda Micaela Speratti, cu\u00f1ada de Pedro Pablo Mart\u00ednez S\u00e1enz al igual que el del Teniente Mariano Recalde que a su vez cortejaba a Virginia Mar\u00edn, cu\u00f1ada del otro propietario, Sebasti\u00e1n Antonio.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El Callej\u00f3n Hist\u00f3rico representa uno de los lugares m\u00e1s significativos de la casa, pues diversos relatos de la \u00e9poca coinciden en que por all\u00ed salieron los patriotas para tomar los cuarteles e intimar rendici\u00f3n al Gobernador espa\u00f1ol Bernardo de Velazco.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Las narraciones orales aseguran que la callejuela tambi\u00e9n fue transitada por Do\u00f1a Juana Mar\u00eda de Lara para dirigirse a la Catedral de Asunci\u00f3n a pedir al Padre Mariano Molas el \"santo y se\u00f1a\" del triunfo: un repique continuado de campanas que en la madrugada del 15 de mayo convoc\u00f3 al pueblo a celebrar el nacimiento del Paraguay como naci\u00f3n.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">En el proceso de Independencia paraguaya no existi\u00f3 derramamiento de sangre. Ante la intimidaci\u00f3n de los patriotas, el Gobernador espa\u00f1ol Bernardo de Velazco depuso armas y acept\u00f3 formar parte de un gobierno interino conjuntamente con el Doctor Jos\u00e9 Gaspar Rodr\u00edguez de Francia y el Capit\u00e1n Juan Valeriano Zevallos.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Con m\u00e1s de doscientos veintiocho a\u00f1os de existencia, el hoy Museo Casa de la Independencia constituye no solamente un s\u00edmbolo de libertad, sino tambi\u00e9n un invalorable patrimonio cultural. Es uno de las m\u00e1s antiguos solares coloniales que perduran y que evoca a la Asunci\u00f3n de finales del siglo XVIII.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Como testimonio de que esta casa fue gestada la emancipaci\u00f3n del pa\u00eds, durante el gobierno de Carlos Antonio L\u00f3pez por decreto de abril de 1849, se estableci\u00f3 llamar 14 de mayo a la calle de adelante del Callej\u00f3n Hist\u00f3rico, que en la esquina converge con la calle Presidente Franco.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El solar Mart\u00ednez S\u00e1enz sigui\u00f3 siendo propiedad de particulares hasta el a\u00f1o 1943 cuando fue adquirido por el Estado paraguayo, que en 1961 lo declar\u00f3 Monumento Hist\u00f3rico Nacional.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Por ser uno de los \u00faltimos vestigios edilicios de la colonia, su permanencia es vita, para el fortalecimiento de nuestra identidad y de nuestra cultura. Hacia los a\u00f1os \u00b450 estuvo a punto de perecer bajo la acci\u00f3n de la picota. La oportuna y en\u00e9rgica intervenci\u00f3n de un grupo de historiadores, liderada por Juan B. Bill, Carlos Pusineri Scala y Roberto Quevedo, impidi\u00f3 la destrucci\u00f3n total de tan valioso patrimonio.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">En el marco de los 150 a\u00f1os de la independencia del Paraguay, a solicitud ciudadana, el inmueble fue restaurado e inaugurado como Museo de la Casa de la Independencia el 14 de mayo de 1965. Una parte del predio original fue cercenado y demolido, convirti\u00e9ndose en estacionamiento de veh\u00edculos. Existieron varias tratativas para su adquisici\u00f3n, entre \u00e9stos tres proyectos de Ley de Expropiaci\u00f3n, que nunca llegaron a feliz t\u00e9rmino.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "htmlText_D11FE24B_FC45_F5BC_41DC_24D876169B31",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 10,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText82759"
 },
 "class": "HTMLText",
 "paddingTop": 10
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Para el logro de su independencia, el Paraguay tuvo que enfrentar dos situaciones:</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">a) el dominio espa\u00f1ol, para cuya ca\u00edda bast\u00f3 el incruento pronunciamiento del 14 y 15 de mayo de 1811; y</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">b) la pretensi\u00f3n de la junta de Buenos Aires, a partir de mayo de 1810, de conservar en su beneficio la integridad territorial del extinguido Virreynato del R\u00edo de La Plata. La Provincia del Paraguay, todav\u00eda bajo dominio espa\u00f1ol, rechaz\u00f3 categ\u00f3ricamente esa pretensi\u00f3n. Fue especialmente elocuente la decisi\u00f3n de los jefes, oficiales y tropas paraguayos que enfrentaron victoriosamente en Paraguay y Tacuary a la expedici\u00f3n de Manuel Belgrano, brazo armado de las pretensiones de Buenos Aires. Producida la independencia nacional, mediante el consenso y decisi\u00f3n de los pr\u00f3ceres - civiles, militares y eclesi\u00e1sticos - los gobiernos de Buenos Aires siguieron insistiendo en su prop\u00f3sito de lograr la sumisi\u00f3n del Paraguay, mediante toda clase de presi\u00f3n: pol\u00edtica, militar y econ\u00f3mica.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">La sola menci\u00f3n de la fecha de reconocimiento de nuestra independencia -1852 - muestra con evidencia cuan obstinado fue el empe\u00f1o por negar aquella realidad de hecho y de derecho de que habl\u00f3 Don Carlos, cuando desde las columnas de \"El Paraguayo Independiente\", fundamentaba las razones que avalaban aquella decisi\u00f3n irreversible.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">La lucha por la independencia absorbi\u00f3 el concurso ciudadano de miles de paraguayos. Desde los combatientes de Paraguar\u00ed y Tacuary, los protagonistas del pronunciamiento del 14/15 de Mayo de 1811 los sostenedores de la afirmaci\u00f3n de nuestra emancipaci\u00f3n en los Congresos de 1811, 1813, 1814, 1816, 1842; los jefes y oficiales y tropa que guarnec\u00edan nuestras fronteras; militantes de \u00f3rdenes religiosas, capellanes de nuestro Ej\u00e9rcito; intelectuales y artesanos empe\u00f1ados en la larga vigilia, integran la extensa y honrosa n\u00f3mina de 'Pr\u00f3ceres\" de nuestra independencia.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Muchos nombres, protagonistas directos de las victorias sobre Belgrano, como del movimiento de mayo y otros acontecimientos decisivos, habitualmente no son siquiera mencionados; los Quin de Valdovinos, los comandantes Lu\u00eds Cavallero, Pascual Urdapilleta, los Capitanes , Gervasio Acosta, Juan Bautista Acosta, Blas Jos\u00e9 Rojas de Aranda, Jos\u00e9 Mart\u00edn Fleytas, Jos\u00e9 Joaqu\u00edn y Miguel Antonio Montiel, Amancio Insaurralde, Antonio Zavala; Pedro Jos\u00e9 Genes, Juan Antonio Gonz\u00e1lez, Francisco Barrios, Sebasti\u00e1n Taboada, Vicente Antonio Matiauda, son algunos de los pr\u00f3ceres olvidados.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "htmlText_D7765463_FC4C_FE6C_41DB_2635E370BDED",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 10,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText77131"
 },
 "class": "HTMLText",
 "paddingTop": 10
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3EA682D_FCB7_7191_41E0_ED06778B0CB5",
 "class": "PanoramaCameraSequence"
},
{
 "shadow": false,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El Museo Casa de la Independencia est\u00e1 alhajado al estilo de las viviendas de la \u00e9poca colonial y conserva objetos que pertenecieron a nuestros pr\u00f3ceres, a familiares de estos, o que guardan relaci\u00f3n con aquel tiempo.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El plano de la casa revela la t\u00edpica construcci\u00f3n colonial de la residencia de una familia acomodada a metros de la Plaza de Armas y la Casa de los Gobernadores en la esquina de las calles 14 de mayo entre Palma y Pdte. Franco de nuestra ciudad capital.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Al recorrer las piezas de la vieja casona, daremos paso hacia atr\u00e1s dentro del tiempo pensando en los d\u00edas gloriosos que precedieron a nuestra independencia.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Consta de cinco salas y un gran sal\u00f3n, dispuestos en torno a un patio. A la entrada puede verse un mural del ceramista Jos\u00e9 Laterza Parodi que representa los edificios y lugares m\u00e1s destacados de la Asunci\u00f3n Colonial en 1811.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El sector residencial comienza en un hall corredor en cuyos extremos se encuentran el escritorio y el oratorio. En la parte posterior m\u00e1s \u00edntima del \u00e1rea residencial se encuentran el comedor contiguo a la sala y el dormitorio en el extremo edilicio.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Cuenta con un acervo icnogr\u00e1fico que incluye los retratos de los protagonistas, pintados en base a descripciones orales. De todos los pr\u00f3ceres de la Independencia el \u00fanico retratado en vida fue Jos\u00e9 Gaspar de Francia. Otras pinturas inmortalizan momentos estelares vinculados a la gesta.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:18px;\"><BR STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Una visita al museo permite tambi\u00e9n observar Documentos de \u00e9poca, utensilios, mobiliarios originales que reflejan el estilo de vida en los albores de nuestra Rep\u00fablica.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">El proceso que culmino con la Independencia del Paraguay y la formaci\u00f3n de la primera Rep\u00fablica de Sudam\u00e9rica se extendi\u00f3 entre 1811 y 1813.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px; white-space:pre-wrap;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:18px;\">Ning\u00fan monumento nacional es tan fuerte en su significado hist\u00f3rico y es por eso que como paraguayos deseamos que nuestros visitantes conozcan la riqueza que hay en ella, no solo material, sino hist\u00f3rica, que es lo m\u00e1s importante para nosotros.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "id": "htmlText_D3C32EC1_FC5C_AAAD_41EE_DA3EBCAE05CE",
 "paddingLeft": 10,
 "paddingRight": 10,
 "width": "100%",
 "scrollBarColor": "#000000",
 "minHeight": 0,
 "borderSize": 0,
 "minWidth": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "height": "100%",
 "propagateClick": false,
 "paddingBottom": 10,
 "scrollBarMargin": 2,
 "data": {
  "name": "HTMLText86765"
 },
 "class": "HTMLText",
 "paddingTop": 10
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3CA485A_FCB7_71B3_41E1_633377D4F22B",
 "class": "PanoramaCameraSequence"
},
{
 "movements": [
  {
   "easing": "cubic_in",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  },
  {
   "easing": "linear",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 323
  },
  {
   "easing": "cubic_out",
   "yawSpeed": 7.96,
   "class": "DistancePanoramaCameraMovement",
   "yawDelta": 18.5
  }
 ],
 "restartMovementOnUserInteraction": false,
 "id": "sequence_F3309869_FCB7_7191_41E1_F481B825C8A0",
 "class": "PanoramaCameraSequence"
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B8A67F_FCC4_DA55_41E3_BBBC819B6BFB",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B8667F_FCC4_DA55_41E1_EF4519E14056",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C577A4B4_FC44_DEEB_41C3_C1602499BDAA",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C39AA0_FBDD_6AEC_41E1_49FCC7301719_0_HS_9_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B16684_FCC4_DAAB_4153_E95E9646A660",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7AF6684_FCC4_DAAB_41EE_50CBA907A3D2",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706B8DF_FBDD_D655_41EA_1570FCD25C93_1_HS_7_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 5,
 "id": "AnimatedImageResource_D09EC722_FCFC_BBEF_41C6_87C9582E60F5",
 "colCount": 4,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D780367A_FCC4_DA5F_41EA_3484F8EEAD75",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C57F84AD_FC44_DEF5_41D6_D6866B41F17E",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706A4BC_FBDC_FED4_41E5_2818744CA4C6_0_HS_6_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7AE3689_FCC4_DABD_41D2_E710AD133E94",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 5,
 "id": "AnimatedImageResource_D7ADD689_FCC4_DABD_41EF_4EE94D791B7B",
 "colCount": 4,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_F69C32A4_FBDC_BAEB_41EE_8A361BE250BF_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B7F67F_FCC4_DA55_41DE_2C7C09095AB6",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B7A67F_FCC4_DA55_41E4_FF2D78EE6069",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C57464B7_FC44_DED5_41D6_F70ECC79DFA7",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F706ADA0_FBDD_6EEB_41E7_89669CB6F8F8_0_HS_10_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7BE667A_FCC4_DA5F_41E2_58EAD3F56A06",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7BE167A_FCC4_DA5F_41C0_C0A0CA774E66",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_C57A94B1_FC44_DEED_41C0_62008D491F63",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0_HS_16_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D2854F66_FC5F_AA74_41E4_406D99456F5C",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F7061700_FBDC_BBAC_41CC_DAF2805F9251_0_HS_17_0.png",
   "width": 680,
   "class": "ImageResourceLevel",
   "height": 1020
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7AEF684_FCC4_DAAB_41BE_8FD7E5158B51",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7AD8684_FCC4_DAAB_41E7_4D6359F3F804",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_7_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7AD3684_FCC4_DAAB_41DA_B050ED565ACF",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6DF47ED_FBDD_FA74_41E0_D4A83DDCA151_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B3C684_FCC4_DAAB_41BC_F274FA2F05E8",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B38684_FCC4_DAAB_41DB_90909FDE7B60",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C1712D_FBDD_B7F4_41DD_35CA6E10FFC4_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_D7B27684_FCC4_DAAB_41E0_C09C5E66CF21",
 "colCount": 4,
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 5,
 "id": "AnimatedImageResource_D7B21684_FCC4_DAAB_41D2_010C7AF0773E",
 "colCount": 4,
 "frameCount": 20,
 "levels": [
  {
   "url": "media/panorama_F6C815BB_FBDC_DEDD_41B7_DD0A8F51F8D6_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 350
  }
 ]
}],
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "propagateClick": true,
 "horizontalAlign": "left",
 "paddingBottom": 0,
 "downloadEnabled": false,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "class": "Player",
 "paddingTop": 0
};


	function HistoryData(playList) {
		this.playList = playList;
		this.list = [];
		this.pointer = -1;
	}

	HistoryData.prototype.add = function(index){
		if(this.pointer < this.list.length && this.list[this.pointer] == index) {
			return;
		}
		++this.pointer;
		this.list.splice(this.pointer, this.list.length - this.pointer, index);
	};

	HistoryData.prototype.back = function(){
		if(!this.canBack()) return;
		this.playList.set('selectedIndex', this.list[--this.pointer]);
	};

	HistoryData.prototype.forward = function(){
		if(!this.canForward()) return;
		this.playList.set('selectedIndex', this.list[++this.pointer]);
	};

	HistoryData.prototype.canBack = function(){
		return this.pointer > 0;
	};

	HistoryData.prototype.canForward = function(){
		return this.pointer >= 0 && this.pointer < this.list.length-1;
	};


	if(script.data == undefined)
		script.data = {};
	script.data["history"] = {};   

	TDV.PlayerAPI.defineScript(script);
})();
