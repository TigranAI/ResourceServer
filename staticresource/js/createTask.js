let step = 0

$('#next').click(function () {
    if (step >= 3) return
    $(`#page${step}`).addClass('jq-hide')
    if (step === 2) hideEditor()
    step++;
    $(`#page${step}`).removeClass('jq-hide')
    if (step === 2) showEditor()
    if (step === 3) showResults()
})
$('#prev').on('click', function () {
    if (step <= 0) return
    $(`#page${step}`).addClass('jq-hide')
    if (step === 2) hideEditor()
    step--;
    $(`#page${step}`).removeClass('jq-hide')
    if (step === 2) showEditor()
})

function hideEditor() {
    $('#container').addClass('jq-hide')
    window.editorInstance.layout()
}

function showEditor() {
    $('#container').removeClass('jq-hide')
    window.editorInstance.layout()
}

let description = $('#taskContent')
let preview = $('#preview')

description.bind('input propertychange', function () {
    preview.html(description.val())
})

let testList = []

$('#addTest').click(function () {
    let val = $('#test').val().trim()
    if (val === '' || testList.includes(val)) return
    testList.push(val)
    renderTests()
})

$('#clearInput').click(function () {
    $('#test').val('')
})

function renderTests() {
    $('#testList').html(testList.map(getTestItem).join(''))
}

function getTestItem(value, index, array) {
    return `
<li class="list-group-item bg-dark text-light p-0">
    <div class="border border-light position-relative rounded list-container">
        <button type="button" class="btn-close btn-close-white position-absolute" onclick="deleteTest(${index})"
                style="top: 0.2rem; right: 0.2rem" aria-label="Close"></button>
        <h6>Тест №${index + 1}</h6>
        <p class="m-0">${value.replaceAll('\n', '<br>')}</p>
    </div>
</li>
`
}

function deleteTest(index) {
    testList.splice(index, 1)
    renderTests()
}

let checkTests = $('#checkTests')
let checkTestsSpinner = $('#checkTestsSpinner')
let resultTestList = $('#resultTestList')
let taskSolved = false
let outputData = null

checkTests.click(function () {
    setLoading()
    $.ajax({
        type: 'POST',
        url: '/editor/new/test',
        data: JSON.stringify(new ProblemData()),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: (data, textStatus, jqXHR) => {
            removeLoading()
            taskSolved = true
            outputData = data
            resultTestList.html(getResults(data))
        },
        error: (jqXHR, textStatus, error) => {
            removeLoading()
            taskSolved = false
            outputData = null
            resultTestList.html(getError(jqXHR.responseText))
        }
    })
})

function setLoading() {
    checkTests.prop('disabled', true)
    checkTestsSpinner.removeClass('visually-hidden')
}

function removeLoading() {
    checkTests.prop('disabled', false)
    checkTestsSpinner.addClass('visually-hidden')
}

function ProblemData() {
    this.description = description.val()
    this.language = $('#langSelector').val()
    this.code = window.editorInstance.getValue()
    this.tests = testList
}

function getResults(data) {
    return data.map((out, i) => testBlock(i, testList[i], out)).join('')
}

function getError(error) {
    return `
<li class="list-group-item bg-dark text-danger p-0 border-none">${error}</li>
`
}

function testBlock(i, inp, out) {
    return `
<li class="list-group-item bg-dark text-light p-0">
    <div class="border border-light position-relative rounded list-container task-description">
        <h6>Тест №${i + 1}</h6>
        <p class="m-0">Входные данные:</p>
        <code class="m-0">${inp.replaceAll('\n', '<br>')}</code>
        <p class="m-0">Выходные данные:</p>
        <code class="m-0">${out.replaceAll('\n', '<br>')}</code>
    </div>
</li>
`
}

let checkList = $('#checkList')
let publishTests = $('#publishTests')

function showResults() {
    checkList.html(
        hasDescription() +
        hasTests() +
        hasSolution() +
        warningItem('Выходные результаты соответствуют ожиданиям')
    )
    if (outputData != null)
        publishTests.html(getResults(outputData))
}

function completeItem(text) {
    return `
<li class="list-group-item list-group-item-success">
    <input class="form-check-input me-1 shadow-none" type="checkbox" onclick="return false;" checked>
    ${text}
</li>`
}

function incompleteItem(text) {
    return `
<li class="list-group-item list-group-item-danger">
    <input class="form-check-input me-1 shadow-none" type="checkbox" onclick="return false;">
    ${text}
</li>`
}

function warningItem(text) {
    return `
<li class="list-group-item list-group-item-warning">
    <input class="form-check-input me-1 shadow-none" type="checkbox">
    ${text} (отметить самостоятельно)
</li>`
}

function hasDescription() {
    let length = description.val().trim().length
    if (length > 60) return completeItem("Условие задачи сформулировано")
    else if (length > 0) return warningItem("Условие задачи сформулировано недостаточно подробно")
    return incompleteItem("Условие задачи не сформулировано")
}

function hasTests() {
    if (testList.length >= 3) return completeItem(`Количество тестовых данных ${testList.length}/3`)
    return incompleteItem(`Количество тестовых данных ${testList.length}/3`)
}

function hasSolution() {
    if (taskSolved) return completeItem(`Задача решена на языке ${getLang()}`)
    return incompleteItem("Задача не решена ни на одном из языков")
}

function getLang() {
    let lang = $('#langSelector').val()
    switch (lang) {
        case 'cpp':
            return 'C++'
        case 'java':
            return 'Java'
        case 'csharp':
            return 'C#'
        default:
            return lang
    }
}

$('#publish').click(function () {
    if (description.val().trim().length === 0)
        alert("Сформулируйте условие задачи!")
    else if (testList.length < 3)
        alert("Количество тестов должно быть от 3-х и более!")
    else if (!taskSolved)
        alert("Перед публикацией необходимо самостоятельно решить задачу!")
    else if (checkList.children().length > $('.form-check-input:checked').length)
        alert("Не все требования к задаче соблюдены!")
    else {
        $.ajax({
            type: 'POST',
            url: '/editor/new/test',
            data: JSON.stringify(new ProblemData()),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: (data, textStatus, jqXHR) => {
                removeLoading()
                taskSolved = true
                outputData = data
                resultTestList.html(getResults(data))
            },
            error: (jqXHR, textStatus, error) => {
                removeLoading()
                taskSolved = false
                outputData = null
                resultTestList.html(getError(jqXHR.responseText))
            }
        })
    }
})