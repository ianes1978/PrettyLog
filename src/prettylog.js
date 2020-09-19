export const prettyLog = {
  debug: true,
  _defaultMessageStyle: 'color:gray;font-family:Roboto;font-size:0.8rem;',
  _defaultBadgeStyle: 'color:white;font-family:Roboto;font-size:0.7rem;background-color:#a2b9bc;padding: 1px 5px; border-radius: 0.4rem;margin-right:5px;',
  _defaultBadgeStyleNode:'\x1b[30m\x1b[47m',
  /**
  * @param {Object[]} logStyles Array of style [{name,badge, badgeStyle,messageStyle}].
  * @param {string} logStyles.name name of the new log.
  * @param {string} [logStyles.badge=] label.
  * @param {string} [logStyles.badgeStyle=] label style (cssStyle).
  * @param {string} [logStyles.messageStyle=] message (cssStyle).
  */
  addManyLogStyles(logStyles) {
    logStyles.forEach(newLog => {
      const { name, badge, badgeStyle, messageStyle } = newLog;

      this.addLogStyle(name, badge, badgeStyle, messageStyle)
    })

  },
  addLogStyle(name, badge, badgeStyle = '', messageStyle = '') {
    Object.defineProperty(this, name, {
      get: function () {
        if (this.debug) {
          switch (typeof window) {
            case 'undefined':
              const nodeBadgeStyle = this.css2AnsiCode(this._defaultBadgeStyle+badgeStyle);
              const nodeMessageStyle = this.css2AnsiCode(this._defaultMessageStyle+messageStyle);
              
              return global.console.log.bind(global.console, `${nodeBadgeStyle.color}${nodeBadgeStyle.backgroundColor}${badge}\x1b[0m ${nodeMessageStyle.color}${nodeMessageStyle.backgroundColor}%s\x1b[0m`);

            default:
              return window.console.log.bind(window.console, `%c${badge}%c%s`, this._defaultBadgeStyle + ';' + badgeStyle, this._defaultMessageStyle + ';' + messageStyle);
          }
        }
        return function () { };
      },
      configurable: true
    });

  },
  css2json(style){
    const styleSplitted = style.split(';'); 
    const styleTrimmed = styleSplitted.reduce((obj,property)=>{
      
      const propTrimmed = property.trim();
      const propAndValue = propTrimmed.split(':');
      obj[propAndValue[0]]= propAndValue[1]
      return obj
      
    },{})

    return styleTrimmed

  },
  css2AnsiCode(style){
    const styleJson = this.css2json(style);
    const ansiStyle = {
      color:'',
      backgroundColor:'',
    };
   
    for (const key in styleJson) {
      if (styleJson.hasOwnProperty(key)) {
        const value = styleJson[key];
        switch (key) {
          case 'color':
            

            ansiStyle.color = this.colorAnsi(value);
            break;
          case 'background-color':
            
            ansiStyle.backgroundColor = this.backgroundColorAnsi(value);
            break;
        
          default:
            break;
        }
      }
     
    }
    return ansiStyle
  },

  colorAnsi(color){
    return ansiCodeTools.color2AnsiCode(color)
  },
  backgroundColorAnsi(color){
    return ansiCodeTools.backgroundColor2AnsiCode(color)
  },
  logON() {
    this.debug = true
    this.msg(`Logger STARTED`);
  },
  logOFF() {
    this.msg(`Logger STOPPED`);
    this.debug = false
  },
  get msg() {
    if (this.debug) {
      switch (typeof window) {
        case 'undefined':
          return global.console.log.bind(global.console, `${this._defaultBadgeStyleNode} Msg: \x1b[0m %s`);

        default:
          return window.console.log.bind(window.console, '%cMsg:%c %s', this._defaultBadgeStyle + ';background-color:gray', 'color:gray;font-family:Roboto;font-size:0.8rem;');
      }
    }
    return function () { };
  },

}


export const ansiCodeTools = {
 
  color2AnsiCode(color){
   
    const isHex= this.isHex(color.trim());
   
    const isPalette = this.isPalette(color.trim());

    
   
    
    if (isHex) {
      const rgbColor = this.hexToRgb(color.trim())
      const ansiColor = this.rgbToAnsiColor(rgbColor)

      return ansiColor
    }
    if (isPalette){
      const hexColor = colorsPalette[color.trim().toLowerCase()];
      const rgbColor = this.hexToRgb(hexColor)
      const ansiColor = this.rgbToAnsiColor(rgbColor)
      return ansiColor
    }
    return ''
  },
  backgroundColor2AnsiCode(color){
    const isHex= this.isHex(color.trim());
    const isPalette = this.isPalette(color.trim());
    if (isHex) {
      const rgbColor = this.hexToRgb(color.trim())
      const ansiColor = this.rgbToAnsiBackgroundColor(rgbColor)

      return ansiColor
    }
    if (isPalette){
      const hexColor = colorsPalette[color.trim().toLowerCase()];
      const rgbColor = this.hexToRgb(hexColor)
      const ansiColor = this.rgbToAnsiBackgroundColor(rgbColor)
      return ansiColor
    }
    return ''
  },
  isHex: (color)=>{
    const containHash = color.includes('#');
    const lenghtRight = color.length === 7;
    return containHash && lenghtRight
  },
  isPalette: (color)=>{
    
    const knowedPalettes = Object.keys(colorsPalette);
    return knowedPalettes.includes(color.trim().toLowerCase());
  },
  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  rgbToAnsiColor(rgb){
    return "\x1B[38;2;"+ rgb.r+';'+rgb.g+';'+rgb.b+'m'
  },
  rgbToAnsiBackgroundColor(rgb){
    return "\x1B[48;2;"+ rgb.r+';'+rgb.g+';'+rgb.b+'m'
  },
} 


export const colorsPalette = {
  aliceblue:'#F0F8FF',
  antiquewhite:'#FAEBD7',
  aqua:'#00FFFF',
  aquamarine:'#7FFFD4',
  azure:'#F0FFFF',
  beige:'#F5F5DC',
  bisque:'#FFE4C4',
  black:'#000000',
  blanchedalmond:'#FFEBCD',
  blue:'#0000FF',
  blueviolet:'#8A2BE2',
  brown:'#A52A2A',
  burlywood:'#DEB887',
  cadetblue:'#5F9EA0',
  chartreuse:'#7FFF00',
  chocolate:'#D2691E',
  coral:'#FF7F50',
  cornflowerblue:'#6495ED',
  cornsilk:'#FFF8DC',
  crimson:'#DC143C',
  cyan:'#00FFFF',
  darkblue:'#00008B',
  darkcyan:'#008B8B',
  darkgoldenrod:'#B8860B',
  darkgray:'#A9A9A9',
  darkgrey:'#A9A9A9',
  darkgreen:'#006400',
  darkkhaki:'#BDB76B',
  darkmagenta:'#8B008B',
  darkolivegreen:'#556B2F',
  darkorange:'#FF8C00',
  darkorchid:'#9932CC',
  darkred:'#8B0000',
  darksalmon:'#E9967A',
  darkseagreen:'#8FBC8F',
  darkslateblue:'#483D8B',
  darkslategray:'#2F4F4F',
  darkslategrey:'#2F4F4F',
  darkturquoise:'#00CED1',
  DarkViolet:'#9400D3',
  DeepPink:'#FF1493',
  DeepSkyBlue:'#00BFFF',
  dimgray:'#696969',
  dimgrey:'#696969',
  dodgerblue:'#1E90FF',
  firebrick:'#B22222',
  floralwhite:'#FFFAF0',
  forestgreen:'#228B22',
  fuchsia:'#FF00FF',
  gainsboro:'#DCDCDC',
  ghostwhite:'#F8F8FF',
  gold:'#FFD700',
  goldenrod:'#DAA520',
  gray:'#808080',
  grey:'#808080',
  green:'#008000',
  greenyellow:'#ADFF2F',
  honeydew:'#F0FFF0',
  hotpink:'#FF69B4',
  indianred:'#CD5C5C',
  indigo:'#4B0082',
  ivory:'#FFFFF0',
  khaki:'#F0E68C',
  lavender:'#E6E6FA',
  lavenderblush:'#FFF0F5',
  lawngreen:'#7CFC00',
  lemonchiffon:'#FFFACD',
  lightblue:'#ADD8E6',
  lightcoral:'#F08080',
  lightcyan:'#E0FFFF',
  lightgoldenrodyellow:'#FAFAD2',
  lightgray:'#D3D3D3',
  lightgrey:'#D3D3D3',
  lightgreen:'#90EE90',
  lightpink:'#FFB6C1',
  lightsalmon:'#FFA07A',
  lightseagreen:'#20B2AA',
  lightskyblue:'#87CEFA',
  lightslategray:'#778899',
  lightslategrey:'#778899',
  lightsteelblue:'#B0C4DE',
  lightyellow:'#FFFFE0',
  lime:'#00FF00',
  limegreen:'#32CD32',
  linen:'#FAF0E6',
  magenta:'#FF00FF',
  maroon:'#800000',
  mediumaquamarine:'#66CDAA',
  mediumblue:'#0000CD',
  mediumorchid:'#BA55D3',
  mediumpurple:'#9370DB',
  mediumseagreen:'#3CB371',
  mediumslateblue:'#7B68EE',
  mediumspringgreen:'#00FA9A',
  mediumturquoise:'#48D1CC',
  mediumvioletred:'#C71585',
  midnightblue:'#191970',
  mintcream:'#F5FFFA',
  mistyrose:'#FFE4E1',
  moccasin:'#FFE4B5',
  navajowhite:'#FFDEAD',
  navy:'#000080',
  oldlace:'#FDF5E6',
  olive:'#808000',
  olivedrab:'#6B8E23',
  orange:'#FFA500',
  orangered:'#FF4500',
  orchid:'#DA70D6',
  palegoldenrod:'#EEE8AA',
  palegreen:'#98FB98',
  paleturquoise:'#AFEEEE',
  palevioletred:'#DB7093',
  papayawhip:'#FFEFD5',
  peachpuff:'#FFDAB9',
  peru:'#CD853F',
  pink:'#FFC0CB',
  plum:'#DDA0DD',
  powderblue:'#B0E0E6',
  purple:'#800080',
  rebeccapurple:'#663399',
  red:'#FF0000',
  rosybrown:'#BC8F8F',
  royalblue:'#4169E1',
  saddlebrown:'#8B4513',
  salmon:'#FA8072',
  sandybrown:'#F4A460',
  seagreen:'#2E8B57',
  seashell:'#FFF5EE',
  sienna:'#A0522D',
  silver:'#C0C0C0',
  skyblue:'#87CEEB',
  slateblue:'#6A5ACD',
  slategray:'#708090',
  slategrey:'#708090',
  snow:'#FFFAFA',
  springgreen:'#00FF7F',
  steelblue:'#4682B4',
  tan:'#D2B48C',
  teal:'#008080',
  thistle:'#D8BFD8',
  tomato:'#FF6347',
  turquoise:'#40E0D0',
  violet:'#EE82EE',
  wheat:'#F5DEB3',
  white:'#FFFFFF',
  whitesmoke:'#F5F5F5',
  yellow:'#FFFF00',
  yellowgreen:'#9ACD32'
}