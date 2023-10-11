# Application for learning words

<p>Application for learning words on desktop in format question-answer, that
can use text or images. User can create private or public sets of words,
and learn yours or public sets another users.
</p>
<p>BLL based on RTKQuery</p>
<p>This app is the second version of app <a href="https://github.com/ArtemHard/cards_learn/tree/main/app">cards_learn<a/></p>

#### [Demonstration](https://cards-ecru-three.vercel.app/)

<font size="2"><em>if you <b>don't want to "sign in"</b> you can enter with test acc info will be on "in sign in" page</em></font>

#### [UI library](https://cards-git-storybook-deploy-kabaktema1-gmailcom.vercel.app/)

_note_: **deck** = cards kit

### Possibilities of app:

<details>
  <summary>Open Here</summary>
  
  
> - Authorization
> - Registration
> - Recovering Password
> - Searching cards and decks by params (name, updated, question and etc.)
> - CRUD operation:
>   > - User can create, delete, update deck
>   > - User can create, delete, update card
>   > - User can learn yours or public cards
>   > - creating, updating support images
>   > - set status of card for change frequency repeat
>   > - Change personal info
> - Have validation on all forms
</details>

### Difference:

<details>
  <summary>Open here</summary>

> - BLL based on RTKQuery
> - Have polymorh components
> - Used SCSS, all components was styled from zero-style
> - Different style
> - another file structure
> - Different backend server

</details>

## Main technology

<details>
  <summary>Open here</summary>

> - React (based on Vite)
> - Vitest (testing framework)
> - Redux Toolkit, RTKQuery
> - Storybook
> - react-hook-form
> - zod
> - Radix UI
> - pnpm package manager

</details>

#### For start app

Open terminal:

1. git clone https://github.com/ArtemHard/cardsSecond.git
2. pnpm i
3. pnpm run dev
