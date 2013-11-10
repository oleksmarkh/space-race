# space-race

canvas 'n' node multiplayer game

## to run locally

1. clone repo: `git clone git@github.com:markhovskiy/space-race.git && cd space-race`
2. install npm deps: `npm install`
3. install bower deps: `cd public/js && bower install && cd ../../`
4. run the back-end: `node app`
5. open app in browser: `localhost:3000`

## keys

- move: arrows
- turn on a shield (only while moving): space
- fire: ctrl (hold to charge a gun and free to fire)

details in code: [controllable.js](/public/js/src/behaviors/controllable.js)
