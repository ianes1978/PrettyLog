var e={debug:!0,_defaultMessageStyle:"color:gray;font-family:Roboto;font-size:0.8rem;",_defaultBadgeStyle:"color:white;font-family:Roboto;font-size:0.7rem;background-color:#a2b9bc;padding: 1px 5px; border-radius: 0.4rem;margin-right:5px;",_defaultBadgeStyleNode:"[30m[47m",addManyLogStyles:function(e){var r=this;e.forEach(function(e){r.addLogStyle(e.name,e.badge,e.badgeStyle,e.messageStyle)})},addLogStyle:function(e,r,o,i){void 0===o&&(o=""),void 0===i&&(i=""),Object.defineProperty(this,e,{get:function(){if(this.debug)switch(typeof window){case"undefined":var e=this.css2AnsiCode(this._defaultBadgeStyle+o),n=this.css2AnsiCode(this._defaultMessageStyle+i);return global.console.log.bind(global.console,""+e.color+e.backgroundColor+r+"[0m "+n.color+n.backgroundColor+"%s[0m");default:return window.console.log.bind(window.console,"%c"+r+"%c%s",this._defaultBadgeStyle+";"+o,this._defaultMessageStyle+";"+i)}return function(){}},configurable:!0})},css2json:function(e){return e.split(";").reduce(function(e,r){var o=r.trim().split(":");return e[o[0]]=o[1],e},{})},css2AnsiCode:function(e){var r=this.css2json(e),o={color:"",backgroundColor:""};for(var i in r)if(r.hasOwnProperty(i)){var n=r[i];switch(i){case"color":o.color=this.colorAnsi(n);break;case"background-color":o.backgroundColor=this.backgroundColorAnsi(n)}}return o},colorAnsi:function(e){return r.color2AnsiCode(e)},backgroundColorAnsi:function(e){return r.backgroundColor2AnsiCode(e)},logON:function(){this.debug=!0,this.msg("Logger STARTED")},logOFF:function(){this.msg("Logger STOPPED"),this.debug=!1},get msg(){if(this.debug)switch(typeof window){case"undefined":return global.console.log.bind(global.console,this._defaultBadgeStyleNode+" Msg: [0m %s");default:return window.console.log.bind(window.console,"%cMsg:%c %s",this._defaultBadgeStyle+";background-color:gray","color:gray;font-family:Roboto;font-size:0.8rem;")}return function(){}}},r={color2AnsiCode:function(e){var r=this.isHex(e.trim()),i=this.isPalette(e.trim());if(r){var n=this.hexToRgb(e.trim());return this.rgbToAnsiColor(n)}if(i){var t=o[e.trim().toLowerCase()],a=this.hexToRgb(t);return this.rgbToAnsiColor(a)}return""},backgroundColor2AnsiCode:function(e){var r=this.isHex(e.trim()),i=this.isPalette(e.trim());if(r){var n=this.hexToRgb(e.trim());return this.rgbToAnsiBackgroundColor(n)}if(i){var t=o[e.trim().toLowerCase()],a=this.hexToRgb(t);return this.rgbToAnsiBackgroundColor(a)}return""},isHex:function(e){return e.includes("#")&&7===e.length},isPalette:function(e){return Object.keys(o).includes(e.trim().toLowerCase())},hexToRgb:function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,r,o,i){return r+r+o+o+i+i});var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null},rgbToAnsiColor:function(e){return"[38;2;"+e.r+";"+e.g+";"+e.b+"m"},rgbToAnsiBackgroundColor:function(e){return"[48;2;"+e.r+";"+e.g+";"+e.b+"m"}},o={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",darkgreen:"#006400",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",DarkViolet:"#9400D3",DeepPink:"#FF1493",DeepSkyBlue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",lightgreen:"#90EE90",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"};export{r as ansiCodeTools,o as colorsPalette,e as prettyLog};
//# sourceMappingURL=prettyLog.module.js.map
