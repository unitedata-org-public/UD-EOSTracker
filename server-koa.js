const path = require('path')

const Koa = require('koa')
const staticServer = require('koa-static')
const Router = require('koa-router')
const nunjucks = require('koa-nunjucks-2')

function remapping(source = '/new', target = '') {
    var regExp

    if (Array.isArray(source)) {
      source = source.join('|')
    }

    if (source instanceof RegExp) {
      regExp = source
    } else {
      regExp = new RegExp(source)
    }

    return async (ctx, next) => {
      const url = ctx.req.url
      let rped = url.replace(regExp, target)
      if (!rped) {
        rped = ''
      }
      if (rped.substr(0, 1) !== '/') {
        rped = '/' + rped.slice(0)
      }
      ctx.req.url = rped

      await next()
    }
}

function checkHeart() {
    return async (ctx, next) => {
      if (ctx.path === '/check_backend_active.html') {
        ctx.body = 'Success!';
      } else {
        await next();
      }
    };
};

const app = new Koa()
const router = new Router()
app.use(remapping('/tracker'))
app.use(checkHeart())
app.use(staticServer(path.join(__dirname, 'dist')))
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'dist'),
    nunjucksConfig: {
      noCache: false,
      autoescape: true,
    },
}))

router.get('*', async ctx => {
    await ctx.render('index');
});

app.listen(8080, () => {
  console.log('8080');
})
