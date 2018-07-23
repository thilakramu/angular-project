var interval;
var codetmpl = "<code>%codeobj%</code><br><code>%codestr%</code>";

function randomToast(agentInfo) { //Map Toaster Alert
    var priority = 'success';
    var title = 'Calix';
    var message = agentInfo;
    $.toaster({
        priority: priority,
        //title: title,
        message: message
    });
}

function maketoast(evt) {   //Toaster Event code
    evt.preventDefault();

    var options = {
        priority: $('#toastPriority').val() || null,
        //title: $('#toastTitle').val() || null,
        message: $('#toastMessage').val() || 'A message is required'
    };

    if (options.priority === '<use default>') {
        options.priority = null;
    }

    var codeobj = [];
    var codestr = [];

    var labels = ['message', 'title', 'priority'];
    for (var i = 0, l = labels.length; i < l; i += 1) {
        if (options[labels[i]] !== null) {
            codeobj.push([labels[i], "'" + options[labels[i]] + "'"].join(' : '));
        }

        codestr.push((options[labels[i]] !== null) ? "'" + options[labels[i]] + "'" : 'null');
    }

    if (codestr[2] === 'null') {
        codestr.pop();
        if (codestr[1] === 'null') {
            codestr.pop();
        }
    }

    codeobj = "$.toaster({ " + codeobj.join(", ") + " });"
    codestr = "$.toaster(" + codestr.join(", ") + ");"

    $('#toastCode').html(codetmpl.replace('%codeobj%', codeobj).replace('%codestr%', codestr));
    $.toaster(options);
}