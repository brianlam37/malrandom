# MalRandom

A web application that finds a random series off of your plan to watch/list on MyAnimeList.

## Description

### How to use it

1.  Go to [http://malrandom.herokuapp.com/](http://malrandom.herokuapp.com/).

2.  Click the Enter Here button
    <br />

3.  Look up your exact MyAnimeList profile name on the left grid (large screens) or top grid (mobile) for first time use.

4.  Select the user if it's correct, don't be surprised if there are no results due to how Jikan works, just try it again or refresh the page and try it again.

5.  Now that your user has been selected, hit the random manga/anime buttons on the right grid/bottom grid. Again, due to how Jikan operates, it may take a while and not follow through with the request.

6.  Enjoy!

7.  In case you are like me and are only dedicated to a single series at a time, you can select one manga/anime by hitting the current button in the top right of the cover of the series. You can unselect it by hitting the same button.

## Background

I made this application to solve a simple problem I had, which was not being able to decide what I wanted to read from my manga reading list. Typically I would have just looked up a random number generator, then the length of my list and then randomize. Then go back to the list to see what I selected. This got kind of annoying even though its just a few clicks.

So I decided, a solution to my problem was to just make a web app that does all of that for me with one click.

## How it works

This application is just a React-Express application that does all its logic on the front end. It uses axios to communicate with the Jikan API and query data pertaining the specified user. It is not affliated with MyAnimeList and there is no authorization, so you can't edit your list from this application. It uses localStorage to store the relevant data like what is the specificed user, the current anime/manga that is being watched/read. The express server is just to serve the static build of the React application.

## Problems during development

Lots of unmounted component issues, and probably some minor cases I still haven't fixed due to axios making asynchronous calls I never canceled.

Trying to figure out the best way of displaying the specified user's list, and whether to fetch everything in their list. This wasn't possible for overlarge lists because Jikan would time out, so I settled for a custom pagination navigator.
