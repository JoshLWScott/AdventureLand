!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=["Besides","Motivation","Cartography","Purity"],a=function(){function t(){}return t.inviteMembers=function(){r.map(function(t){return t!==character.name?send_party_invite(t,!0):null})},t.getTank=function(){return get_player(r[0])},t.getMage=function(){return get_player(r[1])},t.getRanger=function(){return get_player(r[2])},t.getHealer=function(){return get_player(r[3])},t}();function i(t,e,n){return Math.sqrt(Math.pow(n.real_x-t,2)+Math.pow(n.real_y-e,2))}function o(t){return character.items.filter(function(e){return null!=e&&e.name==t}).reduce(function(t,e){return t+(e.q||1)},0)}var s,c=function(){function t(){}return t.snake={map:"main",x:336,y:-757},t}(),u=function(){function t(){}return t.Monsters=new c,t}(),p=function(){function t(){var t=this;this.TargetName="",this.isMovingToLocation=!1,this.isResupplying=!1,this.character=null,this.last_minutes_checked=new Date,this.last_xp_checked_minutes=character.xp,this.last_xp_checked_kill=character.xp,this.init_xptimer(1),setInterval(function(){t.character=character,t.character.rip||is_moving(t.character)||(loot(!0),t.checkSupplies(),t.isResupplying||t.isMovingToLocation||(t.Target=get_targeted_monster(),t.Target.skin!==t.TargetName&&(t.TargetName=t.Target.skin),t.moveToFarmLocation(),t.usePotions(),t.runClassLoop()),t.update_xptimer())},250)}return t.prototype.moveToFarmLocation=function(){var t=u.Monsters.snake;null!=t&&i(t.x,t.y,this.character)<50?(this.isMovingToLocation=!0,smart_move({map:t.map,x:t.x,y:t.y})):this.isMovingToLocation=!1},t.prototype.checkSupplies=function(){var t=this;["hpot0","mpot0"].map(function(e){o(e)<100?t.resupplyPotions():t.isResupplying=!1})},t.prototype.resupplyPotions=function(){this.isResupplying=!0;var t,e,n,r=null,a=(t="fancypots",e=this.character,(n=parent.G.maps[e.map].npcs.filter(function(e){return e.id==t})).length>0?n[0]:null);null!=a&&(r=i(a.position[0],a.position[1],this.character)),!smart.moving&&(null==r||r>100)&&smart_move({to:"potions"}),null!=r&&r<100&&function(t,e){e.esize>0?["hpot0","mpot0"].map(function(n,r){var a=parent.G.items[n];if(null!=a){var i=a.g*t;e.gold>=i?o(n)<100&&buy(n,t):game_log("Not Enough Gold!")}}):game_log("Inventory Full!")}(1e3,this.character)},t.prototype.timeFromLastCast=function(t){return Math.abs((t.getTime()-(new Date).getTime())/1e3)},t.prototype.targetLocalEntity=function(){this.Target||(this.Target=get_nearest_monster({type:this.TargetName}),this.Target?change_target(this.Target):set_message("No Monsters"))},t.prototype.targetTankEntity=function(){this.Target||null===a.getTank()||(this.Target=get_target_of(a.getTank()))},t.prototype.moveToTarget=function(){null===this.Target||in_attack_range(this.Target)||(set_message("Moving to target"),move(this.character.x+(this.Target.real_x-this.character.x)/2,this.character.y+(this.Target.real_y-this.character.y)/2))},t.prototype.attackTarget=function(){null!==this.Target&&can_attack(this.Target)&&(set_message("Attacking: "+this.Target.name),attack(this.Target))},t.prototype.usePotions=function(){this.character.hp<this.character.max_hp-200&&can_use("hp")&&use("hp"),this.character.mp<this.character.max_mp-300&&can_use("mp")&&use("mp")},t.prototype.init_xptimer=function(t){this.minute_refresh=t||1,parent.add_log(this.minute_refresh.toString()+" min until refresh!",65535);var e=parent.$,n=e("#bottomrightcorner");n.find("#xptimer").remove();var r=e('<div id="xptimer"></div>').css({background:"black",border:"solid gray",borderWidth:"5px 5px",width:"320px",height:"96px",fontSize:"28px",color:"#77EE77",textAlign:"center",display:"table",overflow:"hidden",marginBottom:"16px"});e('<div id="xptimercontent"></div>').css({display:"table-cell",verticalAlign:"middle"}).html('Estimated time until level up:<br><span id="xpcounter" style="font-size: 40px !important; line-height: 28px">Loading...</span><br><span id="xprate">(Kill something!)</span>').appendTo(r);n.prepend(r)},t.prototype.update_xptimer=function(){if(this.character.xp!=this.last_xp_checked_kill){var t=parent.$,e=new Date,n=Math.round((e.getTime()-this.last_minutes_checked.getTime())/1e3);if(!(n<1)){var r=Math.round((this.character.xp-this.last_xp_checked_minutes)/n);n>60*this.minute_refresh&&(this.last_minutes_checked=new Date,this.last_xp_checked_minutes=this.character.xp),this.last_xp_checked_kill=this.character.xp;var a=parent.G.levels[this.character.level]-this.character.xp,i=Math.round(a/r),o=Math.round(i/60),s=Math.round(o/60)+"h "+o%60+"min";t("#xpcounter").text(s),t("#xprate").text(r+" XP/s")}}},t}(),l=function(){return function(){this.ManaBurst={NiceName:"Mana Burst",SpellName:"burst",Cooldown:6},this.Energize={NiceName:"Energize",SpellName:"energize",Cooldown:4}}}(),h=function(){return function(){}}(),g=function(){return function(){this.Curse={NiceName:"Curse",SpellName:"curse",Cooldown:5}}}(),m=function(){return function(){this.Supershot={NiceName:"Supershot",SpellName:"supershot",Cooldown:30},this.ThreeShot={NiceName:"3 Shot",SpellName:"3shot",Cooldown:.25,ManaCost:300}}}(),f=function(){function t(){}return t.Mage=new l,t.Warrior=new h,t.Priest=new g,t.Ranger=new m,t}(),_=(s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});new(function(t){function e(){var e=t.call(this)||this;return e.ClassName="Mage",e.LastCast_Energize=new Date,e.LastCast_ManaBurst=new Date,game_log("Injected ClassController: "+e.ClassName),e}return _(e,t),e.prototype.castEnergize=function(t){null!==t&&this.timeFromLastCast(this.LastCast_Energize)>f.Mage.Energize.Cooldown&&(this.timeFromLastCast(this.LastCast_Energize)>=60||t.mp<=330)&&(game_log("Casting Energize on: "+t.name),this.LastCast_Energize=new Date,use_skill(f.Mage.Energize.SpellName,t))},e.prototype.runClassLoop=function(){this.targetLocalEntity(),null!==a.getRanger()&&(this.castEnergize(a.getRanger()),move(a.getRanger().real_x,a.getRanger().real_y))},e}(p))}]);