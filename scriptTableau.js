var placeholderDiv = document.getElementById("vizcontainer");
var url = "https://public.tableau.com/views/LukeStankesOrthographicProjection/Eclipse?:embed=y&:display_count=yes&publish=yes";
var options = {
  style: "inline-block",
  width: "400",
  height: "475",
  hideTabs: true,
  hideToolbar: true
};
viz = new tableau.Viz(placeholderDiv, url, options);