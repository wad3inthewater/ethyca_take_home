### demo

https://wad3inthewater.github.io/ethyca_take_home/

### Assumptions made:

The major assumption I made was general functionality would be more important than trying to hit every single potential feature. With the limited amount of time, having an app that overall felt like it hit the goals of the problem was more important than feeling like I needed to get a version of everything mentioned.

### Trade-offs:

The first trade-off I made was using Vue vs React. While nothing I did here was particularly Vue specific in terms of patterns, I've more recently used Vue in my day to day so I felt like I could put something together slightly quicker. This of course could be ill received if showing proficiency with React would be weighed more heavily.

The next potentially ill received trade-off I made was using an off the shelf component library to fill in the gaps with some key components. Having custom components that feel decent would have taken time away from hitting the overall complete feeling of the app. I wanted to focus on the functionality and general UX rather than building custom components for the exercise.

Rather than creating a dedicated modal component, I used the same component from the grid layout to be mounted in the modal, with conditional render logic. Typically I think a modal specific component would be better for long term iteration and clarity, but I took this approach to save time.

### Features

The main thing I decided to do that was off script was use a modal to show "more" system information. There's certainly a love/hate relationship with modals in web development, but this felt like one of the reasonable places where a modal would achieve a smoother feeling UX over trying to hide/show information for a given system. The hide/show would particularly become tricky as more or less columns are shown and the need to account for different screen sizes comes into play. With a modal we can get a consistent user experience.

Another thing I decided to do that's not mentioned is add a basic test suite. While tests are usually a thorn in the side of most devs, there is a particular kind of satisfaction one receives from seeing green test results. The test I added is simplistic given anything more would have added more time than I'd like due to configurations. I felt like adding a test aligned with my general feelings of best practice and showing that "trust me guys" deploys are fragile and nothing boosts confidence like test coverage.

### Things to mention

Adding the arrows was something I actually spent some time looking into and testing a bit. Doing something fully manual felt way too time consuming, but then committing to a library that handled the arrows felt like a big commitment to docs and getting up to speed in a way that I wasn't sure would pay off.

### Feedback

I found the technical challenge to be enjoyable and a great way to simulate the kind of choices a dev has to make to complete a task. What I can especially appreciate about this exercise is that even if I don't get the role, I was able to learn something about myself and generally grow rather than the hit or miss feeling with a tricky on the spot interview problem. The thoughtfulness of the exercise feels aligned with the culture and mission of the company and I'm thankful for the opportunity to partake in a piece of that!

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
