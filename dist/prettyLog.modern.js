const e={debug:!0,_defaultMessageStyle:"color:gray;font-family:Roboto;font-size:0.8rem;",_defaultBadgeStyle:"color:white;font-family:Roboto;font-size:0.7rem;background-color:#a2b9bc;padding: 1px 5px; border-radius: 0.4rem;margin-right:5px;",_defaultBadgeStyleNode:"[30m[47m",addManyLogStyles(e){e.forEach(e=>{const{name:o,badge:r,badgeStyle:l,messageStyle:t}=e;this.addLogStyle(o,r,l,t)})},addLogStyle(e,o,r="",l=""){Object.defineProperty(this,e,{get:function(){if(this.debug)switch(typeof window){case"undefined":const e=this.css2AnsiCode(this._defaultBadgeStyle+r),t=this.css2AnsiCode(this._defaultMessageStyle+l);return global.console.log.bind(global.console,`${e.color}${e.backgroundColor}${o}[0m ${t.color}${t.backgroundColor}%s[0m`);default:return window.console.log.bind(window.console,`%c${o}%c%s`,this._defaultBadgeStyle+";"+r,this._defaultMessageStyle+";"+l)}return function(){}},configurable:!0})},css2json:e=>e.split(";").reduce((e,o)=>{const r=o.trim().split(":");return e[r[0]]=r[1],e},{}),css2AnsiCode(e){const o=this.css2json(e),r={color:"",backgroundColor:""};for(const e in o)if(o.hasOwnProperty(e)){const l=o[e];switch(e){case"color":r.color=this.colorAnsi(l);break;case"background-color":r.backgroundColor=this.backgroundColorAnsi(l)}}return r},colorAnsi:e=>o.color2AnsiCode(e),backgroundColorAnsi:e=>o.backgroundColor2AnsiCode(e),logON(){this.debug=!0,this.msg("Logger STARTED")},logOFF(){this.msg("Logger STOPPED"),this.debug=!1},get msg(){if(this.debug)switch(typeof window){case"undefined":return global.console.log.bind(global.console,this._defaultBadgeStyleNode+" Msg: [0m %s");default:return window.console.log.bind(window.console,"%cMsg:%c %s",this._defaultBadgeStyle+";background-color:gray","color:gray;font-family:Roboto;font-size:0.8rem;")}return function(){}}},o={color2AnsiCode(e){const o=this.isHex(e.trim()),l=this.isPalette(e.trim());if(o){const o=this.hexToRgb(e.trim());return this.rgbToAnsiColor(o)}if(l){const o=r[e.trim().toLowerCase()],l=this.hexToRgb(o);return this.rgbToAnsiColor(l)}return""},backgroundColor2AnsiCode(e){const o=this.isHex(e.trim()),l=this.isPalette(e.trim());if(o){const o=this.hexToRgb(e.trim());return this.rgbToAnsiBackgroundColor(o)}if(l){const o=r[e.trim().toLowerCase()],l=this.hexToRgb(o);return this.rgbToAnsiBackgroundColor(l)}return""},isHex:e=>e.includes("#")&&7===e.length,isPalette:e=>Object.keys(r).includes(e.trim().toLowerCase()),hexToRgb(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,o,r,l){return o+o+r+r+l+l});var o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return o?{r:parseInt(o[1],16),g:parseInt(o[2],16),b:parseInt(o[3],16)}:null},rgbToAnsiColor:e=>"[38;2;"+e.r+";"+e.g+";"+e.b+"m",rgbToAnsiBackgroundColor:e=>"[48;2;"+e.r+";"+e.g+";"+e.b+"m"},r={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",darkgreen:"#006400",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",DarkViolet:"#9400D3",DeepPink:"#FF1493",DeepSkyBlue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",lightgreen:"#90EE90",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"};export{o as ansiCodeTools,r as colorsPalette,e as prettyLog};
//# sourceMappingURL=prettyLog.modern.js.map
