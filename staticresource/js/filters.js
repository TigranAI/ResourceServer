let solvedSelector = $('#solvedSelector')
let searchInput = $('#search')

solvedSelector.on('change', apply)
searchInput.on('keyup', apply)

function apply(){
    let selector = solvedSelector.val()
    let search = new RegExp(searchInput.val(), 'i')
    $('.task-box').each(function() {
        let el = $(this)
        let title = el.children('h5').text()
        if (!search.test(title)) {
            el.addClass('visually-hidden')
            return
        }
        if (selector === 'all' || el.hasClass(selector)) {
            el.removeClass('visually-hidden')
            return
        }
        el.addClass('visually-hidden')
    })
}