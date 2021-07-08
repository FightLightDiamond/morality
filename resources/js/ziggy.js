const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"welcome":{"uri":"\/","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"register":{"uri":"register","methods":["GET","HEAD"]},"password.request":{"uri":"password\/reset","methods":["GET","HEAD"]},"password.email":{"uri":"password\/email","methods":["POST"]},"password.reset":{"uri":"password\/reset\/{token}","methods":["GET","HEAD"]},"password.update":{"uri":"password\/reset","methods":["POST"]},"password.confirm":{"uri":"password\/confirm","methods":["GET","HEAD"]},"home":{"uri":"home","methods":["GET","HEAD"]},"bookmark.index":{"uri":"bookmarks","methods":["GET","HEAD"]},"bookmark.add":{"uri":"bookmarks\/add","methods":["GET","HEAD"]},"bookmark.view":{"uri":"bookmarks\/view\/{bookmark}","methods":["GET","HEAD"],"bindings":{"bookmark":"id"}},"bookmark.preview":{"uri":"bookmarks\/preview","methods":["POST"]},"bookmark.active":{"uri":"bookmarks\/make-active","methods":["POST"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
