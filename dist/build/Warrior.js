!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n=["Besides","Motivation","Cartography","Purity"],i=function(){function t(){}return t.inviteMembers=function(){n.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(n[0])},t.getMage=function(){return get_player(n[1])},t.getRanger=function(){return get_player(n[2])},t.getHealer=function(){return get_player(n[3])},t}();function a(t,e,r){return Math.sqrt(Math.pow(r.real_x-t,2)+Math.pow(r.real_y-e,2))}function o(t){return character.items.filter(function(e){return null!=e&&e.name==t}).reduce(function(t,e){return t+(e.q||1)},0)}var s,c=function(){function t(){}return t.snake={map:"main",x:336,y:-757},t}(),p=function(){function t(){}return t.Monsters=new c,t}(),u=function(){function t(){var t=this;this.TargetName="prat",this.isMovingToLocation=!1,this.isResupplying=!1,this.character=null,this.last_minutes_checked=new Date,this.last_xp_checked_minutes=character.xp,this.last_xp_checked_kill=character.xp,this.init_xptimer(1),setInterval(function(){t.character=character,t.character.rip||is_moving(t.character)||(loot(!0),t.checkSupplies(),t.isResupplying||t.isMovingToLocation||(t.Target=get_targeted_monster(),t.moveToFarmLocation(),t.usePotions(),t.runClassLoop()),t.update_xptimer())},250)}return t.prototype.moveToFarmLocation=function(){var t=p.Monsters.snake;null!=t&&a(t.x,t.y,this.character)<50?(this.isMovingToLocation=!0,smart_move({map:t.map,x:t.x,y:t.y})):this.isMovingToLocation=!1},t.prototype.checkSupplies=function(){var t=this;["hpot0","mpot0"].map(function(e){o(e)<100?t.resupplyPotions():t.isResupplying=!1})},t.prototype.resupplyPotions=function(){this.isResupplying=!0;var t,e,r,n=null,i=(t="fancypots",e=this.character,(r=parent.G.maps[e.map].npcs.filter(function(e){return e.id==t})).length>0?r[0]:null);null!=i&&(n=a(i.position[0],i.position[1],this.character)),!smart.moving&&(null==n||n>100)&&smart_move({to:"potions"}),null!=n&&n<100&&function(t,e){e.esize>0?["hpot0","mpot0"].map(function(r,n){var i=parent.G.items[r];if(null!=i){var a=i.g*t;e.gold>=a?o(r)<100&&buy(r,t):game_log("Not Enough Gold!")}}):game_log("Inventory Full!")}(1e3,this.character)},t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){this.Target||(this.Target=get_nearest_monster({type:this.TargetName}),this.Target?change_target(this.Target):set_message("No Monsters"))},t.prototype.targetTankEntity=function(){this.Target||null===i.getTank()||(this.Target=get_target_of(i.getTank()))},t.prototype.moveToTarget=function(){null===this.Target||in_attack_range(this.Target)||(set_message("Moving to target"),move(this.character.x+(this.Target.real_x-this.character.x)/2,this.character.y+(this.Target.real_y-this.character.y)/2))},t.prototype.attackTarget=function(){null!==this.Target&&can_attack(this.Target)&&(set_message("Attacking: "+this.Target.name),attack(this.Target))},t.prototype.usePotions=function(){this.character.hp<this.character.max_hp-200&&can_use("hp")&&use("hp"),this.character.mp<this.character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.init_xptimer=function(t){this.minute_refresh=t||1,parent.add_log(this.minute_refresh.toString()+" min until refresh!",65535);var e=parent.$,r=e("#bottomrightcorner");r.find("#xptimer").remove();var n=e('<div id="xptimer"></div>').css({background:"black",border:"solid gray",borderWidth:"5px 5px",width:"320px",height:"96px",fontSize:"28px",color:"#77EE77",textAlign:"center",display:"table",overflow:"hidden",marginBottom:"16px"});e('<div id="xptimercontent"></div>').css({display:"table-cell",verticalAlign:"middle"}).html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>').appendTo(n);r.prepend(n)},t.prototype.update_xptimer=function(){if(this.character.xp!=this.last_xp_checked_kill){var t=parent.$,e=new Date,r=Math.round((e.getTime()-this.last_minutes_checked.getTime())/1e3);if(!(r<1)){var n=Math.round((this.character.xp-this.last_xp_checked_minutes)/r);r>60*this.minute_refresh&&(this.last_minutes_checked=new Date,this.last_xp_checked_minutes=this.character.xp),this.last_xp_checked_kill=this.character.xp;var i=parent.G.levels[this.character.level]-this.character.xp,a=Math.round(i/n),o=Math.round(a/60),s=Math.round(o/60)+"h "+o%60+"min";t("#xpcounter").text(s),t("#xprate").text(n+" XP/s")}}},t}(),h=(s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Warrior",game_log("Injected ClassController: "+e.ClassName),e}return h(e,t),e.prototype.runClassLoop=function(){this.targetLocalEntity(),this.moveToTarget(),this.attackTarget()},e}(u))}]);