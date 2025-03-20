const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    /* 
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    */
    config: () => ipcRenderer.invoke('config'),
    files: () => ipcRenderer.invoke('files'),
    bgpath: () => ipcRenderer.invoke('bgpath'),
    // we can also expose variables, not just functions
  })