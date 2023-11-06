<b>WORK IN PROGRESS...</b> https://ask0ldd.github.io/VStreamService/

<img src="/public/screenshots/screen1.jpg">

<div>  
    <img src="https://img.shields.io/static/v1?label=&message=React&color=0088CC&logo=React&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Vite%20JS&color=646CFF&logo=Vite&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Typescript&color=0088CC&logo=Typescript&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Redux&color=764ABC&logo=Redux&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Vitest&color=646CFF&logo=Vitest&logoColor=white&style=flat-square">
</div><br>

Demo at :
https://ask0ldd.github.io/VStreamService/

Description :

This Application was built using React/Redux and combines some major features of Amazon Prime and IMDb. The datas populating most of the pages have been scraped using a custom pupeteer app, which can be found here : https://github.com/ask0ldd/ScrapIMDB and the Ombd API.

All the components / services are 100% tested using Vitest. I had to mock some few methods that have not been implemented into JSDOM yet to test some of my more complex components.

The Home page is displaying three types of custom slideshows :

<img src="/public/screenshots/screen2n3.jpg">

- The first big one is rotating a huge banner using React and CSS. Nothing fancy.

- The second one is more advanced, featuring cards that open and display a video asynchronously when hovered over. Additionally, the cards automatically center themselves to ensure the video is never cut off.

- The third one displays cards that open vertically, accompanied by a countdown of the remaining time for the user to finish watching the movie..
