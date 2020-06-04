import { Drizzle } from '@drizzle/store';
import Contribute from '../../contract/Contribute.json';
import ViewContribute from '../../contract/ViewContribute.json';
import ERC20 from '../../contract/ERC20.json';

const drizzleOptions = {
	contracts: [
		Contribute,
		ViewContribute,
		ERC20,
	],
	events: {
		Contribute: ['TokensBought', 'TokensSold', 'MintAndBurn'],
	},
	networkWhitelist: [42],
};

const drizzle = new Drizzle(drizzleOptions);

export default drizzle;
