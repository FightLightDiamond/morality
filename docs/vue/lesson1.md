###
```
Install vue devtool click [here](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
```

### Create Vue Instance
Create new file index.html with content below:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lesson1</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<body>

</body>
// Vue CDN
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</html>
```
Create new Vue Instance
- element for Vue Instance
```
<div id="app"></div>
```
- Syntax define Vue Instance
```
const app = new Vue({
    el: "#app",
  })
```

### Data on Vue
Define data
```
el: "#app",
    data() {
      return {
        message: "Hello world",
      }
    },
```
View data on template
```
<div id="app">{{message}}</div>
```
### Attributes
```
<tag :attributeName="data"></tag>
```

### 2 way bind
```
v-model="<variable>"
```

## Event
js event [here](https://www.w3schools.com/js/js_events.asp)
