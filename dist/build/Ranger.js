!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n,a=!1,o=["Besides","Motivation","Cartography","Purity"],i=function(){function t(){}return t.inviteMembers=function(){o.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(o[0])},t.getMage=function(){return get_player(o[1])},t.getRanger=function(){return get_player(o[2])},t.getHealer=function(){return get_player(o[3])},t}(),s=function(){function t(){var t=this;this.TargetName="bee",setInterval(function(){character.rip||is_moving(character)||(loot(!0),t.Target=get_targeted_monster(),t.usePotions(),a&&t.moveToTank(),t.runClassLoop())},250)}return t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){this.Target||(this.Target=get_nearest_monster({min_xp:100,max_att:200,type:this.TargetName}),this.Target?change_target(this.Target):set_message("No Monsters"))},t.prototype.targetTankEntity=function(){this.Target||null===i.getTank()||(this.Target=get_target_of(i.getTank()))},t.prototype.moveToTarget=function(){null===this.Target||in_attack_range(this.Target)||(set_message("Moving to target"),move(character.x+(this.Target.real_x-character.x)/2,character.y+(this.Target.real_y-character.y)/2))},t.prototype.attackTarget=function(){null!==this.Target&&can_attack(this.Target)&&(set_message("Attacking: "+this.Target.name),attack(this.Target))},t.prototype.usePotions=function(){character.hp<character.max_hp-200&&can_use("hp")&&use("hp"),character.mp<character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.moveToTank=function(){null!==i.getTank()&&move(i.getTank().real_x,i.getTank().real_y)},t}(),u=function(){return function(){this.ManaBurst={NiceName:"Mana Burst",SpellName:"burst",Cooldown:6},this.Energize={NiceName:"Energize",SpellName:"energize",Cooldown:4}}}(),c=function(){return function(){}}(),l=function(){return function(){this.Curse={NiceName:"Curse",SpellName:"curse",Cooldown:5}}}(),p=function(){return function(){this.Supershot={NiceName:"Supershot",SpellName:"supershot",Cooldown:30}}}(),g=function(){function t(){}return t.Mage=new u,t.Warrior=new c,t.Priest=new l,t.Ranger=new p,t}(),f=(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Ranger",e.Target=null,e.LastCast_Supershot=new Date,game_log("Injected ClassController: "+e.ClassName),e}return f(e,t),e.prototype.castSupershot=function(){null!==this.Target&&this.timeFromLastCast(this.LastCast_Supershot)>g.Ranger.Supershot.Cooldown&&(game_log("Casting Supershot"),this.LastCast_Supershot=new Date,use_skill(g.Ranger.Supershot.SpellName,this.Target))},e.prototype.runClassLoop=function(){this.targetLocalEntity(),this.moveToTarget(),this.castSupershot(),this.attackTarget()},e}(s))}]);