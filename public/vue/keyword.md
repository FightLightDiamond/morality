```
progressive framework
UI (user interfaces).
view layer
SFC (single file components)
SPA  (Single-Page Applications)
```

```
No build step required
```
```
Command line interface
```

```
ViewModel (MVVM patterns).
```
```
Instance Lifecycle Hook
```

```
Interpolation
```

```
1. Listen to Events on DOM
```

```
Method Event Handlers.
```

```
<div id="app">
    <button v-on:click="warn('Không thể submit form',$event)">Click</button>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        },
        methods: {
            warn: function (message, event) {
                if (event) event.preventDefault();
                alert(message  + '!');
            }
        }
    });
</script>
```

Event Modifiers
```
.stop
.prevent
.capture
.self
.once
```

Key modifiers
```
<input type="text" v-on:keyup.13="warn">
.enter
.tab
.delete (Phím này dùng được cho cả phím delete và backspace)
.esc
.space
.up
.down
.left
.right
.ctrl
.alt
.shift
.meta (Trên bàn phím window thì nó là phím window, còn trên bàn phím mac thì nó là phím command).
```

define key code
```
Vue.config.keyCodes.f5 = 116;
```

V-model ở các thành phần là khác nhau

Thành phần là radio hoặc select option thì v-model thường sẽ là chuỗi tĩnh
Ccheckbox thì thường sẽ là giá trị boolean true false. 

## Component
Global
```
Vue.component('tag', options);
options = {
    template
}
```
Component Local (instance Vue)
```

```