# 𝕻𝖆𝖑𝖆𝖈𝖊 𝕲𝖚𝖆𝖗𝖉

A small text based roleplay game made using OpenAi's GPT-3.5. 

You are a courier who has to deliver a letter to the king and you must convince a guard to let you enter the castle.

Play here: https://palace-guard.web.app/

![palaceguard1](https://github.com/morgan-sam/palace-guard/assets/57941781/0ec33736-b66c-40e3-8be6-8101a2f28799)

# 𝔄𝔟𝔬𝔲𝔱

The app basically acts as a UI wrapper to GPT. An original prompt (stored in `data.js`) is sent to the API to start the roleplay.
After that the user input is sent and it returns a JSON response in the following format:

`{ message, speaker, disposition, state}`

This means all game logic is determined by GPT, which can lead to some unexpected results. GPT decides how the guard replies, what his current disposition level is, and what the current game state is (playing/lose/win).

All assets are pre-made/generated, only the text is generated.

The disposition level determines which guard emotion image to use, the emotion image level ranging from 1-5. 

# 𝔄𝔯𝔱 𝔖𝔱𝔶𝔩𝔢

The game art style is heavily inspired by the 1bit style of WORLD OF HORROR, The Return of the Obra Dinn, etc.

Most of the assets were generated on OpenArt and similar generators.
The low res style was achieved by scaling the image down, dithering it, then resizing it back to full size.
This allows the pixelation to be visible to give it the style of an early mac game. 

The following ImageMagick command was used to achieve this (scale values were changed as per image):

`convert "$file" -colorspace gray -scale 50% -ordered-dither o8x8 -scale 200%`

# 𝔗𝔢𝔠𝔥 𝔖𝔱𝔞𝔠𝔨

The game was built with React, OpenAI & Firebase Functions. Firebase was also used for hosting.

# 𝔉𝔬𝔫𝔱𝔰

Alkhemikal: https://fontenddev.com/fonts/alkhemikal/

Heritage: https://schrier.xyz/Heritage
