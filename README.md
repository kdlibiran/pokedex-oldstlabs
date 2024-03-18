# Pokedex

This is for the technical assessment of Old St.Labs internship program.

## Implementation:
* Created using Next.js with Tailwind CSS and Shadcn.
* Used Poke API to fetch the details of the pokemons.
* Used https://assets.pokemon.com/assets/cms2/img/pokedex/{id}.png for fetching the Photos.
* Only 10 pokemons are displayed at a time and every click of a button it shows 10 more.
* Must be able to search and sort using id and name.
* Clicking the pokemon card must display the full details.
* Implemented the Search, Sort and Pagination using useState and useEffect.

## File Guide:
* app/(home)/page.js - Main page and this is where fetching data in server side happens.
* app/pokemon/[id]/page.js - Gets the id of the pokemon and displays the details based on id.
* components/pokedexView.jsx - The component where all the pokemons are displayed.

To run the development server:

```bash
npm install
npm run dev
```

