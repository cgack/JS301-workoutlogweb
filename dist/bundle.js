$(document).ready(function(){var o=function(e,t){var n="localhost"===location.hostname?"//localhost:3000/api/":"//workoutapi-1150-cgack.herokuapp.com/api/",i=function(t){window.localStorage.setItem("sessionToken",t),e.ajaxSetup({headers:{Authorization:t}}),e.ajax({type:"GET",url:n+"login"}).then(function(e){o.username=e})};return{API_BASE:n,setAuthHeader:i}}(jQuery);$(".nav-tabs a[data-toggle=tab]").on("click",function(o){var e=window.localStorage.getItem("sessionToken");if($(this).hasClass("disabled")&&!e)return o.preventDefault(),!1}),$("a[data-toggle=tab]").on("shown.bs.tab",function(e){var t=$(e.target).attr("href");"#log"===t&&o.log.setDefinitions(),"#history"===t&&o.log.setHistory(),"#feed"===t&&o.setFeed()}),$(document).on("keypress",function(o){13===o.which&&($("#signup-modal").is(":visible")&&$("#signup").trigger("click"),$("#login-modal").is(":visible")&&$("#login").trigger("click"))});var e=window.localStorage.getItem("sessionToken");e&&o.setAuthHeader(e),window.WorkoutLog=o,o.socket=io.connect("http://localhost:3000"),o.socket.on("new log",function(e){o.addFeedItem(e)}),o.socket.on("chat-message",function(e){o.addFeedItem(e)})}),$(function(){$.extend(WorkoutLog,{feed:[],addFeedItem:function(o){var e=$("<li>").append(o.username+o.message);e.addClass("list-group-item"),$("#feed-list").append(e),WorkoutLog.feed.push(o)},sendChat:function(){WorkoutLog.socket.emit("chat-message",{username:WorkoutLog.username,message:$("#msg").val()})},setFeed:function(){for(var o=WorkoutLog.feed,e=o.length,t="",n=0;n<e;n++)t+="<li class='list-group-item'>",t+=o[n].username+o[n].message,t+="</li>";$("#feed-list").children().remove(),$("#feed-list").append(t)},fetchAllFeeds:function(){var o=$.ajax({type:"GET",url:WorkoutLog.API_BASE+"feed",headers:{Authorization:window.localStorage.getItem("sessionToken")}});o.done(function(o){console.log(o),WorkoutLog.feed=o})}}),$("#msg-send").on("click",WorkoutLog.sendChat),window.localStorage.getItem("sessionToken")&&WorkoutLog.fetchAllFeeds()}),$(function(){$.extend(WorkoutLog,{definition:{userDefinitions:[],create:function(){var o={desc:$("#def-description").val(),type:$("#def-logtype").val()},e={definition:o},t=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"definition",data:JSON.stringify(e),contentType:"application/json"});t.done(function(o){WorkoutLog.definition.userDefinitions.push(o.definition)}),t.fail(function(){console.log("oh no")})},fetchAll:function(){$.ajax({type:"GET",url:WorkoutLog.API_BASE+"definition",headers:{Authorization:window.localStorage.getItem("sessionToken")}}).done(function(o){WorkoutLog.definition.userDefinitions=o}).fail(function(o){console.log(o)})}}}),$("#def-save").on("click",WorkoutLog.definition.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.definition.fetchAll()}),$(function(){$.extend(WorkoutLog,{log:{workouts:[],setDefinitions:function(){for(var o=WorkoutLog.definition.userDefinitions,e=o.length,t="",n=0;n<e;n++)t+="<option value='"+o[n].id+"'>"+o[n].description+"</option>";$("#log-definition").children().remove(),$("#log-definition").append(t)},setHistory:function(){for(var o=WorkoutLog.log.workouts,e=o.length,t="",n=0;n<e;n++){var i=""===o[n].result?"No result found":o[n].result;t+="<li class='list-group-item'>"+o[n].def+" - "+i+"</li>"}$("#history-list").children().remove(),$("#history-list").append(t)},create:function(){var o={desc:$("#log-description").val(),result:$("#log-result").val(),def:$("#log-definition option:selected").text()},e={log:o},t=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"log",data:JSON.stringify(e),contentType:"application/json"});t.done(function(o){WorkoutLog.log.workouts.push(o)}),t.fail(function(){console.log("something broke")})},fetchAll:function(){var o=$.ajax({type:"GET",url:WorkoutLog.API_BASE+"log",headers:{Authorization:window.localStorage.getItem("sessionToken")}});o.done(function(o){WorkoutLog.log.workouts=o}),o.fail(function(o){console.log("an error occured"+o.message)})}}}),$("#log-save").on("click",WorkoutLog.log.create),window.localStorage.getItem("sessionToken")&&WorkoutLog.log.fetchAll()}),$(function(){$.extend(WorkoutLog,{afterSignin:function(o){WorkoutLog.setAuthHeader(o),WorkoutLog.definition.fetchAll(),WorkoutLog.log.fetchAll(),WorkoutLog.fetchAllFeeds(),$(".disabled").removeClass("disabled"),$("#loginout").text("Logout")},signup:function(){var o=$("#su_username").val(),e=$("#su_password").val(),t={user:{username:o,password:e}},n=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"user",data:JSON.stringify(t),contentType:"application/json"});n.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#signup-modal").modal("hide"))}).fail(function(){$("#su_error").text("There was an issue with sign up").show()})},login:function(){var o=$("#li_username").val(),e=$("#li_password").val(),t={user:{username:o,password:e}},n=$.ajax({type:"POST",url:WorkoutLog.API_BASE+"login",data:JSON.stringify(t),contentType:"application/json"});n.done(function(o){o.sessionToken&&(WorkoutLog.afterSignin(o.sessionToken),$("#login-modal").modal("hide"))}).fail(function(){$("#li_error").text("There was an issue with sign up").show()})},loginout:function(){window.localStorage.getItem("sessionToken")&&(window.localStorage.removeItem("sessionToken"),$("#loginout").text("Login"))}}),$("#login").on("click",WorkoutLog.login),$("#signup").on("click",WorkoutLog.signup),$("#loginout").on("click",WorkoutLog.loginout),window.localStorage.getItem("sessionToken")&&$("#loginout").text("Logout")});
//# sourceMappingURL=maps/bundle.js.map
