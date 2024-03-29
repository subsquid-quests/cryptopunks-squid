w<p align="center">
<picture>
    <source srcset="https://uploads-ssl.webflow.com/63b5a9958fccedcf67d716ac/64662df3a5a568fd99e3600c_Squid_Pose_1_White-transparent-slim%201.png" media="(prefers-color-scheme: dark)">
    <img src="https://uploads-ssl.webflow.com/63b5a9958fccedcf67d716ac/64662df3a5a568fd99e3600c_Squid_Pose_1_White-transparent-slim%201.png" alt="Subsquid Logo">
</picture>
</p>

[![docs.rs](https://docs.rs/leptos/badge.svg)](https://docs.subsquid.io/)
[![Discord](https://img.shields.io/discord/1031524867910148188?color=%237289DA&label=discord)](https://discord.gg/subsquid)

[Website](https://subsquid.io) | [Docs](https://docs.subsquid.io/) | [Discord](https://discord.gg/subsquid)

[Subsquid Network Docs](https://docs.subsquid.io/subsquid-network/)

# Run a Cryptopunks squid

This is an updated version of the quest to run a squid migrated from the [Cryptopunks subgraph](https://thegraph.com/explorer/subgraphs/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8) by [yat1ma30](https://github.com/yat1ma30), one of the winners of the [migration quest](https://github.com/subsquid-quests/cryptopunks-subgraph-migration). You can find the original repository [here](https://github.com/yat1ma30/subsquid-cryptopunks-migration).

Note: you'll need to have at least 10 tSQD to complete this quest. Obtain them by doing other quests first.

### I. Install dependencies: Node.js, Docker, Git.

<details>
<summary>On Windows</summary>

1. Enable [Hyper-V](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v).
2. Install [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/).
3. Install NodeJS LTS using the [official installer](https://nodejs.org/en/download).
4. Install [Git for Windows](https://git-scm.com/download/win).

In all installs it is OK to leave all the options at their default values. You will need a terminal to complete this tutorial - [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) bash is the preferred option.

</details>
<details>
<summary>On Mac</summary>

1. Install [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/).
2. Install Git using the [installer](https://sourceforge.net/projects/git-osx-installer/) or by [other means](https://git-scm.com/download/mac).
3. Install NodeJS LTS using the [official installer](https://nodejs.org/en/download).

We recommend configuring NodeJS to install global packages to a folder owned by an unprivileged account. Create the folder by running
```bash
mkdir ~/global-node-packages
```
then configure NodeJS to use it
```bash
npm config set prefix ~/global-node-packages
```
Make sure that the folder `~/global-node-packages/bin` is in `PATH`. That allows running globally installed NodeJS executables from any terminal. Here is a one-liner that detects your shell and takes care of setting `PATH`:
```
CURSHELL=`ps -hp $$ | awk '{print $5}'`; case `basename $CURSHELL` in 'bash') DEST="$HOME/.bash_profile";; 'zsh') DEST="$HOME/.zshenv";; esac; echo 'export PATH="${HOME}/global-node-packages/bin:$PATH"' >> "$DEST"
```
Alternatively you can add the following line to `~/.zshenv` (if you are using zsh) or `~/.bash_profile` (if you are using bash) manually:
```
export PATH="${HOME}/global-node-packages/bin:$PATH"
```

Re-open the terminal to apply the changes.

</details>
<details>
<summary>On Linux</summary>

Install [NodeJS (v16 or newer)](https://nodejs.org/en/download/package-manager), Git and Docker using your distro's package manager.

We recommend configuring NodeJS to install global packages to a folder owned by an unprivileged account. Create the folder by running
```bash
mkdir ~/global-node-packages
```
then configure NodeJS to use it
```bash
npm config set prefix ~/global-node-packages
```
Make sure that any executables globally installed by NodeJS are in `PATH`. That allows running them from any terminal. Open the `~/.bashrc` file in a text editor and add the following line at the end:
```
export PATH="${HOME}/global-node-packages/bin:$PATH"
```
Re-open the terminal to apply the changes.

</details>

### II. Install Subsquid CLI

Open a terminal and run
```bash
npm install --global @subsquid/cli@latest
```
This adds the [`sqd` command](https://docs.subsquid.io/squid-cli/). Verify that the installation was successful by running
```bash
sqd --version
```
A healthy response should look similar to
```
@subsquid/cli/2.8.0 linux-x64 node-v20.5.1
```

### III. Run the squid

1. Open a terminal, navigate to any folder for which you have write permissions and run the following commands to retrieve the squid, enter its folder and install dependencies:
   ```bash
   sqd init cryptopunks-squid -t https://github.com/subsquid-quests/cryptopunks-squid
   ```
   ```bash
   cd cryptopunks-squid
   ```
   ```bash
   npm ci
   ```

> [!IMPORTANT]
> If you're on Windows, the terminal opens in `C:\Windows\system32` by default. Do not download your squid there, navigate someplace else.

2. Press "Get Key" button in the quest card to obtain the `cryptopunksPhaseTwo.key` key file. Save it to the `./query-gateway/keys` subfolder of the squid folder. The file will be used to identify your local query gateway when locking tSQD to allocate bandwidth and as it operates.

3. Get the peer ID of your future gateway by running:
   ```bash
   sqd get-peer-id
   ```

4. Register your future gateway using [this page](https://app.subsquid.io/profile/gateways/add?testnet).
   - Use the peer ID you obtained in the previous step.
   - Leave the "Publicly available" switch disabled.

5. Lock 10 tSQD by selecting your gateway on [this page](https://app.subsquid.io/profile/gateways?testnet), clicking "Get CU" and submitting the form. Once done, you will begin getting computation units (*CUs*) once every epoch (~15 minutes).

   The "Lock blocks duration" field lets you tune the length of time during which you'll be able to query the network, measured in blocks of Arbitrum Sepolia's L1 (that is, Ethereum Sepolia). The minumum is five hours, but you can opt to lock for longer if you intend to work on the quest over multiple days.

   | Time              | Blocks |
   |:-----------------:|:------:|
   | 5 hours (minimum) | 1500   |
   | 24 hours          | 7200   |
   | 72 hours          | 21600  |

   Be aware that you'll need to unlock your tokens manually after the end of this period. The tokens you get back will be used in subsequent quests.

   If the locking period expires before you finish your work, simply unlock your tokens, then lock them again.

6. Wait for about 15 minutes. This is the time it takes for Subsquid Network to enter a new epoch, at the beginning of which CUs will be allocated towards your gateway.

7. Start the query gateway with
   ```bash
   sqd up
   ```

   If you'd like to check if the locking was successful, you can inspect the logs of the query gateway container with `docker logs <query_gateway_container_name>`. After one-two minutes required for the node startup it should contain some lines like this one:
   ```
   [2024-01-31T14:55:06Z INFO  query_gateway::chain_updates] allocated CU: 48300 spent CU: 0
   ```

> [!TIP]
>   If you get an error message about `unknown shorthand flag: 'd' in -d`, that means that you're using an old version of `docker` that does not support the `compose` command yet. Update Docker or edit the `commands.json` file as follows:
>   ```diff
>            "up": {
>            "deps": ["check-key"],
>            "description": "Start a PG database",
>   -        "cmd": ["docker", "compose", "up", "-d"]
>   +        "cmd": ["docker-compose", "up", "-d"]
>          },
>          "down": {
>            "description": "Drop a PG database",
>   -        "cmd": ["docker", "compose", "down"]
>   +        "cmd": ["docker-compose", "down"]
>          },
>   ```

8. Build the squid code
   ```bash
   sqd build
   ```

9. Start your squid with
   ```bash
   sqd run .
   ```
   The command should output lines like these:
   ```
   [api] 23:33:48 WARN  sqd:graphql-server enabling dumb in-memory cache (size: 100mb, ttl: 1000ms, max-age: 1000ms)
   [api] 23:33:48 INFO  sqd:graphql-server listening on port 4350
   [processor] 23:33:49 INFO  sqd:processor processing blocks from 11000000
   [processor] 23:33:49 INFO  sqd:processor using archive data source
   [processor] 23:33:49 INFO  sqd:processor prometheus metrics are served at port 36935
   [processor] 23:33:52 INFO  sqd:processor 11005159 / 18377705, rate: 1756 blocks/sec, mapping: 352 blocks/sec, 311 items/sec, eta: 1h 10m
   [processor] 23:33:57 INFO  sqd:processor 11010199 / 18377705, rate: 1735 blocks/sec, mapping: 488 blocks/sec, 428 items/sec, eta: 1h 11m
   ```
   The squid should sync in about 12 hours.

> [!TIP]
> Do not worry if the squid fails: any progress it made is saved. Simply restart it if it happens.

When done, stop the squid processor with Ctrl-C, then stop and remove the auxiliary containers with
```bash
sqd down
```

10. After the locking period ends, go to the [gateways page](https://app.subsquid.io/profile/gateways/) and unlock your tSQD - you will need them for other quests.

# Quest Info

| Category         | Skill Level                          | Time required (minutes) | Max Participants | Reward                              | Status |
| ---------------- | ------------------------------------ | ----------------------- | ---------------- | ----------------------------------- | ------ |
| Squid Deployment | $\textcolor{green}{\textsf{Simple}}$ | ~90                     | -                | $\textcolor{red}{\textsf{40tSQD}}$  | open   |

# Acceptance critera

Sync this squid using the key from the quest card. The syncing progress is tracked by the amount of data the squid has retrieved from [Subsquid Network](https://docs.subsquid.io/subsquid-network).
