const choo = require('choo')
const html = require('choo/html')
const row = require('./elements/row.el')
const postPage = require('./pages/post.page')
const app = choo()

app.use(model)
app.route('/', frame)
app.route('/posts', postPage)
app.mount('body')

function frame (state, emit) {
  return html`
    <body style="width: 96ex; margin: 1em auto;">
      <nav>
        <span>futurelist</span>
      </nav>

      <hr>

      <table>
        <tbody>
          ${state.posts.map(post => row(post, emit))}
        </tbody>
      </table>
    </body>`
}

function model (state, emitter) {
  state.posts = [{
    id: '1',
    title: 'China and India are confronting climate change way faster than expected',
    url: 'https://www.undispatch.com/china-india-confronting-climate-change-way-faster-expected/'
  }]

  emitter.on('DOMContentLoaded', () => {

  })
}