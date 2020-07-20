require('dotenv').config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const { FTP_HOST, FTP_USER, FTP_PORT, FTP_PASSWORD, FTP_REMOTE_PATH } = process.env;

var config = {
	user: FTP_USER,
	password: FTP_PASSWORD,
	host: FTP_HOST,
	port: FTP_PORT || 21,
	localRoot: __dirname + '/../dist',
	remoteRoot: FTP_REMOTE_PATH,
	include: ["*"],
	deleteRemote: false,
}

ftpDeploy
	.deploy(config)
	.then(res => console.log("finished:", res))
	.catch(err => console.log(err));
