var Modal = (function() {

    var id = 'modalGeneric3';

    var _header = function() {
        return _close() + _title();
    };

    var _close = function() {
        return '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>';
    };

    var _title = function() {
        return '<h4 class="modal-title" id="' + id + 'Label"></h4>';
    };

    var _footer = function() {
        return '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    };

    var _create = function() {

        if ($('#'+id).length > 0) {
            return;
        }

        var div = '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="' + id + 'Label">' +
            '  <div class="modal-dialog" role="document">' +
            '    <div class="modal-content">' +
            '      <div class="modal-header" id="' + id + 'Header">' +
            '      </div>' +
            '      <div class="modal-body" id="' + id + 'BodyWrap">' +
            '      <div class="alert alert-danger" role="alert" style="padding-bottom: 10px;display:none;" id="' + id + 'Errors">' +
            '      </div>' +
            '      <div id="' + id + 'Body">' +
            '      </div>' +
            '      </div>' +
            '      <div class="modal-footer" id="' + id + 'Footer">' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        $("body").append(div);
    };

    var _actionButtons = function(actions) {

        if (jQuery.type(actions) !== 'array') {
            return;
        }

        $(actions).each(function(i, btn ) {

            if (jQuery.type(btn) !== 'object' || !btn.title) {
                return;
            }

            var f = $('#' + id + 'Footer');

            var b = $('<button type="button" class="btn ' +
                (btn.cls ? btn.cls : '')
                + '">' +
                btn.title
                + '</button>');

            if (btn.handler && jQuery.type(btn.handler) === 'function') {
                $(b).click(btn.handler);
            }

            f.append(b);
        });
    };

    return {

        loading: function(body, title) {
            title = title || 'Loading....';
            body = body || '<center><div title="loading ..." class="loading-div"></div></center>';
            
            this.show(title, body, {
                close: false,
                closeBtn: false,
                header: true,
                body: true,
                footer: false,
                backdrop: 'static',
                keyboard: false
            });
        },

        show: function(title, body, options) {
            options = options || {};

            options = $.extend({}, {
                close: true,
                closeBtn: true,
                header: true,
                body: true,
                footer: true,
                backdrop: true,
                keyboard: true,
                onFocus: $.noop,
                actions: []  // [{title: 'Save', handler: function() {}, cls: 'btn-primary'}]
            }, options);

            _create();

            var header = $('#' + id + 'Header');
            header.html('');
            if (options.header) {
                if (options.close) {
                    header.append(_header());
                } else {
                    header.append(_title());
                }

                $('#' + id + 'Label').html(title);

                header.show();
            } else {
                header.hide();
            }

            var b = $('#' + id + 'Body');
            b.html('');
            if (options.body) {
                b.append(body);

                b.show();
            } else {
                b.hide();
            }

            var f = $('#' + id + 'Footer');
            f.html('');
            if (options.footer) {
                if (options.closeBtn) {
                    f.append(_footer());
                }

                _actionButtons(options.actions);

                f.show();
            } else {
                f.hide();
            }
            
            var err = $('#' + id + 'Errors');
            if (err.length > 0) {
                err.hide();
            }

            var elt = $('#'+id);
            
            var modelOpts = {
                show: true
            };
            if (typeof options.backdrop != "undefined") {
                modelOpts.backdrop = options.backdrop;
            }
            if (typeof options.keyboard != "undefined") {
                modelOpts.keyboard = options.keyboard;
            }
            elt.modal(modelOpts);

            if (options.onFocus) {
                elt.on('shown.bs.modal', function (e) {
                    options.onFocus();
                })
            }
        },

        close: function() {
            var elt = $('#'+id);
            if (elt.length == 0) {
                return;
            }
            
            /*
            elt.modal({
                backdrop: true,
                keyboard: true
            });
            */

            elt.modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        },
        
        error: function(msg) {
            var elt = $('#'+id + 'Errors');
            if (elt.length == 0) {
                return;
            }

            elt.html(msg);
            elt.show();
        },

        _t: null
    };

}());