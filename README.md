# OpenCDN

Open your CDN faster then the light!

# How to ?

First, import OpenCDN :

```js
const cdn = require("opencdn");
```

Next step is opening the CDN. Type this :

```js
cdn.open("localhost", 8080);
```

> Default hostname : **localhost** <br>
> Default port is : **8080**

Then, add a folder to the CDN :

```js
cdn.addFolder(`${__dirname}/www`);
```

> Default folder : **${\_\_dirname}/www**

You can close the CDN using the `close()` method :

```js
cdn.close();
```

# LICENSE

GPL-3.0
