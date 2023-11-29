import 'server-only';
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js';

const ls = new LemonSqueezy(process.env.LEMON_API_KEY);

export default ls;
