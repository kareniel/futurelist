const html = require('choo/html')

module.exports = function (state, emit) {
  return html`
    <div>
      <tr>
        <td>1.</td>
        <td>
          <a href="#">▲</a>
        </td>
        <td>
          <a href=${state.url}>${state.title}</a>
          <small>
            (${getDomain(state.url)})
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
          <a href=/posts?id=${state.id}>23 comments</a>
          |
          <a href="#">save to pocket</a>
        </td>
      </tr>
    </div>`
}

function getDomain (url) {
  const host = new URL(url).host
  return host.slice(0, 3) === 'www'
    ? host.slice(4)
    : host
}