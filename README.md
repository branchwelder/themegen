# ThemeGen

## Overview

This is a little app for previewing different color themes and (eventually) building them. I have always enjoyed customizing the colors of things. There are a lot of color themes to choose from. Building your own themes can be a bit of a chore, especially if you want to customize syntax highlighting across different languages with different tokens. I'm exploring ways of defining my own standard color theme format, and trying to design a very lightweight website theming system.

I'd like this themeing format to be more broadly applicable than just code syntax highlighting. This started as me wanting to customize the markdown renderer for my personal website while appropriately highlighting the syntax of any code blocks, and to do this with changeable themes. I couldn't find any simple out-of-the-box solutions online - most were (in my opinion) needlessly complex. Couldn't we just do it with CSS? What's the fewest number of colors we need to define for a good theme?

## Quickstart

Just serve `index.html` with a simple server such as `http.server`:

```bash
python3 -m http.server 9000
```

## Implementation

This site is built using:
- **marked** for markdown rendering
- **higlight.js** for syntax highlighting
- **lit-html** for html templating

`styles/themes.css` contains the default themes. At this point, themes are made by defining 10 CSS variables:

```css
.contrast {
  --black: #000000;
  --white: #FFFFFF;
  --pink: #FF1493;
  --red: #FF0000;
  --orange: #FFA500;
  --yellow: #FFFF00;
  --green: #00FF00;
  --cyan: #00FFFF;
  --blue: #00BFFF;
  --purple: #DA70D6;
}
```

The way this site works, elements are colored in CSS using a variable rather than set color (e.g. `var(--pink)`). The `<body>` of the HTML is styled with the class which sets the variable values to that of the currently selected theme, and these cascade through the rest of the page. To change themes, we just switch the class on the body tag to the chosen theme. This is the simplest way I could think of doing this.

There are going to be problems with this approach. Mainly, most color themes have multiple base colors (blacks, whites, and grays) for defining shadows, foregrounds, and backgrounds. This is great if you design a theme for a particular interface. But I, as a maker of a theme maker, do not want to make people choose the appropriate grays every time. I want to do this automatically - ideally with CSS calculations. [Hex color codes](https://en.wikipedia.org/wiki/Web_colors) are great and all, but they're not the best way to define colors that can be easily modified with CSS calculations. The HSL (hue/saturation/lightness) format is more appropriate for this, and more aligned with how humans understand colors. So, this is what I will be exploring with this app.


## todo

- [ ] How to use lit-html templating with marked, rather than string templates?
- [ ] Switch to HSL from hex
- [ ] add more default themes, e.g. monokai
- [ ] build-your-own theme by selecting 10 colors
- [ ] change code token color assignments for highlight.js

## misc

What's my favorite theme, you ask?

It's evolved over time, and it depends on the thing I am doing. I used to be all-in on solarized dark through college, until one day, out of nowhere, it was just *too blue*. I do have a lot of nostalgia attached to that theme - I can't look at a solarized dark interface without being immediately transported back to my college dorm room, working on my Olin.js project at 2am.

I don't want to use themegen to theme my entire technology experience with the same palette - on the contrary, I think different tasks are suited to different themes. Now, I easily prefer Dracula for writing code. High-contrast, colorful themes help me keep track of where I'm looking on a page full of code. Lower contrast themes such as Nord makes code blend together too much. However, I use a Nord theme for my computer interface (thanks KDE Plasma), because it keeps me from getting distracted by colorful contrasty icons.

Other things I use that I want to use themegen to theme:
- Obsidian (I've built a few Obsidian themes, want to make more)
- VSCode
- HomeAssistant Lovelace dashboard
- Browsers (firefox themes are unsatisfying)
- KDE Plasma / Gnome themes
- Nova Launcher (Android)
- Slack
- Overleaf (I don't think it is possible to customize the themes, they have presets. Might require a browser extension)
