const html = require('choo/html')

module.exports = function (state, emit) {
  const postId = window.location.search.slice(1).split('&').map(tu => tu.split('=')).find(it => it[0]=== 'id')[1]
  const post = state.posts.find(post => post.id === postId)

  if (!post) {
    return html`<body></body>`
  }

  return html`
    <body>
      <table>
        <tr>
          <td>1.</td>
          <td>
            <a href="#">▲</a>
          </td>
          <td>
            <a href=${post.url}>${post.title}</a>
            <small>
              (${getDomain(post.url)})
            </small>
          </td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td>
            <span>300 points</span>
            by 
            <a>kareniel</a>
            <span>3 hours ago</span>
            |
            <a href="#">23 comments</a>
            |
            <a href="#">save to pocket</a>
          </td>
        </tr>
      </table>
    </body>`
}

function getDomain (url) {
  const host = new URL(url).host
  return host.slice(0, 3) === 'www'
    ? host.slice(4)
    : host
}