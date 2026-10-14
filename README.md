# Team Detective Showdown — GitHub Pages + Firebase (HTML-only deployment)

This version is made of static HTML/CSS/JavaScript files. GitHub Pages serves the pages; Firebase Authentication and Realtime Database provide the live connection between the host and players. No Node.js server is used. GitHub Pages by itself cannot synchronize players between different devices, so the one-time Firebase setup below is required.

## The two links

After the files are published at your GitHub Pages URL:

- **HOST LINK:** `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`
- **PLAYER LINK:** `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/player.html`

The host opens the Host link and chooses **Create Mobile Room / Show QR**. The host page displays both links explicitly, a room-specific QR code, a six-digit room code, and the corresponding Player link. Give players the Player link or let them scan the QR. They enter the room code if it was not prefilled, type their own display name, and press Join. Names appear live on the host registration page. Do not use a fixed QR generated before the game; each new room gets a different room code. The Host link is only for the facilitator; players use the Player link.

During play, the host screen alone can read the answer-selection records. Players can submit/change their own answer while the question is open, and then see the correct answer and explanation when the host reveals it. The host tab must remain open for the session.

## A. Configure Firebase once

1. Open the Firebase Console: <https://console.firebase.google.com/> and create a project.
2. In **Project settings → General → Your apps**, add a **Web app** and copy its JavaScript config object.
3. In **Build → Authentication → Sign-in method**, enable **Anonymous** sign-in.
4. In **Build → Realtime Database**, create a database. Copy its exact `databaseURL` from Firebase (some projects use a regional `firebasedatabase.app` URL rather than the older `firebaseio.com` format).
5. Open `firebase-config.js` and replace the placeholder values with the Web app config. Do not paste a service-account key or private server credential; only use the Web app config.
6. In **Realtime Database → Rules**, replace the rules with the contents of `database.rules.json` and click **Publish**. Do not use open rules like `.read: true` or `.write: true`.
7. Keep `index.html`, `player.html`, and `firebase-config.js` together in the same published folder.

## B. Publish on GitHub Pages

1. Download and extract this ZIP.
2. Open the GitHub repository that serves your site. Identify its current Pages publishing source under **Settings → Pages**. Commonly it is the selected branch's root folder (`/`).
3. Copy these files into that exact published folder, replacing the old `index.html` (make a backup first if desired):
   - `index.html` — Host page and game
   - `player.html` — Player join / answer page
   - `firebase-config.js` — Your Firebase Web app config
   - `.nojekyll` — tells Pages not to apply Jekyll processing
   - `database.rules.json` — reference copy of the rules you already published in Firebase; it is not automatically applied by GitHub
4. Commit/push the files. Wait for the GitHub Pages deployment to finish, then open the HTTPS Host link.
5. Test by opening the Player link in a private/incognito window or on a phone. Create a mobile room in the host first; then join from the phone. The name should appear on the host page.

## C. Run a session

1. Host: open the Host link and click **Create Mobile Room / Show QR** while still on the registration screen.
2. Share the displayed QR or copy the displayed Player link. Players must join this room before you press Start Game.
3. Players: open `player.html`, enter the six-digit room code and a unique name (20 characters maximum), then Join. The host sees connected names appear automatically.
4. Host: when at least four players have joined (up to twenty), press **Start Game**. Keep this browser tab open.
5. Players pick A/B/C/D and press **Submit answer** on each question. The host receives the selected option privately. Lock/reveal as usual.

## Troubleshooting

- **“Mobile login is available in the hosted project” or no QR appears:** the old standalone HTML is still deployed. Replace the actual Pages-published `index.html` with the `index.html` from this ZIP, then wait for deployment and hard-refresh the page.
- **“Setup required: configure firebase-config.js”:** the placeholders have not been replaced, or the browser is still using a cached copy.
- **“Permission denied” / name never appears:** make sure Anonymous Authentication is enabled and `database.rules.json` has been copied to Realtime Database → Rules and published.
- **Player link 404:** ensure `player.html` is in the same Pages-published folder as `index.html`. Test the exact `/YOUR-REPOSITORY/player.html` path.
- **QR can’t connect:** QR opens a URL, it does not provide the realtime service by itself. The host must create the room first, and Firebase must be configured. Both devices need internet access.

## Question variety and privacy notes

The game has 45 questions per session (15 in each round) selected from a larger offline bank. The shared Firebase question history reduces question repetition between sessions until the bank is used. Firebase is required for phones to sync; this is not possible with HTML alone on separate devices. These rules provide host-only answer reads for casual game use, not a high-security examination system. Anyone who has the active Player URL and room code may attempt to join, and anonymous accounts can be created by clients, so do not use the app to collect sensitive personal data.
