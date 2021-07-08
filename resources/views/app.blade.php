<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />

    <script>
        const userId = "{{\Illuminate\Support\Facades\Auth::id()}}"
        const roomId = 1;
    </script>

    <script src="http://localhost:6001/socket.io/socket.io.js"></script>
    <script src="{{ mix('/js/app.js') }}" defer></script>

    @routes
</head>
<body>

@inertia

<div id="app"></div>
</body>
</html>