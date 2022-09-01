function certikRender() {
  var pid = 'vinci-protocol'
  fetchData()
    .then(function (data) {
      if (!data) {
        return { template: null, data: null }
      }

      var template = null

      if (localStorage) {
        var cachedVersion = localStorage.getItem('certik.emblem.version')
        var cachedPid = localStorage.getItem('certik.emblem.pid')

        if (cachedVersion === data.version && cachedPid === 'vinci-protocol') {
          template = localStorage.getItem('certik.emblem.template')
        }
      }

      if (!template) {
        return fetchTemplate().then(function (tpl) {
          if (tpl && localStorage && !window.location.host.startsWith('localhost')) {
            localStorage.setItem('certik.emblem.template', tpl)
            localStorage.setItem('certik.emblem.version', data.version)
            localStorage.setItem('certik.emblem.pid', 'vinci-protocol')
          }

          return { template: tpl, data: data }
        })
      }

      return { template: template, data: data }
    })
    .then(function (result) {
      var projectBlock = document.querySelector("[data-id='a23f4b88']")

      if (result.template && result.data) {
        var viewportWidth = projectBlock.parentNode.getBoundingClientRect().width
        var viewportHeight = projectBlock.parentNode.getBoundingClientRect().height
        var scale = viewportWidth / result.data.emblemWidth
        var scaledHeight = result.data.emblemHeight * scale

        // style parent node
        if (scaledHeight > viewportHeight) {
          projectBlock.parentNode.style.height = scaledHeight + 'px'
        }
        if (!['relative', 'absolute'].includes(projectBlock.parentNode.style.position)) {
          projectBlock.parentNode.style.position = 'relative'
        }
        if (!projectBlock.parentNode.style.zIndex) {
          projectBlock.parentNode.style.zIndex = 10
        }

        var template = ejs.render(result.template, result.data)

        if (projectBlock.attachShadow) {
          // use shadow dom when possible to isolate context
          var div = document.createElement('div')
          div.classList.add('certik-emblem')
          div.innerHTML = template
          var shadow = projectBlock.attachShadow({ mode: 'open' })
          shadow.appendChild(div)
          appendScriptNodes(div, document.head)
          shadow.querySelector('.ctk-view-port').style.transform = 'scale(' + scale + ')'
          shadow.querySelector('.ctk-view-port').style.transformOrigin = 'top left'
        } else {
          // also works for browsers doesn't support shadow dom
          projectBlock.innerHTML = template

          appendScriptNodes(projectBlock, document.head)

          document.querySelector('.ctk-view-port').style.transform = 'scale(' + scale + ')'
          document.querySelector('.ctk-view-port').style.transformOrigin = 'top left'
        }
      }

      projectBlock.style.display = 'block'
    })
    .catch(function (err) {
      if (err.message !== 'invalid pid') {
        console.log('emblem error', err)

        // still shows the default text

        var projectBlock = document.querySelector("[data-id='a23f4b88']")

        projectBlock.style.display = 'block'
      }
    })
}

module.exports = {
  certikRender,
}
