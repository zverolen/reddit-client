# Reddit Client | Codecademy Learning Project

## Basic Functionality
1. Show a list of Reddit news.
2. Show comments for a news in the feed.
3. Search news.
4. Load some additional feeds

It's a simple app so no parameters are specified. I will figure out what to show and how much of it to show on the go.

## Phase One - Initial setup of the projects

At this point the basic architecture of the app is implemented. It provides the basic shape of the state and initial layout components. Basic error messages are added for the cases when no data is loaded (which is currently by default as no data fetching is implemented).

One breakpoint exists that determines at which point the dropdown menu switches between full-size and collapsible modes (500px).

PENDING: Verification of screen readers support.

##  Interactive Prototypes

Prototypes are implemented in an open-source app [Penpot](https://penpot.app/) and are available via links below. After opening a link you should press Play button and choose the flow (see the following screenshot). Please, reade the additional info about the prototypes in the subsections below.

![Screenshot of how to launch the prototype](/readme-images/launch-prototype-screenshot.png "Screenshot of how to launch the prototype")

### Prototype for Bigger screens

This prototype features basic actions as well as loading screens and error messages. All controls are clickable. "Loading" screens will show "loaded" screens after a short delay. Links that lead outside the app are marked when clicked.

This prototype contains more actions than the other one. The actions are:

1. Opening and closing comments on the default page.
2. Opening a long news in a new screen.
3. Loading comments on the single news screen (with error and reload).
4. Navigating to other feeds from the feed list (Feed 3 with an error).
5. Error screen for search results.
6. Navigation back to the default feed from different screens.

[Link to the Prototype for bigger screens](https://design.penpot.app/#/view/d9665a57-0073-80a2-8002-47b8d0c88057?page-id=396b0895-20c9-8051-8002-4926475fba80&section=interactions&index=0&share-id=d5fc0283-ef1c-80fa-8002-497f8b193ace)

### Prototype for Smaller screens.

This prototype features less actions than the one for big screens. It also features "loading" screens and error messages.
It has same actions and screens as well as new ones. The actions are:

1. Showing screen with search results.
2. Opening the feed list in the dropdown menu (with a loading error, so other feeds are not available).
3. Opening and closing comments on the default page.
4. Opening a long news in a new screen.
5. Loading comments on the single news screen (with error and reload).
6. Going back to the default feed from various screens.

The small screen size is 280px wide to verify the layout for browsers in split screen mode and other extreme cases.

[Link to the Prototype for smaller screens](https://design.penpot.app/#/view/d9665a57-0073-80a2-8002-47b8d0c88057?page-id=396b0895-20c9-8051-8002-49384f78a737&section=interactions&index=0&share-id=d9665a57-0073-80a2-8002-4a5e3d120b20)

