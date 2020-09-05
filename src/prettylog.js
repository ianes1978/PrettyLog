export const prettyLog ={
    debug: true,
    _defaultMessageStyle: 'color:gray;font-family:Roboto;font-size:0.8rem;',
    _defaultBadgeStyle: 'color:white;font-family:Roboto;font-size:0.7rem;background-color:#a2b9bc;padding: 1px 5px; border-radius: 0.4rem;margin-right:5px;',
    /**
    * @param {Object[]} logStyles Array of style [{name,badge, badgeStyle,messageStyle}].
    * @param {string} logStyles.name name of the new log.
    * @param {string} [logStyles.badge=] label.
    * @param {string} [logStyles.badgeStyle=] label style (cssStyle).
    * @param {string} [logStyles.messageStyle=] message (cssStyle).
    */ 
    addManyLogStyles(logStyles){
     logStyles.forEach(newLog=>{
       const {name, badge, badgeStyle, messageStyle} = newLog;
       
       this.addLogStyle(name,badge, badgeStyle, messageStyle)
     })
   
     },
     addLogStyle(name,badge, badgeStyle = '',messageStyle=''){
       Object.defineProperty(this, name, {
         get: function() {
           if (this.debug){
           return window.console.log.bind(window.console, `%c${badge}%c%s`,this._defaultBadgeStyle+';'+badgeStyle, this._defaultMessageStyle+';'+messageStyle);
           }else{
             return function() {};
           }
         },
         configurable: true
       });
       
     },
     logON(){
        this.debug = true
        this.msg(`Logger STARTED`);
     },
     logOFF(){
         this.msg(`Logger STOPPED`);
         this.debug = false
     },
     get msg() {
       if (this.debug){
       return window.console.log.bind(window.console, '%cMsg:%c %s',this._defaultBadgeStyle+';background-color:gray','color:gray;font-family:Roboto;font-size:0.8rem;');
       }else{
         return function() {};
       }
     },

   }
   