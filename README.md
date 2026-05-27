### 🚀 Quick Start (FOR START)

#### Require fnm

Ensure `fnm` (Fast Node Manager) is installed on your system. Follow the official installation guide:

👉 https://github.com/Schniz/fnm#installation

#### Setup Environment (Node.js + Corepack)

Navigate to the project root directory. `fnm` will automatically detect the required Node.js version from the `.nvmrc`
file.

Install the version and **make sure to enable Corepack**. Since our project relies on `pnpm` and `fnm` does not manage
package managers natively, Corepack is strictly required to automatically fetch the correct `pnpm` version:

```bash
fnm install
corepack enable
```

Next, configure your shell to automatically switch Node.js versions when you change directories, and apply the changes:

```bash
echo 'eval "$(fnm env --use-on-cd --shell bash --version-file-strategy=recursive)"' >> ~/.bashrc
source ~/.bashrc
```

#### Install Dependencies

Run the package installation. Thanks to Corepack enabled in Step 2, the system will seamlessly intercept the command and
bootstrap the correct `pnpm` version:

```bash
pnpm install
```

---

### 🛠️ Mandatory IDE Settings & WSL Environment Fixes

If you are developing inside **WSL** using **IntelliJ IDEA / WebStorm**, Git hooks (Husky) will fail to locate `pnpm` or
`node` when you commit via the IDE GUI because the IDE runs Git in an isolated environment.

To fix this, you **must** configure the following environment wrappers and IDE settings:

#### Prepare Bin Directory

Before creating wrappers, make sure your local bin directory exists in your home folder:

```bash
mkdir -p ~/bin
```

#### Git Setup (Wrapper + IDE Configuration)

Create a Git wrapper to inject the `fnm` environment when the IDE GUI triggers Git actions.

### Create Git Wrapper:

```bash
cat << 'EOF' > ~/bin/git-wrapper
#!/bin/sh
eval "$(~/.local/share/fnm/fnm env --use-on-cd --shell bash)"
exec /usr/bin/git "$@"
EOF
chmod +x ~/bin/git-wrapper
```

### Configure IDE:

Open settings (`Ctrl + Alt + S`), go to `Version Control` → `Git`, and set **Path to Git executable** to your wrapper inside WSL:
`\\wsl.localhost\~\bin\git-wrapper` _(or click `...` and browse to `~/bin/git-wrapper` within the WSL file system)_.

#### Node.js Setup (Wrapper + IDE Configuration)

Create a Node wrapper so that IDE background tasks and Husky hooks run within the proper context.

### Create Node Wrapper:

```bash
cat << 'EOF' > ~/bin/node
#!/usr/bin/env sh
exec ~/.local/share/fnm/fnm exec node "$@"
EOF
chmod +x ~/bin/node
```

### Configure IDE:

Go to `Languages & Frameworks` → `Node.js`. Ensure **Node interpreter** points to your WSL Node path (managed by `fnm`).

#### pnpm Setup (Wrapper + IDE Configuration)

Create a pnpm wrapper to allow smooth package management operations inside the IDE.

### Create pnpm Wrapper:

```bash
cat << 'EOF' > ~/bin/pnpm
#!/usr/bin/env sh
exec ~/.local/share/fnm/fnm exec pnpm "$@"
EOF
chmod +x ~/bin/pnpm
```

### Configure IDE:

Go to `Languages & Frameworks` → `Node.js`. Ensure **Package manager** points to your `pnpm-wrapper` path.
