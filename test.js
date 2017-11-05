const svg = d3.select("svg");
const path = svg.append("path");
const projection = d3.geoOrthographic();
const initialScale = projection.scale(200)
  .translate([250, 250])
  .center([0,0]);
const geoPath = d3
  .geoPath()
  .projection(projection);

 d3.queue()
   .defer(d3.json, "world-110m.json")
   .defer(d3.json, "eclipse_simplifed.geojson")
   .await(function(error, file1, file2) {
    createGlobe(file1, file2);
 });

function createGlobe(world, eclipses) {
  const land = topojson.feature(world, world.objects.land);
  const renderLand = () => path.attr('d', geoPath(land));
  const renderEclipse = (d) => path.attr('d', geoPath(d));

  eclipses.features.forEach( (eclipse, i) => {
    if (!([3,6,7,11,12,20,22,24,32,34,36,37,38,39,41,42,54,56,60,62]).includes(i)){
      console.log(eclipse);
      renderEclipse(eclipse);
    }
  });

  let rotate0, coords0;
  const coords = () => projection.rotate(rotate0)
    .invert([d3.event.x, d3.event.y]);

  svg
    .call(d3.drag()
      .on('start', () => {
        rotate0 = projection.rotate();
        coords0 = coords();
      })
      .on('drag', () => {
        const coords1 = coords();
        projection.rotate([
          rotate0[0] + coords1[0] - coords0[0],
          rotate0[1] + coords1[1] - coords0[1],
        ])
        renderEclipse();
      })
    )
};