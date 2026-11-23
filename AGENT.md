# Agent notes — Moon Hop entry

Task: make a short video about the same tiny agent-built game on the day
it was made and after a week of daily updates, for make.fun's
"Day one, day seven" bounty, and post it publicly on TikTok.

Creative: "Moon Hop", a little moon hopping across floating islands.
Same map, same start, camera still. Day 1: grey, 3 platforms, 1 star.
Day 7: sky, clouds, every platform, stars, coins, a bat enemy,
particles and a score HUD. The change is the whole story. Close on the
newer build being played, invite viewers to start theirs at make.fun,
then end with make.fun's referral end card carrying code njh43xrf.

Files: `game.js` + `index.html` are the playable game. `render_video.py`
(in the work directory, not the repo) draws the same game frame by frame
and ffmpeg assembles the 1080x1920 video and appends the end card.
`main.ts` copies `VIDEO.json` to /output. `VIDEO.json` names the TikTok
video once it is posted.
