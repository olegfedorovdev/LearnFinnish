# LearnFinnish
Game to help learning Finnish words.

You can clone it, edit or add new words you want to learn to a file in folder "js/words", add it to index.html and you can select and start learning these words.
Note: when adding new words, add also image for this word into img/ folder. Image should be .jpg and have name equal to Finnish word.
Image can be also with different name or somewhere else in the internet - you need to define "img" value in your word object then pointing to it.
You can also download .mp3 file for your word - it's used if Finnish voice is not installed on a system (for instance, in chrome browser).

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

5. add all new words from kappale 8+9
6. For verbs: enter verb in one of forms: minä... sinä... etc
