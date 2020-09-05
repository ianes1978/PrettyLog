# Pretty Log
It is a simple logger for the Browser. It is  a wrap off console.log to style it esier.

# Features:
* Keeps the line number of the code logged.
* Label styled
* Message styled
* Turn On and turn Off
* adder new styles

![screen](./images/logsExamples.PNG)


# Use it
### Project setup
```
npm i prettyLog
```
### Import globalStyle in your webcomponent

**import module:**
```
import {globalStyle} from 'lit-css-global-scope'
```
**use it:**
```
// where you want use 
    import {prettyLog} from 'prettyLog'

    log.addManyLogStyles([
        {name:'title',badge:'Title:',badgeStyle:'',messageStyle:'color:black;font-size:1rem;font-weight:bold;'},
        {name:'danger',badge:'Danger:',badgeStyle:'background-color:red;',messageStyle:'color:red'},
        {name:'todo',badge:'ToDo:',badgeStyle:'background-color:red',messageStyle:'background-color:yellow;color:red;'},
        {name:'action',badge:'Action:',badgeStyle:'background-color:#6b5b95',messageStyle:'color:#6b5b95'},
        {name:'noLabel',badge:'',badgeStyle:'border: 0',messageStyle:'color:#4CD964; border: 1px solid;border-radius:0.4rem;padding:2px 6px'},
        {name:'dot',badge:'  ',badgeStyle:'background-color:orange ;border-radius:50%',messageStyle:''},
        {name:'success',badge:'Success:',badgeStyle:'background-color:#4CD964',messageStyle:'color:#4CD964;'},
        // {name:'',badge:'',badgeStyle:'',messageStyle:''},
    ])
export const log = prettyLog
...
```
```
// loaderPrettyLog.js In this file set the different style customizzable
    import {log} from './loaderPrettyLog.js'

    log.msg('222')
    log.title('Title')
    log.danger('Message danger:')
    log.success('Make something')
    log.action('Action 1')
    log.todo('Make something')
    log.noLabel('No label styled')
    log.dot('Dot message')

export const log = prettyLog
...
```

