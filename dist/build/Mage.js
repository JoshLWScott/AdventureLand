!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r,a=!1,o=["Besides","Motivation","Purity"],i=function(){function t(){}return t.inviteMembers=function(){o.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(o[0])},t.getDPS=function(){return get_player(o[1])},t.getHealer=function(){return get_player(o[2])},t}(),s=function(){function t(){var t=this;this.TargetName="snake",setInterval(function(){character.rip||is_moving(character)||(loot(!0),t.Target=get_targeted_monster(),t.usePotions(),a&&t.moveToTank(),t.runClassLoop())},250)}return t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){this.Target||(this.Target=get_nearest_monster({min_xp:100,max_att:200,type:this.TargetName}),this.Target?change_target(this.Target):set_message("No Monsters"))},t.prototype.targetTankEntity=function(){this.Target||null===i.getTank()||(this.Target=get_target_of(i.getTank()))},t.prototype.moveToTarget=function(){null===this.Target||in_attack_range(this.Target)||(set_message("Moving to target"),move(character.x+(this.Target.real_x-character.x)/2,character.y+(this.Target.real_y-character.y)/2))},t.prototype.attackTarget=function(){null!==this.Target&&can_attack(this.Target)&&(set_message("Attacking: "+this.Target.name),attack(this.Target))},t.prototype.usePotions=function(){character.hp<character.max_hp-200&&can_use("hp")&&use("hp"),character.mp<character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.moveToTank=function(){null!==i.getTank()&&move(i.getTank().real_x,i.getTank().real_y)},t}(),u=function(){return function(){this.ManaBurst={NiceName:"Mana Burst",SpellName:"burst",Cooldown:6},this.Energize={NiceName:"Energize",SpellName:"energize",Cooldown:4}}}(),c=function(){return function(){}}(),g=function(){return function(){this.Curse={NiceName:"Curse",SpellName:"curse",Cooldown:5}}}(),l=function(){function t(){}return t.Mage=new u,t.Warrior=new c,t.Priest=new g,t}(),p=(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Mage",e.Target=null,e.LastCast_Energize=new Date,e.LastCast_ManaBurst=new Date,game_log("Injected ClassController: "+e.ClassName),e}return p(e,t),e.prototype.castEnergize=function(t){null!==t&&this.timeFromLastCast(this.LastCast_Energize)>l.Mage.Energize.Cooldown&&(game_log("Casting Energize on: "+t.name),this.LastCast_Energize=new Date,use_skill(l.Mage.Energize.SpellName,t))},e.prototype.runClassLoop=function(){this.targetLocalEntity(),this.moveToTarget(),this.attackTarget(),this.castEnergize(i.getHealer().mp<i.getHealer().max_mp/2?i.getHealer():i.getTank())},e}(s))}]);