import 'server-only';
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js';

const ls = new LemonSqueezy(process.env.PAYMENT_SECRET_KEY);

export default ls;

// uncommment if using stripe, remove otherwise
//import Stripe from 'stripe';

//const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);

//export default stripe;
