import 'server-only';
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js';

const ls = new LemonSqueezy(process.env.LEMON_API_KEY);

export default ls;

// uncommment if using stripe, remove otherwise
//import Stripe from 'stripe';

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//export default stripe;
