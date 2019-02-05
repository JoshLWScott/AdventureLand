!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n,a=!1,i=["Besides","Motivation","Cartography","Purity"],o=function(){function t(){}return t.inviteMembers=function(){i.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(i[0])},t.getMage=function(){return get_player(i[1])},t.getRanger=function(){return get_player(i[2])},t.getHealer=function(){return get_player(i[3])},t}(),s=function(){function t(){var t=this;this.TargetName="snake",this.last_minutes_checked=new Date,this.last_xp_checked_minutes=character.xp,this.last_xp_checked_kill=character.xp,this.init_xptimer(1),setInterval(function(){character.rip||is_moving(character)||(loot(!0),t.Target=get_targeted_monster(),t.usePotions(),a&&t.moveToTank(),t.runClassLoop(),t.update_xptimer())},250)}return t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){this.Target||(this.Target=get_nearest_monster({min_xp:100,max_att:200,type:this.TargetName}),this.Target?change_target(this.Target):set_message("No Monsters"))},t.prototype.targetTankEntity=function(){this.Target||null===o.getTank()||(this.Target=get_target_of(o.getTank()))},t.prototype.moveToTarget=function(){null===this.Target||in_attack_range(this.Target)||(set_message("Moving to target"),move(character.x+(this.Target.real_x-character.x)/2,character.y+(this.Target.real_y-character.y)/2))},t.prototype.attackTarget=function(){null!==this.Target&&can_attack(this.Target)&&(set_message("Attacking: "+this.Target.name),attack(this.Target))},t.prototype.usePotions=function(){character.hp<character.max_hp-200&&can_use("hp")&&use("hp"),character.mp<character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.moveToTank=function(){null!==o.getTank()&&move(o.getTank().real_x,o.getTank().real_y)},t.prototype.init_xptimer=function(t){this.minute_refresh=t||1,parent.add_log(this.minute_refresh.toString()+" min until refresh!",65535);var e=parent.$,r=e("#bottomrightcorner");r.find("#xptimer").remove();var n=e('<div id="xptimer"></div>').css({background:"black",border:"solid gray",borderWidth:"5px 5px",width:"320px",height:"96px",fontSize:"28px",color:"#77EE77",textAlign:"center",display:"table",overflow:"hidden",marginBottom:"16px"});e('<div id="xptimercontent"></div>').css({display:"table-cell",verticalAlign:"middle"}).html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>').appendTo(n);r.prepend(n)},t.prototype.update_xptimer=function(){if(character.xp!=this.last_xp_checked_kill){var t=parent.$,e=new Date,r=Math.round((e.getTime()-this.last_minutes_checked.getTime())/1e3);if(!(r<1)){var n=Math.round((character.xp-this.last_xp_checked_minutes)/r);r>60*this.minute_refresh&&(this.last_minutes_checked=new Date,this.last_xp_checked_minutes=character.xp),this.last_xp_checked_kill=character.xp;var a=parent.G.levels[character.level]-character.xp,i=Math.round(a/n),o=Math.round(i/60),s=Math.round(o/60)+"h "+o%60+"min";t("#xpcounter").text(s),t("#xprate").text(n+" XP/s")}}},t}(),c=function(){return function(){this.ManaBurst={NiceName:"Mana Burst",SpellName:"burst",Cooldown:6},this.Energize={NiceName:"Energize",SpellName:"energize",Cooldown:4}}}(),u=function(){return function(){}}(),p=function(){return function(){this.Curse={NiceName:"Curse",SpellName:"curse",Cooldown:5}}}(),l=function(){return function(){this.Supershot={NiceName:"Supershot",SpellName:"supershot",Cooldown:30}}}(),h=function(){function t(){}return t.Mage=new c,t.Warrior=new u,t.Priest=new p,t.Ranger=new l,t}(),g=(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Ranger",e.Target=null,e.LastCast_Supershot=new Date,game_log("Injected ClassController: "+e.ClassName),e}return g(e,t),e.prototype.castSupershot=function(){null!==this.Target&&this.timeFromLastCast(this.LastCast_Supershot)>h.Ranger.Supershot.Cooldown&&(game_log("Casting Supershot"),this.LastCast_Supershot=new Date,use_skill(h.Ranger.Supershot.SpellName,this.Target))},e.prototype.runClassLoop=function(){this.targetLocalEntity(),this.moveToTarget(),this.castSupershot(),this.attackTarget()},e}(s))}]);