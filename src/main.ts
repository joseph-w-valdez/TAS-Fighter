import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, '..', 'index.html'));

  // Enable hot reloading
  if (process.env.NODE_ENV === 'development') {
    win.webContents.on('did-fail-load', () => {
      win.loadFile(path.join(__dirname, '..', 'index.html'));
    });
  }
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});