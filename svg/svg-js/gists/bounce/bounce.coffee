runTime = 5   # running time in seconds
w = 960       # canvas width
h = 500       # canvas height
d = 50        # diameter of bug

draw = SVG('canvas').size(w, h)

border = draw.rect(w, h)
  .attr
    fill: "none"
    stroke: "#999"
    'stroke-width': 3

class Point
  constructor: (@x, @y) ->

velocity = new Point 5, 6
begin = new Point d/2, d,2

bug = draw.circle(d)
  .center(begin.x, begin.y)
  .attr
    id: "bug"
    fill: "aliceblue"
    stroke: "steelblue"
    'stroke-width': 5

borderColor = (color) -> 
  border.attr 
    stroke: color

reverse = ->
  borderColor "orange"
  setTimeout (-> borderColor "#999"), 100
  -1

move = =>
  x = bug.x()
  y = bug.y()
  velocity.x *= reverse() if (x+d > w) or (x < 0)
  velocity.y *= reverse() if (y+d > h) or (y < 0)
  bug.move(x+velocity.x, y+velocity.y)

paused = false

# enable toggling of animation with a click
toggle = ->
  if paused 
    paused = false
    run() 
  else 
    paused = true

canvas = document.getElementById("canvas")
canvas.addEventListener('click', toggle);

run = ->
  move()
  return if paused
  requestAnimationFrame(run)

runFor = (secs=10) ->
  setTimeout (-> paused = true), secs * 1000
  run()

runFor runTime
