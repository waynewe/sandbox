// Generated by CoffeeScript 1.6.3
(function() {
  var Cursor, extension;

  Cursor = (function() {
    function Cursor(x, y, draw) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.draw = draw;
    }

    Cursor.prototype.lineTo = function(x, y, color) {
      if (color == null) {
        color = "steelblue";
      }
      this.draw.line(this.x, this.y, x, y).attr({
        stroke: color
      });
      this.x = x;
      this.y = y;
      return this;
    };

    Cursor.prototype.moveTo = function(x, y) {
      return this.lineTo(x, y, "none");
    };

    return Cursor;

  })();

  extension = {
    cursor: function(x, y) {
      return new Cursor(x, y, this);
    }
  };

  SVG.extend(SVG.Doc, extension);

}).call(this);
