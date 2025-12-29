# Setting Up the Server for Deployment

To deploy the application, you need to have

- Node.js version 20.x or later installed on your server
- Nginx installed and configured as a reverse proxy
- Systemctl service file for managing the application process
- SSL certificate for secure HTTPS connections (use certbot for free SSL certificates)

## Node.js Installation

If you use NVM (Node Version Manager), you can install Node.js 20.x with the following commands:

```bash
nvm install 20
nvm use 20
```

For the deploy script to work correctly, you need to add the following line to your `.profile`, otherwise the deploy script shell won't have access to NPM binaries:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh
```

## Nginx Configuration

Create an Nginx configuration file in `/etc/nginx/sites-available/your-domain.com`. Then create a symlink to it in `/etc/nginx/sites-enabled/`:

```bash
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
```

## Systemctl Service File

Create a systemctl service file at `/etc/systemd/system/dailyhub.service` with the following content:

```ini
[Unit]
Description=DailyHub Service
After=network.target
[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/your-repository
ExecStart=/home/your-username/.nvm/versions/node/v20.x.x/bin/node /home/your-username/your-repository/dist/server.js
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

Replace `your-username` and `your-repository` with your actual username and repository name. Adjust the Node.js path if necessary.

After creating the service file, reload the systemd daemon and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl start dailyhub
sudo systemctl enable dailyhub
```

## SSL Certificate
To secure your application with HTTPS, you can use Certbot to obtain a free SSL certificate from Let's Encrypt. Install Certbot and run the following command:

```bash
sudo certbot --nginx -d your-domain.com
```
