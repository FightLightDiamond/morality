@component('mail::message')

Your video is published now.

    @component('mail::button', ['url' => 'hfs'])
        Click here
    @endcomponent

    Thanks, <br/>
    {{config('app.name')}}

@endcomponent