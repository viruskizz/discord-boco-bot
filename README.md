<div>
    <h1 style="margin-bottom: 0px">Discord Boco Bot</h1>
    <p>Boco is nickname of Chocobo in final fantasy series. He deserve any perform for owner.</p>
    <img src="boco-bot-cover.png" alt="boco-bot-cover">
</div>

## Prerequisite

This bot is writen with nodejs and some global package.

- [Discord bot]
- [NodeJS] (version 14+)
- [PM2]
- [Nodemon]

## Get started
1. rename environment template file to `.env`
2. add your `token` and `prefix` bot

```
DISCORD_BOT_TOKEN=ABCDE123456
PREFIX=bc.
```

3. run bot

```
npm run start
```

4. run bot on production in background process
```
npm run start:prod
```

## How to invite my bot

Anyway, You can invite my bot to your own server without any additional configuration. just enter follow this url.

```
https://discord.com/api/oauth2/authorize?client_id=0000000000&permissions="boco bot need to enjoy your server"&scope=bot%20applications.commands
```

Contact me directly in discord: `Araiva#1851`

## Commands
There are 2 main features of this bot.

1. Player
2. Utility

Boco bot use prefix `bc.` to overlap command avoidance.
### Command pattern
```
bc.<command> <argument> <option>
```

### 1. Player Feature

Play Boco's music player. player support only single playing song.

- `bc.play` <youtube url>: เล่นเพลง Youtube
- `bc.pause` : หยุดเล่นเพลง
- `bc.resume` : เล่นเพลงต่อ
- `bc.stop` : หยุดการเล่นเพลง
- `bc.leave` : นำบอทออกจากห้อง

**Example:**
```
bc.play https://www.youtube.com/watch?v=kSXxLelW-hI
bc.stop
```

### 2. Utility Feature

### Meditation

Bocobot meditation mode. Boco will play a meditate song and sleep until the end of session with notify sound. 

**command**: `meditate`

**arguments**:
  - sound: youtube url
  - time: meditation duration with minute unit
  - notify: notify sound at the end of meditate

**Example:**
```
bc.meditate --sound=https://www.youtube.com/watch?v=vSXRQMcoofs&t --notify=https://www.youtube.com/watch?v=x3ph521e6RI --time=20
```

### Notify

_BETA TEST_

---

**Noted**: Just moved from `Gitlab`

_\~Just for fun and Hobbie\~_

<!-- Reference Link -->
[discord bot]: https://discord.com/developers/docs/getting-started
[NodeJS]: https://nodejs.org/en/download/package-manager/
[PM2]: https://pm2.keymetrics.io/
[Nodemon]: https://www.npmjs.com/package/nodemon