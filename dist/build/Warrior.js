!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n,a=!1,o=["Besides","Motivation","Purity"],i=function(){function t(){}return t.inviteMembers=function(){o.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(o[0])},t.getDPS=function(){return get_player(o[1])},t.getHealer=function(){return get_player(o[2])},t}(),c=function(){function t(){var t=this;setInterval(function(){character.rip||is_moving(character)||(loot(!0),t.Target=get_targeted_monster(),t.usePotions(),a&&t.moveToTank(),t.runClassLoop())},250)}return t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){if(!this.Target){if(this.Target=get_nearest_monster({min_xp:100,max_att:120}),this.Target)return change_target(this.Target),!0;set_message("No Monsters")}return!1},t.prototype.targetTankEntity=function(){return!(this.Target||null===i.getTank()||(this.Target=get_target_of(i.getTank()),!this.Target))},t.prototype.moveToTarget=function(){this.Target&&!in_attack_range(this.Target)&&(set_message("Moving to target"),move(character.x+(this.Target.x-character.x)/2,character.y+(this.Target.y-character.y)/2))},t.prototype.attackTarget=function(){this.Target&&can_attack(this.Target)&&(set_message("Attacking"),attack(this.Target))},t.prototype.usePotions=function(){character.hp<character.max_hp-200&&can_use("hp")&&use("hp"),character.mp<character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.moveToTank=function(){null!==i.getTank()&&move(i.getTank().real_x,i.getTank().real_y)},t}(),u=(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Warrior",e.Target=null,game_log("Injected ClassController: "+e.ClassName),e}return u(e,t),e.prototype.runClassLoop=function(){this.targetLocalEntity()&&(this.moveToTarget(),this.attackTarget())},e}(c))}]);