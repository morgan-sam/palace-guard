# 𝕻𝖆𝖑𝖆𝖈𝖊 𝕲𝖚𝖆𝖗𝖉

A small text based roleplay game made using OpenAi's GPT-3.5. 

You are a courier who has to deliver a letter to the king and you must convince a guard to let you enter the castle.

Play here: https://palace-guard.web.app/

![palaceguard1](https://github.com/morgan-sam/palace-guard/assets/57941781/0ec33736-b66c-40e3-8be6-8101a2f28799)

# 𝔄𝔟𝔬𝔲𝔱

The game is heavily inspired by the 1bit art style of WORLD OF HORROR, The Return of the Obra Dinn, etc.

Most of the assets were generated on OpenArt and similar generators.
The low res style was achieved by scaling the image down, dithering it, then resizing it back to full size.
This allows the pixelation to be visible to gave it the style of an early mac game. 

I used the following ImageMagick command to achieve this (scale values were changed as per image):

`convert "$file" -colorspace gray -scale 50% -ordered-dither o8x8 -scale 200%`
