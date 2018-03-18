# Dispatch Web Wallet 

## Prerequisites
- Node `brew install node` 
- Angular CLI (optional)  `npm install -g @angular/cli`

# ![](https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_directions_run_black_24px.svg) Setup and Run
- `git clone https://github.com/dispatchlabs/web-wallet.git`<br>
- `cd web-wallet`<br>
- `npm i`<br>
- `ng serve -e=dev` or `ng serve -e=dispatch`<br>
- Open in browser `http://localhost:4200/`

## Node IP 
To change the node IPs to connect to modify delegateIps in the appropriate ./src/environments/ file. 

~~~javascript
export const environment = {
    name: 'dev',
    production: false,
    delegateIps: ['35.199.173.199', '35.227.16.102', '35.230.76.164', '35.230.101.49'],
    privateKey: '9dc7a0f09dba1ae2fec78c5238a0917208bd6012e335eda0f6bef87bb7a15a30',
    address: '7777f2b40aacbef5a5127f65418dc5f951280833',
    
~~~



## Build
Run `ng build -e=dev` or `ng build -e=dispatch`to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
