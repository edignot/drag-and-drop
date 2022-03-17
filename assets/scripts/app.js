const containers = document.querySelectorAll('ul')

containers.forEach((container) => {
  container.addEventListener('dragstart', (e) => {
    e.target.classList.add('drag')
  })

  container.addEventListener('dragend', (e) => {
    e.target.classList.remove('drag')
  })

  container.addEventListener('dragover', (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.drag')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.drag)')]

  return draggableElements.reduce(
    (closest, element) => {
      const box = element.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset, element }
      } else {
        return closest
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element
}
