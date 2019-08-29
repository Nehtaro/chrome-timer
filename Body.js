class Body {
  constructor($el) {
    this.node = $('<div id="body"></div>');
    $el.append(this.node);
    this.node.css({ top: $("#head").position().top, left: $("#head").position().left });
  }
}
