# LearnFinnish
Game to help learning Finnish words.

You can clone it, edit or add new words you want to learn to a file in folder "js/words", add it to index.html and you can select and start learning these words.
Then simply run index.html (or open it from the internet, for instance, using github.io pages).
Best way to use this app is to open it in iOS Safari, export it to main screen and open it from there - it will work as a normal ios app then.

You can also add your own games:
1. Add new game field html into game_fields
2. Add new js script with your game logic into js/games folder.
3. Add reference to your new game field and game script into index.html (check examples in the end of index.html file)

This project does not use any frameworks and uses plain html+js.

Here is the web version (you can have your own if you fork this repo and use github.io to create a page for you):
https://olegfedorovdev.github.io/LearnFinnish/

todo:

DONE 1. add progress indicator to see how much in set left
DONE 2. when game ends - open main menu
DONE 3. make game field with less height
4. add new game: enter text. show english word, ask to enter Finnish one
5. add all new words from kappale 8+9
6. For verbs: enter verb in one of forms: minä... sinä... etc
