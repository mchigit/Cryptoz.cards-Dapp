import Vue from 'vue'
import Router from 'vue-router'
import BodyContent from '@/components/BodyContent.vue'
import ShopContent from '@/components/ShopContent.vue'
import CryptContent from '@/components/CryptContent.vue'
import MarketContent from '@/components/MarketContent.vue'
import HelpContent from '@/components/HelpContent.vue'
import TokenContent from '@/components/TokenContent.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BodyContent',
      component: BodyContent,
      meta: {
          title: 'Cryptoz Cards - Where the dead live forever on the Blockchain',
          metaTags: [
                {
                    name: 'description',
                    content : 'A Universe of limited edition ERC-721 NFT crypto collectible zombie cards stored in your Ethereum blockchain wallet'
                },
                {
                    property: 'og:url',
                    content: 'https://cryptoz.cards/',
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:title',
                    content: 'Cryptoz Cards crypto collectibles on the Ethereum blockchain',
                },
                {
                    property: 'og:title',
                    content: 'Cryptoz Cards crypto collectibles on the Ethereum blockchain',
                }
          ]
      }
    },
    {
      path: '/shop',
      name: 'ShopContent',
      component: ShopContent
    },
    {
      path: '/crypt',
      name: 'CryptContent',
      component: CryptContent
    },
    {
      path: '/market',
      name: 'MarketContent',
      component: MarketContent
    },
    {
      path: '/help',
      name: 'HelpContent',
      component: HelpContent
    },
    {
      path: '/view/:token_id',
      name: 'TokenContent',
      component: TokenContent
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
