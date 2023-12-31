<div>  
    <img src="https://img.shields.io/static/v1?label=&message=React&color=0088CC&logo=React&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Vite%20JS&color=646CFF&logo=Vite&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Typescript&color=0088CC&logo=Typescript&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Redux&color=764ABC&logo=Redux&logoColor=white&style=flat-square">
    <img src="https://img.shields.io/static/v1?label=&message=Vitest&color=646CFF&logo=Vitest&logoColor=white&style=flat-square">
</div><br>

<b>WORK IN PROGRESS... Only compatible with a 1080p desktop atm. Responsiveness coming later.</b> Demo at : https://ask0ldd.github.io/VStreamService/

<img src="/public/screenshots/screen1.jpg">

<u><b>Description & Technical Challenges :</b></u>

This Application has been designed with <b>Figma</b> and built using <b><img style="transform:translateY(6px)" src="https://img.shields.io/static/v1?label=&message=React&color=0088CC&logo=React&logoColor=white&style=flat-square"> | <img src="https://img.shields.io/static/v1?label=&message=Redux&color=764ABC&logo=Redux&logoColor=white&style=flat-square"></b>. My goal was to merge the most useful features of <b>Amazon Prime</b> and <b>IMDb</b> into one website. Most datas used to populate the pages have been scraped using <b>a tool I built with the help of <img src="https://img.shields.io/static/v1?label=&message=Puppeteer&color=40B5A4&logo=puppeteer&logoColor=white&style=flat-square"></b> : https://github.com/ask0ldd/ScrapIMDB. Some others come from the <b>Omdb API</b>.

All the Components / Services have been tested using <b><img src="https://img.shields.io/static/v1?label=&message=Vitest&color=646CFF&logo=Vitest&logoColor=white&style=flat-square"></b>, with a <b>100% coverage</b> being reached. Doing so was especially tricky since <b>adding some new custom features to the popular JSDOM library was needed in order to test my more complex components.</b>

<b>--- THE HOME PAGE ---</b>

The Home page is displaying three types of custom slideshows :

<img src="/public/screenshots/screen2n3.jpg">

- The top one has some big banners in a rotation, using React and CSS. Nothing fancy.

- The second one is more advanced, featuring cards that <b>open and display a video asynchronously when hovered over</b>. Additionally, the cards <b>automatically center themselves</b> to ensure the video is never cut off.

- The third one displays cards that open vertically, accompanied by a countdown of the remaining time for the user to finish watching the movie. <br>
  <hr>
  <img src="/public/screenshots/screen4.jpg">

- Clicking on a card redirects the user to a page dedicated to the selected TV show or movie.

<b>--- THE MOVIE / TV SHOW PAGE ---</b>

- An <b>asynchronous trailer</b> is then loaded and played, with the option to activate sound using a button.

- The user can access more information about their show through a submenu with the following items : Episodes, Cast & Crew, Photos, User Reviews.
  <hr>
  <img src="/public/screenshots/screen5.jpg">

- At the bottom of the movie page, a list of episodes is displayed if relevant.

- As the user scrolls down the page, the <b>episodes are loaded asynchronously in a manner similar to Twitter.</b>
  <hr>
  <img src="/public/screenshots/screen6.jpg">

<b>--- THE CAST ---</b>

- Multiple elements displaying the cast behind the production of the selected movie.
  <hr>
  <img src="/public/screenshots/screen8.jpg">

<b>--- GALLERY & MODALE ---</b>

- A gallery containing some miniatures <b>opening a custom modale</b> when clicked on.
  <hr>
  <img src="/public/screenshots/screen9.jpg">

- The modal contains a mini gallery at the top.

- The <b>Keyboard Navigation</b> is obviously supported, for accessibility purposes.
